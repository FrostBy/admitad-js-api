# Обновление access_token

Обновление истекшего access_token с помощью refresh_token.

## Endpoint

`POST https://api.admitad.com/token/`

## Content-Type

`application/x-www-form-urlencoded`

## Параметры

| Параметр | Обязательный | Описание |
|----------|:------------:|----------|
| `grant_type` | ✔ | `refresh_token` |
| `client_id` | ✔ | Идентификатор приложения |
| `client_secret` | ✔ | Секретный ключ приложения |
| `refresh_token` | ✔ | Токен обновления из предыдущей авторизации |

## Пример запроса

```bash
curl -X POST https://api.admitad.com/token/ \
  -d 'grant_type=refresh_token&client_id=cb281d918a37e346b45e9aea1c6eb7&client_secret=a0f8a8b24de8b8182a0ddd2e89f5b1&refresh_token=7521b7640c'
```

## Пример ответа

```json
{
  "username": "webmaster1",
  "first_name": "name",
  "last_name": "surname",
  "language": "ru",
  "access_token": "4b8b33955a",
  "token_type": "bearer",
  "expires_in": 604800,
  "refresh_token": "ea957cce42",
  "scope": "advcampaigns banners websites",
  "group": "webmaster"
}
```

**Важно:** После обновления выдаётся новый `refresh_token`. Старый становится недействительным.
