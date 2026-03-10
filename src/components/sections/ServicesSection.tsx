"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/lib/useIsMobile";
import SpotlightCard from "@/components/ui/SpotlightCard";
import GlassCard from "@/components/GlassCard";

/* ─── Service icons (top-level) ─── */
const serviceIcons = [
    <svg key="biz" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    <svg key="ai" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    <svg key="mkt" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>,
];

/* ─── Sub-service item icons ─── */
const subIcons = [
    <svg key="s1" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    <svg key="s2" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    <svg key="s3" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    <svg key="s4" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
    <svg key="s5" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
    <svg key="s6" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>,
    <svg key="s7" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    <svg key="s8" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
];

const serviceColors = [
    { spotlight: "rgba(6, 182, 212, 0.2)", accent: "text-cyan-400", accentBg: "from-cyan-500/10 to-cyan-600/5", border: "border-cyan-500/20", dotBg: "bg-cyan-400", glowRing: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.25)]" },
    { spotlight: "rgba(139, 92, 246, 0.2)", accent: "text-violet-400", accentBg: "from-violet-500/10 to-violet-600/5", border: "border-violet-500/20", dotBg: "bg-violet-400", glowRing: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.25)]" },
    { spotlight: "rgba(245, 158, 11, 0.2)", accent: "text-amber-400", accentBg: "from-amber-500/10 to-amber-600/5", border: "border-amber-500/20", dotBg: "bg-amber-400", glowRing: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]" },
];

