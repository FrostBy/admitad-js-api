import { HttpClient } from '../core/http-client';
import { AdmitadConfig } from '../core/types';
import { User } from './modules/user';
import { Auxiliary } from './modules/auxiliary';
import { Deeplinks } from './modules/deeplinks';
import { LinkShortener } from './modules/link-shortener';
import { LinkTesting } from './modules/link-testing';
import { Referrals } from './modules/referrals';
import { News } from './modules/news';
import { Announcements } from './modules/announcements';
import { Notifications } from './modules/notifications';
import { Websites } from './modules/websites';
import { Banners } from './modules/banners';
import { Landings } from './modules/landings';
import { Coupons } from './modules/coupons';
import { BrokenLinks } from './modules/broken-links';
import { LostOrders } from './modules/lost-orders';
import { Aliexpress } from './modules/aliexpress';
import { Retag } from './modules/retag';
import { Optimization } from './modules/optimization';
import { Broker } from './modules/broker';
import { Subnetworks } from './modules/subnetworks';
import { Programs } from './modules/programs';
import { Statistics } from './modules/statistics';

/**
 * Admitad Publisher (webmaster) client
 *
 * @example
 * ```typescript
 * const publisher = new Publisher({
 *   clientId: 'your-client-id',
 *   clientSecret: 'your-client-secret',
 *   accessToken: 'your-access-token',
 * });
 *
 * const profile = await publisher.user.getProfile();
 * const programs = await publisher.programs.list({ limit: 10 });
 * ```
 */
export class Publisher {
  private readonly http: HttpClient;

  /** User info */
  readonly user: User;
  /** Auxiliary info */
  readonly auxiliary: Auxiliary;
  /** Deeplink generator */
  readonly deeplinks: Deeplinks;
  /** Link shortener */
  readonly linkShortener: LinkShortener;
  /** Link testing */
  readonly linkTesting: LinkTesting;
  /** Referrals */
  readonly referrals: Referrals;
  /** News */
  readonly news: News;
  /** Announcements */
  readonly announcements: Announcements;
  /** Notifications */
  readonly notifications: Notifications;
  /** Websites */
  readonly websites: Websites;
  /** Banners */
  readonly banners: Banners;
  /** Landings */
  readonly landings: Landings;
  /** Coupons */
  readonly coupons: Coupons;
  /** Broken links */
  readonly brokenLinks: BrokenLinks;
  /** Lost orders */
  readonly lostOrders: LostOrders;
  /** AliExpress */
  readonly aliexpress: Aliexpress;
  /** Retag */
  readonly retag: Retag;
  /** Optimization codes (postback) */
  readonly optimization: Optimization;
  /** Broker applications */
  readonly broker: Broker;
  /** Partner networks */
  readonly subnetworks: Subnetworks;
  /** Affiliate programs */
  readonly programs: Programs;
  /** Statistics */
  readonly statistics: Statistics;

  constructor(config: AdmitadConfig) {
    this.http = new HttpClient(config);

    this.user = new User(this.http);
    this.auxiliary = new Auxiliary(this.http);
    this.deeplinks = new Deeplinks(this.http);
    this.linkShortener = new LinkShortener(this.http);
    this.linkTesting = new LinkTesting(this.http);
    this.referrals = new Referrals(this.http);
    this.news = new News(this.http);
    this.announcements = new Announcements(this.http);
    this.notifications = new Notifications(this.http);
    this.websites = new Websites(this.http);
    this.banners = new Banners(this.http);
    this.landings = new Landings(this.http);
    this.coupons = new Coupons(this.http);
    this.brokenLinks = new BrokenLinks(this.http);
    this.lostOrders = new LostOrders(this.http);
    this.aliexpress = new Aliexpress(this.http);
    this.retag = new Retag(this.http);
    this.optimization = new Optimization(this.http);
    this.broker = new Broker(this.http);
    this.subnetworks = new Subnetworks(this.http);
    this.programs = new Programs(this.http);
    this.statistics = new Statistics(this.http);
  }

  /**
   * Set access token
   */
  setAccessToken(token: string): void {
    this.http.setAccessToken(token);
  }

  /**
   * Cancel all pending requests and cleanup
   */
  destroy(): void {
    this.http.destroy();
  }
}
