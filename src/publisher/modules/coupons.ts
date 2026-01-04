import { HttpClient } from '../../core/http-client';
import { PaginatedResponse, PaginationParams } from '../../core/types';
import { Diff, DiffField, diffById } from '../../core/utils';

/**
 * Coupon category
 */
export interface CouponCategory {
  id: number;
  name: string;
}

/**
 * Coupon campaign
 */
export interface CouponCampaign {
  id: number;
  name: string;
  site_url: string;
}

/**
 * Coupon
 */
export interface Coupon {
  id: number;
  name: string;
  description: string;
  status: string;
  rating: number;
  discount: string;
  date_start: string;
  date_end: string;
  promocode: string;
  goto_link: string;
  frameset_link: string;
  campaign: CouponCampaign;
  regions: string[];
  language: string;
  categories: CouponCategory[];
}

/**
 * Coupons request parameters
 */
export interface CouponsParams extends PaginationParams {
  /** Program ID */
  campaign?: number;
  /** Category ID */
  category?: number;
  /** Search by name/description */
  search?: string;
  /** Validity period start */
  date_start?: string;
  /** Validity period end */
  date_end?: string;
  /** Region */
  region?: string;
}

/**
 * Coupons module
 *
 * Scopes: coupons, coupons_for_website
 */
export class Coupons {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get list of coupons
   *
   * @example
   * ```typescript
   * const coupons = await publisher.coupons.list({ campaign: 456, limit: 50 });
   * ```
   */
  async list(params?: CouponsParams): Promise<PaginatedResponse<Coupon>> {
    return this.http.get<PaginatedResponse<Coupon>>('/coupons/', { params });
  }

  /**
   * Get coupons for website (with affiliate links)
   *
   * @example
   * ```typescript
   * const coupons = await publisher.coupons.listForWebsite(123);
   * ```
   */
  async listForWebsite(
    websiteId: number,
    params?: CouponsParams,
  ): Promise<PaginatedResponse<Coupon>> {
    return this.http.get<PaginatedResponse<Coupon>>(`/coupons/website/${websiteId}/`, { params });
  }

  /**
   * Get coupon categories
   *
   * @example
   * ```typescript
   * const categories = await publisher.coupons.getCategories();
   * ```
   */
  async getCategories(): Promise<PaginatedResponse<CouponCategory>> {
    return this.http.get<PaginatedResponse<CouponCategory>>('/coupons/categories/');
  }

  /**
   * Compares two coupon lists and returns differences
   *
   * @example
   * ```typescript
   * const previous = await publisher.coupons.list({ campaign: 456 });
   * // ... after some time ...
   * const current = await publisher.coupons.list({ campaign: 456 });
   *
   * const diff = publisher.coupons.diff(previous.results, current.results);
   * console.log('Added:', diff.added.length);
   * console.log('Removed:', diff.removed.length);
   * console.log('Changed:', diff.changed.length);
   * ```
   */
  diff<T extends Coupon>(previous: T[], current: T[], fields?: DiffField[]): Diff<T> {
    return diffById(previous, current, fields);
  }
}
