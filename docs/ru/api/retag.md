# Retag

API методы для управления тегами retag.

## Методы

| Метод | Эндпоинт | Scope |
|-------|----------|-------|
| Уровни площадки | `GET /retag/website/{w_id}/levels/` | `webmaster_retag` |
| Уровни программы | `GET /retag/advcampaign/{c_id}/levels/` | `webmaster_retag` |
| Список тегов | `GET /retag/` | `webmaster_retag` |
| Создать тег | `POST /retag/create/` | `manage_webmaster_retag` |
| Обновить тег | `POST /retag/update/{id}/` | `manage_webmaster_retag` |
| Удалить тег | `POST /retag/delete/{id}/` | `manage_webmaster_retag` |

## Уровни для площадки

```
GET https://api.admitad.com/retag/website/{w_id}/levels/
```

Возвращает уровни программ, настроенные для площадки.

## Уровни программы

```
GET https://api.admitad.com/retag/advcampaign/{c_id}/levels/
```

Возвращает все уровни конкретной программы.

## Список тегов

```
GET https://api.admitad.com/retag/
```

### Параметры

| Параметр | Описание |
|----------|----------|
| `website` | ID площадки |
| `active` | Статус активности |
| `limit` | Количество записей |
| `offset` | Смещение |

## Создание тега

```
POST https://api.admitad.com/retag/create/
```

### Параметры

| Параметр | Обязательный | Описание |
|----------|:------------:|----------|
| `website` | Да | ID площадки |
| `level` | Да | ID уровня |
| `script` | Да | Код скрипта |
| `active` | Нет | Статус активности |
| `comment` | Нет | Комментарий |

## Обновление тега

```
POST https://api.admitad.com/retag/update/{id}/
```

Позволяет изменить script, level, active статус.

## Удаление тега

```
POST https://api.admitad.com/retag/delete/{id}/
```

## Поля ответа

| Поле | Описание |
|------|----------|
| `id` | ID тега |
| `website` | Площадка |
| `level` | Уровень |
| `script` | Код скрипта |
| `active` | Активен |
| `moderation_status` | Статус модерации |
