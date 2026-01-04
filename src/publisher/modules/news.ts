import { HttpClient } from '../../core/http-client';
import { PaginatedResponse, PaginationParams } from '../../core/types';

/**
 * Related campaign
 */
export interface NewsAdvcampaign {
  id: number;
  name: string;
}

/**
 * News item
 */
export interface NewsItem {
  id: number;
  datetime: string;
  content: string;
  short_content: string;
  url: string;
  language: string;
  advcampaign?: NewsAdvcampaign;
}

/**
 * News request parameters
 */
export interface NewsParams extends PaginationParams {
  /** News language */
  language?: string;
}

/**
 * News module
 *
 * Scope: public_data
 */
export class News {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get news list
   *
   * @example
   * ```typescript
   * const news = await publisher.news.list({ language: 'ru', limit: 10 });
   * ```
   */
  async list(params?: NewsParams): Promise<PaginatedResponse<NewsItem>> {
    return this.http.get<PaginatedResponse<NewsItem>>('/news/', { params });
  }

  /**
   * Get single news item
   *
   * @example
   * ```typescript
   * const item = await publisher.news.get(123);
   * ```
   */
  async get(id: number): Promise<NewsItem> {
    return this.http.get<NewsItem>(`/news/${id}/`);
  }
}
