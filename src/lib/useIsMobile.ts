"use client";

import { useState, useEffect } from "react";

/** Returns true on mobile/touch devices (< 768px or touch-only). */
export function useIsMobile(): boolean {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => {
            const mobile =
                window.innerWidth < 768 ||
                ("ontouchstart" in window && !window.matchMedia("(pointer: fine)").matches);
            setIsMobile(mobile);
        };
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return isMobile;
}
