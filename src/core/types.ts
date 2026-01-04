/**
 * Supported API languages
 */
export const LANGUAGES = {
  RUSSIAN: 'ru',
  ENGLISH: 'en',
  SPANISH: 'es',
  TURKISH: 'tr',
  POLISH: 'pl',
} as const;

export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];

/**
 * Pagination constants
 */
export const PAGINATION = {
  /** Default limit */
  DEFAULT_LIMIT: 20,
  /** Maximum limit */
  MAX_LIMIT: 500,
  /** Default offset */
  DEFAULT_OFFSET: 0,
} as const;

/**
 * Configuration for Admitad client
 */
export interface AdmitadConfig {
  /** Application Client ID */
  clientId: string;
  /** Application Client Secret */
  clientSecret: string;
  /** Access token (optional, can be obtained via OAuth) */
  accessToken?: string;
  /** Refresh token for access token renewal */
  refreshToken?: string;
  /** Base API URL (default: https://api.admitad.com) */
  baseUrl?: string;
  /** Request timeout in ms (default: 30000) */
  timeout?: number;
  /** API response language (default: 'ru') */
  language?: Language;
  /** Callback on token refresh */
  onTokenRefresh?: (tokens: TokenPair) => void | Promise<void>;
}

/**
 * Token pair
 */
export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  /** Record limit (default: 20, max: 500) */
  limit?: number;
  /** Offset */
  offset?: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  results: T[];
  _meta: {
    count: number;
    limit: number;
    offset: number;
  };
}

/**
 * Base API response
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
}
