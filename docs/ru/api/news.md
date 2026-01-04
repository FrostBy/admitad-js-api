# Новости

API методы для получения новостей.

**Scope:** `public_data`

## Методы

| Метод | Эндпоинт |
|-------|----------|
| Список новостей | `GET /news/` |
| Одна новость | `GET /news/{id}/` |

## Список новостей

```
GET https://api.admitad.com/news/
```

### Параметры

| Параметр | Описание |
|----------|----------|
| `limit` | Количество записей |
| `offset` | Смещение |
| `language` | Код языка (ru, en) |

### Пример запроса

```bash
curl -L -H 'Authorization: Bearer access_token' -X GET \
  https://api.admitad.com/news/?limit=1&offset=2&language=en
```

### Поля ответа

| Поле | Описание |
|------|----------|
| `id` | ID новости |
| `datetime` | Дата публикации |
| `content` | Полный текст |
| `short_content` | Заголовок |
| `advcampaign` | Связанная программа (опционально) |
| `url` | Внешняя ссылка |
| `language` | Код языка |

### Пример ответа

```json
{
  "results": [
    {
      "id": 12,
      "language": "en",
      "short_content": "short text",
      "content": "<p>full text</p>",
      "datetime": "2009-12-02T23:08:45",
      "url": "",
      "advcampaign": {
        "id": 312,
        "name": "Program Name"
      }
    }
  ],
  "_meta": {
    "count": 2,
    "limit": 20,
    "offset": 0
  }
}
```
