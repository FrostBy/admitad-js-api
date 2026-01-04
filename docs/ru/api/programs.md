# Партнёрские программы

API методы для работы с партнёрскими программами.

## Методы

| Метод | Эндпоинт | Scope |
|-------|----------|-------|
| Список всех программ | `GET /advcampaigns/` | `advcampaigns` |
| Одна программа | `GET /advcampaigns/{id}/` | `advcampaigns` |
| Программы площадки | `GET /advcampaigns/website/{w_id}/` | `advcampaigns_for_website` |
| Программа для площадки | `GET /advcampaigns/{c_id}/website/{w_id}/` | `advcampaigns_for_website` |

## Список всех программ

```
GET https://api.admitad.com/advcampaigns/
```

### Параметры

| Параметр | Описание |
|----------|----------|
| `limit` | Количество записей |
| `offset` | Смещение |
| `language` | Язык категорий (по умолчанию: ru) |
| `website` | ID площадки для проверки требований модерации |
| `has_tool` | Фильтр по инструментам (deeplink, products, retag и др.) |
| `traffic_id` | Фильтр по типам трафика |

### Поля ответа

| Поле | Описание |
|------|----------|
| `id` | ID программы |
| `name` | Название |
| `status` | Статус (active и др.) |
| `connection_status` | Статус связи с площадкой |
| `currency` | Валюта выплат |
| `actions` | Доступные действия с ставками |
| `actions_detail` | Детальные тарифы |
| `geotargeting` | Зависимость выплат от страны |
| `goto_cookie_lifetime` | Время жизни cookie |
| `cr` | Конверсия |
| `ecpc` | eCPC |
| `epc` | EPC |
| `products_xml_link` | Ссылка на XML фид товаров |
| `products_csv_link` | Ссылка на CSV фид товаров |
| `action_countries` | Страны, где оплачиваются действия |

## Программы площадки

```
GET https://api.admitad.com/advcampaigns/website/{w_id}/
```

### Параметры фильтрации

| Параметр | Описание |
|----------|----------|
| `connection_status` | active, pending, declined |
| `has_tool` | Инструменты программы |

Возвращает программы, подключённые к площадке, с эксклюзивными ставками.

## Структура ставок

Иерархия: **Actions** → **Tariffs** → **Rates**

Ставки содержат: размер, страну, минимальный порог выплаты, дату начала действия, статус процента.

## Устаревшие методы

Эндпоинты подключения/отключения программ (`/attach/`, `/detach/`) больше не поддерживаются — возвращают HTTP 410 Gone.
