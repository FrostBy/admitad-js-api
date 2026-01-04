# Сети-партнёры (Subnetworks)

API методы для работы с площадками сетей-партнёров.

## Методы

| Метод | Эндпоинт | Scope |
|-------|----------|-------|
| Создать площадки | `POST /subnetworks/v1/websites/create/` | `manage_websites` |
| Статус подключения | `GET /subnetworks/v1/advcampaign/{c_id}/statuses/` | `advcampaigns_for_website` |

## Создание площадок

```
POST https://api.admitad.com/subnetworks/v1/websites/create/
```

### Параметры

| Параметр | Тип | Обязательный | Лимит |
|----------|-----|:------------:|-------|
| `name` | string | Да | 200 символов |
| `url` | string | Да | 255 символов |
| `category` | integer[] | Нет | Категории программ |
| `region` | string[] | Нет | Коды регионов (RU, BY, UA) |
| `native_kind` | string | Нет | Тип (social_network и др.) |

### Успешный ответ (HTTP 200)

```json
{
  "0": {
    "id": 123,
    "status": "active",
    "verification_code": "abc123",
    "kind": "subnetwork",
    "creation_date": "2024-01-15T10:30:00"
  }
}
```

### Ошибки (HTTP 400)

Возвращает ошибки валидации по индексам. Принцип "всё или ничего" — если одна площадка невалидна, ни одна не создаётся.

## Статус подключения к программе

```
GET https://api.admitad.com/subnetworks/v1/advcampaign/{c_id}/statuses/
```

### Параметры

| Параметр | Описание |
|----------|----------|
| `websites_id` | ID площадок через запятую (макс. 30) |

### Поля ответа

| Поле | Описание |
|------|----------|
| `website_id` | ID площадки |
| `connection_status` | active / disabled |
| `gotolink` | Партнёрская ссылка (если active) |
| `advcampaign_id` | ID программы |
