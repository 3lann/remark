"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/lib/useIsMobile";
import GlassButton from "@/components/GlassButton";
import RemarkLogo from "@/components/RemarkLogo";
import CrystalOrb from "@/components/CrystalOrb";
import { type OrbAnimState } from "@/lib/animationConfig";

export default function HeroSection() {
    const { t, dir } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [orbState, setOrbState] = useState<OrbAnimState>("idle");
    const isMobile = useIsMobile();
    const [isDemoMode, setIsDemoMode] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined" && window.location.search.includes("demo=1")) {
            setTimeout(() => {
                setIsDemoMode(true);
            }, 1000); // match header animation delay
        }
    }, []);

    const words1 = t.mainHeroTitle1.split(" ");
    const words2 = t.mainHeroTitle2.split(" ");

    return (
        <section
            ref={ref}
            id="hero"
            className={`relative min-h-screen flex flex-col items-center text-center px-6 overflow-hidden ${isMobile ? 'justify-center' : 'justify-center pt-24'}`}
            dir={dir}
        >
            {/* Glowing orbs for extra depth — desktop only */}
            {!isMobile && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-violet-600/20 rounded-full blur-[120px] mix-blend-screen" />
                    <div className="absolute top-[50%] right-[20%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] mix-blend-screen" />
                </div>
            )}

            {/* MAIN CONTENT */}
            <div className={`relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center ${isMobile ? 'mt-24' : 'mt-0'}`}>
                {/* Logo — CrystalOrb + RemarkLogo */}
                <motion.div
                    initial={isMobile ? { scale: 0.9, opacity: 0 } : { scale: 0.7, opacity: 0, filter: "blur(6px)" }}
                    animate={
                        isDemoMode
                            ? { scale: 0, opacity: 0, filter: "blur(10px)" }
                            : (isInView ? (isMobile ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1, filter: "blur(0px)" }) : {})
                    }
                    transition={{ duration: isMobile ? 0.4 : 0.7, delay: isMobile ? 0.05 : 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                    className={`mb-4 relative flex items-center justify-center ${isMobile ? 'w-[220px] h-[220px]' : 'w-[340px] h-[340px]'}`}
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <CrystalOrb size={isMobile ? 220 : 300} onStateChange={setOrbState} />
                    </div>
                    <div className={`absolute inset-0 flex items-center justify-center z-20 pointer-events-none ${isMobile ? '' : 'drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]'}`}>
                        <RemarkLogo size="lg" orbState={orbState} />
                    </div>
                </motion.div>

                {/* Content beneath Logo — Hidden in Demo Mode */}
                <motion.div
                    animate={isDemoMode ? { opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)", pointerEvents: "none" } : { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", pointerEvents: "auto" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="flex flex-col items-center w-full"
                >
                    {/* Tag — below the orb */}
                    <motion.div
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className={`inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 text-white/70 text-xs font-medium uppercase tracking-[0.2em] mb-8 ${isMobile ? '' : 'backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:bg-white/[0.08] hover:border-white/20'} transition-all cursor-default`}
                    >
                        <span className={`w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400 ${isMobile ? '' : 'animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.8)]'}`} />
                        {t.mainHeroTag}
                    </motion.div>

                    {/* Title Line 1 — Word by Word */}
                    <div className={`flex flex-wrap justify-center gap-x-3 md:gap-x-4 mb-2 ${isMobile ? '' : 'drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]'}`}>
                        {isMobile ? (
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.4, delay: 0.15 }}
                                className="text-3xl font-extrabold text-white tracking-tight"
                            >
                                {t.mainHeroTitle1}
                            </motion.div>
                        ) : (
                            words1.map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.25 + i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                                    className="text-3xl sm:text-4xl md:text-6xl lg:text-[5rem] font-extrabold text-white tracking-tight"
                                >
                                    {word}
                                </motion.span>
                            ))
                        )}
                    </div>

                    {/* Title Line 2 — Word by Word, gradient glass effect */}
                    <div className={`flex flex-wrap justify-center gap-x-3 md:gap-x-4 mb-8 ${isMobile ? '' : 'drop-shadow-[0_0_20px_rgba(139,92,246,0.4)]'}`}>
                        {isMobile ? (
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.4, delay: 0.25 }}
                                className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-indigo-400 to-cyan-300 tracking-tight pb-2"
                            >
                                {t.mainHeroTitle2}
                            </motion.div>
                        ) : (
                            words2.map((word, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.45 + i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
                                    className="text-3xl sm:text-4xl md:text-6xl lg:text-[5rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-indigo-400 to-cyan-300 tracking-tight pb-2"
                                >
                                    {word}
                                </motion.span>
                            ))
                        )}
                    </div>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-white/60 font-medium text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 md:mb-12 mix-blend-screen"
                    >
                        {t.mainHeroSub}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: isMobile ? 8 : 15 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: isMobile ? 0.3 : 0.6, delay: isMobile ? 0.3 : 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                        className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-center p-2 sm:p-2 rounded-3xl sm:rounded-full bg-white/[0.03] border border-white/10 relative overflow-hidden group w-[90%] sm:w-auto mx-auto max-w-sm sm:max-w-none gap-3 sm:gap-0 ${isMobile ? '' : 'backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.3)]'}`}
                    >
                        {/* Inner glowing pulse effect — desktop only */}
                        {!isMobile && <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />}

                        <a href="#services" className="w-full sm:w-auto relative z-10 flex-1 sm:flex-none">
                            <button className={`w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-full text-sm sm:text-[15px] md:text-base font-bold text-[#030305] bg-gradient-to-r from-white to-white/90 hover:from-white/90 hover:to-white/80 transition-all duration-300 flex items-center justify-center ${isMobile ? '' : 'hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]'}`}>
                                {t.mainHeroCta1}
                            </button>
                        </a>

                        {/* Animated Decorative Divider (Visible on Desktop) */}
                        <div className="hidden sm:flex items-center justify-center relative w-8 shrink-0 self-stretch overflow-hidden">
                            <motion.div
                                className="absolute w-[1.5px] h-3 bg-gradient-to-b from-transparent via-white/80 to-transparent rounded-full"
                                style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.6))" }}
                                animate={{ top: ["0%", "70%", "0%"] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>

                        <a href="#contact" className="w-full sm:w-auto relative z-10 flex-1 sm:flex-none">
                            <button className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-full text-sm sm:text-[15px] md:text-base font-bold text-white bg-white/5 sm:bg-transparent hover:bg-white/10 sm:hover:bg-white/5 border border-white/5 sm:border-transparent hover:border-white/15 sm:hover:border-white/10 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center">
                                {t.mainHeroCta2}
                            </button>
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Mobile bottom ambient glow — removed for performance */}


        </section>
    );
}

