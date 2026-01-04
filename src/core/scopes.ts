/**
 * Admitad API access scopes
 */
export const SCOPES = {
  /** Public info: website types, languages, categories, regions, currencies */
  PUBLIC_DATA: 'public_data',

  /** Read user websites list */
  WEBSITES: 'websites',

  /** Create, edit, verify and delete websites */
  MANAGE_WEBSITES: 'manage_websites',

  /** Access to affiliate programs list */
  ADVCAMPAIGNS: 'advcampaigns',

  /** View programs for specific website */
  ADVCAMPAIGNS_FOR_WEBSITE: 'advcampaigns_for_website',

  /** Connect and disconnect affiliate programs */
  MANAGE_ADVCAMPAIGNS: 'manage_advcampaigns',

  /** View banners */
  BANNERS: 'banners',

  /** Banners for specific website */
  BANNERS_FOR_WEBSITE: 'banners_for_website',

  /** Access to landings */
  LANDINGS: 'landings',

  /** Announcements list */
  ANNOUNCEMENTS: 'announcements',

  /** Referrals info */
  REFERRALS: 'referrals',

  /** All coupons list */
  COUPONS: 'coupons',

  /** Coupons for specific website */
  COUPONS_FOR_WEBSITE: 'coupons_for_website',

  /** Profile data (name, language) */
  PRIVATE_DATA: 'private_data',

  /** Profile + email */
  PRIVATE_DATA_EMAIL: 'private_data_email',

  /** Profile + phone */
  PRIVATE_DATA_PHONE: 'private_data_phone',

  /** Balance info */
  PRIVATE_DATA_BALANCE: 'private_data_balance',

  /** Link testing */
  VALIDATE_LINKS: 'validate_links',

  /** Deeplink generator */
  DEEPLINK_GENERATOR: 'deeplink_generator',

  /** Statistics and reports */
  STATISTICS: 'statistics',

  /** View optimization codes (postback) */
  OPT_CODES: 'opt_codes',

  /** Create and edit postbacks */
  MANAGE_OPT_CODES: 'manage_opt_codes',

  /** View retag tags */
  WEBMASTER_RETAG: 'webmaster_retag',

  /** Manage retag tags */
  MANAGE_WEBMASTER_RETAG: 'manage_webmaster_retag',

  /** Broken links list */
  BROKEN_LINKS: 'broken_links',

  /** Resolve broken links issues */
  MANAGE_BROKEN_LINKS: 'manage_broken_links',

  /** View lost orders */
  LOST_ORDERS: 'lost_orders',

  /** Create lost orders */
  MANAGE_LOST_ORDERS: 'manage_lost_orders',

  /** Broker applications list */
  BROKER_APPLICATION: 'broker_application',

  /** Create broker applications */
  MANAGE_BROKER_APPLICATION: 'manage_broker_application',

  /** AliExpress products commission calculation */
  ALIEXPRESS_COMMISSION: 'aliexpress_commission',

  /** Active and scheduled vendor bonuses */
  VENDOR_TOOL: 'vendor_tool',

  /** Link shortening */
  SHORT_LINK: 'short_link',

  /** Notifications list */
  WEB_NOTIFICATOR: 'web_notificator',
} as const;

export type Scope = (typeof SCOPES)[keyof typeof SCOPES];

/**
 * Build scope string from array
 *
 * @example
 * ```typescript
 * const scope = buildScopeString([SCOPES.STATISTICS, SCOPES.ADVCAMPAIGNS]);
 * // 'statistics advcampaigns'
 * ```
 */
export function buildScopeString(scopes: Scope[]): string {
  return scopes.join(' ');
}

/**
 * All scopes for full access
 */
export const ALL_SCOPES = Object.values(SCOPES);

/**
 * String with all scopes
 */
export const ALL_SCOPES_STRING = buildScopeString(ALL_SCOPES);
