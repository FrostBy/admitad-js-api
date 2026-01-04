# Клиентская авторизация

OAuth 2.0 Client Credentials Flow для серверных приложений.

## Endpoint

`POST https://api.admitad.com/token/`

## Content-Type

`application/x-www-form-urlencoded`

## Аутентификация

HTTP Basic Auth с base64-кодированной строкой `client_id:client_secret`

```
Authorization: Basic Y2IyODFkOTE4YTM3ZTM0NmI0NWU5YWVhMWM2ZWI3OmEwZjhhOGIyNGRlOGI4MTgyYTBkZGQyZTg5ZjViMQ==
```

## Параметры

| Параметр | Обязательный | Описание |
|----------|:------------:|----------|
| `grant_type` | ✔ | `client_credentials` |
| `client_id` | ✔ | Идентификатор приложения |
| `scope` | ✔ | Список прав доступа через пробел |

## Пример запроса

```bash
curl -X POST https://api.admitad.com/token/ \
  -H 'Authorization: Basic Y2IyODFkOTE4YTM3ZTM0NmI0NWU5YWVhMWM2ZWI3OmEwZjhhOGIyNGRlOGI4MTgyYTBkZGQyZTg5ZjViMQ==' \
  -d 'grant_type=client_credentials&client_id=cb281d918a37e346b45e9aea1c6eb7&scope=advcampaigns banners websites'
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

| Поле | Описание |
|------|----------|
| `access_token` | Токен для запросов к API |
| `token_type` | Тип токена: `bearer` |
| `expires_in` | Время жизни в секундах (604800 = 7 дней) |
| `refresh_token` | Токен для обновления access_token |
| `scope` | Выданные права доступа |
