import { HttpClient } from '../../core/http-client';
import { PaginatedResponse, PaginationParams } from '../../core/types';

/**
 * Referral
 */
export interface Referral {
  id: number;
  username: string;
  payment: number;
}

/**
 * Referrals request parameters
 */
export interface ReferralsParams extends PaginationParams {
  /** Period start (dd.mm.yyyy) */
  date_start?: string;
  /** Period end (dd.mm.yyyy) */
  date_end?: string;
}

/**
 * Referrals module
 *
 * Scope: referrals
 */
export class Referrals {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get list of referrals
   *
   * @example
   * ```typescript
   * const referrals = await publisher.referrals.list({
   *   date_start: '01.01.2024',
   *   date_end: '31.12.2024',
   * });
   * ```
   */
  async list(params?: ReferralsParams): Promise<PaginatedResponse<Referral>> {
    return this.http.get<PaginatedResponse<Referral>>('/referrals/', {
      params,
    });
  }
}
