# Авторизация стороннего web-приложения

OAuth 2.0 Authorization Code Flow для интеграции сторонних приложений с Admitad.

## 1. Открытие диалога авторизации

**Endpoint:** `GET https://api.admitad.com/authorize/`

| Параметр | Обязательный | Описание |
|----------|:------------:|----------|
| `client_id` | ✔ | Идентификатор приложения |
| `redirect_uri` | ✔ | URL, на который будет переадресован пользователь после авторизации |
| `scope` | ✔ | Список разделённых пробелом настроек доступа |
| `response_type` | ✔ | Тип ответа: `code` |
| `state` | | Значение для проверки состояния между запросом и ответом (CSRF защита) |

**Пример:**
```
https://api.admitad.com/authorize/?client_id=cb281d918a37e346b45e9aea1c6eb7&redirect_uri=https://myapp.com/callback&scope=advcampaigns statistics&response_type=code&state=random123
```

## 2. Разрешение прав доступа

После входа пользователю показывается диалог авторизации с запрошенными правами доступа.

## 3. Получение параметра code

**Успешный ответ** (редирект):
```
https://redirect_uri/?state=random123&code=c75ebf64ad48a352630b6d953ce365
```

**При ошибке:**
```
https://redirect_uri/?state=random123&error=invalid_client&error_description=client_id+doesn't+exist
```

## 4. Получение access_token

**Endpoint:** `POST https://api.admitad.com/token/`

**Content-Type:** `application/x-www-form-urlencoded`

**Аутентификация:** HTTP Basic Auth — `base64(client_id:client_secret)`

| Параметр | Обязательный | Описание |
|----------|:------------:|----------|
| `code` | ✔ | Код из предыдущего шага |
| `client_id` | ✔ | Идентификатор приложения |
| `grant_type` | ✔ | `authorization_code` |
| `redirect_uri` | ✔ | URL перенаправления (должен совпадать) |

**Пример запроса:**
```bash
curl -X POST https://api.admitad.com/token/ \
  -H 'Authorization: Basic Y2IyODFkOTE4YTM3ZTM0NmI0NWU5YWVhMWM2ZWI3OmEwZjhhOGIyNGRlOGI4MTgyYTBkZGQyZTg5ZjViMQ==' \
  -d 'code=c75ebf64ad48a352630b6d953ce365&grant_type=authorization_code&redirect_uri=https%3A%2F%2Fmyapp.com%2Fcallback'
```

**Пример ответа:**
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