export default function ServicesSection() {
    const { t, dir } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const [expanded, setExpanded] = useState<number | null>(null);
    const isMobile = useIsMobile();

    const services = [
        { title: t.svc1Title, sub: t.svc1Sub, items: t.svc1Items },
        { title: t.svc2Title, sub: t.svc2Sub, items: t.svc2Items },
        { title: t.svc3Title, sub: t.svc3Sub, items: t.svc3Items },
    ];

    /* ═══════════════════════════════════════════════
       MOBILE: Swipeable full-content cards
       ═══════════════════════════════════════════════ */
    if (isMobile) {
        return (
            <section ref={ref} id="services" className="relative py-16 overflow-hidden" dir={dir}>
                <div className="relative z-10">
                    {/* Section header */}
                    <div className="text-center mb-8 px-6">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-bold uppercase tracking-[0.2em] mb-4">
                            {t.servicesTag}
                        </span>
                        <h2 className="text-2xl font-extrabold text-white/90 mb-2">
                            {t.servicesTitle}
                        </h2>
                        <p className="text-white/50 text-xs max-w-sm mx-auto leading-relaxed">
                            {t.servicesSub}
                        </p>
                    </div>

                    {/* Horizontal swipeable cards — equal size */}
                    <div className="mobile-swipe-container">
                        {services.map((svc, i) => {
                            const color = serviceColors[i];
                            const isExpanded = expanded === i;
                            const MAX_VISIBLE = 2;
                            const hasMore = svc.items.length > MAX_VISIBLE;
                            const visibleItems = isExpanded ? svc.items : svc.items.slice(0, MAX_VISIBLE);

                            return (
                                <div key={i} className="mobile-swipe-card">
                                    <div className="rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 flex flex-col" style={{ minHeight: 280 }}>
                                        {/* Card header */}
                                        <div className="flex items-center gap-2.5 mb-3">
                                            <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${color.accentBg} border ${color.border} flex items-center justify-center ${color.accent} shrink-0`}>
                                                <div className="scale-[0.55] flex items-center justify-center w-full h-full">
                                                    {serviceIcons[i]}
                                                </div>
                                            </div>
                                            <h3 className="text-sm font-bold text-white/90 flex-1">
                                                {svc.title}
                                            </h3>
                                        </div>

                                        <p className="text-white/40 text-[11px] leading-relaxed mb-3">
                                            {svc.sub}
                                        </p>

                                        {/* Sub-services list — limited */}
                                        <div className="space-y-2 border-t border-white/5 pt-2.5 flex-1">
                                            {visibleItems.map((item: { title: string; desc: string }, j: number) => (
                                                <div key={j} className="flex items-start gap-2">
                                                    <div className={`${color.accent} opacity-40 mt-0.5 shrink-0 scale-[0.8]`}>
                                                        {subIcons[j % subIcons.length]}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-white/70 font-semibold text-[11px]">{item.title}</h4>
                                                        <p className="text-white/25 text-[10px] leading-relaxed line-clamp-2">{item.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Show more / less toggle */}
                                        {hasMore && (
                                            <button
                                                onClick={() => setExpanded(isExpanded ? null : i)}
                                                className={`mt-2 text-[10px] font-bold uppercase tracking-widest ${color.accent} opacity-70 self-center`}
                                            >
                                                {isExpanded ? `▲ ${t.servicesCollapse || 'Less'}` : `▼ ${t.servicesExplore || 'More'} (${svc.items.length - MAX_VISIBLE})`}
                                            </button>
                                        )}

                                        {/* CTA */}
                                        <div className="mt-3 pt-2.5 border-t border-white/5 flex justify-center">
                                            <a href="#contact">
                                                <button className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest bg-white/5 ${color.accent} border ${color.border}`}>
                                                    {t.servicesApply}
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Swipe indicator */}
                    <div className="flex items-center justify-center gap-2 mt-3 text-white/20 text-[10px] font-medium tracking-wider">
                        <span className="swipe-indicator inline-block">←</span>
                        <span className="uppercase">swipe</span>
                        <span className="swipe-indicator inline-block">→</span>
                    </div>
                </div>
            </section>
        );
    }

    /* ═══════════════════════════════════════════════
       DESKTOP: Original expand/collapse cards
       ═══════════════════════════════════════════════ */
    return (
        <section ref={ref} id="services" className="relative py-16 md:py-40 px-6 overflow-hidden" dir={dir}>
            {/* Ambient glow — desktop only */}
            {!isMobile && <div className="absolute inset-0 pointer-events-none z-[0]">
                <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[700px] h-[700px] bg-violet-600/8 rounded-full blur-[200px]" />
            </div>}

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-sm font-bold uppercase tracking-[0.2em] mb-6">
                        {t.servicesTag}
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white/90 mb-4">
                        {t.servicesTitle}
                    </h2>
                    <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto">
                        {t.servicesSub}
                    </p>
                </motion.div>

                {/* Service cards — full width, stacked */}
                <div className="space-y-8">
                    {services.map((svc, i) => {
                        const color = serviceColors[i];
                        const isOpen = expanded === i;

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 25 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: 0.1 + i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                            >
                                <SpotlightCard
                                    spotlightColor={color.spotlight}
                                    className={`!rounded-[2.5rem] transition-all duration-500 ${color.glowRing} group`}
                                >
                                    {/* Header — always visible */}
                                    <div
                                        className="flex flex-col md:flex-row md:items-center gap-5 md:gap-6 p-5 sm:p-6 md:p-10 cursor-pointer select-none"
                                        onClick={() => setExpanded(isOpen ? null : i)}
                                    >
                                        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${color.accentBg} border ${color.border} flex items-center justify-center ${color.accent} shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                            <div className="scale-90 md:scale-100 flex items-center justify-center w-full h-full">
                                                {serviceIcons[i]}
                                            </div>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white/90 mb-2 group-hover:text-white transition-colors">
                                                {svc.title}
                                            </h3>
                                            <p className="text-white/50 text-sm md:text-base leading-relaxed group-hover:text-white/70 transition-colors line-clamp-2">
                                                {svc.sub}
                                            </p>
                                        </div>

                                        <button className={`shrink-0 flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest border transition-all duration-300 w-full md:w-auto ${isOpen ? `${color.accent} ${color.border} bg-white/5` : `text-white/40 border-white/10 hover:border-white/20 hover:text-white/60`}`}>
                                            {isOpen ? t.servicesCollapse : t.servicesExplore}
                                            <motion.span
                                                animate={{ rotate: isOpen ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="text-lg"
                                            >
                                                ↓
                                            </motion.span>
                                        </button>
                                    </div>

                                    {/* Expandable sub-services grid */}
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-5 sm:px-6 md:px-10 pb-6 sm:pb-8 md:pb-10 pt-2">
                                                    <div className="border-t border-white/5 pt-5 md:pt-8" />
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                                                        {svc.items.map((item: { title: string; desc: string }, j: number) => (
                                                            <motion.div
                                                                key={j}
                                                                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                                transition={{ delay: j * 0.05, duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                                                                className="h-full"
                                                            >
                                                                <GlassCard
                                                                    hoverable
                                                                    spotlightColor={color.spotlight}
                                                                    className="h-full p-4 sm:p-5 md:p-6 !rounded-2xl transition-all duration-300 group/item"
                                                                >
                                                                    <div className={`${color.accent} opacity-60 group-hover/item:opacity-100 mb-4 transition-opacity`}>
                                                                        {subIcons[j % subIcons.length]}
                                                                    </div>
                                                                    <h4 className="text-white/90 font-bold text-sm mb-2 group-hover/item:text-white transition-colors">
                                                                        {item.title}
                                                                    </h4>
                                                                    <p className="text-white/40 text-xs leading-relaxed group-hover/item:text-white/60 transition-colors">
                                                                        {item.desc}
                                                                    </p>
                                                                </GlassCard>
                                                            </motion.div>
                                                        ))}
                                                    </div>

                                                    <motion.div
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: svc.items.length * 0.05 + 0.2, duration: 0.4 }}
                                                        className="mt-8 flex justify-center border-t border-white/5 pt-8"
                                                    >
                                                        <a href="#contact">
                                                            <button className={`px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 bg-white/5 hover:bg-white/10 ${color.accent} border ${color.border} hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]`}>
                                                                {t.servicesApply}
                                                            </button>
                                                        </a>
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </SpotlightCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
