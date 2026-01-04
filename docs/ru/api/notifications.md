# Уведомления (Web Notificator)

API методы для работы с уведомлениями.

**Scope:** `web_notificator`

## Методы

| Метод | Эндпоинт |
|-------|----------|
| Список уведомлений | `GET /web_notificator/v1/web_notificator/` |
| Прочитать одно | `POST /web_notificator/v1/web_notificator/{id}/mark_as_read/` |
| Прочитать все | `POST /web_notificator/v1/web_notificator/mark_all_as_read/` |

## Список уведомлений

```
GET https://api.admitad.com/web_notificator/v1/web_notificator/
```

### Параметры

| Параметр | Описание |
|----------|----------|
| `category` | finance, system, promotions, other |
| `status` | read, not_read |
| `start_date` | Начало периода (формат: %d.%m.%Y %H:%M:%S) |
| `end_date` | Конец периода |
| `search` | Поиск по теме |
| `limit` | Количество записей |
| `offset` | Смещение |

### Пример запроса

```bash
curl -L -H 'Authorization: Bearer access_token' \
  -X GET https://api.admitad.com/web_notificator/v1/web_notificator/
```

### Поля ответа

| Поле | Описание |
|------|----------|
| `id` | ID уведомления |
| `status` | read / not_read |
| `category` | Категория |
| `date_created` | Дата создания (ISO) |
| `when_read` | Дата прочтения (null если не прочитано) |
| `translate` | Объект с subject и text |

## Отметить как прочитанное

```
POST https://api.admitad.com/web_notificator/v1/web_notificator/{id}/mark_as_read/
```

Возвращает обновлённый объект уведомления.

## Отметить все как прочитанные

```
POST https://api.admitad.com/web_notificator/v1/web_notificator/mark_all_as_read/
```

Возвращает HTTP 200 с пустым телом.
