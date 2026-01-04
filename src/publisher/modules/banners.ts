import { HttpClient } from '../../core/http-client';
import { ValidationError } from '../../core/errors';
import { PaginatedResponse, PaginationParams } from '../../core/types';
import { Diff, DiffField, diffById } from '../../core/utils';

/**
 * Banner
 */
export interface Banner {
  id: number;
  name: string;
  size_width: number;
  size_height: number;
  creation_date: string;
  type: string;
  banner_image_url: string;
  banner_flashobj_url?: string;
  is_flash: boolean;
  mobile_content: boolean;
  /** Only for banners_for_website */
  direct_link?: string;
  /** Only for banners_for_website */
  html_code?: string;
}

/**
 * Banners request parameters
 */
export interface BannersParams extends PaginationParams {
  /** Landing ID */
  landing?: number;
  /** Mobile content */
  mobile_content?: boolean;
  /** URI scheme: http, https, no */
  uri_scheme?: 'http' | 'https' | 'no';
}

/**
 * Size filter
 */
export interface SizeFilter {
  /** Exact value */
  exact?: number;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
}

/**
 * Banner size filter parameters
 */
export interface BannerSizeFilter {
  /** Width filter */
  width?: number | SizeFilter;
  /** Height filter */
  height?: number | SizeFilter;
}

/**
 * Banners module
 *
 * Scopes: banners, banners_for_website
 */
export class Banners {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get program banners
   *
   * @example
   * ```typescript
   * const banners = await publisher.banners.list(456);
   * ```
   */
  async list(campaignId: number, params?: BannersParams): Promise<PaginatedResponse<Banner>> {
    return this.http.get<PaginatedResponse<Banner>>(`/banners/${campaignId}/`, { params });
  }

  /**
   * Get program banners for website (with affiliate links)
   *
   * @example
   * ```typescript
   * const banners = await publisher.banners.listForWebsite(456, 123);
   * banners.results.forEach(b => console.log(b.direct_link));
   * ```
   */
  async listForWebsite(
    campaignId: number,
    websiteId: number,
    params?: BannersParams,
  ): Promise<PaginatedResponse<Banner>> {
    return this.http.get<PaginatedResponse<Banner>>(
      `/banners/${campaignId}/website/${websiteId}/`,
      { params },
    );
  }

  /**
   * Filters banners by size
   *
   * @example
   * ```typescript
   * // Exact size
   * publisher.banners.filterBySize(banners, { width: 300, height: 250 });
   *
   * // Maximum sizes (fit into container)
   * publisher.banners.filterBySize(banners, {
   *   width: { max: 400 },
   *   height: { max: 300 },
   * });
   *
   * // Range
   * publisher.banners.filterBySize(banners, {
   *   width: { min: 200, max: 400 },
   *   height: { min: 100, max: 300 },
   * });
   * ```
   */
  filterBySize<T extends Pick<Banner, 'size_width' | 'size_height'>>(
    banners: T[],
    filter: BannerSizeFilter,
  ): T[] {
    const widthFilter = this.normalizeSizeFilter(filter.width);
    const heightFilter = this.normalizeSizeFilter(filter.height);

    return banners.filter((banner) => {
      if (widthFilter && !this.matchesSize(banner.size_width, widthFilter)) return false;
      if (heightFilter && !this.matchesSize(banner.size_height, heightFilter)) return false;
      return true;
    });
  }

  /**
   * Filters banners that fit into container
   *
   * @example
   * ```typescript
   * publisher.banners.fitContainer(banners, 400, 300);
   * ```
   */
  fitContainer<T extends Pick<Banner, 'size_width' | 'size_height'>>(
    banners: T[],
    maxWidth: number,
    maxHeight: number,
  ): T[] {
    return this.filterBySize(banners, {
      width: { max: maxWidth },
      height: { max: maxHeight },
    });
  }

  /**
   * Groups banners by size
   *
   * @example
   * ```typescript
   * const grouped = publisher.banners.groupBySize(banners);
   * // { '300x250': [...], '728x90': [...] }
   * ```
   */
  groupBySize<T extends Pick<Banner, 'size_width' | 'size_height'>>(
    banners: T[],
  ): Record<string, T[]> {
    return banners.reduce(
      (acc, banner) => {
        const key = `${banner.size_width}x${banner.size_height}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(banner);
        return acc;
      },
      {} as Record<string, T[]>,
    );
  }

  /**
   * Returns unique banner sizes
   *
   * @example
   * ```typescript
   * const sizes = publisher.banners.getUniqueSizes(banners);
   * // [{ width: 300, height: 250 }, { width: 728, height: 90 }]
   * ```
   */
  getUniqueSizes<T extends Pick<Banner, 'size_width' | 'size_height'>>(
    banners: T[],
  ): Array<{ width: number; height: number }> {
    const seen = new Set<string>();
    const result: Array<{ width: number; height: number }> = [];

    for (const banner of banners) {
      const key = `${banner.size_width}x${banner.size_height}`;
      if (!seen.has(key)) {
        seen.add(key);
        result.push({ width: banner.size_width, height: banner.size_height });
      }
    }

    return result;
  }

  /**
   * Compares two banner lists and returns differences
   *
   * @example
   * ```typescript
   * const previous = await publisher.banners.list(456);
   * // ... after some time ...
   * const current = await publisher.banners.list(456);
   *
   * const diff = publisher.banners.diff(previous.results, current.results);
   * console.log('Added:', diff.added.length);
   * console.log('Removed:', diff.removed.length);
   * console.log('Changed:', diff.changed.length);
   * ```
   */
  diff<T extends Banner>(previous: T[], current: T[], fields?: DiffField[]): Diff<T> {
    return diffById(previous, current, fields);
  }

  /**
   * Generates banner HTML with link to specified landing
   *
   * @example
   * ```typescript
   * const banners = await publisher.banners.listForWebsite(456, 123);
   * const landings = await publisher.landings.listForWebsite(456, 123);
   *
   * const html = publisher.banners.setLanding(banners.results[0], landings.results[0]);
   * ```
   */
  setLanding(banner: Pick<Banner, 'html_code'>, landing: { gotolink?: string }): string {
    if (!banner.html_code) {
      throw new ValidationError(
        'Banner has no html_code. Use listForWebsite() to get banners with html_code.',
        'html_code',
      );
    }
    if (!landing.gotolink) {
      throw new ValidationError(
        'Landing has no gotolink. Use listForWebsite() to get landings with gotolink.',
        'gotolink',
      );
    }
    return banner.html_code.replace(/href="[^"]+"/, `href="${landing.gotolink}"`);
  }

  private normalizeSizeFilter(filter: number | SizeFilter | undefined): SizeFilter | undefined {
    if (typeof filter === 'number') return { exact: filter };
    return filter;
  }

  private matchesSize(value: number, filter: SizeFilter): boolean {
    if (typeof filter.exact === 'number' && value !== filter.exact) return false;
    if (typeof filter.min === 'number' && value < filter.min) return false;
    if (typeof filter.max === 'number' && value > filter.max) return false;

    return true;
  }
}
