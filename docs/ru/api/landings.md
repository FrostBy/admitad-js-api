# Лендинги

API методы для получения лендингов партнёрских программ.

**Scope:** `landings`

## Методы

| Метод | Эндпоинт |
|-------|----------|
| Лендинги программы | `GET /landings/{c_id}/` |
| Лендинги для площадки | `GET /landings/{c_id}/website/{w_id}/` |

## Лендинги программы

```
GET https://api.admitad.com/landings/{c_id}/
```

### Параметры

| Параметр | Описание |
|----------|----------|
| `c_id` | ID программы |
| `limit` | Количество записей |
| `offset` | Смещение |

### Пример запроса

```bash
curl -L -H 'Authorization: Bearer access_token' -X GET \
  https://api.admitad.com/landings/6/?limit=2
```

### Поля ответа

| Поле | Описание |
|------|----------|
| `id` | ID лендинга |
| `name` | Название |
| `date_created` | Дата создания |

## Лендинги для площадки

```
GET https://api.admitad.com/landings/{c_id}/website/{w_id}/
```

### Дополнительные поля

| Поле | Описание |
|------|----------|
| `gotolink` | Партнёрская ссылка |

### Пример ответа

```json
{
  "results": [
    {
      "id": "13",
      "name": "Gmail Landing",
      "date_created": "2014-06-28T18:43:18"
    }
  ],
  "_meta": {
    "count": 1,
    "limit": 2,
    "offset": 0
  }
}
```
