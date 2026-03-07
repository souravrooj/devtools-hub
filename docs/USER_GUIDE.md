# 📘 DevTools Hub — User Guide

> Everything you need to know about using DevTools Hub.
> **Live App:** [https://devtools-hub-pi-five.vercel.app/](https://devtools-hub-pi-five.vercel.app/)

---

## 🌟 What is DevTools Hub?

**DevTools Hub** is a free, browser-based collection of developer utilities. It brings together the small everyday tools that developers need into one clean, fast platform.

**The problem it solves:**  
As a developer, you constantly need small utilities — format a JSON response, generate a secure password, preview some Markdown, or decode a Base64 string. Normally, you'd open a different website for each one, deal with ads, or install separate software.

**DevTools Hub fixes this** by putting everything in one place. No login. No ads. No installs. Just open and use.

---

## 🎯 Who Is It For?

| User Type | Example Use Case |
|-----------|-----------------|
| **Backend Developers** | Format API JSON responses during debugging |
| **Frontend Developers** | Preview component documentation in Markdown |
| **Security Professionals** | Generate strong, unique passwords instantly |
| **Full-Stack Developers** | Encode/decode Base64 for auth headers |
| **UI/UX Designers** | Generate color palettes for new projects |
| **Programming Students** | Learn encoding formats and data structures |
| **DevOps Engineers** | Decode Base64-encoded Kubernetes secrets |

---

## 🚀 Getting Started

You don't need to sign up, log in, or install anything.

1. Open the website in your browser
2. Browse tools on the **Home Dashboard** or use **Search**  
3. Click any tool card to open it  
4. Paste your input, get your output instantly  
5. Click **Copy** to copy the result to your clipboard

That's it.

---

## 🗺️ Pages & Routes

### `/` — Home Dashboard

**What it is:** The main landing page and tool hub.

**What you'll find:**
- Platform title and tagline
- A **search bar** to filter tools by keyword (e.g. "json", "password", "color")
- **Category filter tabs** to browse by type (Formatting, Security, Encoding, etc.)  
- A **grid of tool cards**, each showing:
  - Tool icon and name
  - Short description
  - Category badge
  - "Open Tool" button

**How to use:**
- Type in the search bar to instantly filter tools
- Click a category tab to see only tools in that group
- Click any tool card to open that tool

---

### `/tools/json-formatter` — JSON Formatter

**What it does:** Takes messy, unformatted JSON and makes it clean and readable.

**Why you need it:**  
When working with APIs, the JSON responses are usually minified (no spaces or line breaks) and hard to read. This tool formats it perfectly so you can see the structure instantly.

**How to use:**
1. Paste your raw JSON into the input area
2. The formatter validates and displays it in the output area instantly
3. If the JSON is invalid, you'll see a clear error message with the location of the problem
4. Click **Copy** to copy the formatted output
5. Click **Clear** to reset and start fresh

**Features:**
- ✅ Auto-formats on paste
- ✅ Syntax highlighting (keys, values, strings, numbers)
- ✅ Validates JSON — shows error message if invalid
- ✅ Copy formatted output
- ✅ Clear / Reset button

**Example Input:**
```
{"name":"John","age":30,"city":"New York","hobbies":["reading","coding"]}
```

**Example Output:**
```json
{
  "name": "John",
  "age": 30,
  "city": "New York",
  "hobbies": [
    "reading",
    "coding"
  ]
}
```

---

### `/tools/password-generator` — Password Generator

**What it does:** Generates cryptographically secure random passwords you can use immediately.

**Why you need it:**  
Weak passwords are a major security risk. Reusing passwords across sites is even worse. This tool generates strong, unique passwords in one click so you never have to think of one manually.

**How to use:**
1. Adjust the **length slider** (8–128 characters)
2. Toggle which character types to include:
   - Uppercase letters (A-Z)
   - Lowercase letters (a-z)
   - Numbers (0-9)
   - Special symbols (!@#$%^&*)
3. The password is **generated automatically** as you adjust options
4. Click **Regenerate** for a new password
5. Click **Copy** to copy it to your clipboard

**Features:**
- ✅ Cryptographically secure (uses `crypto.getRandomValues`)
- ✅ Adjustable length (8–128 characters)
- ✅ Toggle: uppercase, lowercase, numbers, symbols
- ✅ Strength indicator (Weak / Fair / Strong / Very Strong)
- ✅ One-click regenerate
- ✅ One-click copy

---

### `/tools/markdown-preview` — Markdown Preview

**What it does:** Renders Markdown text into formatted HTML in real time as you type.

**Why you need it:**  
Writing README files, documentation, or GitHub comments in Markdown can be tricky without a preview. This tool shows you exactly how your Markdown will look, split side-by-side with the editor.

**How to use:**
1. Type or paste your Markdown into the **left editor panel**
2. The **right preview panel** updates live as you type
3. Click **Copy Markdown** to copy your raw Markdown text
4. Click **Clear** to reset

**Supported Markdown:**
| Syntax | Result |
|--------|--------|
| `# Heading 1` | Large heading |
| `## Heading 2` | Medium heading |
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `` `code` `` | Inline code |
| ` ```code block``` ` | Fenced code block |
| `- item` | Bullet list |
| `1. item` | Numbered list |
| `[link](url)` | Clickable link |
| `![alt](url)` | Image |
| `> quote` | Blockquote |

---

### `/tools/base64` — Base64 Encoder / Decoder

**What it does:** Converts text to Base64 encoding or decodes Base64 back to plain text.

**Why you need it:**  
Base64 is used everywhere in web development — encoding images in CSS, authentication tokens in HTTP headers (`Authorization: Bearer ...`), and data in URLs. You often need to quickly encode or decode a value when debugging or building integrations.

**How to use:**
1. Choose the mode: **Encode** or **Decode** (toggle button)
2. Paste your input into the text area
3. The result appears instantly in the output panel
4. Click **Copy** to copy the result
5. Click **Swap** to move the output back to input (for quick round-trips)
6. Click **Clear** to reset

**Encode example:**
- Input: `Hello, World!`
- Output: `SGVsbG8sIFdvcmxkIQ==`

**Decode example:**
- Input: `SGVsbG8sIFdvcmxkIQ==`
- Output: `Hello, World!`

**Common Use Cases:**
- Decoding JWT token payloads
- Encoding configuration values for environment variables
- Decoding Base64 images embedded in HTML/CSS
- Working with Basic Auth headers

---

### `/tools/color-palette` — Color Palette Generator

**What it does:** Generates random color palettes with 5 harmonious colors, each with its hex code.

**Why you need it:**  
Picking good colors for a project is hard. This tool generates ready-to-use color palettes instantly. Each color shows its hex code so you can copy it directly into your CSS.

**How to use:**
1. Click **Generate Palette** to create a random set of 5 colors
2. Hover over any color swatch to see its full details
3. Click a **hex code** to copy it to your clipboard
4. Click **Generate Again** to get a completely new palette
5. Click **Lock** on any individual color to keep it while regenerating the others (coming soon)

**Features:**
- ✅ 5-color palette per generation
- ✅ Hex code display for each color
- ✅ Click hex code to copy
- ✅ "Light" or "Dark" label to know what text color to use on top
- ✅ Instant regeneration

---

## 🔍 Search Feature

The search bar on the home page filters tools in real time.

**Try searching for:**
- `json` → finds JSON Formatter
- `password` → finds Password Generator
- `encode` → finds Base64 and URL Encoder
- `color` → finds Color Palette Generator
- `preview` → finds Markdown Preview

Search checks the tool name, description, and hidden keywords.

---

## 🗂️ Categories

| Category | Tools |
|----------|-------|
| **Formatting** | JSON Formatter |
| **Security** | Password Generator |
| **Developer** | Markdown Preview, Regex Tester (v2), UUID Generator (v2) |
| **Encoding** | Base64, URL Encoder (v2) |
| **Design** | Color Palette Generator |
| **Text** | Text Diff Checker (v2), Lorem Ipsum (v2) |

---

## 🌙 Dark Mode / Light Mode

DevTools Hub supports both dark and light themes.

- Click the **moon/sun icon** in the header to toggle
- Your preference is saved automatically in your browser
- On your first visit, the theme matches your **system preference**

---

## 📋 Copy to Clipboard

Every tool has a **Copy** button on its output.

- Click it once — the button changes to **"Copied!"** for 2 seconds
- The text is now in your clipboard, ready to paste anywhere

---

## 📱 Mobile Support

DevTools Hub is fully responsive:
- On **desktop**: tools show a split-pane layout (input + output side by side)
- On **tablet**: tools stack vertically with full width panels
- On **mobile**: single column layout with scrollable panels

---

## ❓ Frequently Asked Questions

**Q: Do I need to create an account?**  
A: No. All tools work without any signup or login.

**Q: Is my data stored anywhere?**  
A: No. All processing happens directly in your browser. Nothing you type is sent to any server or stored in a database.

**Q: Is this free to use?**  
A: Yes. Completely free, forever.

**Q: Can I use this offline?**  
A: You need an internet connection to load the website the first time, but all tool processing happens in your browser — so if you have the page open, tools will work even if your connection drops.

**Q: I found a bug. How do I report it?**  
A: Open an issue on [GitHub](https://github.com/souravrooj/devtools-hub/issues).

**Q: Can I suggest a new tool?**  
A: Yes! Open a GitHub issue with the label `feature-request`.

---

## 🔗 Useful Links

| Resource | Link |
|----------|------|
| GitHub Repository | [github.com/souravrooj/devtools-hub](https://github.com/souravrooj/devtools-hub) |
| Report a Bug | [GitHub Issues](https://github.com/souravrooj/devtools-hub/issues) |
| Project Progress | [docs/PROGRESS.md](./PROGRESS.md) |
| Architecture Guide | [docs/ARCHITECTURE.md](./ARCHITECTURE.md) |
