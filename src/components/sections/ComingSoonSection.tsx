"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/lib/useIsMobile";

/* ── Hex pattern (same as GlassCard) ── */
const HEX_PATTERN_SVG = `data:image/svg+xml,%3Csvg width='28' height='49' viewBox='0 0 28 49' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='rgba(230,237,247,0.6)' fill-rule='evenodd'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.65V49h-2z' /%3E%3C/g%3E%3C/svg%3E`;

const comingSoonItems = [
    {
        /* AI Workspace / Virtual Work */
        icon: (
            <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {/* Briefcase/Workspace outline */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                {/* Core/AI Node inside */}
                <circle cx="12" cy="13" r="2" fill="currentColor" className="animate-pulse" />
                {/* Digital connections */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11v-2m-3 4H7m10 0h-2" />
            </svg>
        ),
        color: "from-blue-500/15 to-cyan-500/5",
        border: "border-blue-500/15",
        glow: "rgba(59,130,246,0.25)",
        accent: "text-blue-400",
        spotlightColor: "rgba(59,130,246,0.15)",
    },
    {
        /* AI Sharks (Cyber Shark) */
        icon: (
            <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                {/* Modern Shark Profile */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 14C5 12 8 10 11.5 9.5C15 9 18 10.5 21 12.5C19 14.5 15 16.5 11 16.5C7 16.5 5 15.5 4 14Z" />
                {/* Tail fin */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 14L2 10.5M4 14L2.5 18" />
                {/* Dorsal fin */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9.5L14 4L16.5 10" />
                {/* Bottom fin */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 16.5L9.5 20L13.5 16.5" />
                {/* Artificial Eye */}
                <circle cx="17.5" cy="12" r="1" fill="currentColor" className="animate-pulse" stroke="none" />
                {/* Cyber lines/Gills */}
                <path strokeLinecap="round" strokeWidth={1} d="M14 11.5v2.5M15.5 12v2.5" opacity="0.6" />
            </svg>
        ),
        color: "from-red-500/15 to-orange-500/5",
        border: "border-red-500/15",
        glow: "rgba(239,68,68,0.25)",
        accent: "text-red-400",
        spotlightColor: "rgba(239,68,68,0.15)",
    },
    {
        /* UGC AI / Creator Intelligence */
        icon: (
            <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {/* AI Node as Head */}
                <circle cx="9" cy="7" r="2" fill="currentColor" className="animate-pulse" />
                <circle cx="9" cy="7" r="3" strokeWidth={1.5} strokeDasharray="2 2" className="origin-[9px_7px] animate-[spin_6s_linear_infinite]" />

                {/* Creator Body holding scanner */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-1a5 5 0 015-5h2a5 5 0 013 1" />

                {/* Floating Media/Play Node */}
                <circle cx="18" cy="15" r="4.5" strokeWidth={1.5} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 13.5l3.5 1.5-3.5 1.5v-3z" />

                {/* Connection Line */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} strokeDasharray="2 2" d="M12 15h2.5" opacity="0.5" />
            </svg>
        ),
        color: "from-violet-500/15 to-purple-500/5",
        border: "border-violet-500/15",
        glow: "rgba(139,92,246,0.25)",
        accent: "text-violet-400",
        spotlightColor: "rgba(139,92,246,0.15)",
    },
    {
        /* AI News / Global Data Streams */
        icon: (
            <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {/* Digital Newspaper/Tablet */}
                <rect x="6" y="4" width="12" height="16" rx="2" strokeWidth={1.5} fill="none" />
                {/* Headlines (Data lines) */}
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 8h6M9 12h4M9 16h6" />
                {/* Orbiting AI rings representing real-time global news */}
                <ellipse cx="12" cy="12" rx="10" ry="3.5" strokeWidth={1.2} strokeDasharray="3 3" className="origin-center animate-[spin_8s_linear_infinite]" opacity="0.6" />
                <ellipse cx="12" cy="12" rx="3.5" ry="10" strokeWidth={1.2} strokeDasharray="3 3" className="origin-center animate-[spin_8s_linear_infinite_reverse]" opacity="0.4" />
                {/* Live News Indicator / AI Node */}
                <circle cx="18" cy="6" r="1.5" fill="currentColor" className="animate-pulse" stroke="none" />
            </svg>
        ),
        color: "from-emerald-500/15 to-teal-500/5",
        border: "border-emerald-500/15",
        glow: "rgba(16,185,129,0.25)",
        accent: "text-emerald-400",
        spotlightColor: "rgba(16,185,129,0.15)",
    },
];

/* ── Card with hex pattern ── */
function ComingSoonCard({ item, index, isInView, isAr, isMobile }: {
    item: typeof comingSoonItems[0];
    index: number;
    isInView: boolean;
    isAr: boolean;
    isMobile: boolean;
}) {
    const [shimmer, setShimmer] = useState<{ x: number; y: number } | null>(null);
    const [isFocused, setIsFocused] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setShimmer({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setIsFocused(true);
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setShimmer({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }, []);

    const handleMouseLeave = useCallback(() => {
        setShimmer(null);
        setIsFocused(false);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 + index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
            <div
                ref={cardRef}
                onMouseEnter={isMobile ? undefined : handleMouseEnter}
                onMouseMove={isMobile ? undefined : handleMouseMove}
                onMouseLeave={isMobile ? undefined : handleMouseLeave}
                className={`group relative flex flex-col items-center justify-center gap-4 p-8 md:p-10 rounded-2xl md:rounded-3xl overflow-hidden border ${item.border} transition-all duration-500 hover:scale-[1.03] cursor-default ${isMobile ? 'bg-white/[0.03]' : 'bg-white/[0.02]'}`}
                style={{
                    boxShadow: isFocused ? `0 0 40px ${item.glow}, 0 8px 32px rgba(0,0,0,0.3)` : `0 0 0 rgba(0,0,0,0)`,
                    transition: 'box-shadow 0.5s ease, transform 0.5s ease, border-color 0.5s ease',
                }}
            >
                {/* Hex Pattern Overlay */}
                {!isMobile && (
                    <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out z-[0]"
                        style={{
                            backgroundImage: `url("${HEX_PATTERN_SVG}")`,
                            backgroundSize: '16px',
                            opacity: isFocused ? 0.045 : 0.02,
                            mixBlendMode: 'plus-lighter',
                        }}
                    />
                )}

                {/* Spotlight follow effect */}
                {!isMobile && shimmer && (
                    <div
                        className="pointer-events-none absolute -inset-px z-[0]"
                        style={{
                            background: `radial-gradient(250px circle at ${shimmer.x}px ${shimmer.y}px, ${item.spotlightColor}, transparent 50%)`,
                        }}
                    />
                )}

                {/* Top shimmer sweep */}
                {!isMobile && (
                    <span className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s] ease-in-out z-[1]" />
                )}

                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} pointer-events-none z-[0]`} />

                {/* Icon */}
                <div className={`relative z-10 ${item.accent} opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110`}>
                    {item.icon}
                </div>

                {/* Pulsing "Soon" badge */}
                <div className="relative z-10 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse" />
                    <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-white/25 group-hover:text-white/45 transition-colors">
                        {isAr ? "قريباً" : "Soon"}
                    </span>
                </div>

                {/* Top border glow line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full z-[1]" />
            </div>
        </motion.div>
    );
}

export default function ComingSoonSection() {
    const { dir } = useLanguage();
    const isAr = dir === "rtl";
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const isMobile = useIsMobile();

    return (
        <section ref={ref} className="relative py-16 md:py-28 px-6 overflow-hidden" dir={dir}>
            {/* Ambient glow */}
            {!isMobile && (
                <div className="absolute inset-0 pointer-events-none z-[0]">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.015] rounded-full blur-[150px]" />
                </div>
            )}

            <div className="relative z-10 max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/40 text-xs font-bold uppercase tracking-[0.2em] mb-4 md:mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        {isAr ? "قريباً" : "Coming Soon"}
                    </span>
                    <h2 className="text-2xl md:text-4xl font-extrabold text-white/80 mb-3">
                        {isAr ? "منتجات جديدة قيد التطوير" : "New Products in Development"}
                    </h2>
                    <p className="text-white/35 text-sm md:text-base max-w-lg mx-auto">
                        {isAr
                            ? "نعمل على إطلاق خدمات مبتكرة ستغير قواعد اللعبة"
                            : "We're building innovative services that will be game-changers"}
                    </p>
                </motion.div>

                {/* Icons Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {comingSoonItems.map((item, i) => (
                        <ComingSoonCard
                            key={i}
                            item={item}
                            index={i}
                            isInView={isInView}
                            isAr={isAr}
                            isMobile={isMobile}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
