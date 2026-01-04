# admitad-js-api

[![npm version](https://img.shields.io/npm/v/admitad-js-api)](https://www.npmjs.com/package/admitad-js-api)
[![GitHub release](https://img.shields.io/github/v/release/FrostBy/admitad-js-api)](https://github.com/FrostBy/admitad-js-api/releases/latest)

**Русский** | [English](README.md)

Современный клиент Admitad API для Node.js с поддержкой TypeScript.

## Возможности

- **Полное покрытие API** — Publisher API (программы, статистика, баннеры, купоны, deeplinks и др.)
- **TypeScript** — Полные типы для всех эндпоинтов
- **OAuth 2.0** — Authorization Code, Client Credentials, обновление токенов
- **Интеграция с NestJS** — Опциональный модуль с `forRoot`/`forRootAsync`
- **Хелперы** — Отслеживание изменений, деревья категорий, фильтры баннеров и др.

## Установка

```bash
npm install admitad-js-api
# или
pnpm add admitad-js-api
# или
yarn add admitad-js-api
```

## Быстрый старт

```typescript
import { Publisher } from 'admitad-js-api';

const publisher = new Publisher({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  accessToken: 'your-access-token',
  // или используйте refreshToken для автообновления
});

// Получить программы
const programs = await publisher.programs.list({ limit: 10 });

// Получить статистику
const stats = await publisher.statistics.byDates({
  date_start: '01.01.2024',
  date_end: '31.01.2024',
});

// Сгенерировать deeplink
const link = await publisher.deeplinks.generate({
  websiteId: 123,
  campaignId: 456,
  url: 'https://shop.com/product/1',
});
```

## OAuth авторизация

### Client Credentials (сервер-сервер)

```typescript
import { Auth } from 'admitad-js-api';

const auth = new Auth({
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
});

const tokens = await auth.getClientCredentialsToken(['advcampaigns', 'statistics']);
```

### Authorization Code (авторизация пользователя)

```typescript
// 1. Получить URL авторизации
const authUrl = auth.getAuthorizationUrl({
  redirectUri: 'https://yoursite.com/callback',
  scope: ['advcampaigns', 'statistics'],
});

// 2. После редиректа обменять код на токены
const tokens = await auth.getTokenByCode(code, 'https://yoursite.com/callback');

// 3. Обновить токен при необходимости
const newTokens = await auth.refreshToken(tokens.refresh_token);
```

## Интеграция с NestJS

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

// Инжектим в сервисы
@Injectable()
export class MyService {
  constructor(private publisher: Publisher) {}

  async getPrograms() {
    return this.publisher.programs.list();
  }
}
```

### Асинхронная конфигурация

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

## Справочник API

### Модули Publisher

| Модуль | Описание | Scope |
|--------|----------|-------|
| `programs` | Партнёрские программы | `advcampaigns` |
| `statistics` | Статистика и отчёты | `statistics` |
| `banners` | Баннеры | `banners` |
| `coupons` | Купоны и промокоды | `coupons` |
| `deeplinks` | Генератор deeplink | `deeplink_generator` |
| `landings` | Лендинги | `landings` |
| `websites` | Площадки веб-мастера | `websites` |
| `user` | Профиль и баланс | `private_data` |
| `notifications` | Уведомления | `web_notificator` |
| `news` | Новости | `public_data` |
| `auxiliary` | Категории, регионы, валюты | `public_data` |
| `lostOrders` | Потерянные заказы и апелляции | `lost_orders` |
| `brokenLinks` | Битые ссылки | `broken_links` |
| `linkTesting` | Валидация ссылок | `validate_links` |
| `linkShortener` | Сокращатель URL | `short_link` |
| `optimization` | Postback коды | `opt_codes` |
| `referrals` | Рефералы | `referrals` |
| `retag` | Retag скрипты | `webmaster_retag` |
| `broker` | Заявки брокера | `broker_application` |
| `aliexpress` | Инструменты AliExpress | `aliexpress` |

### Хелперы

```typescript
// Отслеживание изменений между вызовами API
const diff = publisher.banners.diff(previousBanners, currentBanners);
console.log(diff.added, diff.removed, diff.changed);

// Фильтрация баннеров по размеру
const filtered = publisher.banners.filterBySize(banners, {
  width: { max: 300 },
  height: { max: 250 },
});

// Построение дерева категорий
const tree = publisher.auxiliary.buildCategoryTree(categories);

// Установка лендинга для баннера
const html = publisher.banners.setLanding(banner, landing);
```

## Требования

- Node.js >= 18
- TypeScript >= 5.0 (опционально)

## Лицензия

MIT
