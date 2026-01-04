import { HttpClient } from '../../core/http-client';
import { PaginatedResponse, PaginationParams } from '../../core/types';

/**
 * Related campaign
 */
export interface AnnouncementAdvcampaign {
  id: number;
  name: string;
}

/**
 * Announcement
 */
export interface Announcement {
  id: number;
  message: string;
  event: string;
  advcampaign?: AnnouncementAdvcampaign;
}

/**
 * Announcements request parameters
 */
export interface AnnouncementsParams extends PaginationParams {
  /** Message language */
  language?: string;
}

/**
 * Announcements module
 *
 * Scope: announcements
 */
export class Announcements {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get announcements list
   *
   * @example
   * ```typescript
   * const announcements = await publisher.announcements.list({ limit: 10 });
   * ```
   */
  async list(params?: AnnouncementsParams): Promise<PaginatedResponse<Announcement>> {
    return this.http.get<PaginatedResponse<Announcement>>('/announcements/', {
      params,
    });
  }

  /**
   * Get single announcement
   *
   * @example
   * ```typescript
   * const item = await publisher.announcements.get(123);
   * ```
   */
  async get(id: number): Promise<Announcement> {
    return this.http.get<Announcement>(`/announcements/${id}/`);
  }
}
