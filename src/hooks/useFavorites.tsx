"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

interface FavoritesContextType {
    favorites: string[];
    toggleFavorite: (toolId: string) => Promise<void>;
    isFavorite: (toolId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [deviceId, setDeviceId] = useState<string | null>(null);

    // Initialize deviceId and fetch favorites ONCE
    useEffect(() => {
        let storedId = localStorage.getItem("devtools_hub_device_id");
        if (!storedId) {
            const newId = uuidv4();
            localStorage.setItem("devtools_hub_device_id", newId);
            storedId = newId;
        }
        setDeviceId(storedId);

        const fetchFavorites = async () => {
            try {
                const res = await fetch("/api/user/favorites", {
                    headers: { "x-device-id": storedId as string }
                });
                const json = await res.json();
                if (json.success) {
                    setFavorites(json.data.favorites);
                }
            } catch (err) {
                console.error("Failed to fetch favorites from API:", err);
                const saved = localStorage.getItem("devtools_hub_favorites");
                if (saved) {
                    setFavorites(JSON.parse(saved));
                }
            }
        };

        fetchFavorites();
    }, []);

    const toggleFavorite = async (toolId: string) => {
        if (!deviceId) return;

        const isCurrentlyFavorite = favorites.includes(toolId);
        const updated = isCurrentlyFavorite
            ? favorites.filter((id) => id !== toolId)
            : [...favorites, toolId];

        setFavorites(updated);
        localStorage.setItem("devtools_hub_favorites", JSON.stringify(updated));

        try {
            await fetch("/api/user/favorites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-device-id": deviceId
                },
                body: JSON.stringify({ toolId })
            });
        } catch (err) {
            console.error("Failed to sync favorite with API:", err);
        }
    };

    const isFavorite = (toolId: string) => favorites.includes(toolId);

    return (
        <FavoritesContext.Provider value= {{ favorites, toggleFavorite, isFavorite }
}>
    { children }
    </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
}
