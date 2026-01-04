import { HttpClient } from '../../core/http-client';

/**
 * User profile
 */
export interface UserProfile {
  id: number;
  username: string;
  first_name: string;
  last_name?: string;
  language: string;
  default_currency: string;
  country: string;
  /** Requires scope: private_data_email */
  email?: string;
  /** Requires scope: private_data_phone */
  phone?: string;
}

/**
 * Balance by currency
 */
export interface CurrencyBalance {
  currency: string;
  balance: number;
}

/**
 * Extended balance by currency
 */
export interface ExtendedCurrencyBalance extends CurrencyBalance {
  /** Funds in processing */
  processing: number;
  /** Earnings for today */
  today: number;
  /** Frozen funds */
  stalled: number;
}

/**
 * Payment settings
 */
export interface PaymentSettings {
  id: number;
  payment_system: string;
  account: string;
  currency: string;
  is_default: boolean;
  conversion_rate?: number;
}

/**
 * User information module
 *
 * Scopes: private_data, private_data_email, private_data_phone, private_data_balance
 */
export class User {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get user profile
   *
   * @example
   * ```typescript
   * const profile = await publisher.user.getProfile();
   * console.log(profile.username);
   * ```
   */
  async getProfile(): Promise<UserProfile> {
    return this.http.get<UserProfile>('/me/');
  }

  /**
   * Get balance by currencies
   *
   * @example
   * ```typescript
   * const balances = await publisher.user.getBalance();
   * ```
   */
  async getBalance(): Promise<CurrencyBalance[]> {
    return this.http.get<CurrencyBalance[]>('/me/balance/');
  }

  /**
   * Get extended balance by currencies
   *
   * @example
   * ```typescript
   * const balances = await publisher.user.getBalanceExtended();
   * balances.forEach(b => console.log(b.currency, b.balance, b.processing));
   * ```
   */
  async getBalanceExtended(): Promise<ExtendedCurrencyBalance[]> {
    return this.http.get<ExtendedCurrencyBalance[]>('/me/balance/extended/');
  }

  /**
   * Get payment settings
   *
   * @example
   * ```typescript
   * const settings = await publisher.user.getPaymentSettings();
   * ```
   */
  async getPaymentSettings(): Promise<PaymentSettings[]> {
    return this.http.get<PaymentSettings[]>('/me/payment/settings/');
  }
}
