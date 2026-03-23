"use client";

import { useEffect } from "react";
import { useRecentlyUsed } from "@/hooks/useRecentlyUsed";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

interface ToolPageLayoutProps {
    id: string; // Add ID for tracking
    title: string;
    description: string;
    icon: string;
    children: React.ReactNode;
}

export default function ToolPageLayout({
    id,
    title,
    description,
    icon,
    children,
}: ToolPageLayoutProps) {
    const { trackUsage } = useRecentlyUsed();

    // Usage tracking
    useEffect(() => {
        if (!id) return;

        // Client-side local history
        if (id !== "suggest" && id !== "api-docs") {
            trackUsage(id);
        }

        // Server-side global analytics
        fetch(`/api/tools/${id}/use`, { method: "POST" })
            .then(res => res.json())
            .catch(err => console.error(`[Usage] Failed to track ${id}:`, err));
    }, [id]);

    return (
        <div className="tool-page-wrapper">
            <div className="container">
                {/* Tool header */}
                <header className="tool-header animate-fade-in">
                    <div className="tool-header-icon">
                        {icon}
                    </div>
                    <div className="tool-header-content">
                        <h1 className="tool-title">{title}</h1>
                        <p className="tool-description">{description}</p>
                    </div>
                </header>

                {/* Tool content */}
                <div className="tool-content-area animate-fade-in" style={{ animationDelay: "0.05s" }}>
                    <ErrorBoundary fallbackTitle={`Error loading ${title}`}>
                        {children}
                    </ErrorBoundary>
                </div>
            </div>
        </div>
    );
}
