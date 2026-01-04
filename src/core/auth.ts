import axios from 'axios';
import { createHmac, timingSafeEqual } from 'crypto';
import { AuthError } from './errors';
import { TokenPair } from './types';

const TOKEN_URL = 'https://api.admitad.com/token/';
const AUTHORIZE_URL = 'https://api.admitad.com/authorize/';

/**
 * Token response from API
 */
export interface TokenResponse {
  username: string;
  first_name: string;
  last_name: string;
  language: string;
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  group: string;
}

/**
 * Parameters for client credentials token
 */
export interface ClientCredentialsParams {
  clientId: string;
  clientSecret: string;
  scope: string;
}

/**
 * Parameters for token refresh
 */
export interface RefreshTokenParams {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

/**
 * Parameters for Authorization Code flow
 */
export interface AuthorizationUrlParams {
  clientId: string;
  redirectUri: string;
  scope: string;
  state?: string;
}

/**
 * Parameters for code exchange
 */
export interface ExchangeCodeParams {
  clientId: string;
  clientSecret: string;
  code: string;
  redirectUri: string;
}

/**
 * Data from signed_request
 */
export interface SignedRequestData {
  username: string;
  id: number;
  first_name: string;
  last_name: string;
  algorithm: string;
  language: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

/**
 * Get token via client credentials flow
 */
export async function getAccessToken(params: ClientCredentialsParams): Promise<TokenResponse> {
  const { clientId, clientSecret, scope } = params;

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await axios.post<TokenResponse>(
      TOKEN_URL,
      new URLSearchParams({
        grant_type: 'client_credentials',
        scope,
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${credentials}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data;
      throw new AuthError(data?.error_description || 'Failed to get access token', data?.error);
    }
    throw error;
  }
}

/**
 * Refresh access token via refresh token
 */
export async function refreshAccessToken(params: RefreshTokenParams): Promise<TokenResponse> {
  const { clientId, clientSecret, refreshToken } = params;

  try {
    const response = await axios.post<TokenResponse>(
      TOKEN_URL,
      new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data;
      throw new AuthError(data?.error_description || 'Failed to refresh access token', data?.error);
    }
    throw error;
  }
}

/**
 * Convert TokenResponse to TokenPair
 */
export function toTokenPair(response: TokenResponse): TokenPair {
  return {
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
    expiresIn: response.expires_in,
  };
}

/**
 * Build authorization URL (Authorization Code flow)
 *
 * @example
 * ```typescript
 * const url = getAuthorizationUrl({
 *   clientId: 'xxx',
 *   redirectUri: 'https://myapp.com/callback',
 *   scope: 'advcampaigns statistics',
 *   state: 'random-csrf-token',
 * });
 * // Redirect user to url
 * ```
 */
export function getAuthorizationUrl(params: AuthorizationUrlParams): string {
  const { clientId, redirectUri, scope, state } = params;

  const searchParams = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope,
    response_type: 'code',
  });

  if (state) {
    searchParams.set('state', state);
  }

  return `${AUTHORIZE_URL}?${searchParams.toString()}`;
}

/**
 * Exchange authorization code for token
 *
 * @example
 * ```typescript
 * // After user redirect to callback URL
 * const tokens = await exchangeCodeForToken({
 *   clientId: 'xxx',
 *   clientSecret: 'xxx',
 *   code: 'code-from-callback',
 *   redirectUri: 'https://myapp.com/callback',
 * });
 * ```
 */
export async function exchangeCodeForToken(params: ExchangeCodeParams): Promise<TokenResponse> {
  const { clientId, clientSecret, code, redirectUri } = params;

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await axios.post<TokenResponse>(
      TOKEN_URL,
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: clientId,
        redirect_uri: redirectUri,
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${credentials}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error.response?.data;
      throw new AuthError(
        data?.error_description || 'Failed to exchange code for token',
        data?.error,
      );
    }
    throw error;
  }
}

/**
 * Parse and verify signed_request
 *
 * signed_request is used for applications embedded in Admitad iframe.
 * Format: base64url(signature).base64url(json_data)
 *
 * @example
 * ```typescript
 * const data = parseSignedRequest(signedRequest, clientSecret);
 * console.log(data.access_token);
 * ```
 */
export function parseSignedRequest(signedRequest: string, clientSecret: string): SignedRequestData {
  const [encodedSignature, encodedData] = signedRequest.split('.');

  if (!encodedSignature || !encodedData) {
    throw new AuthError('Invalid signed_request format');
  }

  // Decode data
  const dataJson = Buffer.from(encodedData, 'base64').toString('utf-8');

  let data;
  try {
    data = JSON.parse(dataJson);
  } catch (e) {
    throw new AuthError('Invalid signed_request JSON', undefined, { cause: e });
  }

  if (!data?.access_token || !data?.algorithm) {
    throw new AuthError('Invalid signed_request data structure');
  }

  // Verify algorithm
  if (data.algorithm.toUpperCase() !== 'HMAC-SHA256') {
    throw new AuthError(`Unsupported algorithm: ${data.algorithm}`);
  }

  // Verify signature
  const expectedSignature = createHmac('sha256', clientSecret)
    .update(encodedData)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const actualSignature = encodedSignature
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const expectedBuf = Buffer.from(expectedSignature);
  const actualBuf = Buffer.from(actualSignature);

  if (expectedBuf.length !== actualBuf.length || !timingSafeEqual(expectedBuf, actualBuf)) {
    throw new AuthError('Invalid signed_request signature');
  }

  return data as SignedRequestData;
}
