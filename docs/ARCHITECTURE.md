# 🏗️ DevTools Hub — Architecture & Developer Guide

> For developers who want to understand, contribute to, or extend the codebase.

---

## 📐 Tech Stack Overview

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | Next.js | 16.x | App Router, SSR, API routes |
| Language | TypeScript | 5.x | Type safety across the codebase |
| Styling | Tailwind CSS | 4.x | Utility-first CSS |
| Database | MongoDB Atlas | Cloud | Document storage |
| ORM | Mongoose | 8.x | Schema modeling & queries |
| Markdown | Marked | 15.x | Renders Markdown in the preview tool |
| Deployment | Vercel | — | Hosting & CI/CD |
| Runtime | Node.js | ≥ 20 | Development & build |

---

## 📁 Full Project Structure

```
devtools-hub/
│
├── docs/                         # Project documentation
│   ├── PROGRESS.md               # Task tracker (what's done / pending)
│   ├── USER_GUIDE.md             # End-user documentation
│   └── ARCHITECTURE.md           # This file — technical reference
│
├── public/                       # Static assets served at root URL
│   └── *.svg                     # Icons, logos
│
├── src/
│   │
│   ├── app/                      # Next.js App Router — pages & API routes
│   │   │
│   │   ├── (tools)/              # Route group (no URL segment added)
│   │   │   └── tools/            # All tool pages live at /tools/...
│   │   │       ├── json-formatter/page.tsx
│   │   │       ├── password-generator/page.tsx
│   │   │       ├── markdown-preview/page.tsx
│   │   │       ├── base64/page.tsx
│   │   │       └── color-palette/page.tsx
│   │   │
│   │   ├── api/                  # Backend API routes (server-side only)
│   │   │   └── tools/            # Tool-related endpoints
│   │   │       └── route.ts      # GET /api/tools — returns tool registry
│   │   │
│   │   ├── layout.tsx            # Root layout (HTML, fonts, theme)
│   │   ├── page.tsx              # Home dashboard page ( / )
│   │   ├── globals.css           # Global styles & design tokens
│   │   └── favicon.ico
│   │
│   ├── components/               # Reusable React components
│   │   ├── ui/                   # Generic, headless UI components
│   │   │   ├── Button.tsx        # Reusable button variants
│   │   │   ├── Badge.tsx         # Category / status badges
│   │   │   ├── ToolCard.tsx      # Tool card for the grid
│   │   │   ├── SearchBar.tsx     # Search input component
│   │   │   └── CopyButton.tsx    # Copy-to-clipboard button
│   │   │
│   │   ├── layout/               # Page layout structure components
│   │   │   ├── Header.tsx        # Navigation bar + theme toggle
│   │   │   ├── Footer.tsx        # Site footer
│   │   │   └── ToolPageLayout.tsx# Shared wrapper for tool pages
│   │   │
│   │   └── tools/                # Tool-specific components
│   │       ├── JsonFormatter.tsx
│   │       ├── PasswordGenerator.tsx
│   │       ├── MarkdownPreview.tsx
│   │       ├── Base64Tool.tsx
│   │       └── ColorPalette.tsx
│   │
│   ├── lib/                      # Utility libraries (non-React)
│   │   ├── mongodb.ts            # MongoDB connection (singleton, HMR-safe)
│   │   └── utils.ts              # Pure utility functions
│   │
│   ├── models/                   # Mongoose database models
│   │   └── Tool.ts               # Tool usage stats schema
│   │
│   ├── hooks/                    # Custom React hooks
│   │   ├── useClipboard.ts       # Copy to clipboard with auto-reset
│   │   └── useTheme.ts           # Dark/light mode with localStorage
│   │
│   ├── types/                    # Shared TypeScript type definitions
│   │   └── index.ts              # Tool, Category, ApiResponse, Theme...
│   │
│   └── data/                     # Static data / configuration
│       └── tools.ts              # Tool registry — the single source of truth
│
├── .env                          # Local secrets (gitignored)
├── .env.example                  # Template for required env vars (committed)
├── .gitignore
├── next.config.ts                # Next.js configuration
├── postcss.config.mjs            # PostCSS for Tailwind
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript compiler options
├── package.json
└── README.md                     # Project overview & quick-start
```

