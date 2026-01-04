/**
 * Admitad API error codes
 */
export const ERROR_CODES = {
  /** API key has expired */
  TOKEN_EXPIRED: 0,
  /** Token does not exist / invalid */
  TOKEN_INVALID: 1,
  /** Insufficient permissions for the operation */
  INSUFFICIENT_PERMISSIONS: 2,
  /** Malformed request */
  MALFORMED_REQUEST: 3,
  /** Rate limit exceeded (600 req/min) */
  RATE_LIMIT_EXCEEDED: 4,
  /** Refresh token not found */
  REFRESH_TOKEN_NOT_FOUND: 5,
  /** Token limit exceeded */
  TOKEN_LIMIT_EXCEEDED: 6,
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

/**
 * API response HTTP statuses
 */
export const HTTP_STATUS = {
  /** Successful responses */
  SUCCESS: [200, 201, 202],
  /** Unauthorized */
  UNAUTHORIZED: 401,
  /** Forbidden */
  FORBIDDEN: 403,
  /** Not found */
  NOT_FOUND: 404,
  /** Bad request */
  BAD_REQUEST: 400,
  /** Server error */
  SERVER_ERROR: 500,
  /** Rate limited */
  RATE_LIMITED: 503,
} as const;

/**
 * Base Admitad error
 */
export class AdmitadError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'AdmitadError';
    Object.setPrototypeOf(this, AdmitadError.prototype);
  }
}

/**
 * Authentication error
 */
export class AuthError extends AdmitadError {
  constructor(
    message: string,
    public readonly code?: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = 'AuthError';
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

/**
 * API error
 */
export class ApiError extends AdmitadError {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly response?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Validation error
 */
export class ValidationError extends AdmitadError {
  constructor(
    message: string,
    public readonly field?: string,
  ) {
    super(message);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * Not implemented error
 */
export class NotImplementedError extends AdmitadError {
  constructor(feature: string) {
    super(`${feature} is not implemented yet`);
    this.name = 'NotImplementedError';
    Object.setPrototypeOf(this, NotImplementedError.prototype);
  }
}
