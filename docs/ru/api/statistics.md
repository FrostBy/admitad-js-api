# Статистика веб-мастера

API методы для получения статистики.

**Scope:** `statistics`

## Методы

| Метод | Эндпоинт |
|-------|----------|
| По площадкам | `GET /statistics/websites/` |
| По программам | `GET /statistics/campaigns/` |
| По датам | `GET /statistics/dates/` |
| По действиям | `GET /statistics/actions/` |
| По SubID | `GET /statistics/sub_ids/` |
| По источникам | `GET /statistics/sources/` |
| По ключевым словам | `GET /statistics/keywords/` |

## Общие параметры

| Параметр | Формат | Описание |
|----------|--------|----------|
| `date_start` | dd.mm.yyyy | Начало периода |
| `date_end` | dd.mm.yyyy | Конец периода |
| `website` | integer | ID площадки |
| `campaign` | integer | ID программы |
| `subid` | string | SubID |
| `total` | - | Итоговые значения |
| `order_by` | string | Сортировка |
| `limit` | integer | Количество записей |
| `offset` | integer | Смещение |

## Пример запроса

```bash
curl -L -H 'Authorization: Bearer access_token' -X GET \
  'https://api.admitad.com/statistics/websites/?date_start=01.01.2024&limit=10'
```

## Метрики в ответах

| Поле | Описание |
|------|----------|
| `clicks` | Клики |
| `views` | Показы |
| `ctr` | CTR |
| `ecpc` | eCPC |
| `ecpm` | eCPM |
| `cr` | Конверсия |

## Данные по выплатам

| Поле | Описание |
|------|----------|
| `payment_sum_approved` | Подтверждённые выплаты |
| `payment_sum_open` | Открытые выплаты |
| `payment_sum_declined` | Отклонённые выплаты |

## Данные по действиям

| Поле | Описание |
|------|----------|
| `leads_sum` | Сумма лидов |
| `sales_sum` | Сумма продаж |

## Статистика по действиям

```
GET https://api.admitad.com/statistics/actions/
```

### Дополнительные поля

| Поле | Описание |
|------|----------|
| `action_id` | ID действия |
| `status` | Статус |
| `payment` | Выплата |
| `cart` | Корзина |
| `conversion_time` | Время конверсии |
| `order_items` | Позиции заказа |

## Статистика по SubID

```
GET https://api.admitad.com/statistics/sub_ids/
```

Поддерживает группировку по subid, subid1-4.
