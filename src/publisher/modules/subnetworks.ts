import { HttpClient } from '../../core/http-client';

/**
 * Created partner network website
 */
export interface SubnetworkWebsite {
  id: number;
  status: string;
  verification_code: string;
  kind: string;
  creation_date: string;
}

/**
 * Website creation parameters
 */
export interface CreateSubnetworkWebsiteParams {
  /** Name (max 200 characters) */
  name: string;
  /** URL (max 255 characters) */
  url: string;
  /** Categories */
  category?: number[];
  /** Regions */
  region?: string[];
  /** Website type */
  native_kind?: string;
}

/**
 * Program connection status
 */
export interface SubnetworkConnectionStatus {
  website_id: number;
  connection_status: 'active' | 'disabled';
  gotolink?: string;
  advcampaign_id: number;
}

/**
 * Partner networks module
 *
 * Scopes: manage_websites, advcampaigns_for_website
 */
export class Subnetworks {
  constructor(private readonly http: HttpClient) {}

  /**
   * Create websites for partner network
   *
   * @example
   * ```typescript
   * const websites = await publisher.subnetworks.createWebsites([
   *   { name: 'Site 1', url: 'https://site1.com' },
   *   { name: 'Site 2', url: 'https://site2.com' },
   * ]);
   * ```
   */
  async createWebsites(
    websites: CreateSubnetworkWebsiteParams[],
  ): Promise<Record<string, SubnetworkWebsite>> {
    return this.http.post<Record<string, SubnetworkWebsite>>(
      '/subnetworks/v1/websites/create/',
      websites,
    );
  }

  /**
   * Get website connection statuses for a program
   *
   * @example
   * ```typescript
   * const statuses = await publisher.subnetworks.getConnectionStatuses(456, [123, 124]);
   * ```
   */
  async getConnectionStatuses(
    campaignId: number,
    websiteIds: number[],
  ): Promise<SubnetworkConnectionStatus[]> {
    return this.http.get<SubnetworkConnectionStatus[]>(
      `/subnetworks/v1/advcampaign/${campaignId}/statuses/`,
      {
        params: {
          websites_id: websiteIds.join(','),
        },
      },
    );
  }
}
