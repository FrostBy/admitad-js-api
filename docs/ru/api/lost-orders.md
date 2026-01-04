# Потерянные заказы

API методы для работы с потерянными заказами.

**Доступно для:** cashback и loyalty программ. Требуется принять условия использования в разделе Lost Orders.

## Методы

| Метод | Эндпоинт | Scope |
|-------|----------|-------|
| Список заказов | `GET /lost_orders/` | `lost_orders` |
| Создать заказ | `POST /lost_orders/create/` | `manage_lost_orders` |
| Статус оплаты | `GET /lost_orders/payments_info/` | `lost_orders` |
| Список апелляций | `GET /appeals/` | `lost_orders` |
| Создать апелляцию | `POST /appeals/create/` | `manage_lost_orders` |

## Список потерянных заказов

```
GET https://api.admitad.com/lost_orders/
```

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `advcampaign` | integer | ID программы |
| `website` | integer | ID площадки |
| `status` | string | accepted, processing, rejected |
| `start_date` | date | Начало периода |
| `end_date` | date | Конец периода |
| `appeal_id` | integer | ID апелляции |
| `appeal_status` | string | Статус апелляции |
| `limit` | integer | Количество записей |
| `offset` | integer | Смещение |

### Поля ответа

| Поле | Описание |
|------|----------|
| `id` | ID заказа |
| `status` | Статус |
| `order_id` | Номер заказа |
| `order_date` | Дата заказа |
| `currency` | Валюта |
| `reward` | Вознаграждение |
| `appeal_id` | ID апелляции |
| `estimated_reward` | Ожидаемое вознаграждение |

## Создание потерянного заказа

```
POST https://api.admitad.com/lost_orders/create/
```

### Обязательные параметры

| Параметр | Описание |
|----------|----------|
| `advcampaign` | ID программы |
| `website` | ID площадки |
| `order_id` | Номер заказа |
| `order_date` | Дата заказа |
| `order_price` | Сумма заказа |
| `comment` | Комментарий |
| `estimated_reward` | Ожидаемое вознаграждение |
| `receipt` | Чек (файл) |

## Статус оплаты заказа

```
GET https://api.admitad.com/lost_orders/payments_info/
```

### Возможные статусы

| Статус | Описание |
|--------|----------|
| `owner` | Заказ принадлежит пользователю |
| `already_counted` | Заказ уже учтён |
| `does_not_exist` | Заказ не существует |
