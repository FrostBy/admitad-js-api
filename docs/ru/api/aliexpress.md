# AliExpress

API метод для расчёта комиссии по товарам AliExpress.

**Scope:** `aliexpress_commission`

## Метод

| Метод | Эндпоинт |
|-------|----------|
| Расчёт комиссии | `POST /aliexpress/commission_rates/` |

## Расчёт комиссии

```
POST https://api.admitad.com/aliexpress/commission_rates/
```

### Параметры запроса

| Параметр | Тип | Обязательный | Описание |
|----------|-----|:------------:|----------|
| `urls` | list | Да | Список ссылок на товары |

### Пример запроса

```bash
curl --request POST \
  --url https://api.admitad.com/aliexpress/commission_rates/ \
  --header 'Authorization: Bearer access_token' \
  --header 'Content-Type: application/json' \
  --data '{"urls": ["https://aliexpress.com/item/123.html"]}'
```

### Поля ответа

| Поле | Тип | Описание |
|------|-----|----------|
| `product_name` | string/null | Название товара |
| `commission_rate` | string/null | Стандартная комиссия (%) |
| `hot_commission_rate` | string/null | Комиссия Hot Products (%) |
| `is_hot` | boolean | Является ли товар Hot Product |
| `url` | string | Ссылка на товар |

### Пример ответа

```json
{
  "commission_rates": [
    {
      "product_name": "Basketball size 7",
      "commission_rate": 5.0,
      "hot_commission_rate": 9.0,
      "is_hot": true,
      "url": "https://aliexpress.com/item/123.html"
    }
  ]
}
```