---

## 🔀 Routing Architecture

The project uses **Next.js App Router** (`src/app/`).

### Route Map

| URL | File | Description |
|-----|------|-------------|
| `/` | `src/app/page.tsx` | Home dashboard |
| `/tools/json-formatter` | `src/app/(tools)/tools/json-formatter/page.tsx` | JSON Formatter tool |
| `/tools/password-generator` | `src/app/(tools)/tools/password-generator/page.tsx` | Password Generator |
| `/tools/markdown-preview` | `src/app/(tools)/tools/markdown-preview/page.tsx` | Markdown Preview |
| `/tools/base64` | `src/app/(tools)/tools/base64/page.tsx` | Base64 Encoder/Decoder |
| `/tools/color-palette` | `src/app/(tools)/tools/color-palette/page.tsx` | Color Palette Generator |
| `/api/tools` | `src/app/api/tools/route.ts` | Returns tool registry as JSON |

### Why a Route Group `(tools)`?
The `(tools)` folder is a **Next.js route group**. The parentheses mean the folder name is NOT included in the URL — it's purely for organizing files. This allows tools to share a layout without affecting the URL structure.

---

## 🧩 Component Architecture

### Design Principles
- **Server Components by default** — only add `"use client"` when a component needs interactivity
- **Composition over configuration** — small, focused components composed together
- **Colocation** — tool-specific logic lives in `components/tools/`, not scattered across pages

### Component Responsibility

| Component | Type | Responsibility |
|-----------|------|---------------|
| `Header.tsx` | Client | Nav links, theme toggle button |
| `Footer.tsx` | Server | Static links, copyright |
| `ToolCard.tsx` | Server | Renders a single tool in the grid |
| `SearchBar.tsx` | Client | Controlled input, filters tool list |
| `CopyButton.tsx` | Client | Clipboard copy + "Copied!" feedback |
| `Button.tsx` | Server | Styled button with size/variant props |
| `ToolPageLayout.tsx` | Server | Consistent tool page shell (title, back btn) |

---

## 🗄️ Data Layer

### Tool Registry (`src/data/tools.ts`)
The **single source of truth** for all tools. Every tool card, search result, and route is driven by this array.

**To add a new tool:**
1. Add an entry to the `TOOLS` array in `src/data/tools.ts`
2. Create the page at `src/app/(tools)/tools/<your-tool-id>/page.tsx`
3. Done — it automatically appears on the home page and in search

### MongoDB (Optional)
MongoDB is only used for **optional features** — the app works fully without it in v1.

| Model | Collection | Purpose |
|-------|-----------|---------|
| `Tool` | `tools` | Tracks page view counts per tool |

The connection is managed in `src/lib/mongodb.ts` using a module-level cache to prevent connection pool exhaustion during Next.js hot-reload in development.

---

## 🔧 Key Utility Functions (`src/lib/utils.ts`)

| Function | Purpose |
|----------|---------|
| `copyToClipboard(text)` | Copies text, falls back for old browsers |
| `safeParseJSON(input)` | Returns `{ data, error }` — never throws |
| `prettyJSON(value, indent)` | Formats a JS value as indented JSON string |
| `encodeBase64(text)` | UTF-8 safe Base64 encoding |
| `decodeBase64(encoded)` | UTF-8 safe Base64 decoding |
| `generatePassword(options)` | Crypto-secure password generation |
| `randomHexColor()` | Crypto-secure random `#rrggbb` hex |
| `hexToRgb(hex)` | Converts hex to `{r, g, b}` |
| `isLightColor(hex)` | Perceived luminance check for text contrast |
| `slugify(text)` | "JSON Formatter" → "json-formatter" |
| `truncate(text, max)` | Truncates with `...` |

---

## 🪝 Custom Hooks

### `useClipboard(options?)`
```typescript
const { copied, copy, error } = useClipboard({ resetDelay: 2000 });
// copy("text") → sets copied=true for 2s then resets
```

### `useTheme()`
```typescript
const { theme, isDark, toggleTheme, setTheme } = useTheme();
// Reads from localStorage, applies "dark" class to <html>
```

