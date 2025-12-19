# qp-site (v1)

Лендинг/сайт **Quantum Post** (Vite + React + GSAP), мультистраничная сборка.

## Запуск локально

```bash
npm install
npm run dev
```

Vite dev server по умолчанию: `http://localhost:5173`.

## Сборка

```bash
npm run build
npm run preview
```

## GitHub Pages

Деплой настроен через GitHub Actions (workflow `Deploy to GitHub Pages`).

- URL (после первого деплоя): `https://rybushkin.github.io/qp-site/`
- В репозитории включи: **Settings → Pages → Build and deployment → Source: GitHub Actions**

## Структура

- `index.html`, `page1.html`, `blog.html`, `service-*.html`, `blog-*.html` — HTML entrypoints (multi-page).
- `src/` — React код, стили и данные.
- `styles.css` — общие стили.


