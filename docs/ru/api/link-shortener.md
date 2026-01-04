# Сокращение ссылок

API метод для сокращения партнёрских ссылок.

**Scope:** `short_link`

## Метод

| Метод | Эндпоинт |
|-------|----------|
| Сократить ссылку | `POST /shortlink/modify/` |

## Сокращение ссылки

```
POST https://api.admitad.com/shortlink/modify/
```

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `link` | string | Ссылка (только домены Admitad) |

**Важно:** Ссылка должна относиться к одному из доменов Admitad.

### Пример запроса

```bash
curl -L -H 'Authorization: Bearer access_token' -X POST \
  https://api.admitad.com/shortlink/modify/ \
  -d 'link=http://ad.admitad.com/g/4657cb709efb21a781aacd1ff8c49e/'
```

### Пример ответа

```json
{
  "short_link": "https://fas.st/ala7-"
}
```
