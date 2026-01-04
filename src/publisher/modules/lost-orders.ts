import { HttpClient } from '../../core/http-client';
import { PaginatedResponse, PaginationParams } from '../../core/types';

/**
 * Lost order status
 */
export type LostOrderStatus = 'accepted' | 'processing' | 'rejected';

/**
 * Lost order
 */
export interface LostOrder {
  id: number;
  status: LostOrderStatus;
  order_id: string;
  order_date: string;
  order_price: number;
  currency: string;
  reward: number;
  estimated_reward: number;
  appeal_id?: number;
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
 * Lost orders request parameters
 */
export interface LostOrdersParams extends PaginationParams {
  /** Program ID */
  advcampaign?: number;
  /** Website ID */
  website?: number;
  /** Status */
  status?: LostOrderStatus;
  /** Period start */
  start_date?: string;
  /** Period end */
  end_date?: string;
  /** Appeal ID */
  appeal_id?: number;
  /** Appeal status */
  appeal_status?: string;
}

/**
 * Create lost order parameters
 */
export interface CreateLostOrderParams {
  /** Program ID */
  advcampaign: number;
  /** Website ID */
  website: number;
  /** Order number */
  order_id: string;
  /** Order date */
  order_date: string;
  /** Order amount */
  order_price: number;
  /** Comment */
  comment: string;
  /** Expected reward */
  estimated_reward: number;
  /** Receipt (base64 or URL) */
  receipt?: string;
}

/**
 * Payment status information
 */
export interface PaymentInfo {
  status: 'owner' | 'already_counted' | 'does_not_exist';
}

/**
 * Appeal
 */
export interface Appeal {
  id: number;
  status: string;
  created: string;
  comment?: string;
  lost_orders: number[];
}

/**
 * Appeals request parameters
 */
export interface AppealsParams extends PaginationParams {
  /** Appeal status */
  status?: string;
  /** Period start */
  start_date?: string;
  /** Period end */
  end_date?: string;
}

/**
 * Create appeal parameters
 */
export interface CreateAppealParams {
  /** Lost order IDs */
  lost_order_ids: number[];
  /** Comment */
  comment?: string;
}

/**
 * Lost orders module
 *
 * Scopes: lost_orders, manage_lost_orders
 */
export class LostOrders {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get list of lost orders
   *
   * @example
   * ```typescript
   * const orders = await publisher.lostOrders.list({ status: 'processing' });
   * ```
   */
  async list(params?: LostOrdersParams): Promise<PaginatedResponse<LostOrder>> {
    return this.http.get<PaginatedResponse<LostOrder>>('/lost_orders/', {
      params,
    });
  }

  /**
   * Create a lost order
   *
   * @example
   * ```typescript
   * const order = await publisher.lostOrders.create({
   *   advcampaign: 456,
   *   website: 123,
   *   order_id: 'ORDER-001',
   *   order_date: '2024-01-15',
   *   order_price: 1000,
   *   comment: 'Order not tracked',
   *   estimated_reward: 50,
   * });
   * ```
   */
  async create(params: CreateLostOrderParams): Promise<LostOrder> {
    return this.http.post<LostOrder>('/lost_orders/create/', params);
  }

  /**
   * Get order payment status information
   *
   * @example
   * ```typescript
   * const info = await publisher.lostOrders.getPaymentInfo('ORDER-001');
   * ```
   */
  async getPaymentInfo(orderId: string): Promise<PaymentInfo> {
    return this.http.get<PaymentInfo>('/lost_orders/payments_info/', {
      params: { order_id: orderId },
    });
  }

  /**
   * Get list of appeals
   *
   * @example
   * ```typescript
   * const appeals = await publisher.lostOrders.listAppeals({ status: 'pending' });
   * ```
   */
  async listAppeals(params?: AppealsParams): Promise<PaginatedResponse<Appeal>> {
    return this.http.get<PaginatedResponse<Appeal>>('/appeals/', { params });
  }

  /**
   * Create an appeal
   *
   * @example
   * ```typescript
   * const appeal = await publisher.lostOrders.createAppeal({
   *   lost_order_ids: [123, 456],
   *   comment: 'Orders were not tracked correctly',
   * });
   * ```
   */
  async createAppeal(params: CreateAppealParams): Promise<Appeal> {
    return this.http.post<Appeal>('/appeals/create/', params);
  }
}
