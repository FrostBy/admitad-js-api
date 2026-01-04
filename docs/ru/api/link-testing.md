# Тестирование ссылок

API метод для проверки партнёрских ссылок.

**Scope:** `validate_links`

## Метод

| Метод | Эндпоинт |
|-------|----------|
| Проверить ссылку | `GET /validate_links/` |

## Проверка ссылки

```
GET https://api.admitad.com/validate_links/
```

### Параметры

| Параметр | Обязательный | Описание |
|----------|:------------:|----------|
| `link` | Да | URL для проверки (RFC 2396 encoded) |

### Пример запроса

```bash
curl -L -H 'Authorization: Bearer access_token' -X GET \
  'https://api.admitad.com/validate_links/?link=https%3A%2F%2Fad.admitad.com%2Fg%2Fe5be4e10ef3cb5566912bc6358ff32'
```

### Успешный ответ

```json
{
  "message": "Link successfully tested."
}
```

### Возможные ошибки

| Ошибка | Описание |
|--------|----------|
| Invalid domain | Неверный домен |
| Malformed URL | Некорректный формат URL |
| Invalid character codes | Неверные символы (ожидается hex 30-40 символов) |
| Invalid SubID | Некорректный SubID (макс. 50 символов) |
| Inactive partnership | Партнёрство неактивно |
| Restricted deeplink domain | Запрещённый домен для deeplink |
| Missing compensation | Нет вознаграждения за товар |
