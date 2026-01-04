# Баннеры

API методы для получения баннеров партнёрских программ.

## Методы

| Метод | Эндпоинт | Scope |
|-------|----------|-------|
| Баннеры программы | `GET /banners/{c_id}/` | `banners` |
| Баннеры для площадки | `GET /banners/{c_id}/website/{w_id}/` | `banners_for_website` |

## Баннеры программы

```
GET https://api.admitad.com/banners/{c_id}/
```

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `landing` | integer | ID лендинга |
| `mobile_content` | string | `true` или `false` |
| `uri_scheme` | string | `http`, `https`, `no` |
| `offset` | integer | Смещение |
| `limit` | integer | Количество записей |

### Пример запроса

```bash
curl -L -H 'Authorization: Bearer access_token' -X GET \
  https://api.admitad.com/banners/340/?limit=2
```

### Поля ответа

| Поле | Описание |
|------|----------|
| `id` | ID баннера |
| `name` | Название |
| `size_width` | Ширина (px) |
| `size_height` | Высота (px) |
| `creation_date` | Дата создания (ISO 8601) |
| `type` | Формат (PNG, JPEG, GIF, link, flash) |
| `banner_image_url` | URL изображения |
| `banner_flashobj_url` | URL flash-файла |
| `is_flash` | Флаг flash |
| `mobile_content` | Флаг мобильного контента |

## Баннеры для площадки

```
GET https://api.admitad.com/banners/{c_id}/website/{w_id}/
```

### Дополнительные поля ответа

| Поле | Описание |
|------|----------|
| `direct_link` | Партнёрская ссылка баннера |
| `html_code` | HTML-код для вставки |

### Пример запроса

```bash
curl -L -H 'Authorization: Bearer access_token' -X GET \
  https://api.admitad.com/banners/340/website/30220/?limit=2
```
