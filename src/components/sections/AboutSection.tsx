"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/lib/useIsMobile";
import SpotlightCard from "@/components/ui/SpotlightCard";
import GlassCard from "@/components/GlassCard";

function getInitials(name: string) {
    return name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

export default function AboutSection() {
    const { t, dir } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const [expandedMember, setExpandedMember] = useState<number | null>(null);
    const isMobile = useIsMobile();

    return (
        <section ref={ref} id="about" className="relative py-16 md:py-40 px-6 overflow-hidden" dir={dir}>
            {/* Ambient glow — desktop only */}
            {!isMobile && <div className="absolute inset-0 pointer-events-none z-[0]">
                <div className="absolute top-[40%] right-[20%] w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[150px]" />
            </div>}

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-sm font-bold uppercase tracking-[0.2em] mb-6">
                        {t.aboutTag}
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white/90 mb-6 md:mb-8">
                        {t.aboutTitle}
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-4">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-white/60 text-base md:text-lg leading-relaxed font-medium"
                        >
                            {t.aboutP1}
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-white/50 text-base leading-relaxed"
                        >
                            {t.aboutP2}
                        </motion.p>
                    </div>
                </motion.div>

                {/* Team */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="mt-24"
                >
                    <div className="flex flex-col items-center justify-center mb-16">
                        <div className="relative inline-block text-center">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-white to-cyan-300 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)] px-6">
                                {t.aboutTeamTitle}
                            </h3>
                            {/* Decorative animated line under title */}
                            <motion.div
                                className="absolute -bottom-4 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-violet-400 to-transparent"
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={isInView ? { scaleX: 1, opacity: 0.8 } : {}}
                                transition={{ delay: 0.8, duration: 0.8 }}
                            />
                            {/* Glowing dot in the center of the line */}
                            <motion.div
                                className="absolute -bottom-[5.5px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-white shadow-[0_0_12px_4px_rgba(139,92,246,0.8)]"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                                transition={{ delay: 1.2, duration: 0.4 }}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
                        {t.team.map((member, i) => {
                            const isOpen = expandedMember === i;

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: isMobile ? 0.1 + i * 0.03 : 0.4 + i * 0.08, duration: isMobile ? 0.3 : 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                                >
                                    <SpotlightCard
                                        spotlightColor="rgba(139, 92, 246, 0.15)"
                                        className={`!rounded-[2rem] transition-all duration-500 group ${isOpen ? "ring-1 ring-violet-500/70 bg-white/[0.04] shadow-[0_20px_40px_-10px_rgba(139,92,246,0.15)]" : ""}`}
                                    >
                                        {/* Card header — always visible */}
                                        <div className="p-5 sm:p-6 md:p-8">
                                            {/* Avatar + years badge */}
                                            <div className="relative mb-6">
                                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300">
                                                    <span className="text-white/80 font-bold text-lg tracking-widest">{getInitials(member.name)}</span>
                                                </div>
                                                {/* Years badge */}
                                                <div className="absolute -top-1 -right-1 sm:right-auto sm:left-12 px-2.5 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-[10px] font-bold tracking-wider">
                                                    {member.years} YRS
                                                </div>
                                            </div>

                                            <h4 className="text-white/90 font-bold text-lg mb-1 group-hover:text-white transition-colors">
                                                {member.name}
                                            </h4>
                                            <p className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 text-sm font-bold tracking-wide mb-4">
                                                {member.role}
                                            </p>

                                            {/* View profile button */}
                                            <button
                                                onClick={() => setExpandedMember(isOpen ? null : i)}
                                                className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${isOpen ? "text-violet-400" : "text-white/40 hover:text-white/60"}`}
                                            >
                                                {isOpen ? t.aboutShowLess : t.aboutShowMore}
                                                <motion.span
                                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    ↓
                                                </motion.span>
                                            </button>
                                        </div>

                                        {/* Expandable content */}
                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-5 sm:px-6 md:px-8 pb-5 sm:pb-6 md:pb-8">
                                                        <div className="border-t border-white/5 pt-5 sm:pt-6 space-y-4 sm:space-y-5">
                                                            {/* Bio */}
                                                            <motion.p
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: 0.1 }}
                                                                className="text-white/50 text-sm leading-relaxed"
                                                            >
                                                                {member.bio}
                                                            </motion.p>

                                                            {/* Strengths */}
                                                            <div>
                                                                <motion.h5
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1 }}
                                                                    transition={{ delay: 0.15 }}
                                                                    className="text-white/70 text-xs font-bold uppercase tracking-widest mb-3"
                                                                >
                                                                    {t.teamStrengths}
                                                                </motion.h5>
                                                                <div className="space-y-2">
                                                                    {member.strengths.map((strength, j) => (
                                                                        <motion.div
                                                                            key={j}
                                                                            initial={{ opacity: 0, x: dir === "rtl" ? 10 : -10 }}
                                                                            animate={{ opacity: 1, x: 0 }}
                                                                            transition={{ delay: 0.2 + j * 0.06 }}
                                                                            className="flex items-center gap-2.5"
                                                                        >
                                                                            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0 shadow-[0_0_6px_rgba(139,92,246,0.5)]" />
                                                                            <span className="text-white/60 text-sm">{strength}</span>
                                                                        </motion.div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </SpotlightCard>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
