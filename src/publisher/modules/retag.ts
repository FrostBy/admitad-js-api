import { HttpClient } from '../../core/http-client';
import { PaginatedResponse, PaginationParams } from '../../core/types';

/**
 * Retag level
 */
export interface RetagLevel {
  id: number;
  name: string;
}

/**
 * Retag tag
 */
export interface RetagTag {
  id: number;
  website: {
    id: number;
    name: string;
  };
  level: RetagLevel;
  script: string;
  active: boolean;
  moderation_status: string;
  comment?: string;
}

/**
 * Tags request parameters
 */
export interface RetagParams extends PaginationParams {
  /** Website ID */
  website?: number;
  /** Active status */
  active?: boolean;
}

/**
 * Create tag parameters
 */
export interface CreateRetagParams {
  /** Website ID */
  website: number;
  /** Level ID */
  level: number;
  /** Script code */
  script: string;
  /** Active status */
  active?: boolean;
  /** Comment */
  comment?: string;
}

/**
 * Update tag parameters
 */
export interface UpdateRetagParams {
  /** Level ID */
  level?: number;
  /** Script code */
  script?: string;
  /** Active status */
  active?: boolean;
  /** Comment */
  comment?: string;
}

/**
 * Retag module
 *
 * Scopes: webmaster_retag, manage_webmaster_retag
 */
export class Retag {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get levels for a website
   *
   * @example
   * ```typescript
   * const levels = await publisher.retag.getLevelsForWebsite(123);
   * ```
   */
  async getLevelsForWebsite(websiteId: number): Promise<PaginatedResponse<RetagLevel>> {
    return this.http.get<PaginatedResponse<RetagLevel>>(`/retag/website/${websiteId}/levels/`);
  }

  /**
   * Get program levels
   *
   * @example
   * ```typescript
   * const levels = await publisher.retag.getLevelsForCampaign(456);
   * ```
   */
  async getLevelsForCampaign(campaignId: number): Promise<PaginatedResponse<RetagLevel>> {
    return this.http.get<PaginatedResponse<RetagLevel>>(`/retag/advcampaign/${campaignId}/levels/`);
  }

  /**
   * Get list of tags
   *
   * @example
   * ```typescript
   * const tags = await publisher.retag.list({ website: 123, active: true });
   * ```
   */
  async list(params?: RetagParams): Promise<PaginatedResponse<RetagTag>> {
    return this.http.get<PaginatedResponse<RetagTag>>('/retag/', { params });
  }

  /**
   * Create a tag
   *
   * @example
   * ```typescript
   * const tag = await publisher.retag.create({
   *   website: 123,
   *   level: 1,
   *   script: '<script>...</script>',
   * });
   * ```
   */
  async create(params: CreateRetagParams): Promise<RetagTag> {
    return this.http.post<RetagTag>('/retag/create/', params);
  }

  /**
   * Update a tag
   *
   * @example
   * ```typescript
   * const tag = await publisher.retag.update(789, { active: false });
   * ```
   */
  async update(id: number, params: UpdateRetagParams): Promise<RetagTag> {
    return this.http.post<RetagTag>(`/retag/update/${id}/`, params);
  }

  /**
   * Delete a tag
   *
   * @example
   * ```typescript
   * await publisher.retag.delete(789);
   * ```
   */
  async delete(id: number): Promise<void> {
    await this.http.post(`/retag/delete/${id}/`);
  }
}
