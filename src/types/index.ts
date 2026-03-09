/**
 * types/index.ts
 *
 * Shared TypeScript types used across the DevTools Hub application.
 */

// ---------------------------------------------------------------------------
// Tool Types
// ---------------------------------------------------------------------------

/** Category identifier for tools */
export type ToolCategory =
    | "formatting"
    | "encoding"
    | "security"
    | "design"
    | "developer"
    | "text";

/** Metadata for a single developer tool */
export interface Tool {
    /** Unique slug used in the URL, e.g. "json-formatter" */
    id: string;
    /** Display name, e.g. "JSON Formatter" */
    name: string;
    /** One-sentence description shown on tool cards */
    description: string;
    /** The category this tool belongs to */
    category: ToolCategory;
    /** Emoji icon for quick visual identification */
    icon: string;
    /** Relative URL path e.g. "/tools/json-formatter" */
    href: string;
    /** Whether the tool is available in the current version */
    available: boolean;
    /** Optional array of search keywords to help users find the tool */
    keywords?: string[];
    /** Number of times the tool has been viewed/used (from API) */
    viewCount?: number;
    /** Number of times the tool has been favorited (from API) */
    favoritesCount?: number;
}

// ---------------------------------------------------------------------------
// Category Types
// ---------------------------------------------------------------------------

export interface Category {
    id: ToolCategory;
    label: string;
    icon: string;
}

// ---------------------------------------------------------------------------
// Password Generator Types
// ---------------------------------------------------------------------------

export interface PasswordOptions {
    length: number;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
}

// ---------------------------------------------------------------------------
// Color Palette Types
// ---------------------------------------------------------------------------

export interface PaletteColor {
    hex: string;
    name?: string;
}

export interface ColorPalette {
    id: string;
    colors: PaletteColor[];
}

// ---------------------------------------------------------------------------
// API Response Types
// ---------------------------------------------------------------------------

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// ---------------------------------------------------------------------------
// Theme Types
// ---------------------------------------------------------------------------

export type Theme = "light" | "dark" | "system";
