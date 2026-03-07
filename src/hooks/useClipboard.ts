/**
 * hooks/useClipboard.ts
 *
 * Custom React hook for copying text to the clipboard.
 *
 * Usage:
 *   const { copied, copy } = useClipboard();
 *   <button onClick={() => copy("hello world")}>
 *     {copied ? "Copied!" : "Copy"}
 *   </button>
 */

"use client";

import { useState, useCallback } from "react";
import { copyToClipboard } from "@/lib/utils";

interface UseClipboardOptions {
    /** How long (in ms) to keep the "copied" state before resetting. Default: 2000 */
    resetDelay?: number;
}

interface UseClipboardReturn {
    /** True for `resetDelay` ms after a successful copy */
    copied: boolean;
    /** Copy the given text to the clipboard */
    copy: (text: string) => Promise<void>;
    /** Whether the last copy attempt failed */
    error: boolean;
}

export function useClipboard(
    options: UseClipboardOptions = {}
): UseClipboardReturn {
    const { resetDelay = 2000 } = options;

    const [copied, setCopied] = useState(false);
    const [error, setError] = useState(false);

    const copy = useCallback(
        async (text: string) => {
            const success = await copyToClipboard(text);
            if (success) {
                setCopied(true);
                setError(false);
                setTimeout(() => setCopied(false), resetDelay);
            } else {
                setError(true);
                setTimeout(() => setError(false), resetDelay);
            }
        },
        [resetDelay]
    );

    return { copied, copy, error };
}
