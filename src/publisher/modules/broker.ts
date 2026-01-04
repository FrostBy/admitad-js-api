import { HttpClient } from '../../core/http-client';
import { PaginatedResponse, PaginationParams } from '../../core/types';

/**
 * Broker application status
 */
export type BrokerApplicationStatus =
  | 'processing'
  | 'approved'
  | 'declined'
  | 'waiting'
  | 'error'
  | 'waiting_sms_verification';

/**
 * Broker application
 */
export interface BrokerApplication {
  id: number;
  status: BrokerApplicationStatus;
  campaign: {
    id: number;
    name: string;
  };
  first_name: string;
  last_name: string;
  mobile_phone: string;
  email: string;
  work_date: string;
  created: string;
}

/**
 * Applications request parameters
 */
export interface BrokerApplicationsParams extends PaginationParams {
  /** Status */
  status?: BrokerApplicationStatus;
  /** Program ID */
  campaign?: number;
  /** Period start */
  date_start?: string;
  /** Period end */
  date_end?: string;
  /** SubID */
  subid?: string;
}

/**
 * Application creation parameters
 */
export interface CreateBrokerApplicationParams {
  /** Program ID */
  campaign_id: number;
  /** First name */
  first_name: string;
  /** Last name */
  last_name: string;
  /** Phone */
  mobile_phone: string;
  /** Email */
  email: string;
  /** Work date */
  work_date: string;
  /** User consent (1 = yes, 0 = no) */
  user_notified: 0 | 1;
  /** Additional fields */
  [key: string]: unknown;
}

/**
 * Campaign settings for broker
 */
export interface BrokerCampaignSettings {
  campaign_id: number;
  required_fields: string[];
  field_validations: Record<string, string>;
}

/**
 * Broker applications module
 *
 * Scopes: broker_application, manage_broker_application
 */
export class Broker {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get list of applications
   *
   * @example
   * ```typescript
   * const apps = await publisher.broker.list(123, { status: 'approved' });
   * ```
   */
  async list(
    websiteId: number,
    params?: BrokerApplicationsParams,
  ): Promise<PaginatedResponse<BrokerApplication>> {
    return this.http.get<PaginatedResponse<BrokerApplication>>(
      `/website/${websiteId}/broker/applications/`,
      { params },
    );
  }

  /**
   * Create application
   *
   * @example
   * ```typescript
   * const app = await publisher.broker.create(123, {
   *   campaign_id: 456,
   *   first_name: 'Ivan',
   *   last_name: 'Ivanov',
   *   mobile_phone: '+79001234567',
   *   email: 'ivan@example.com',
   *   work_date: '2024-01-15',
   *   user_notified: 1,
   * });
   * ```
   */
  async create(
    websiteId: number,
    params: CreateBrokerApplicationParams,
  ): Promise<BrokerApplication> {
    return this.http.post<BrokerApplication>(
      `/website/${websiteId}/broker/applications/create/`,
      params,
    );
  }

  /**
   * Create application with SMS confirmation
   *
   * @example
   * ```typescript
   * const app = await publisher.broker.createWithSms(123, params);
   * // Status will be waiting_sms_verification
   * ```
   */
  async createWithSms(
    websiteId: number,
    params: CreateBrokerApplicationParams,
  ): Promise<BrokerApplication> {
    return this.http.post<BrokerApplication>(
      `/website/${websiteId}/broker/applications/sync_create/`,
      params,
    );
  }

  /**
   * Confirm application with SMS code
   *
   * @example
   * ```typescript
   * const app = await publisher.broker.confirmSms(123, 789, '1234');
   * ```
   */
  async confirmSms(
    websiteId: number,
    applicationId: number,
    code: string,
  ): Promise<BrokerApplication> {
    return this.http.post<BrokerApplication>(
      `/website/${websiteId}/broker/applications/sync_create/${applicationId}/confirm`,
      { code },
    );
  }

  /**
   * Get campaign settings for broker
   *
   * @example
   * ```typescript
   * const settings = await publisher.broker.getCampaignSettings(456);
   * ```
   */
  async getCampaignSettings(campaignId: number): Promise<BrokerCampaignSettings> {
    return this.http.get<BrokerCampaignSettings>(`/broker/campaign_settings/${campaignId}/`);
  }
}
