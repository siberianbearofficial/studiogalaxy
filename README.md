<p align="center">
  <img src="https://studiogalaxy.ru/img/logo.svg" alt="Studio Galaxy Logo" height="120">
</p>

<h1 align="center">Studio Galaxy</h1>

<p align="center">
  🎶 High-end студия звукозаписи "Галактика" | Лендинг и API для обработки заказов через Telegram
</p>

---

## О проекте

**Studio Galaxy** — это лендинг для студии звукозаписи «Галактика», реализованный на Angular с backend-частью на FastAPI.
Сайт предоставляет посетителям информацию об услугах студии и позволяет отправить заявку, чтобы записаться и/или проконсультироваться с менеджером.

Цель проекта — обеспечить простой и интуитивный интерфейс для коммуникации между клиентами и звукозаписывающей студией.

---

## Стек

### Frontend:
- **Angular** 18.2.8
- SCSS / HTML
- Адаптивная верстка

### Backend:
- **FastAPI**
- Telegram Bot API и jinja2 для оформления заказов

---

## Основная структура

```
studio-galaxy/
├── src                      # Angular-приложение
├── backend                  # FastAPI-приложение
└── README.md
```

---

## Локальный запуск

### Frontend

```bash
npm install
ng serve
```

По умолчанию приложение доступно на: [http://localhost:4200](http://localhost:4200)

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

## Линтеры / форматтеры

```bash
npm run format
```

---

## 🌐 Деплоймент

Основной сайт доступен по адресу: [https://studiogalaxy.ru](https://studiogalaxy.ru)

Также есть демо-стенды фронтенда на [Netlify](https://studiogalaxy.netlify.app) (все урлы кроме основного создаются динамически во время работы над PR)
