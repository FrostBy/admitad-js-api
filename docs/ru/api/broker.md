# Заявки брокера

API методы для создания и управления заявками брокера.

## Методы

| Метод | Эндпоинт | Scope |
|-------|----------|-------|
| Создать заявку | `POST /website/{w_id}/broker/applications/create/` | `manage_broker_application` |
| Создать с SMS | `POST /website/{w_id}/broker/applications/sync_create/` | `manage_broker_application` |
| Подтвердить SMS | `POST /website/{w_id}/broker/applications/sync_create/{a_id}/confirm` | `manage_broker_application` |
| Список заявок | `GET /website/{w_id}/broker/applications/` | `broker_application` |
| Настройки программы | `GET /broker/campaign_settings/{c_id}/` | `broker_application` |

## Создание заявки

```
POST https://api.admitad.com/website/{w_id}/broker/applications/create/
```

### Обязательные параметры

| Параметр | Описание |
|----------|----------|
| `first_name` | Имя |
| `last_name` | Фамилия |
| `mobile_phone` | Телефон |
| `email` | Email |
| `work_date` | Дата работы |
| `campaign_id` | ID программы |
| `user_notified` | Согласие пользователя (1 = да, 0 = нет) |

**Важно:** Если `user_notified = 0`, заявка не будет передана в программу.

## Заявки с SMS-подтверждением

Для банковских программ используется двухэтапный процесс:

1. Создание заявки → статус `waiting_sms_verification`
2. Подтверждение кодом из SMS

```
POST /website/{w_id}/broker/applications/sync_create/
```

Одна программа на запрос.

## Список заявок

```
GET https://api.admitad.com/website/{w_id}/broker/applications/
```

### Фильтры

| Параметр | Описание |
|----------|----------|
| `status` | Статус заявки |
| `campaign` | ID программы |
| `date_start` | Начало периода |
| `date_end` | Конец периода |
| `subid` | SubID параметры |

## Статусы заявок

| Статус | Описание |
|--------|----------|
| `processing` | В очереди |
| `approved` | Одобрена |
| `declined` | Отклонена |
| `waiting` | Обрабатывается программой |
| `error` | Ошибка |

## Настройки программы

```
GET https://api.admitad.com/broker/campaign_settings/{c_id}/
```

Возвращает обязательные поля и правила валидации (regexp паттерны).

## Алгоритм отправки

Поддерживает волновую отправку с паузами между группами (макс. 1440 минут).
