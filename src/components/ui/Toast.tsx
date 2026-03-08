"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";

type ToastType = "success" | "error" | "info";

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

    const showToast = (message: string, type: ToastType = "success") => {
        setToast({ message, type });
    };

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                setToast(null);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <div
                    className="animate-fade-in-scale"
                    style={{
                        position: "fixed",
                        bottom: "2rem",
                        right: "2rem",
                        zIndex: 9999,
                        pointerEvents: "none",
                    }}
                >
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "1rem 1.5rem",
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        borderLeft: toast.type === "success" ? "4px solid var(--success)" :
                            toast.type === "error" ? "4px solid var(--danger)" : "4px solid var(--accent)",
                        borderRadius: "var(--radius-lg)",
                        boxShadow: "var(--shadow-lg)",
                        color: "var(--text-primary)",
                        fontWeight: 600,
                        fontSize: "0.9375rem",
                        minWidth: "300px",
                        backdropFilter: "blur(10px)",
                        pointerEvents: "auto",
                    }}>
                        <span style={{ fontSize: "1.25rem" }}>
                            {toast.type === "success" ? "✅" : toast.type === "error" ? "❌" : "ℹ️"}
                        </span>
                        <span>{toast.message}</span>
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    );
}

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast must be used within ToastProvider");
    return context;
};
