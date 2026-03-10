"use client";

import { useEffect } from "react";

/**
 * Prevents pinch-to-zoom on iOS Safari which ignores
 * the viewport meta tag's user-scalable=no.
 * Uses gesturestart/gesturechange event listeners.
 */
export default function NoZoom() {
    useEffect(() => {
        const preventZoom = (e: Event) => {
            e.preventDefault();
        };

        // iOS Safari gesture events (pinch zoom)
        document.addEventListener("gesturestart", preventZoom, { passive: false });
        document.addEventListener("gesturechange", preventZoom, { passive: false });
        document.addEventListener("gestureend", preventZoom, { passive: false });

        // Prevent double-tap zoom
        let lastTouchEnd = 0;
        const preventDoubleTap = (e: TouchEvent) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        };
        document.addEventListener("touchend", preventDoubleTap, { passive: false });

        return () => {
            document.removeEventListener("gesturestart", preventZoom);
            document.removeEventListener("gesturechange", preventZoom);
            document.removeEventListener("gestureend", preventZoom);
            document.removeEventListener("touchend", preventDoubleTap);
        };
    }, []);

    return null;
}
