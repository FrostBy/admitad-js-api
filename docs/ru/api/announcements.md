# Оповещения (Announcements)

API методы для получения списка оповещений.

## Методы

| Метод | Эндпоинт | Scope |
|-------|----------|-------|
| Список оповещений | `GET /announcements/` | `announcements` |
| Одно оповещение | `GET /announcements/{id}/` | `announcements` |

## Список оповещений

```
GET https://api.admitad.com/announcements/
```

### Параметры

| Параметр | По умолчанию | Описание |
|----------|:------------:|----------|
| `limit` | 20 | Количество записей |
| `offset` | 0 | Смещение |
| `language` | ru | Язык сообщений |

### Пример запроса

```bash
curl -L -H 'Authorization: Bearer access_token' -X GET https://api.admitad.com/announcements/
```

### Поля ответа

| Поле | Описание |
|------|----------|
| `id` | ID оповещения |
| `message` | Текст сообщения |
| `event` | Тип события |
| `advcampaign` | Связанная партнёрская программа |

### Пример ответа

```json
{
  "results": [
    {
      "id": 123,
      "message": "Текст оповещения",
      "event": "campaign_update",
      "advcampaign": {
        "id": 456,
        "name": "Название программы"
      }
    }
  ],
  "_meta": {
    "count": 150,
    "limit": 20,
    "offset": 0
  }
}
```
