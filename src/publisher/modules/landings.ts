import { HttpClient } from '../../core/http-client';
import { PaginatedResponse, PaginationParams } from '../../core/types';

/**
 * Landing page
 */
export interface Landing {
  id: string;
  name: string;
  date_created: string;
  /** Only for website-specific landings */
  gotolink?: string;
}

/**
 * Landings module
 *
 * Scope: landings
 */
export class Landings {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get campaign landings
   *
   * @example
   * ```typescript
   * const landings = await publisher.landings.list(456);
   * ```
   */
  async list(campaignId: number, params?: PaginationParams): Promise<PaginatedResponse<Landing>> {
    return this.http.get<PaginatedResponse<Landing>>(`/landings/${campaignId}/`, { params });
  }

  /**
   * Get campaign landings for a website (with affiliate links)
   *
   * @example
   * ```typescript
   * const landings = await publisher.landings.listForWebsite(456, 123);
   * landings.results.forEach(l => console.log(l.gotolink));
   * ```
   */
  async listForWebsite(
    campaignId: number,
    websiteId: number,
    params?: PaginationParams,
  ): Promise<PaginatedResponse<Landing>> {
    return this.http.get<PaginatedResponse<Landing>>(
      `/landings/${campaignId}/website/${websiteId}/`,
      { params },
    );
  }
}
