import { HttpClient } from '../../core/http-client';
import { PaginatedResponse, PaginationParams } from '../../core/types';

/**
 * Website status
 */
export type WebsiteStatus = 'new' | 'active' | 'suspended';

/**
 * Campaign connection status
 */
export type CampaignConnectionStatus = 'pending' | 'active' | 'declined' | 'disabled';

/**
 * Website
 */
export interface Website {
  id: number;
  name: string;
  status: WebsiteStatus;
  site_url: string;
  verification_code: string;
  kind: string;
  creation_date: string;
  regions: string[];
  categories: number[];
}

/**
 * Websites request parameters
 */
export interface WebsitesParams extends PaginationParams {
  /** Website status */
  status?: WebsiteStatus;
  /** Campaign connection status */
  campaign_status?: CampaignConnectionStatus;
}

/**
 * Publisher websites module
 *
 * Scope: websites
 */
export class Websites {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get websites list
   *
   * @example
   * ```typescript
   * const websites = await publisher.websites.list({ status: 'active' });
   * ```
   */
  async list(params?: WebsitesParams): Promise<PaginatedResponse<Website>> {
    return this.http.get<PaginatedResponse<Website>>('/websites/v2/', {
      params,
    });
  }

  /**
   * Get website by ID
   *
   * @example
   * ```typescript
   * const website = await publisher.websites.get(123);
   * ```
   */
  async get(id: number): Promise<Website> {
    return this.http.get<Website>(`/websites/v2/${id}/`);
  }
}
