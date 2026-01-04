import { HttpClient } from '../../core/http-client';

/**
 * AliExpress product commission
 */
export interface AliexpressCommission {
  /** Product name */
  product_name: string | null;
  /** Standard commission (%) */
  commission_rate: number | null;
  /** Hot Products commission (%) */
  hot_commission_rate: number | null;
  /** Whether the product is a Hot Product */
  is_hot: boolean;
  /** Product link */
  url: string;
}

/**
 * Commission rates response
 */
export interface CommissionRatesResponse {
  commission_rates: AliexpressCommission[];
}

/**
 * AliExpress module
 *
 * Scope: aliexpress_commission
 */
export class Aliexpress {
  constructor(private readonly http: HttpClient) {}

  /**
   * Calculate commission for AliExpress products
   *
   * @example
   * ```typescript
   * const result = await publisher.aliexpress.getCommissionRates([
   *   'https://aliexpress.com/item/123.html',
   *   'https://aliexpress.com/item/456.html',
   * ]);
   * result.commission_rates.forEach(c => {
   *   console.log(c.product_name, c.commission_rate);
   * });
   * ```
   */
  async getCommissionRates(urls: string[]): Promise<CommissionRatesResponse> {
    return this.http.post<CommissionRatesResponse>('/aliexpress/commission_rates/', { urls });
  }
}
