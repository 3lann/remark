"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/lib/useIsMobile";
import GlassCard from "@/components/GlassCard";

const clientNames = [
    "Toyota", "Lexus", "SLB", "UNICEF", "UNDP", "Channel 4",
    "Arte", "Schlumberger", "Zain Iraq", "Midea", "NABLA",
    "Raihana Group", "HARF'", "Glitter", "IICC", "ONAX",
    "Al-Handal", "Al-Shaheera", "Mada Al-Bilad", "Zuiy",
    "Raihana HyperMarket", "Joker", "UFOG", "No.1"
];

const row1 = clientNames.slice(0, 12);
const row2 = clientNames.slice(12).concat(clientNames.slice(0, 4));

function MarqueeRow({ items, reverse = false, isMobile = false }: { items: string[]; reverse?: boolean; isMobile?: boolean }) {
    // Fewer copies on mobile (2) vs desktop (4) for performance
    const repeated = isMobile
        ? [...items, ...items]
        : [...items, ...items, ...items, ...items];

    return (
        <div className="relative overflow-visible py-3 md:py-4 flex flex-nowrap w-full" dir="ltr">
            <motion.div
                className="flex items-center gap-4 md:gap-6 pr-4 md:pr-6 w-max"
                animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
                // Increased duration from 120 to 180 for a highly relaxing, smooth scroll
                transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
            >
                {repeated.map((name, i) => (
                    <div key={`${name}-${i}`} className="w-[140px] sm:w-[160px] md:w-[200px] h-[60px] sm:h-[70px] md:h-[80px] shrink-0">
                        <GlassCard
                            hoverable
                            spotlightColor="rgba(255, 255, 255, 0.15)"
                            className="w-full h-full flex items-center justify-center p-0 !rounded-2xl transition-all duration-300 hover:scale-[1.05] !bg-white/[0.01]"
                        >
                            <div className="w-full flex items-center justify-center h-full text-center px-2">
                                <span className="text-white/60 font-bold tracking-widest uppercase text-xs md:text-sm group-hover:text-white transition-colors duration-300">
                                    {name}
                                </span>
                            </div>
                        </GlassCard>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default function ClientsSection() {
    const { t, dir } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const isMobile = useIsMobile();

    return (
        <section ref={ref} id="clients" className="relative py-16 md:py-36 overflow-hidden" dir={dir}>
            {/* Ambient glow — desktop only */}
            {!isMobile && <div className="absolute inset-0 pointer-events-none z-[0]">
                <div className="absolute top-1/2 left-[30%] -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/8 rounded-full blur-[150px]" />
            </div>}

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-sm font-bold uppercase tracking-[0.2em] mb-6">
                        {t.clientsTag}
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white/90">
                        {t.clientsTitle}
                    </h2>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-4 md:space-y-6 relative z-10 mt-8"
            >
                {/* Fade overlays for the edges */}
                <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#030305] to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#030305] to-transparent z-20 pointer-events-none" />

                <MarqueeRow items={row1} isMobile={isMobile} />
                <MarqueeRow items={row2} reverse isMobile={isMobile} />
            </motion.div>
        </section>
    );
}
