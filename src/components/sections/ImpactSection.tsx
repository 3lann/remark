"use client";

import { motion, useInView, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import GlassCard from "@/components/GlassCard";
import { useIsMobile } from "@/lib/useIsMobile";

function AnimatedCounter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { duration: 2500, bounce: 0 });
    const display = useTransform(springValue, (v: number) => Math.floor(v));

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, motionValue, value]);

    return (
        <div ref={ref} className="text-center relative z-10">
            <div className="flex items-baseline justify-center gap-1 mb-2">
                <motion.span className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-violet-200 to-indigo-400 tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    {display}
                </motion.span>
                {suffix && (
                    <span className="text-3xl md:text-5xl font-bold text-violet-400/90 drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                        {suffix}
                    </span>
                )}
            </div>
            <p className="text-white/60 text-sm md:text-base font-bold tracking-wide uppercase mt-4">{label}</p>
        </div>
    );
}

export default function ImpactSection() {
    const { t, dir } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });
    const isMobile = useIsMobile();

    const stats = [
        { val: 30, suffix: "+", label: t.impactStat1Label },
        { val: 9, suffix: "+", label: t.impactStat2Label },
        { val: 3, suffix: "", label: t.impactStat3Label },
        { val: 50, suffix: "+", label: t.impactStat4Label },
    ];

    return (
        <section ref={ref} id="impact" className="relative py-16 md:py-36 px-6 overflow-hidden" dir={dir}>
            {/* Ambient glow — desktop only */}
            {!isMobile && <div className="absolute inset-0 pointer-events-none z-[0]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px]" />
            </div>}

            <div className="relative z-10 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm font-bold uppercase tracking-[0.2em] mb-6">
                        {t.impactTag}
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white/90">
                        {t.impactTitle}
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                            className="h-full"
                        >
                            <GlassCard
                                hoverable
                                spotlightColor={i % 2 === 0 ? "rgba(139, 92, 246, 0.2)" : "rgba(6, 182, 212, 0.2)"}
                                className="h-full flex flex-col justify-center p-8 md:p-10 !rounded-[2rem] bg-white/[0.01]"
                            >
                                <AnimatedCounter value={stat.val} suffix={stat.suffix} label={stat.label} />
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
