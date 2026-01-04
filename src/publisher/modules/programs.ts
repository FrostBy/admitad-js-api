import { HttpClient } from '../../core/http-client';
import { PaginatedResponse, PaginationParams } from '../../core/types';
import { Diff, DiffField, diffById } from '../../core/utils';

/**
 * Program action
 */
export interface ProgramAction {
  id: number;
  name: string;
  type: string;
  payment_size: string;
  hold_size: number;
}

/**
 * Rate
 */
export interface Rate {
  size: string;
  country: string;
  min_payment: number;
  date_start: string;
  is_percentage: boolean;
}

/**
 * Tariff
 */
export interface Tariff {
  id: number;
  name: string;
  rates: Rate[];
}

/**
 * Action detail
 */
export interface ActionDetail {
  id: number;
  name: string;
  type: string;
  tariffs: Tariff[];
}

/**
 * Program category
 */
export interface ProgramCategory {
  id: number;
  name: string;
  parent?: ProgramCategory;
}

/**
 * Affiliate program
 */
export interface Program {
  id: number;
  name: string;
  status: string;
  rating: string;
  description: string;
  site_url: string;
  image: string;
  currency: string;
  connection_status?: string;
  goto_cookie_lifetime: number;
  geotargeting: boolean;
  cr: number;
  ecpc: number;
  epc: number;
  actions: ProgramAction[];
  actions_detail?: ActionDetail[];
  categories: ProgramCategory[];
  regions: string[];
  action_countries: string[];
  products_xml_link?: string;
  products_csv_link?: string;
}

/**
 * Program connection status
 */
export type ConnectionStatus = 'active' | 'pending' | 'declined';

/**
 * Programs request parameters
 */
export interface ProgramsParams extends PaginationParams {
  /** Categories language */
  language?: string;
  /** Website ID for moderation check */
  website?: number;
  /** Filter by tools */
  has_tool?: 'deeplink' | 'products' | 'retag';
  /** Filter by traffic types */
  traffic_id?: number;
}

/**
 * Website programs request parameters
 */
export interface WebsiteProgramsParams extends PaginationParams {
  /** Connection status */
  connection_status?: ConnectionStatus;
  /** Filter by tools */
  has_tool?: 'deeplink' | 'products' | 'retag';
}

/**
 * Affiliate programs module
 *
 * Scopes: advcampaigns, advcampaigns_for_website
 */
export class Programs {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get list of all programs
   *
   * @example
   * ```typescript
   * const programs = await publisher.programs.list({ limit: 50 });
   * ```
   */
  async list(params?: ProgramsParams): Promise<PaginatedResponse<Program>> {
    return this.http.get<PaginatedResponse<Program>>('/advcampaigns/', {
      params,
    });
  }

  /**
   * Get program by ID
   *
   * @example
   * ```typescript
   * const program = await publisher.programs.get(456);
   * ```
   */
  async get(id: number): Promise<Program> {
    return this.http.get<Program>(`/advcampaigns/${id}/`);
  }

  /**
   * Get programs for website
   *
   * @example
   * ```typescript
   * const programs = await publisher.programs.listForWebsite(123, {
   *   connection_status: 'active',
   * });
   * ```
   */
  async listForWebsite(
    websiteId: number,
    params?: WebsiteProgramsParams,
  ): Promise<PaginatedResponse<Program>> {
    return this.http.get<PaginatedResponse<Program>>(`/advcampaigns/website/${websiteId}/`, {
      params,
    });
  }

  /**
   * Get program for website
   *
   * @example
   * ```typescript
   * const program = await publisher.programs.getForWebsite(456, 123);
   * ```
   */
  async getForWebsite(campaignId: number, websiteId: number): Promise<Program> {
    return this.http.get<Program>(`/advcampaigns/${campaignId}/website/${websiteId}/`);
  }

  /**
   * Compares two program lists and returns differences
   *
   * @example
   * ```typescript
   * const previous = await publisher.programs.list();
   * // ... after some time ...
   * const current = await publisher.programs.list();
   *
   * // Only added and removed (without changed due to complex objects)
   * const diff = publisher.programs.diff(
   *   previous.results,
   *   current.results,
   *   [DiffField.Added, DiffField.Removed],
   * );
   * ```
   */
  diff<T extends Program>(previous: T[], current: T[], fields?: DiffField[]): Diff<T> {
    return diffById(previous, current, fields);
  }
}
