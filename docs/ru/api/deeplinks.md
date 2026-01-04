# Генератор Deeplink

API метод для генерации партнёрских ссылок.

**Scope:** `deeplink_generator`

## Метод

| Метод | Эндпоинт |
|-------|----------|
| Создать deeplink | `GET /deeplink/{w_id}/advcampaign/{c_id}/` |

## Генерация ссылки

```
GET https://api.admitad.com/deeplink/{w_id}/advcampaign/{c_id}/
```

### Параметры URL

| Параметр | Описание |
|----------|----------|
| `w_id` | ID площадки |
| `c_id` | ID программы |

### Параметры запроса

| Параметр | Обязательный | Лимит | Описание |
|----------|:------------:|-------|----------|
| `ulp` | Да | 200 URL | Целевой URL (URL-encoded) |
| `subid` | Нет | 50 символов | SubID |
| `subid1` | Нет | 50 символов | SubID1 |
| `subid2` | Нет | 50 символов | SubID2 |
| `subid3` | Нет | 120 символов | SubID3 |
| `subid4` | Нет | 120 символов | SubID4 |

**Важно:** Не используйте комбинацию `%00` в subid полях.

### Пример запроса

```bash
curl -L -H 'Authorization: Bearer access_token' -X GET \
  'https://api.admitad.com/deeplink/232236/advcampaign/234433/?subid=value&ulp=http%3A%2F%2Fexample.com%2F'
```

### Поля ответа

| Поле | Описание |
|------|----------|
| `link` | Сгенерированная партнёрская ссылка |
| `is_affiliate_product` | Партнёрский товар (true/false/null, только AliExpress) |

### Пример ответа

```json
{
  "link": "https://ad.admitad.com/g/abc123/?ulp=http%3A%2F%2Fexample.com%2F",
  "is_affiliate_product": null
}
```
