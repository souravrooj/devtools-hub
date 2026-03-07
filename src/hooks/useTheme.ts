/**
 * hooks/useTheme.ts
 *
 * Custom React hook for managing dark/light mode.
 * Persists the user's preference in localStorage.
 *
 * Usage:
 *   const { theme, toggleTheme, setTheme } = useTheme();
 */

"use client";

import { useState, useEffect, useCallback } from "react";
import type { Theme } from "@/types";

const STORAGE_KEY = "devtools-hub-theme";

interface UseThemeReturn {
    /** Current resolved theme: "light" or "dark" */
    theme: "light" | "dark";
    /** Whether the current theme is dark */
    isDark: boolean;
    /** Toggle between light and dark */
    toggleTheme: () => void;
    /** Explicitly set the theme */
    setTheme: (theme: Theme) => void;
}

export function useTheme(): UseThemeReturn {
    const [theme, setThemeState] = useState<"light" | "dark">("dark");

    // On mount, read from localStorage or system preference
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
        if (stored === "light" || stored === "dark") {
            setThemeState(stored);
            applyTheme(stored);
        } else {
            // Default to system preference
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const resolved = prefersDark ? "dark" : "light";
            setThemeState(resolved);
            applyTheme(resolved);
        }
    }, []);

    const applyTheme = (t: "light" | "dark") => {
        const root = document.documentElement;
        if (t === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    };

    const setTheme = useCallback((newTheme: Theme) => {
        const resolved: "light" | "dark" =
            newTheme === "system"
                ? window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light"
                : newTheme;

        setThemeState(resolved);
        applyTheme(resolved);
        localStorage.setItem(STORAGE_KEY, resolved);
    }, []);

    const toggleTheme = useCallback(() => {
        setThemeState((prev) => {
            const next = prev === "dark" ? "light" : "dark";
            applyTheme(next);
            localStorage.setItem(STORAGE_KEY, next);
            return next;
        });
    }, []);

    return {
        theme,
        isDark: theme === "dark",
        toggleTheme,
        setTheme,
    };
}
