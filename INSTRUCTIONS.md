# 📱 Быстрый старт: cryptoEssay Mini App

## 1. Деплой на GitHub Pages (бесплатно)

### Настройка репозитория:
1. **Settings** → **Pages** → Source: **GitHub Actions**
2. Создайте `.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: ["main"]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: "20" }
      - run: npm ci && npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: "./dist" }
  deploy:
    runs-on: ubuntu-latest
    needs: build
    environment: { name: github-pages, url: "${{ steps.deployment.outputs.page_url }}" }
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

3. Обновите `vite.config.ts`:
```typescript
base: '/Exp1/',  // имя репозитория
```

**URL:** `https://Gerstep.github.io/Exp1/`

---

## 2. Создание бота

```
@BotFather:
/newbot → cryptoEssay Bot → cryptoessay_miniapp_bot

/mybots → Bot Settings → Menu Button → Configure
→ URL: https://Gerstep.github.io/Exp1/
→ Текст: Открыть
```

---

## 3. Кнопка в канале @cryptoEssay

**Через @ControllerBot:**
1. Добавьте @ControllerBot админом канала
2. Создайте пост с inline-кнопкой:
   - Текст: `🔗 Связь & Ad`
   - URL: `https://t.me/cryptoessay_miniapp_bot`
3. Закрепите пост

---

## Локальная разработка

```bash
npm install
npm run dev     # → http://localhost:5173
npm run build   # → папка dist/
```
