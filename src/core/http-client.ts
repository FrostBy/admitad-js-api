import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { AdmitadConfig } from './types';
import { ApiError, AuthError } from './errors';
import { refreshAccessToken, toTokenPair } from './auth';

const DEFAULT_BASE_URL = 'https://api.admitad.com';
const DEFAULT_TIMEOUT = 30000;

export class HttpClient {
  private readonly client: AxiosInstance;
  private readonly abortController = new AbortController();
  private accessToken?: string;
  private refreshToken?: string;
  private refreshPromise: Promise<string> | null = null;

  constructor(private readonly config: AdmitadConfig) {
    this.accessToken = config.accessToken;
    this.refreshToken = config.refreshToken;

    this.client = axios.create({
      baseURL: config.baseUrl || DEFAULT_BASE_URL,
      timeout: config.timeout || DEFAULT_TIMEOUT,
      signal: this.abortController.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor: add Authorization header and language
    this.client.interceptors.request.use((config) => {
      if (this.accessToken) {
        config.headers.Authorization = `Bearer ${this.accessToken}`;
      }

      // Add language to params if specified in config
      if (this.config.language) {
        config.params = {
          ...config.params,
          language: this.config.language,
        };
      }

      return config;
    });

    // Response interceptor: error handling and auto-refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const data = error.response?.data;
          const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
          };

          // Attempt to refresh token on 401
          if (status === 401 && !originalRequest._retry && this.refreshToken) {
            originalRequest._retry = true;

            try {
              const newToken = await this.refreshTokenIfNeeded();
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.client(originalRequest);
            } catch (refreshError) {
              throw new AuthError(data?.error_description || 'Unauthorized', data?.error, {
                cause: refreshError,
              });
            }
          }

          if (status === 401) {
            throw new AuthError(data?.error_description || 'Unauthorized', data?.error);
          }

          throw new ApiError(
            data?.error_description || data?.message || error.message,
            status || 0,
            data,
          );
        }

        throw error;
      },
    );
  }

  /**
   * Refresh token (with parallel request deduplication)
   */
  private async refreshTokenIfNeeded(): Promise<string> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.doRefreshToken().finally(() => {
      this.refreshPromise = null;
    });

    return this.refreshPromise;
  }

  private async doRefreshToken(): Promise<string> {
    if (!this.refreshToken) {
      throw new AuthError('No refresh token available');
    }

    const response = await refreshAccessToken({
      clientId: this.config.clientId,
      clientSecret: this.config.clientSecret,
      refreshToken: this.refreshToken,
    });

    this.accessToken = response.access_token;
    this.refreshToken = response.refresh_token;

    // Call callback if provided
    if (this.config.onTokenRefresh) {
      await this.config.onTokenRefresh(toTokenPair(response));
    }

    return this.accessToken;
  }

  /**
   * Set access token
   */
  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  /**
   * Cancel all pending requests
   */
  destroy(): void {
    this.abortController.abort();
  }

  /**
   * GET request
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  /**
   * POST request
   */
  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  /**
   * PUT request
   */
  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}
