import { HttpClient } from '../../core/http-client';
import { PaginatedResponse, PaginationParams } from '../../core/types';

/**
 * Notification category
 */
export type NotificationCategory = 'finance' | 'system' | 'promotions' | 'other';

/**
 * Notification status
 */
export type NotificationStatus = 'read' | 'not_read';

/**
 * Notification
 */
export interface Notification {
  id: number;
  status: NotificationStatus;
  category: NotificationCategory;
  date_created: string;
  when_read: string | null;
  translate: {
    subject: string;
    text: string;
  };
}

/**
 * Notifications request parameters
 */
export interface NotificationsParams extends PaginationParams {
  /** Category */
  category?: NotificationCategory;
  /** Status */
  status?: NotificationStatus;
  /** Period start (format: dd.mm.YYYY HH:MM:SS) */
  start_date?: string;
  /** Period end */
  end_date?: string;
  /** Search by subject */
  search?: string;
}

/**
 * Notifications module
 *
 * Scope: web_notificator
 */
export class Notifications {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get notifications list
   *
   * @example
   * ```typescript
   * const notifications = await publisher.notifications.list({
   *   status: 'not_read',
   *   category: 'finance',
   * });
   * ```
   */
  async list(params?: NotificationsParams): Promise<PaginatedResponse<Notification>> {
    return this.http.get<PaginatedResponse<Notification>>('/web_notificator/v1/web_notificator/', {
      params,
    });
  }

  /**
   * Mark notification as read
   *
   * @example
   * ```typescript
   * const notification = await publisher.notifications.markAsRead(123);
   * ```
   */
  async markAsRead(id: number): Promise<Notification> {
    return this.http.post<Notification>(`/web_notificator/v1/web_notificator/${id}/mark_as_read/`);
  }

  /**
   * Mark all notifications as read
   *
   * @example
   * ```typescript
   * await publisher.notifications.markAllAsRead();
   * ```
   */
  async markAllAsRead(): Promise<void> {
    await this.http.post('/web_notificator/v1/web_notificator/mark_all_as_read/');
  }
}
