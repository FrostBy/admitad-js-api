import { HttpClient } from '../../core/http-client';

/**
 * Link shortening result
 */
export interface ShortLinkResult {
  /** Shortened link */
  short_link: string;
}

/**
 * Link shortener module
 *
 * Scope: short_link
 */
export class LinkShortener {
  constructor(private readonly http: HttpClient) {}

  /**
   * Shorten an affiliate link
   *
   * Only Admitad domain links (ad.admitad.com, etc.)
   *
   * @example
   * ```typescript
   * const result = await publisher.linkShortener.shorten(
   *   'https://ad.admitad.com/g/abc123/'
   * );
   * console.log(result.short_link); // https://fas.st/xyz
   * ```
   */
  async shorten(link: string): Promise<ShortLinkResult> {
    return this.http.post<ShortLinkResult>(
      '/shortlink/modify/',
      new URLSearchParams({ link }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }
}
