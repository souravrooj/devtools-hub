# 🧰 DevTools Hub

> A fast, modern, and beautiful collection of developer utilities — all in one place.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-teal?logo=tailwindcss)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://www.mongodb.com/atlas)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tools Included](#-tools-included)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**DevTools Hub** is a centralized web platform providing a collection of commonly used developer utilities. Instead of switching between multiple websites for small tasks, developers can access everything from a single, fast, and clean dashboard.

The platform is:
- **No login required** — just open and use
- **Instant results** — all tools run in the browser
### 🛠️ Core Technologies
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4 + Glassmorphism system
- **Database**: MongoDB Atlas (Persistence & Analytics)
- **Email**: Resend API (Notifications)
- **Typography**: Inter & JetBrains Mono
- **Deployment**: Vercel
- **Dark/Light mode** — comfortable at any time of day
- **Mobile friendly** — works on all screen sizes
- **Portfolio ready** — clean, professional design

---

## ✨ Features

- 🔍 **Smart Search** — instantly filter tools by keyword
- 🗂️ **Categories** — organized by tool type
- 🌙 **Dark / Light Mode** — persisted via localStorage
- 📋 **Copy to Clipboard** — one-click copy on all outputs
- ⚡ **Instant Processing** — no server round-trips for core tools
- 📱 **Responsive Layout** — desktop and mobile optimized
- 🧩 **Expandable Architecture** — easily add new tools

---

## 🛠️ Tools Included

### 🚀 All Tools (v1.0 & v2.0)

- 🧱 **JSON Formatter**: Instantly beautify or minify JSON with auto-formatting.
- 🔗 **Base64 Tool**: Securely encode and decode strings with a single click.
- 🎨 **Color Palette**: Generate harmonious palettes with contrast accessibility checks.
- 🔒 **Password Generator**: Create crypto-secure passwords with custom complexity.
- 📝 **Markdown Preview**: Live side-by-side rendering for formatted content.
- ⚡ **Regex Tester**: Real-time expression testing with group capture highlighting.
- 🛡️ **UUID Generator**: Bulk unique ID generation (v4) with multiple formats.
- 🕒 **Timestamp Converter**: Seamless switching between Unix and ISO formats.
- 📄 **Text Diff**: Compare strings line-by-line with visual highlights.
- 🔍 **Search Analytics**: Debounced tracking of query intent to prioritize new tools.
- 📩 **Persistent Feedback**: Forms for Suggestions & Contact saved directly to MongoDB.
- 🚀 **Real-time Notifications**: Immediate alerts via **Resend API** for all user inputs.

---

