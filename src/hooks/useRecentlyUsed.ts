"use client";

import { useState, useEffect } from "react";

const MAX_RECENTS = 6;

export function useRecentlyUsed() {
    const [recents, setRecents] = useState<string[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("devtools_hub_recents");
        if (saved) {
            try {
                setRecents(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse recents:", e);
            }
        }
    }, []);

    const trackUsage = (toolId: string) => {
        // Skip tracking if it's already first
        if (recents[0] === toolId) return;

        const updated = [toolId, ...recents.filter((id) => id !== toolId)].slice(0, MAX_RECENTS);
        setRecents(updated);
        localStorage.setItem("devtools_hub_recents", JSON.stringify(updated));
    };

    return { recents, trackUsage };
}
