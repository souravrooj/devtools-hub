/**
 * lib/utils.ts
 *
 * General utility functions used across the application.
 */

/**
 * Copy a string to the user's clipboard.
 * Returns true if successful, false otherwise.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        if (navigator?.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        }
        // Fallback for older browsers
        const el = document.createElement("textarea");
        el.value = text;
        el.style.position = "fixed";
        el.style.opacity = "0";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        return true;
    } catch {
        return false;
    }
}

/**
 * Safely parse a JSON string.
 * Returns { data, error } — error is null on success.
 */
export function safeParseJSON(input: string): {
    data: unknown;
    error: string | null;
} {
    try {
        return { data: JSON.parse(input), error: null };
    } catch (e) {
        return {
            data: null,
            error: e instanceof Error ? e.message : "Invalid JSON",
        };
    }
}

/**
 * Pretty-print a JSON value with indentation.
 */
export function prettyJSON(value: unknown, indent = 2): string {
    return JSON.stringify(value, null, indent);
}

/**
 * Encode a string to Base64.
 */
export function encodeBase64(text: string): string {
    try {
        return btoa(unescape(encodeURIComponent(text)));
    } catch {
        return "";
    }
}

/**
 * Decode a Base64 string.
 */
export function decodeBase64(encoded: string): string {
    try {
        return decodeURIComponent(escape(atob(encoded)));
    } catch {
        return "";
    }
}

/**
 * Generate a cryptographically secure random password.
 */
export function generatePassword(options: {
    length?: number;
    uppercase?: boolean;
    lowercase?: boolean;
    numbers?: boolean;
    symbols?: boolean;
}): string {
    const {
        length = 16,
        uppercase = true,
        lowercase = true,
        numbers = true,
        symbols = true,
    } = options;

    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    const syms = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let charset = "";
    if (uppercase) charset += upper;
    if (lowercase) charset += lower;
    if (numbers) charset += nums;
    if (symbols) charset += syms;

    if (!charset) return "";

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    return Array.from(array)
        .map((n) => charset[n % charset.length])
        .join("");
}

/**
 * Generate a random hex color code (e.g., "#a3f4c1").
 */
export function randomHexColor(): string {
    const bytes = new Uint8Array(3);
    crypto.getRandomValues(bytes);
    return (
        "#" +
        Array.from(bytes)
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("")
    );
}

/**
 * Convert a hex color to RGB components.
 */
export function hexToRgb(
    hex: string
): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}

/**
 * Determine if a hex color is "light" (returns true) or "dark" (returns false).
 * Used to decide text color (white vs black) on colored backgrounds.
 */
export function isLightColor(hex: string): boolean {
    const rgb = hexToRgb(hex);
    if (!rgb) return true;
    // Perceived luminance formula
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance > 0.5;
}

/**
 * Slugify a string for use in URLs.
 * e.g. "JSON Formatter" → "json-formatter"
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
}

/**
 * Truncate a string to a maximum length, appending "..." if truncated.
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + "...";
}
