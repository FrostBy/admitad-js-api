import { HttpClient } from '../../core/http-client';
import { PaginatedResponse, PaginationParams } from '../../core/types';

/**
 * Website type
 */
export interface WebsiteKind {
  id: number;
  name: string;
}

/**
 * Region
 */
export interface Region {
  region: string;
  name: string;
}

/**
 * Program category
 */
export interface Category {
  id: number;
  name: string;
  parent?: Category;
  language: string;
}

/**
 * Category tree node
 */
export interface CategoryTreeNode {
  id: number;
  name: string;
  language: string;
  children: CategoryTreeNode[];
}

/**
 * System language
 */
export interface SystemLanguage {
  language: string;
  name: string;
  flag: string;
}

/**
 * Currency
 */
export interface Currency {
  code: string;
  name: string;
  sign: string;
  min_payment: number;
}

/**
 * Currency rate
 */
export interface CurrencyRate {
  base: string;
  target: string;
  rate: number;
  date: string;
}

/**
 * Currency rate request parameters
 */
export interface CurrencyRateParams {
  /** Base currency */
  base: string;
  /** Target currency */
  target: string;
  /** Date (format: dd.mm.YYYY) */
  date?: string;
}

/**
 * Traffic source
 */
export interface TrafficSource {
  id: number;
  name: string;
}

/**
 * Categories request parameters
 */
export interface CategoriesParams extends PaginationParams {
  /** Categories language */
  language?: string;
  /** Sorting */
  order_by?: string;
}

/**
 * Auxiliary information module
 *
 * Scope: public_data
 */
export class Auxiliary {
  constructor(private readonly http: HttpClient) {}

  /**
   * Get website types
   *
   * @example
   * ```typescript
   * const kinds = await publisher.auxiliary.getWebsiteKinds();
   * ```
   */
  async getWebsiteKinds(): Promise<PaginatedResponse<WebsiteKind>> {
    return this.http.get<PaginatedResponse<WebsiteKind>>('/websites/kinds/');
  }

  /**
   * Get list of regions
   *
   * @example
   * ```typescript
   * const regions = await publisher.auxiliary.getRegions();
   * ```
   */
  async getRegions(): Promise<PaginatedResponse<Region>> {
    return this.http.get<PaginatedResponse<Region>>('/websites/regions/');
  }

  /**
   * Get program categories
   *
   * @example
   * ```typescript
   * const categories = await publisher.auxiliary.getCategories({ language: 'ru' });
   * ```
   */
  async getCategories(params?: CategoriesParams): Promise<PaginatedResponse<Category>> {
    return this.http.get<PaginatedResponse<Category>>('/categories/', {
      params,
    });
  }

  /**
   * Get system languages
   *
   * @example
   * ```typescript
   * const languages = await publisher.auxiliary.getLanguages();
   * ```
   */
  async getLanguages(): Promise<PaginatedResponse<SystemLanguage>> {
    return this.http.get<PaginatedResponse<SystemLanguage>>('/languages/');
  }

  /**
   * Get list of currencies
   *
   * @example
   * ```typescript
   * const currencies = await publisher.auxiliary.getCurrencies();
   * ```
   */
  async getCurrencies(): Promise<PaginatedResponse<Currency>> {
    return this.http.get<PaginatedResponse<Currency>>('/currencies/');
  }

  /**
   * Get currency rate
   *
   * @example
   * ```typescript
   * const rate = await publisher.auxiliary.getCurrencyRate({
   *   base: 'USD',
   *   target: 'RUB',
   * });
   * ```
   */
  async getCurrencyRate(params: CurrencyRateParams): Promise<CurrencyRate> {
    return this.http.get<CurrencyRate>('/currencies/rate/', { params });
  }

  /**
   * Get traffic sources
   *
   * @example
   * ```typescript
   * const traffic = await publisher.auxiliary.getTrafficSources();
   * ```
   */
  async getTrafficSources(): Promise<PaginatedResponse<TrafficSource>> {
    return this.http.get<PaginatedResponse<TrafficSource>>('/traffic/');
  }

  /**
   * Build category tree from flat list
   *
   * @example
   * ```typescript
   * const categories = await publisher.auxiliary.getCategories({ language: 'ru' });
   * const tree = publisher.auxiliary.buildCategoryTree(categories.results);
   * // [{ id: 1, name: 'Clothing', children: [{ id: 2, name: 'Men', children: [] }] }]
   * ```
   */
  buildCategoryTree(categories: Category[]): CategoryTreeNode[] {
    const nodeMap = new Map<number, CategoryTreeNode>();
    const roots: CategoryTreeNode[] = [];

    for (const cat of categories) {
      nodeMap.set(cat.id, {
        id: cat.id,
        name: cat.name,
        language: cat.language,
        children: [],
      });
    }

    for (const cat of categories) {
      const node = nodeMap.get(cat.id)!;
      if (cat.parent) {
        const parentNode = nodeMap.get(cat.parent.id);
        if (parentNode) {
          parentNode.children.push(node);
        } else {
          roots.push(node);
        }
      } else {
        roots.push(node);
      }
    }

    return roots;
  }
}
