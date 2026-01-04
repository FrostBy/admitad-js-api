// Clients
export { Publisher } from './publisher';
export { Advertiser } from './advertiser';

// Types and constants
export { LANGUAGES, PAGINATION } from './core/types';
export type {
  AdmitadConfig,
  TokenPair,
  PaginationParams,
  PaginatedResponse,
  Language,
} from './core/types';

// Errors
export {
  AdmitadError,
  AuthError,
  ApiError,
  ValidationError,
  NotImplementedError,
  ERROR_CODES,
  HTTP_STATUS,
} from './core/errors';
export type { ErrorCode } from './core/errors';

// Authorization
export {
  getAccessToken,
  refreshAccessToken,
  getAuthorizationUrl,
  exchangeCodeForToken,
  parseSignedRequest,
  toTokenPair,
} from './core/auth';
export type {
  TokenResponse,
  SignedRequestData,
  AuthorizationUrlParams,
  ExchangeCodeParams,
} from './core/auth';

// Scopes
export { SCOPES, ALL_SCOPES, ALL_SCOPES_STRING, buildScopeString } from './core/scopes';
export type { Scope } from './core/scopes';

// NestJS module
export { AdmitadModule } from './nest/admitad.module';
export type { AdmitadModuleAsyncOptions } from './nest/admitad.module';
