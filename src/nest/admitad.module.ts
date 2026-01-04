import {
  DynamicModule,
  InjectionToken,
  Module,
  OptionalFactoryDependency,
  Provider,
  Type,
} from '@nestjs/common';
import { Publisher } from '../publisher';
import { AdmitadConfig } from '../core/types';

export const ADMITAD_CONFIG = 'ADMITAD_CONFIG';

/**
 * Options for async configuration
 */
export interface AdmitadModuleAsyncOptions {
  /**
   * Module imports
   */
  imports?: Type<unknown>[];
  /**
   * Factory for creating config
   */
  useFactory: (...args: unknown[]) => AdmitadConfig | Promise<AdmitadConfig>;
  /**
   * Dependencies for injection into factory
   */
  inject?: (InjectionToken | OptionalFactoryDependency)[];
}

/**
 * NestJS module for Admitad API
 *
 * @example
 * ```typescript
 * // Synchronous configuration
 * @Module({
 *   imports: [
 *     AdmitadModule.forRoot({
 *       clientId: 'xxx',
 *       clientSecret: 'xxx',
 *       accessToken: 'xxx',
 *     }),
 *   ],
 * })
 * export class AppModule {}
 *
 * // Async configuration
 * @Module({
 *   imports: [
 *     AdmitadModule.forRootAsync({
 *       imports: [ConfigModule],
 *       useFactory: (config: ConfigService) => ({
 *         clientId: config.get('ADMITAD_CLIENT_ID'),
 *         clientSecret: config.get('ADMITAD_CLIENT_SECRET'),
 *         accessToken: config.get('ADMITAD_ACCESS_TOKEN'),
 *       }),
 *       inject: [ConfigService],
 *     }),
 *   ],
 * })
 * export class AppModule {}
 *
 * // Usage
 * @Injectable()
 * export class MyService {
 *   constructor(private readonly publisher: Publisher) {}
 *
 *   async getPrograms() {
 *     return this.publisher.programs.list();
 *   }
 * }
 * ```
 */
@Module({})
export class AdmitadModule {
  /**
   * Synchronous module configuration
   */
  static forRoot(config: AdmitadConfig): DynamicModule {
    const publisherProvider: Provider = {
      provide: Publisher,
      useFactory: () => new Publisher(config),
    };

    return {
      module: AdmitadModule,
      providers: [publisherProvider],
      exports: [Publisher],
      global: true,
    };
  }

  /**
   * Async module configuration
   */
  static forRootAsync(options: AdmitadModuleAsyncOptions): DynamicModule {
    const publisherProvider: Provider = {
      provide: Publisher,
      useFactory: async (...args: unknown[]) => {
        const config = await options.useFactory(...args);
        return new Publisher(config);
      },
      inject: options.inject || [],
    };

    return {
      module: AdmitadModule,
      imports: options.imports || [],
      providers: [publisherProvider],
      exports: [Publisher],
      global: true,
    };
  }
}
