# Купоны

API методы для получения купонов и промокодов.

## Методы

| Метод | Эндпоинт | Scope |
|-------|----------|-------|
| Все купоны | `GET /coupons/` | `coupons` |
| Купоны для площадки | `GET /coupons/website/{w_id}/` | `coupons_for_website` |
| Категории купонов | `GET /coupons/categories/` | `public_data` |

## Список купонов

```
GET https://api.admitad.com/coupons/
```

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `campaign` | integer | ID программы |
| `category` | integer | ID категории купона |
| `search` | string | Поиск по названию/описанию |
| `date_start` | date | Начало периода действия |
| `date_end` | date | Конец периода действия |
| `region` | string | Регион |
| `limit` | integer | Количество записей |
| `offset` | integer | Смещение |

### Поля ответа

| Поле | Описание |
|------|----------|
| `id` | ID купона |
| `name` | Название |
| `description` | Описание |
| `status` | Статус |
| `rating` | Рейтинг |
| `discount` | Размер скидки |
| `date_start` | Дата начала |
| `date_end` | Дата окончания |
| `promocode` | Промокод |
| `goto_link` | Партнёрская ссылка |
| `frameset_link` | Frameset ссылка |
| `campaign` | Данные программы (id, name, site_url) |
| `regions` | Регионы |
| `language` | Язык |
| `categories` | Категории |

## Купоны для площадки

```
GET https://api.admitad.com/coupons/website/{w_id}/
```

Возвращает купоны с партнёрскими ссылками для конкретной площадки.

## Категории купонов

```
GET https://api.admitad.com/coupons/categories/
```

Возвращает список категорий купонов.
