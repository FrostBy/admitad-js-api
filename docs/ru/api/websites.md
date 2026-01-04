# Площадки веб-мастера

API методы для работы с площадками.

**Scope:** `websites`

## Методы

| Метод | Эндпоинт |
|-------|----------|
| Список площадок | `GET /websites/v2/` |
| Одна площадка | `GET /websites/v2/{id}/` |

## Список площадок

```
GET https://api.admitad.com/websites/v2/
```

### Параметры фильтрации

| Параметр | Значения |
|----------|----------|
| `status` | new, active, suspended |
| `campaign_status` | pending, active, declined, disabled |

### Поля ответа

| Поле | Описание |
|------|----------|
| `id` | ID площадки |
| `name` | Название |
| `status` | Статус |
| `site_url` | URL сайта |
| `verification_code` | Код верификации |
| `kind` | Тип площадки |

## Одна площадка

```
GET https://api.admitad.com/websites/v2/{id}/
```

Возвращает данные одной площадки по ID.

## Устаревшие методы

Следующие методы больше не поддерживаются (HTTP 410 Gone):

| Метод | Эндпоинт |
|-------|----------|
| Создать | `POST /websites/v2/create/` |
| Обновить | `POST /websites/v2/update/{id}/` |
| Верифицировать | `POST /websites/v2/verify/{id}/` |
| Удалить | `POST /websites/v2/delete/{id}/` |
