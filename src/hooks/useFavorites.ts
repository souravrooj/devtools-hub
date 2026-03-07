"use client";

import { useState, useEffect } from "react";

export function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>([]);

    // Initialize from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("devtools_hub_favorites");
        if (saved) {
            try {
                setFavorites(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse favorites:", e);
            }
        }
    }, []);

    const toggleFavorite = (toolId: string) => {
        const updated = favorites.includes(toolId)
            ? favorites.filter((id) => id !== toolId)
            : [...favorites, toolId];

        setFavorites(updated);
        localStorage.setItem("devtools_hub_favorites", JSON.stringify(updated));
    };

    const isFavorite = (toolId: string) => favorites.includes(toolId);

    return { favorites, toggleFavorite, isFavorite };
}
