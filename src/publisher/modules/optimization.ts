import { HttpClient } from '../../core/http-client';
import { PaginatedResponse, PaginationParams } from '../../core/types';

/**
 * Postback sending method
 */
export enum OptCodeMethod {
  GET = 0,
  POST = 1,
}

/**
 * Action type
 */
export enum OptCodeActionType {
  ALL = 0,
  SALE = 1,
  LEAD = 2,
}

/**
 * Description mode
 */
export enum OptCodeDescMode {
  ADVANCED = 0,
  SIMPLE = 1,
}

/**
 * Optimization code (postback)
 */
export interface OptCode {
  id: number;
  url: string;
  method: OptCodeMethod;
  action_type: OptCodeActionType;
  desc_mode: OptCodeDescMode;
  campaign?: {
    id: number;
    name: string;
  };
  website?: {
    id: number;
    name: string;
  };
}

/**
 * Codes request parameters
 */
export interface OptCodesParams extends PaginationParams {
  /** Program ID */
  campaign?: number;
  /** Website ID */
  website?: number;
  /** Sort order */
  order_by?: 'action_type' | 'method' | 'desc_mode';
}

/**
 * Parameters for creating action code
 */
export interface CreateActionOptCodeParams {
  /** Postback URL */
  url: string;
  /** Method: 0 = GET, 1 = POST */
  method: OptCodeMethod;
  /** Action type: 0 = all, 1 = Sale, 2 = Lead */
  action_type: OptCodeActionType;
  /** Mode: 0 = advanced, 1 = simple */
  desc_mode: OptCodeDescMode;
  /** Statuses to send */
  status?: string[];
  /** Payment readiness */
  reward_ready?: boolean;
}

/**
 * Parameters for creating program status code
 */
export interface CreateOfferOptCodeParams {
  /** Postback URL */
  url: string;
  /** Method: 0 = GET, 1 = POST */
  method: OptCodeMethod;
}

/**
 * Optimization codes (postback) module
 *
 * Scopes: opt_codes, manage_opt_codes
 */
export class Optimization {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get list of optimization codes
   *
   * @example
   * ```typescript
   * const codes = await publisher.optimization.list({ campaign: 456 });
   * ```
   */
  async list(params?: OptCodesParams): Promise<PaginatedResponse<OptCode>> {
    return this.http.get<PaginatedResponse<OptCode>>('/opt_codes/', { params });
  }

  /**
   * Create action code
   *
   * @example
   * ```typescript
   * const code = await publisher.optimization.createActionCode({
   *   url: 'https://mysite.com/postback?order_id=[[[order_id]]]',
   *   method: OptCodeMethod.GET,
   *   action_type: OptCodeActionType.SALE,
   *   desc_mode: OptCodeDescMode.SIMPLE,
   * });
   * ```
   */
  async createActionCode(params: CreateActionOptCodeParams): Promise<OptCode> {
    return this.http.post<OptCode>('/opt_codes/action/create/', params);
  }

  /**
   * Create program status code
   *
   * @example
   * ```typescript
   * const code = await publisher.optimization.createOfferCode({
   *   url: 'https://mysite.com/offer-status',
   *   method: OptCodeMethod.POST,
   * });
   * ```
   */
  async createOfferCode(params: CreateOfferOptCodeParams): Promise<OptCode> {
    return this.http.post<OptCode>('/opt_codes/offer/create/', params);
  }

  /**
   * Update action code
   *
   * @example
   * ```typescript
   * const code = await publisher.optimization.updateActionCode(123, {
   *   url: 'https://mysite.com/new-postback',
   * });
   * ```
   */
  async updateActionCode(id: number, params: Partial<CreateActionOptCodeParams>): Promise<OptCode> {
    return this.http.post<OptCode>(`/opt_codes/action/update/${id}/`, params);
  }

  /**
   * Delete code
   *
   * @example
   * ```typescript
   * await publisher.optimization.delete(123);
   * ```
   */
  async delete(id: number): Promise<void> {
    await this.http.post(`/opt_codes/delete/${id}/`);
  }
}
