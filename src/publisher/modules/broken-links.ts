import { HttpClient } from '../../core/http-client';
import { PaginatedResponse, PaginationParams } from '../../core/types';

/**
 * Broken link error reason
 */
export enum BrokenLinkReason {
  /** Program suspended */
  PROGRAM_SUSPENDED = 0,
  /** No partnership */
  NO_PARTNERSHIP = 1,
  /** Material removed */
  MATERIAL_REMOVED = 2,
}

/**
 * Broken link
 */
export interface BrokenLink {
  id: number;
  website: {
    id: number;
    name: string;
  };
  campaign: {
    id: number;
    name: string;
  };
  clicks: number;
  err_reason: BrokenLinkReason;
  click_link: string;
  ref_link: string;
  datetime: string;
}

/**
 * Broken links request parameters
 */
export interface BrokenLinksParams extends PaginationParams {
  /** Website ID */
  website?: number;
  /** Program ID */
  campaign?: number;
  /** Search by URL */
  search?: string;
  /** Error reason code */
  reason?: BrokenLinkReason;
  /** Period start */
  start_date?: string;
  /** Period end */
  end_date?: string;
}

/**
 * Resolve result
 */
export interface ResolveResult {
  resolved: number[];
}

/**
 * Broken links module
 *
 * Scopes: broken_links, manage_broken_links
 */
export class BrokenLinks {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get list of broken links
   *
   * @example
   * ```typescript
   * const links = await publisher.brokenLinks.list({ website: 123 });
   * ```
   */
  async list(params?: BrokenLinksParams): Promise<PaginatedResponse<BrokenLink>> {
    return this.http.get<PaginatedResponse<BrokenLink>>('/broken_links/', {
      params,
    });
  }

  /**
   * Mark broken links as resolved
   *
   * @example
   * ```typescript
   * const result = await publisher.brokenLinks.resolve([123, 456]);
   * ```
   */
  async resolve(linkIds: number[]): Promise<ResolveResult> {
    const params = new URLSearchParams();
    linkIds.forEach((id) => params.append('link_id', id.toString()));

    return this.http.post<ResolveResult>('/broken_links/resolve/', params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }
}
