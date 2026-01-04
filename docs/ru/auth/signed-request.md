# Описание строки signed_request

Формат подписанных данных для приложений, встроенных в iframe на admitad.com.

## Формат

```
[подпись].[данные]
```

- **Подпись** — HMAC-SHA256 хеш данных, закодированный в base64
- **Данные** — JSON объект, закодированный в base64

## Алгоритм проверки

1. Разделить строку по точке на `signature` и `payload`
2. Декодировать `payload` из base64 в JSON
3. Проверить что `algorithm` = `HMAC-SHA256`
4. Вычислить HMAC-SHA256 от `payload` используя `client_secret`
5. Сравнить вычисленную подпись с `signature`

## Структура данных

| Поле | Тип | Описание |
|------|-----|----------|
| `username` | string | Имя пользователя |
| `id` | number | ID пользователя |
| `first_name` | string | Имя |
| `last_name` | string | Фамилия |
| `algorithm` | string | Алгоритм подписи: `HMAC-SHA256` |
| `language` | string | Язык пользователя |
| `access_token` | string | Токен доступа |
| `refresh_token` | string | Токен обновления |
| `expires_in` | number | Время жизни токена в секундах |

## Пример данных (декодированный JSON)

```json
{
  "username": "advertiser1",
  "first_name": "name",
  "last_name": "surname",
  "algorithm": "HMAC-SHA256",
  "language": "ru",
  "access_token": "087d6cc437",
  "expires_in": 60800,
  "id": 13090,
  "refresh_token": "7521b7640c"
}
```

## Пример на Python

```python
import base64
import hashlib
import hmac
import json

def parse_signed_request(signed_request, secret):
    signature, payload = signed_request.split('.')

    # Декодируем данные
    data = json.loads(base64.b64decode(payload))

    # Проверяем алгоритм
    if data.get('algorithm', '').upper() != 'HMAC-SHA256':
        raise ValueError('Unsupported algorithm')

    # Проверяем подпись
    expected_sig = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()

    if signature != expected_sig:
        raise ValueError('Invalid signature')

    return data
```