---

## 🌐 API Routes

### `GET /api/tools`
Returns the full list of tools from the registry.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "json-formatter",
      "name": "JSON Formatter",
      "description": "...",
      "category": "formatting",
      "icon": "🧱",
      "href": "/tools/json-formatter",
      "available": true
    }
  ]
}
```

---

## 🎨 Design System

### Colors (CSS Custom Properties)
Defined in `src/app/globals.css` as CSS variables, switched by the `.dark` class on `<html>`.

```css
/* Light theme */
--bg-primary: #ffffff;
--bg-secondary: #f8fafc;
--text-primary: #0f172a;
--accent: #6366f1;       /* Indigo */

/* Dark theme */
--bg-primary: #0a0a0f;
--bg-secondary: #111827;
--text-primary: #f8fafc;
--accent: #818cf8;
```

### Typography
- **Font**: `Inter` (Google Fonts) — loaded via `next/font/google`
- **Mono Font**: `JetBrains Mono` — for code blocks in JSON Formatter and Markdown Preview

### Spacing & Layout
- Max content width: `1280px`
- Tool grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Component padding: `p-4` (mobile) → `p-6` (desktop)

---

## 🔐 Environment Variables Reference

| Variable | Used In | Required | Notes |
|----------|---------|----------|-------|
| `MONGODB_URI` | `src/lib/mongodb.ts` | No (v1) | MongoDB Atlas connection string |
| `MONGODB_DB_NAME` | `src/lib/mongodb.ts` | No (v1) | Defaults to `devtools_hub` |
| `NEXT_PUBLIC_APP_URL` | SEO meta tags | Yes | Base URL of the app |
| `NEXT_PUBLIC_APP_NAME` | Layout, metadata | Yes | Display name |
| `NEXT_PUBLIC_APP_DESCRIPTION` | SEO meta tags | Yes | Meta description |
| `NEXTAUTH_SECRET` | NextAuth (future) | Future | Session encryption key |
| `NEXTAUTH_URL` | NextAuth (future) | Future | Canonical URL |

---

## 🚢 Deployment

### Vercel (Recommended)
1. Push `main` branch to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Add environment variables from `.env.example` in Vercel's dashboard
4. Deploy — auto-deploys on every `git push`

### Build Command
```bash
npm run build
```

### Required Vercel Environment Variables
- `MONGODB_URI`
- `MONGODB_DB_NAME`
- `NEXT_PUBLIC_APP_URL` (set to your Vercel domain)
- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_APP_DESCRIPTION`

---

## 🧪 Development Workflow

```bash
# Install dependencies
npm install

# Start dev server (with HMR)
npm run dev

# Type-check without building
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build
```

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.x | Framework |
| `react` | 19.x | UI library |
| `react-dom` | 19.x | DOM rendering |
| `typescript` | 5.x | Type safety |
| `tailwindcss` | 4.x | Styling |
| `mongoose` | 8.x | MongoDB ORM |
| `marked` | 15.x | Markdown Parser |
| `@tailwindcss/postcss` | 4.x | Tailwind PostCSS plugin |

---

## 🤝 Contributing a New Tool

1. **Add to registry** — `src/data/tools.ts`
   ```typescript
   {
     id: "your-tool-id",
     name: "Your Tool Name",
     description: "One sentence description",
     category: "developer",
     icon: "🔧",
     href: "/tools/your-tool-id",
     available: true,
     keywords: ["keyword1", "keyword2"],
   }
   ```

2. **Create the page** — `src/app/(tools)/tools/your-tool-id/page.tsx`
   - Import and use `ToolPageLayout` for consistent shell
   - Keep all processing logic client-side (`"use client"`)
   - Use `useClipboard` hook for copy functionality

3. **Create the component** — `src/components/tools/YourTool.tsx`

4. **Test** — `npm run dev` → navigate to `/tools/your-tool-id`

5. **Update docs** — Add tool to `docs/USER_GUIDE.md` and update status in `docs/PROGRESS.md`

6. **Commit & push**
   ```bash
   git add .
   git commit -m "feat: add [tool name] tool"
   git push
   ```
