# Вспомогательная информация

API методы для получения справочных данных.

**Scope:** `public_data`

## Методы

| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| Типы площадок | `GET /websites/kinds/` | Категории площадок |
| Регионы | `GET /websites/regions/` | Список регионов |
| Категории программ | `GET /categories/` | Иерархия категорий |
| Языки | `GET /languages/` | Доступные языки |
| Валюты | `GET /currencies/` | Поддерживаемые валюты |
| Курс валют | `GET /currencies/rate/` | Конвертация валют |
| Источники трафика | `GET /traffic/` | Типы монетизации |

## Типы площадок

```
GET https://api.admitad.com/websites/kinds/
```

Возвращает категории: website, doorway, contextual, social_app и др.

## Регионы

```
GET https://api.admitad.com/websites/regions/
```

| Код | Описание |
|:---:|----------|
| `RU` | Россия |
| `UA` | Украина |
| `BY` | Беларусь |
| `01` | СНГ (агрегированный) |
| `00` | Все регионы |

## Категории программ

```
GET https://api.admitad.com/categories/
```

### Параметры

| Параметр | Описание |
|----------|----------|
| `language` | Язык категорий |
| `order_by` | Сортировка |

Возвращает иерархическую структуру с parent-child связями.

## Языки системы

```
GET https://api.admitad.com/languages/
```

Возвращает доступные языки интерфейса с флагами и кодами (ru, en, de и др.).

## Валюты

```
GET https://api.admitad.com/currencies/
```

Возвращает список валют с минимальными суммами выплат и символами.

## Курс валют

```
GET https://api.admitad.com/currencies/rate/
```

### Параметры

| Параметр | Описание |
|----------|----------|
| `base` | Исходная валюта |
| `target` | Целевая валюта |
| `date` | Дата (формат: dd.mm.YYYY) |

## Источники трафика

```
GET https://api.admitad.com/traffic/
```

Типы: Cashback, E-Mail-Marketing, Social Media, YouTube Channel и др.
