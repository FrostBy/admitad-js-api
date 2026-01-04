# Коды оптимизации (Postback)

API методы для управления кодами оптимизации (postback URL).

## Методы

| Метод | Эндпоинт | Scope |
|-------|----------|-------|
| Список кодов | `GET /opt_codes/` | `opt_codes` |
| Создать (действия) | `POST /opt_codes/action/create/` | `manage_opt_codes` |
| Создать (программы) | `POST /opt_codes/offer/create/` | `manage_opt_codes` |
| Обновить | `POST /opt_codes/action/update/{id}/` | `manage_opt_codes` |
| Удалить | `POST /opt_codes/delete/{id}/` | `manage_opt_codes` |

## Список кодов

```
GET https://api.admitad.com/opt_codes/
```

### Параметры

| Параметр | Описание |
|----------|----------|
| `limit` | Количество записей |
| `offset` | Смещение |
| `campaign` | ID программы |
| `website` | ID площадки |
| `order_by` | Сортировка (action_type, method, desc_mode) |

## Создание кода для действий

```
POST https://api.admitad.com/opt_codes/action/create/
```

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `url` | string | URL для postback |
| `method` | integer | 0 = GET, 1 = POST |
| `action_type` | integer | 0 = все, 1 = Sale, 2 = Lead |
| `desc_mode` | integer | 0 = расширенный, 1 = простой |
| `status` | - | Статус (минимум один из status или reward_ready) |
| `reward_ready` | - | Готовность выплаты |

## Создание кода для статуса программы

```
POST https://api.admitad.com/opt_codes/offer/create/
```

Отслеживает изменения статуса программы, а не отдельных конверсий.

## Динамические параметры URL

| Параметр | Описание |
|----------|----------|
| `[[[offer_id]]]` | ID оффера |
| `[[[payment_sum]]]` | Сумма выплаты |
| `[[[order_id]]]` | ID заказа |
| `[[[user_agent]]]` | User Agent |

## Обновление кода

```
POST https://api.admitad.com/opt_codes/action/update/{id}/
```

## Удаление кода

```
POST https://api.admitad.com/opt_codes/delete/{id}/
```
