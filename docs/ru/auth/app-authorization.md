# Авторизация приложения на admitad.com

## Обзор

Пользователи могут создавать интегрированные приложения, встраиваемые через IFrame на страницы admitad.com. Такие приложения могут отображать информацию с помощью любых технологий, поддерживаемых браузером (HTML, JavaScript, AJAX, Flash и прочие).

**Важно:** Поскольку admitad.com использует защищенный протокол HTTPS, приложение также должно работать по HTTPS с установленным SSL-сертификатом на сервере.

## Параметры запуска приложения

При отображении приложения через строку запроса передаются два параметра:

| Параметр | Описание |
|----------|----------|
| `signed_request` | Содержит зашифрованные данные пользователя и токены доступа |
| `retloc` | URL страницы, в которую встроен iframe с приложением |

## Пример запроса

```
https://getcoupons.ru/?signed_request=d3ddf1100c5e47a466cafe1e0dc8cb40a4f7bc3219744be1e049dd6d7a76450c.eyJ1c2VybmFtZSI6ICJhZHZlcnRpc2VyMSIsICJmaXJzdF9uYW1lIjogIm5hbWUiLCAibGFzdF9uYW1lIjogInN1cm5hbWUiLCAiYWxnb3JpdGhtIjogIkhNQUMtU0hBMjU2IiwgImxhbmd1YWdlIjogInJ1IiwgImFjY2Vzc190b2tlbiI6ICIwODdkNmNjNDM3IiwgImV4cGlyZXNfaW4iOiA2MDgwMCwgImlkIjogMTMwOTAsICJyZWZyZXNoX3Rva2VuIjogIjc1MjFiNzY0MGMifQ==&retloc=https%3A//apps.admitad.com/ru/getcoupons/
```

Пример значения `retloc`:
```
https%3A//admitad.com/appstore/app/getcoupon/
```
