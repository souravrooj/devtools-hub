"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

interface ResizableLayoutProps {
    left: React.ReactNode;
    right: React.ReactNode;
    initialSplit?: number;
    minWidth?: number;
    className?: string;
}

export default function ResizableLayout({
    left,
    right,
    initialSplit = 50,
    minWidth = 25,
    className = "",
}: ResizableLayoutProps) {
    const [split, setSplit] = useState(initialSplit);
    const [isResizing, setIsResizing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const startResizing = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        // Prevent default to avoid selection during drag
        setIsResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
        document.body.style.cursor = "default";
    }, []);

    const resize = useCallback(
        (e: MouseEvent | TouchEvent) => {
            if (!isResizing || !containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;

            let newSplit = ((clientX - containerRect.left) / containerRect.width) * 100;

            // Boundaries to prevent one panel from becoming too small
            newSplit = Math.max(minWidth, Math.min(100 - minWidth, newSplit));
            setSplit(newSplit);

            document.body.style.cursor = "col-resize";
        },
        [isResizing, minWidth]
    );

    useEffect(() => {
        if (isResizing) {
            window.addEventListener("mousemove", resize);
            window.addEventListener("mouseup", stopResizing);
            window.addEventListener("touchmove", resize, { passive: false });
            window.addEventListener("touchend", stopResizing);
        } else {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
            window.removeEventListener("touchmove", resize);
            window.removeEventListener("touchend", stopResizing);
        }
        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", stopResizing);
            window.removeEventListener("touchmove", resize);
            window.removeEventListener("touchend", stopResizing);
            document.body.style.cursor = "default";
        };
    }, [isResizing, resize, stopResizing]);

    return (
        <div
            ref={containerRef}
            className={`resizable-container ${className} ${isResizing ? "resizing" : ""}`}
        >
            <div
                className="resizable-panel resizable-left"
                style={{ width: `${split}%` }}
            >
                {left}
            </div>

            <div
                className="resizable-gutter"
                onMouseDown={startResizing}
                onTouchStart={startResizing}
            >
                <div className="gutter-line" />
            </div>

            <div
                className="resizable-panel resizable-right"
                style={{ flex: 1 }}
            >
                {right}
            </div>
        </div>
    );
}