## 🧱 Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | [Next.js 16](https://nextjs.org/) | App Router, SSR, API routes |
| Tooling | [js-beautify](https://github.com/beautify-web/js-beautify) | Code formatting engine |
| Comparison | [diff](https://github.com/kpdecker/jsdiff) | Text diffing algorithm |
| PWA | [next-pwa](https://github.com/ducanh2912/next-pwa) | Offline support (Manifest & Icons) |
| Database | [MongoDB Atlas](https://www.mongodb.com/atlas) | Cloud document database |
| ORM | [Mongoose](https://mongoosejs.com/) | MongoDB schema modeling |
| Email | [Resend](https://resend.com/) | Transactional email notifications |
| Deployment | [Vercel](https://vercel.com/) | Hosting & CI/CD |

---

## 📁 Project Structure

```
devtools-hub/
├── public/                   # Static assets (icons, images)
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── (tools)/          # Route group for tool pages
│   │   │   ├── json-formatter/
│   │   │   ├── password-generator/
│   │   │   ├── markdown-preview/
│   │   │   ├── base64/
│   │   │   └── color-palette/
│   │   ├── api/              # Next.js API routes (backend)
│   │   │   └── tools/        # Tool-related API endpoints
│   │   ├── layout.tsx        # Root layout (fonts, theme)
│   │   ├── page.tsx          # Home / Dashboard page
│   │   └── globals.css       # Global styles
│   ├── components/           # Reusable React components
│   │   ├── ui/               # Generic UI elements (Button, Badge, etc.)
│   │   ├── layout/           # Header, Footer, Sidebar
│   │   └── tools/            # Tool-specific components
│   ├── lib/                  # Utility libraries
│   │   ├── mongodb.ts        # MongoDB connection helper
│   │   └── utils.ts          # General utility functions
│   ├── models/               # Mongoose database models
│   │   └── Tool.ts           # Tool schema (for future saved favorites)
│   ├── hooks/                # Custom React hooks
│   │   ├── useTheme.ts       # Dark/light mode hook
│   │   └── useClipboard.ts   # Copy to clipboard hook
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts          # Shared types (Tool, Category, etc.)
│   └── data/                 # Static tool metadata & categories
│       └── tools.ts          # Tool registry (title, route, category, icon)
├── docs/                     # Project documentation
│   ├── PROGRESS.md           # Task tracker (done / pending)
│   ├── USER_GUIDE.md         # End-user documentation
│   └── ARCHITECTURE.md       # Technical architecture reference
├── .env                      # Local environment variables (not committed)
├── .env.example              # Environment variable template (committed)
├── .gitignore                # Git ignored files
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project dependencies & scripts
└── README.md                 # This file
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

| Tool | Version | Link |
|------|---------|------|
| Node.js | ≥ 20.x | [nodejs.org](https://nodejs.org/) |
| npm | ≥ 10.x | Comes with Node.js |
| Git | Latest | [git-scm.com](https://git-scm.com/) |

### 1. Clone the Repository

```bash
git clone https://github.com/souravrooj/devtools-hub.git
cd devtools-hub
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Open `.env` and add your actual values. See [Environment Variables](#-environment-variables) below for details.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.  
The page reloads automatically as you edit files.

---

## 🔑 Environment Variables

All environment variables are documented in [`.env.example`](.env.example).

> ⚠️ **Never commit `.env` to Git.** It is already listed in `.gitignore`.

| Variable | Purpose | Required |
|----------|---------|----------|
| `MONGODB_URI` | Database connection for persistence | Yes |
| `RESEND_API_KEY` | Email notification service | Yes |
| `NEXT_PUBLIC_APP_URL` | Canonical URL for SEO/Sitemap | Yes |

---

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the local development server at `localhost:3000` |
| `npm run build` | Build the production-optimized bundle |
| `npm start` | Start the production server (after build) |
| `npm run lint` | Run ESLint to check for code issues |
| `npm run type-check` | Run TypeScript compiler check (no emit) |

---

## ☁️ Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com/) and import your repository
3. Add all required environment variables in the Vercel dashboard
4. Click **Deploy** — Vercel auto-deploys on every push to `main`

### MongoDB Atlas Setup

1. Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a new **free cluster** (M0 Sandbox)
3. Create a **database user** with read/write permissions
4. **Whitelist your IP** (or use `0.0.0.0/0` for Vercel)
5. Get the **connection string** and add it to `MONGODB_URI` in your environment variables

---

## 🗺️ Roadmap

- [x] v2.0 tools (Regex, UUID, Timestamp)
- [x] Advanced Features (Favorites, Recents, Stats)
- [x] Community Portal (Suggest a Tool)
- [x] Public API Documentation
- [ ] v3.0 (User Accounts & Cloud Sync)

---

## 🤝 Contributing

Contributions are welcome! To add a new tool or improvement:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-tool-name`
3. Add your changes following the existing code patterns
4. Commit: `git commit -m "feat: add [tool name] tool"`
5. Push: `git push origin feature/new-tool-name`
6. Open a Pull Request

Please follow conventional commit messages and keep each PR focused on one feature.

## 👨‍💻 Developer & Maintainer

**Sourav Rooj**
- 📧 **Email**: [souravrooj64@gmail.com](mailto:souravrooj64@gmail.com)
- 📞 **Phone**: +91 7001014799
- 🌐 **GitHub**: [github.com/souravrooj](https://github.com/souravrooj)
- 📍 **Location**: India

Have feedback, tool suggestions, or business inquiries? Feel free to reach out via the [Contact Us](https://devtools-hub.vercel.app/contact) page or directly via email.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">Made with ❤️ for developers by <a href="https://github.com/souravrooj">Sourav Rooj</a></p>

---

<div align="center">

Built with ❤️ as a portfolio project · [Live Demo](https://devtools-hub-pi-five.vercel.app/) · [Report a Bug](https://github.com/souravrooj/devtools-hub/issues)

</div>
