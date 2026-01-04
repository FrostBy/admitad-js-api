import { HttpClient } from '../../core/http-client';

/**
 * Deeplink generation parameters
 */
export interface DeeplinkParams {
  /** Website ID */
  websiteId: number;
  /** Campaign ID */
  campaignId: number;
  /** Target URL (max 200 URLs) */
  url: string;
  /** SubID (max 50 characters) */
  subid?: string;
  /** SubID1 (max 50 characters) */
  subid1?: string;
  /** SubID2 (max 50 characters) */
  subid2?: string;
  /** SubID3 (max 120 characters) */
  subid3?: string;
  /** SubID4 (max 120 characters) */
  subid4?: string;
}

/**
 * Deeplink generation result
 */
export interface DeeplinkResult {
  /** Generated affiliate link */
  link: string;
  /** Affiliate product (AliExpress only) */
  is_affiliate_product: boolean | null;
}

/**
 * Deeplink generation module
 *
 * Scope: deeplink_generator
 */
export class Deeplinks {
  constructor(private readonly http: HttpClient) {}

  /**
   * Generate a deeplink
   *
   * @example
   * ```typescript
   * const result = await publisher.deeplinks.generate({
   *   websiteId: 123,
   *   campaignId: 456,
   *   url: 'https://shop.com/product/1',
   *   subid: 'my-tracking-id',
   * });
   * console.log(result.link);
   * ```
   */
  async generate(params: DeeplinkParams): Promise<DeeplinkResult> {
    const { websiteId, campaignId, url, subid, subid1, subid2, subid3, subid4 } = params;

    return this.http.get<DeeplinkResult>(`/deeplink/${websiteId}/advcampaign/${campaignId}/`, {
      params: {
        ulp: url,
        subid,
        subid1,
        subid2,
        subid3,
        subid4,
      },
    });
  }
}
