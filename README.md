# admitad-js-api

[![npm version](https://img.shields.io/npm/v/admitad-js-api)](https://www.npmjs.com/package/admitad-js-api)
[![GitHub release](https://img.shields.io/github/v/release/FrostBy/admitad-js-api)](https://github.com/FrostBy/admitad-js-api/releases/latest)

[🇷🇺 Русский](README.ru.md) | **English**

Modern Admitad API client for Node.js with TypeScript support.

## Features

- **Full API coverage** — Publisher API (programs, statistics, banners, coupons, deeplinks, etc.)
- **TypeScript** — Complete type definitions for all endpoints
- **OAuth 2.0** — Authorization Code, Client Credentials, token refresh
- **NestJS integration** — Optional module with `forRoot`/`forRootAsync`
- **Helpers** — Diff tracking, category trees, banner filters, and more

## Installation

```bash
npm install admitad-js-api
# or
pnpm add admitad-js-api
# or
yarn add admitad-js-api
```

## Quick Start

```typescript
import { Publisher } from 'admitad-js-api';

const publisher = new Publisher({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  accessToken: 'your-access-token',
  // or use refreshToken for auto-refresh
});

// Get programs
const programs = await publisher.programs.list({ limit: 10 });

// Get statistics
const stats = await publisher.statistics.byDates({
  date_start: '01.01.2024',
  date_end: '31.01.2024',
});

// Generate deeplink
const link = await publisher.deeplinks.generate({
  websiteId: 123,
  campaignId: 456,
  url: 'https://shop.com/product/1',
});
```

## OAuth Authorization

### Client Credentials (server-to-server)

```typescript
import { Auth } from 'admitad-js-api';

const auth = new Auth({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
});

const tokens = await auth.getClientCredentialsToken(['advcampaigns', 'statistics']);
```

### Authorization Code (user authorization)

```typescript
// 1. Get authorization URL
const authUrl = auth.getAuthorizationUrl({
  redirectUri: 'https://yoursite.com/callback',
  scope: ['advcampaigns', 'statistics'],
});

// 2. After redirect, exchange code for tokens
const tokens = await auth.getTokenByCode(code, 'https://yoursite.com/callback');

// 3. Refresh token when needed
const newTokens = await auth.refreshToken(tokens.refresh_token);
```

## NestJS Integration

```typescript
import { Module } from '@nestjs/common';
import { AdmitadModule } from 'admitad-js-api/nest';

@Module({
  imports: [
    AdmitadModule.forRoot({
      clientId: 'your-client-id',
      clientSecret: 'your-client-secret',
      accessToken: 'your-access-token',
    }),
  ],
})
export class AppModule {}

// Inject in services
@Injectable()
export class MyService {
  constructor(private publisher: Publisher) {}

  async getPrograms() {
    return this.publisher.programs.list();
  }
}
```

### Async configuration

```typescript
AdmitadModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => ({
    clientId: config.get('ADMITAD_CLIENT_ID'),
    clientSecret: config.get('ADMITAD_CLIENT_SECRET'),
    accessToken: config.get('ADMITAD_ACCESS_TOKEN'),
  }),
  inject: [ConfigService],
});
```

## API Reference

### Publisher Modules

| Module | Description | Scope |
|--------|-------------|-------|
| `programs` | Affiliate programs | `advcampaigns` |
| `statistics` | Statistics & reports | `statistics` |
| `banners` | Banners | `banners` |
| `coupons` | Coupons & promocodes | `coupons` |
| `deeplinks` | Deeplink generator | `deeplink_generator` |
| `landings` | Landing pages | `landings` |
| `websites` | Publisher websites | `websites` |
| `user` | User profile & balance | `private_data` |
| `notifications` | Notifications | `web_notificator` |
| `news` | News | `public_data` |
| `auxiliary` | Categories, regions, currencies | `public_data` |
| `lostOrders` | Lost orders & appeals | `lost_orders` |
| `brokenLinks` | Broken links | `broken_links` |
| `linkTesting` | Link validation | `validate_links` |
| `linkShortener` | URL shortener | `short_link` |
| `optimization` | Postback codes | `opt_codes` |
| `referrals` | Referrals | `referrals` |
| `retag` | Retag scripts | `webmaster_retag` |
| `broker` | Broker requests | `broker_application` |
| `aliexpress` | AliExpress tools | `aliexpress` |

### Helpers

```typescript
// Track changes between API calls
const diff = publisher.banners.diff(previousBanners, currentBanners);
console.log(diff.added, diff.removed, diff.changed);

// Filter banners by size
const filtered = publisher.banners.filterBySize(banners, {
  width: { max: 300 },
  height: { max: 250 },
});

// Build category tree
const tree = publisher.auxiliary.buildCategoryTree(categories);

// Set landing for banner
const html = publisher.banners.setLanding(banner, landing);
```

## Requirements

- Node.js >= 18
- TypeScript >= 5.0 (optional)

## License

MIT
