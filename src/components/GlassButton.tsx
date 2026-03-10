"use client";

import React, { useState, useCallback } from "react";

interface Ripple {
    id: number;
    x: number;
    y: number;
}

interface GlassButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
    variant?: "primary" | "ghost" | "glass";
    size?: "sm" | "md" | "lg";
    className?: string;
    fullWidth?: boolean;
    id?: string;
}

export default function GlassButton({
    children,
    onClick,
    type = "button",
    disabled = false,
    loading = false,
    variant = "primary",
    size = "md",
    className = "",
    fullWidth = false,
    id,
}: GlassButtonProps) {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled || loading) return;

        const btn = e.currentTarget;
        const rect = btn.getBoundingClientRect();
        const id = Date.now();
        setRipples((prev) => [
            ...prev,
            { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
        ]);
        setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);

        onClick?.();
    }, [disabled, loading, onClick]);

    const base =
        "relative inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-300 select-none focus:outline-none active:scale-[0.95] overflow-hidden group";

    const sizes = {
        sm: "px-5 py-2.5 text-xs",
        md: "px-7 py-3 text-sm flex-1 sm:flex-none",
        lg: "px-10 py-4 text-base",
    };

    const variants = {
        primary:
            "bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] border border-white/50",
        ghost:
            "bg-white/5 text-white hover:bg-white/10 hover:border-white/30 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]",
        glass:
            "bg-gradient-to-r from-violet-600/80 to-blue-600/80 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_0_20px_rgba(139,92,246,0.5)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_0_40px_rgba(139,92,246,0.8)] border border-white/20 hover:border-white/40",
    };

    return (
        <button
            id={id}
            type={type}
            onClick={handleClick}
            disabled={disabled || loading}
            className={`
                ${base}
                ${sizes[size]}
                ${variants[variant]}
                ${fullWidth ? "w-full" : ""}
                ${disabled || loading ? "opacity-50 cursor-not-allowed hover:shadow-none" : "hover:-translate-y-1"}
                ${className}
            `}
        >
            {/* Inner shimmer sweep on hover */}
            {!disabled && !loading && (
                <span className="
                    pointer-events-none absolute top-0 left-0 right-0 bottom-0
                    bg-gradient-to-r from-transparent via-white/20 to-transparent
                    -translate-x-[150%] group-hover:translate-x-[150%] skew-x-[-20deg]
                    transition-transform duration-[1s] ease-in-out z-[0]
                " />
            )}

            {/* Ripple effects */}
            {ripples.map((r) => (
                <span
                    key={r.id}
                    className="pointer-events-none absolute rounded-full animate-ripple z-[0]"
                    style={{
                        left: r.x,
                        top: r.y,
                        width: 0,
                        height: 0,
                        transform: "translate(-50%, -50%)",
                        background:
                            variant === "primary"
                                ? "rgba(0,0,0,0.15)"
                                : "rgba(255,255,255,0.35)",
                    }}
                />
            ))}

            {loading && (
                <svg
                    className="animate-spin h-4 w-4 shrink-0 relative z-10"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                </svg>
            )}
            <span className="relative z-10 font-bold tracking-wide">{children}</span>
        </button>
    );
}

