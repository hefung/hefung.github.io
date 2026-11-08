<h1 align="center">Dux VitePress Theme</h1>

<p align="center">
  <strong>🎨 A modern, elegant, and customizable VitePress documentation theme</strong>
</p>

<p align="center">
  Build beautiful, multilingual, component-rich documentation sites with ease.
</p>

<p align="center">
  <a href="https://aivst.github.io/" target="_blank">📖 Documentation</a> ·
  <a href="https://github.com/aivst/" target="_blank">🏠 GitHub</a> · 
</p>

<p align="center">
  <a href="./README.md">简体中文</a> · <strong>English</strong>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-green.svg" />
  <img alt="VitePress" src="https://img.shields.io/badge/vp1.x-3b82f6" />
  <img alt="Node" src="https://img.shields.io/badge/Node-18%2B-333" />
  <img alt="PNPM" src="https://img.shields.io/badge/PNPM-9-ffa500" />
  <img alt="Stars" src="https://img.shields.io/github/stars/aivst/vptheme?style=social" />
</p>

---

## ✨ Highlights

- 🚀 **Ready to use**: one-command install, zero-config quick start
- 🎨 **Modern design**: elegant UI with light/dark modes
- 🌍 **Internationalization**: full i18n support and jump page
- 📚 **Multiple layouts**: Home / Doc / Page / Sponsor / Changelog / Jump
- 🔍 **Local search**: built-in search with graceful fallback
- 🧩 **Rich components**: custom containers, code groups, badges, Mermaid, etc.
- ⚡ **High performance**: powered by VitePress 1.x

---

## 🧱 Monorepo Structure

```
vpmonorepo/
├─ packages/
│  ├─ theme/     # Theme source (published package)
│  └─ docs/      # Documentation site (demo & docs)
├─ .github/workflows/deploy-docs.yml  # GitHub Pages deployment
└─ README.md / README.en.md
```

> Docs deploy to `https://aivst.github.io/` by default.

---

## 🚀 Get Started (Use in your project)

### 1. Install

```bash
pnpm add @aivst/vptheme
# or
npm i @aivst/vptheme
```

### 2. Enable the theme

```ts
// .vitepress/theme/index.ts
import theme from "@aivst/vptheme";
import "@aivst/vptheme/dist/index.css";

export default {
  extends: theme,
};
```

### 3. Minimal config (recommended)

Automatically injects `vite.ssr.noExternal`, `optimizeDeps.exclude`, and enables Mermaid runtime rendering (powered by `vpmermaid-renderer`, GPL-3.0-only).

```ts
// .vitepress/config.mts
import { withDuxTheme } from "@aivst/vptheme/config";

export default withDuxTheme({
  // your config...
});
```

### 4. Homepage example

```md
---
layout: home
hero:
  name: My Project
  text: Modern VitePress Theme
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
features:
  - icon: ⚡
    title: Fast
    details: Built on VitePress
---
```

---

## 🧭 Working with Docs (this repo)

```bash
# Develop docs site
pnpm dev

# Build all packages (theme and docs)
pnpm build

# Build docs only
pnpm build:docs

# Preview docs
pnpm preview
```

> The docs build auto-sets `base` by environment:
>
> - Local: `/`
> - GitHub Pages: `/vptheme/`

---

## 🧩 Layouts & Features

| Layout      | Use Case      | Notes                                   |
| ----------- | ------------- | --------------------------------------- |
| `home`      | Homepage      | Hero / Features / QuickStart            |
| `doc`       | Docs          | Sidebar / TOC / Doc footer              |
| `page`      | Single page   | Centered content + PageHero             |
| `sponsor`   | Sponsor       | Payment methods / supporters / stats    |
| `changelog` | Releases      | Version history / categories            |
| `jump`      | Language jump | Detect & redirect to preferred language |

See the online docs for more examples and API.

---

## 🌐 Deploy to GitHub Pages

This repo ships with `.github/workflows/deploy-docs.yml`.

- Triggers: push to `main` or manual run
- Artifact: `packages/docs/.vitepress/dist`
- URL: `https://aivst.github.io/`

If deploying in your own repo, make sure:

- VitePress `base` matches your repo name (e.g., `/vptheme/`)
- Actions has Pages permissions and uploads the dist

---

## 🤝 Contributing

Issues and PRs are welcome:

1. Fork the repo
2. Create a branch: `feat/your-feature`
3. Commit and open a PR

---

## 📄 License

[MIT](./LICENSE)

---

<p align="center">
  Made with ❤️ by <a href="https:/aivst.github.io" target="_blank">aivst</a>
</p>
