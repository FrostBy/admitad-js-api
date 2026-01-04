# Информация о пользователе

API методы для получения данных профиля и баланса.

## Методы

| Метод | Эндпоинт | Scope |
|-------|----------|-------|
| Профиль | `GET /me/` | `private_data` |
| Баланс | `GET /me/balance/` | `private_data_balance` |
| Баланс (расширенный) | `GET /me/balance/extended/` | `private_data_balance` |
| Настройки выплат | `GET /me/payment/settings/` | `private_data_balance` |

## Профиль пользователя

```
GET https://api.admitad.com/me/
```

### Поля ответа

| Поле | Scope | Описание |
|------|-------|----------|
| `id` | `private_data` | ID пользователя |
| `username` | `private_data` | Логин |
| `first_name` | `private_data` | Имя |
| `language` | `private_data` | Язык |
| `default_currency` | `private_data` | Валюта по умолчанию |
| `country` | `private_data` | Страна |
| `email` | `private_data_email` | Email |
| `phone` | `private_data_phone` | Телефон |

### Пример ответа

```json
{
  "username": "user",
  "first_name": "name",
  "id": 96,
  "language": "ru",
  "default_currency": "RUB",
  "country": "RU"
}
```

## Баланс

```
GET https://api.admitad.com/me/balance/
```

Возвращает баланс по валютам.

## Баланс (расширенный)

```
GET https://api.admitad.com/me/balance/extended/
```

### Дополнительные поля

| Поле | Описание |
|------|----------|
| `balance` | Текущий баланс |
| `processing` | Средства в обработке |
| `today` | Заработок за сегодня |
| `stalled` | Замороженные средства |

## Настройки выплат

```
GET https://api.admitad.com/me/payment/settings/
```

Возвращает настроенные способы вывода средств:
- Тип платёжной системы
- Данные аккаунта
- Курсы конвертации
