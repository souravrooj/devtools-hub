/**
 * data/tools.ts
 *
 * The central registry of all developer tools.
 * Each tool entry drives the home page grid, search, filtering, and routing.
 *
 * To add a new tool:
 *   1. Add an entry here.
 *   2. Create the page at src/app/(tools)/<your-id>/page.tsx
 *   3. That's it — the home page and search update automatically.
 */

import type { Tool, Category, ToolCategory } from "@/types";

// ---------------------------------------------------------------------------
// Tool Registry
// ---------------------------------------------------------------------------

export const TOOLS: Tool[] = [
    {
        id: "json-formatter",
        name: "JSON Formatter",
        description:
            "Paste raw JSON and get a beautifully formatted, validated, and readable version instantly.",
        category: "formatting",
        icon: "🧱",
        href: "/tools/json-formatter",
        available: true,
        keywords: ["json", "format", "pretty", "validate", "api", "data"],
    },
    {
        id: "password-generator",
        name: "Password Generator",
        description:
            "Generate cryptographically secure passwords with customizable length and character sets.",
        category: "security",
        icon: "🔐",
        href: "/tools/password-generator",
        available: true,
        keywords: ["password", "secure", "random", "credentials", "generator"],
    },
    {
        id: "markdown-preview",
        name: "Markdown Preview",
        description:
            "Write Markdown and instantly see a live rendered preview alongside your text.",
        category: "developer",
        icon: "📝",
        href: "/tools/markdown-preview",
        available: true,
        keywords: ["markdown", "preview", "readme", "docs", "md", "render"],
    },
    {
        id: "base64",
        name: "Base64 Encoder / Decoder",
        description:
            "Encode plain text to Base64 or decode Base64 back to readable text — instantly.",
        category: "encoding",
        icon: "🔄",
        href: "/tools/base64",
        available: true,
        keywords: ["base64", "encode", "decode", "encoding", "text", "binary"],
    },
    {
        id: "color-palette",
        name: "Color Palette Generator",
        description:
            "Generate beautiful random color palettes with hex codes ready to copy for your projects.",
        category: "design",
        icon: "🎨",
        href: "/tools/color-palette",
        available: true,
        keywords: ["color", "palette", "hex", "design", "scheme", "random"],
    },

    // --- Coming Soon ---
    {
        id: "regex-tester",
        name: "Regex Tester",
        description:
            "Test regular expressions with live match highlighting and group capture results.",
        category: "developer",
        icon: "🔍",
        href: "/tools/regex-tester",
        available: true,
        keywords: ["regex", "regexp", "pattern", "match", "test"],
    },
    {
        id: "uuid-generator",
        name: "UUID Generator",
        description: "Generate RFC-compliant v1 and v4 UUIDs in bulk, instantly.",
        category: "developer",
        icon: "🆔",
        href: "/tools/uuid-generator",
        available: true,
        keywords: ["uuid", "guid", "unique", "id", "generator"],
    },
    {
        id: "timestamp-converter",
        name: "Timestamp Converter",
        description:
            "Convert Unix timestamps to human-readable dates and times across timezones.",
        category: "developer",
        icon: "⏱️",
        href: "/tools/timestamp-converter",
        available: true,
        keywords: ["timestamp", "unix", "date", "time", "epoch", "convert"],
    },
    {
        id: "text-diff",
        name: "Text Diff Checker",
        description:
            "Compare two blocks of text and highlight the differences line by line.",
        category: "text",
        icon: "📊",
        href: "/tools/text-diff",
        available: true,
        keywords: ["diff", "compare", "text", "difference", "changes"],
    },
    {
        id: "url-encoder",
        name: "URL Encoder / Decoder",
        description:
            "Encode special characters in URLs or decode percent-encoded URL strings.",
        category: "encoding",
        icon: "🔗",
        href: "/tools/url-encoder",
        available: true,
        keywords: ["url", "encode", "decode", "percent", "uri", "query"],
    },
    {
        id: "lorem-ipsum",
        name: "Lorem Ipsum Generator",
        description: "Generate placeholder text with custom paragraphs, sentences, or characters.",
        category: "text",
        icon: "📄",
        href: "/tools/lorem-ipsum",
        available: true,
        keywords: ["lorem", "ipsum", "placeholder", "text", "mock", "dummy"],
    },
    {
        id: "html-preview",
        name: "HTML Preview",
        description: "Write raw HTML, CSS, and JS and see a live rendered preview in a sandbox.",
        category: "developer",
        icon: "🖼️",
        href: "/tools/html-preview",
        available: true,
        keywords: ["html", "css", "js", "preview", "render", "sandbox"],
    },
    {
        id: "code-formatter",
        name: "Code Formatter",
        description: "Prettify and format JavaScript, TypeScript, CSS, and HTML code blocks.",
        category: "formatting",
        icon: "✨",
        href: "/tools/code-formatter",
        available: true,
        keywords: ["format", "prettier", "code", "javascript", "typescript", "css"],
    },
    {
        id: "number-base-converter",
        name: "Number Base Converter",
        description: "Convert numbers between Decimal, Hex, Binary, Octal, and custom bases instantly.",
        category: "developer",
        icon: "🔢",
        href: "/tools/number-base-converter",
        available: true,
        keywords: ["number", "base", "hex", "binary", "decimal", "octal", "convert"],
    },
    {
        id: "aspect-ratio-calculator",
        name: "Aspect Ratio Calculator",
        description: "Calculate dimensions and aspect ratios for images, video, and design projects.",
        category: "design",
        icon: "📐",
        href: "/tools/aspect-ratio-calculator",
        available: true,
        keywords: ["aspect", "ratio", "dimensions", "width", "height", "calculator"],
    },
    {
        id: "css-unit-converter",
        name: "CSS Unit Converter",
        description: "Convert between PX, REM, EM, PT and other CSS units with ease.",
        category: "developer",
        icon: "📏",
        href: "/tools/css-unit-converter",
        available: true,
        keywords: ["css", "unit", "px", "rem", "em", "convert", "responsive"],
    },
    {
        id: "jwt-decoder",
        name: "JWT Decoder",
        description: "Decode JSON Web Tokens instantly and securely. Inspect your token's header and payload.",
        category: "security",
        icon: "🔑",
        href: "/tools/jwt-decoder",
        available: true,
        keywords: ["jwt", "decode", "token", "auth", "json", "web", "token"],
    },
    {
        id: "hashing-tool",
        name: "Hashing Tool",
        description: "Generate secure cryptographic hashes (SHA-256, SHA-512) for any text instantly.",
        category: "security",
        icon: "🔒",
        href: "/tools/hashing-tool",
        available: true,
        keywords: ["hash", "sha256", "sha512", "sha1", "crypto", "security"],
    },
    {
        id: "yaml-to-json",
        name: "YAML ↔ JSON Converter",
        description: "Convert between YAML and JSON formats instantly. Perfect for configuration files.",
        category: "developer",
        icon: "📄",
        href: "/tools/yaml-to-json",
        available: true,
        keywords: ["yaml", "json", "convert", "format", "config"],
    },
    {
        id: "image-to-base64",
        name: "Image ↔ Base64 Converter",
        description: "Convert images to Base64 data strings for CSS/HTML or decode strings back to images.",
        category: "encoding",
        icon: "🖼️",
        href: "/tools/image-to-base64",
        available: true,
        keywords: ["image", "base64", "encode", "decode", "datauri", "convert"],
    },
    {
        id: "http-header-parser",
        name: "HTTP Header Parser",
        description: "Break down raw HTTP headers into a readable structure with common header explanations.",
        category: "developer",
        icon: "🔗",
        href: "/tools/http-header-parser",
        available: true,
        keywords: ["http", "header", "parser", "request", "response", "analyze"],
    },
    {
        id: "cron-generator",
        name: "Cron Expression Generator",
        description: "Create and debug crontab schedules with human-readable English descriptions.",
        category: "developer",
        icon: "⏰",
        href: "/tools/cron-generator",
        available: true,
        keywords: ["cron", "schedule", "crontab", "job", "time", "generator"],
    },
    {
        id: "svg-optimizer",
        name: "SVG Optimizer / Compressor",
        description: "Clean up SVG code by removing metadata and extra whitespace to reduce file size.",
        category: "design",
        icon: "⚡",
        href: "/tools/svg-optimizer",
        available: true,
        keywords: ["svg", "optimize", "compress", "vector", "clean", "size"],
    },
];

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export const CATEGORIES: Category[] = [
    { id: "formatting", label: "Formatting", icon: "🧱" },
    { id: "encoding", label: "Encoding", icon: "🔄" },
    { id: "security", label: "Security", icon: "🔐" },
    { id: "design", label: "Design", icon: "🎨" },
    { id: "developer", label: "Developer", icon: "💻" },
    { id: "text", label: "Text", icon: "📄" },
];

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

/** Return all available (live) tools */
export function getAvailableTools(): Tool[] {
    return TOOLS.filter((t) => t.available);
}

/** Return tools filtered by category */
export function getToolsByCategory(category: ToolCategory): Tool[] {
    return TOOLS.filter((t) => t.category === category);
}

/** Search tools by name, description, or keywords */
export function searchTools(query: string): Tool[] {
    const q = query.toLowerCase().trim();
    if (!q) return getAvailableTools();
    return TOOLS.filter((tool) => {
        const haystack = [
            tool.name,
            tool.description,
            tool.category,
            ...(tool.keywords ?? []),
        ]
            .join(" ")
            .toLowerCase();
        return haystack.includes(q);
    });
}

/** Find a single tool by its id/slug */
export function getToolById(id: string): Tool | undefined {
    return TOOLS.find((t) => t.id === id);
}
