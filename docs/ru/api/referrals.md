# Рефералы

API метод для получения информации о рефералах.

**Scope:** `referrals`

## Метод

| Метод | Эндпоинт |
|-------|----------|
| Список рефералов | `GET /referrals/` |

## Список рефералов

```
GET https://api.admitad.com/referrals/
```

### Параметры

| Параметр | Формат | Описание |
|----------|--------|----------|
| `date_start` | dd.mm.yyyy | Начало периода |
| `date_end` | dd.mm.yyyy | Конец периода |
| `limit` | integer | Количество записей |
| `offset` | integer | Смещение |

### Пример запроса

```bash
curl -L -H 'Authorization: Bearer access_token' -X GET \
  https://api.admitad.com/referrals/
```

### Поля ответа

| Поле | Описание |
|------|----------|
| `id` | ID реферала |
| `username` | Логин реферала |
| `payment` | Сумма выплаты |

### Пример ответа

```json
{
  "results": [
    {
      "id": 123,
      "username": "referral_user",
      "payment": 150.00
    }
  ],
  "_meta": {
    "count": 10,
    "limit": 20,
    "offset": 0
  }
}
```
