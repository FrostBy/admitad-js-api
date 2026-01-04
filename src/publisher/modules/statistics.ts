import { HttpClient } from '../../core/http-client';
import { PaginatedResponse, PaginationParams } from '../../core/types';

/**
 * Base statistics metrics
 */
export interface BaseStats {
  clicks: number;
  views: number;
  ctr: number;
  cr: number;
  ecpc: number;
  ecpm: number;
  leads_sum: number;
  sales_sum: number;
  payment_sum_approved: number;
  payment_sum_open: number;
  payment_sum_declined: number;
}

/**
 * Statistics by website
 */
export interface WebsiteStats extends BaseStats {
  website: {
    id: number;
    name: string;
  };
}

/**
 * Statistics by program
 */
export interface CampaignStats extends BaseStats {
  advcampaign: {
    id: number;
    name: string;
  };
}

/**
 * Statistics by date
 */
export interface DateStats extends BaseStats {
  date: string;
}

/**
 * Order item
 */
export interface OrderItem {
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
}

/**
 * Statistics by action
 */
export interface ActionStats {
  action_id: number;
  status: string;
  payment: number;
  cart: number;
  conversion_time: string;
  click_time: string;
  subid: string;
  subid1?: string;
  subid2?: string;
  subid3?: string;
  subid4?: string;
  order_items?: OrderItem[];
  advcampaign: {
    id: number;
    name: string;
  };
  website: {
    id: number;
    name: string;
  };
}

/**
 * Statistics by SubID
 */
export interface SubIdStats extends BaseStats {
  subid: string;
  subid1?: string;
  subid2?: string;
  subid3?: string;
  subid4?: string;
}

/**
 * Statistics by source
 */
export interface SourceStats extends BaseStats {
  source: string;
}

/**
 * Statistics by keyword
 */
export interface KeywordStats extends BaseStats {
  keyword: string;
}

/**
 * Common statistics parameters
 */
export interface StatisticsParams extends PaginationParams {
  /** Period start (dd.mm.yyyy) */
  date_start: string;
  /** Period end (dd.mm.yyyy) */
  date_end?: string;
  /** Website ID */
  website?: number;
  /** Program ID */
  campaign?: number;
  /** SubID */
  subid?: string;
  /** Total values */
  total?: boolean;
  /** Sorting */
  order_by?: string;
}

/**
 * SubID statistics parameters
 */
export interface SubIdStatisticsParams extends StatisticsParams {
  /** Group by subid1-4 */
  group_by?: 'subid' | 'subid1' | 'subid2' | 'subid3' | 'subid4';
}

/**
 * Statistics module
 *
 * Scope: statistics
 */
export class Statistics {
  constructor(private readonly http: HttpClient) {}

  /**
   * Statistics by websites
   *
   * @example
   * ```typescript
   * const stats = await publisher.statistics.byWebsites({
   *   date_start: '01.01.2024',
   *   date_end: '31.01.2024',
   * });
   * ```
   */
  async byWebsites(params: StatisticsParams): Promise<PaginatedResponse<WebsiteStats>> {
    return this.http.get<PaginatedResponse<WebsiteStats>>('/statistics/websites/', { params });
  }

  /**
   * Statistics by programs
   *
   * @example
   * ```typescript
   * const stats = await publisher.statistics.byCampaigns({
   *   date_start: '01.01.2024',
   * });
   * ```
   */
  async byCampaigns(params: StatisticsParams): Promise<PaginatedResponse<CampaignStats>> {
    return this.http.get<PaginatedResponse<CampaignStats>>('/statistics/campaigns/', { params });
  }

  /**
   * Statistics by dates
   *
   * @example
   * ```typescript
   * const stats = await publisher.statistics.byDates({
   *   date_start: '01.01.2024',
   *   date_end: '31.01.2024',
   * });
   * ```
   */
  async byDates(params: StatisticsParams): Promise<PaginatedResponse<DateStats>> {
    return this.http.get<PaginatedResponse<DateStats>>('/statistics/dates/', {
      params,
    });
  }

  /**
   * Statistics by actions
   *
   * @example
   * ```typescript
   * const stats = await publisher.statistics.byActions({
   *   date_start: '01.01.2024',
   *   campaign: 456,
   * });
   * ```
   */
  async byActions(params: StatisticsParams): Promise<PaginatedResponse<ActionStats>> {
    return this.http.get<PaginatedResponse<ActionStats>>('/statistics/actions/', { params });
  }

  /**
   * Statistics by SubID
   *
   * @example
   * ```typescript
   * const stats = await publisher.statistics.bySubIds({
   *   date_start: '01.01.2024',
   *   group_by: 'subid1',
   * });
   * ```
   */
  async bySubIds(params: SubIdStatisticsParams): Promise<PaginatedResponse<SubIdStats>> {
    return this.http.get<PaginatedResponse<SubIdStats>>('/statistics/sub_ids/', { params });
  }

  /**
   * Statistics by sources
   *
   * @example
   * ```typescript
   * const stats = await publisher.statistics.bySources({
   *   date_start: '01.01.2024',
   * });
   * ```
   */
  async bySources(params: StatisticsParams): Promise<PaginatedResponse<SourceStats>> {
    return this.http.get<PaginatedResponse<SourceStats>>('/statistics/sources/', { params });
  }

  /**
   * Statistics by keywords
   *
   * @example
   * ```typescript
   * const stats = await publisher.statistics.byKeywords({
   *   date_start: '01.01.2024',
   * });
   * ```
   */
  async byKeywords(params: StatisticsParams): Promise<PaginatedResponse<KeywordStats>> {
    return this.http.get<PaginatedResponse<KeywordStats>>('/statistics/keywords/', { params });
  }
}
