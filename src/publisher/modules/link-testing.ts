import { HttpClient } from '../../core/http-client';

/**
 * Link test result
 */
export interface LinkTestResult {
  /** Success or error message */
  message?: string;
  /** Error description */
  error_description?: string;
}

/**
 * Link testing module
 *
 * Scope: validate_links
 */
export class LinkTesting {
  constructor(private readonly http: HttpClient) {}

  /**
   * Validate an affiliate link
   *
   * @example
   * ```typescript
   * const result = await publisher.linkTesting.validate(
   *   'https://ad.admitad.com/g/abc123/'
   * );
   * if (result.message) {
   *   console.log('Link is valid');
   * }
   * ```
   */
  async validate(link: string): Promise<LinkTestResult> {
    return this.http.get<LinkTestResult>('/validate_links/', {
      params: { link },
    });
  }
}
