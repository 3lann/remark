"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import RemarkLogo from "./RemarkLogo";
import AssistantHexagon from "./AssistantHexagon";
import LanguageSwitcher from "./LanguageSwitcher";
import GlassButton from "./GlassButton";
import { useLanguage } from "@/context/LanguageContext";
import { useIsMobile } from "@/lib/useIsMobile";

export default function Header() {
    const { t, dir } = useLanguage();
    const pathname = usePathname();
    const isJobsSection = pathname.startsWith("/jobs");
    const isApplyPage = pathname === "/jobs/apply";
    const isSuccessPage = pathname === "/jobs/success";
    const isMainSite = !isJobsSection;

    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isMobile = useIsMobile();

    // Sync state with the main FloatingAssistant
    useEffect(() => {
        const handleSync = (e: Event) => {
            const customEvent = e as CustomEvent<boolean>;
            setChatOpen(customEvent.detail);
        };
        window.addEventListener('sync-assistant-chat', handleSync);
        return () => window.removeEventListener('sync-assistant-chat', handleSync);
    }, []);

    // Demo bubble state
    const [demoBubble, setDemoBubble] = useState("");
    const [showDemoBubble, setShowDemoBubble] = useState(false);
    const [isDemoMode, setIsDemoMode] = useState(false);
    const bubbleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined" && window.location.search.includes("demo=1")) {
            setTimeout(() => {
                setIsDemoMode(true);
            }, 1000);
            const handleMessage = (e: Event) => {
                const customEvent = e as CustomEvent<{ text: string, delay?: number, duration?: number }>;
                if (customEvent.detail?.text) {
                    setDemoBubble(customEvent.detail.text);
                    setShowDemoBubble(true);

                    if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
                    bubbleTimeoutRef.current = setTimeout(() => {
                        setShowDemoBubble(false);
                    }, customEvent.detail?.duration || 8000);
                }
            };
            window.addEventListener("assistant-message", handleMessage);
            return () => window.removeEventListener("assistant-message", handleMessage);
        }
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        if (latest <= 10) {
            setHidden(false);
        }
    });

    const mainNavLinks = [
        { href: `${isJobsSection ? "/" : ""}#about`, label: t.navAbout || "About" },
        { href: `${isJobsSection ? "/" : ""}#services`, label: t.navServices || "Services" },
        { href: `${isJobsSection ? "/" : ""}#clients`, label: t.navClients || "Clients" },
        { href: `${isJobsSection ? "/" : ""}#contact`, label: t.navContact || "Contact" },
    ];

    // Mobile Menu Animation Variants
    const menuVariants = {
        closed: {
            opacity: 0,
            y: "-100%",
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] as const,
                when: "afterChildren",
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        },
        open: {
            opacity: 1,
            y: "0%",
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] as const,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, y: -20 },
        open: { opacity: 1, y: 0 }
    };

    return (
        <motion.header
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: "-100%", opacity: 0 }
            }}
            initial="visible"
            animate={(hidden && !mobileMenuOpen && !isDemoMode) ? "hidden" : "visible"}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-6 inset-x-0 z-50 flex justify-center w-full px-4 sm:px-6 pointer-events-none"
        >
            {/* ── Single pill bar: [Logo LEFT] [Nav CENTER] [Lang + Assistant RIGHT] ── */}
            {/* dir="ltr" so logo always left, assistant always right regardless of language */}
            <div
                dir="ltr"
                className={`pointer-events-auto flex items-center justify-between px-4 md:px-6 py-1 md:py-1.5 rounded-full border border-white/[0.08] w-full max-w-6xl mx-auto relative overflow-visible transition-all duration-500 ${isMobile ? 'bg-black/50' : 'bg-[#0a0f1e]/70 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3),_inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-white/[0.12]'}`}
            >
                {/* Subtle top inner glow */}
                <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                {/* Bottom subtle glow */}
                <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-400/10 to-transparent pointer-events-none" />

                {/* ── LEFT: Hamburger (mobile) + Logo ── */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    {/* Hamburger Menu (Mobile Only) */}
                    <button
                        id="demo-hamburger-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-1 md:p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/50 relative z-20"
                        aria-label="Toggle Navigation"
                    >
                        {mobileMenuOpen ? (
                            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>

                    {/* Logo — inside the bar, left side */}
                    <div className="relative flex items-center h-10 shrink-0">
                        <AnimatePresence>
                            {!isDemoMode && (
                                <motion.div
                                    key="logo"
                                    initial={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, x: -20, filter: "blur(4px)", position: "absolute" }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className="flex items-center"
                                >
                                    <Link href="/" className="relative z-10 hover:scale-105 transition-transform duration-300 origin-left flex items-center pr-2">
                                        <div className="w-[70px] md:w-auto h-auto flex items-center justify-center">
                                            <RemarkLogo size="md" className="drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] w-full h-auto origin-left transform scale-[0.65] md:scale-100" />
                                        </div>
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* ── CENTER: Desktop Navigation ── */}
                <div dir={dir} className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-0.5 bg-white/[0.04] px-1.5 py-1 rounded-full border border-white/[0.06]">
                    {mainNavLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="px-5 py-1.5 text-[13px] font-semibold text-white/55 hover:text-white/95 rounded-full hover:bg-white/[0.08] transition-all duration-300 tracking-wide"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* ── RIGHT: Jobs Button + Language + Assistant ── */}
                <div className="flex items-center gap-2 sm:gap-4 shrink-0 relative z-10">
                    {/* View Roles Button */}
                    {!isJobsSection ? (
                        <Link href="/jobs" className="hidden md:block" id="demo-desktop-jobs-btn">
                            <GlassButton variant="primary" size="sm" className="!rounded-full !px-5 !py-1.5 text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-violet-600/80 to-blue-600/80 hover:from-violet-500 hover:to-blue-500 shadow-none hover:shadow-glow opacity-90 hover:opacity-100 border border-white/10">
                                {t.navJobs}
                            </GlassButton>
                        </Link>
                    ) : isApplyPage ? (
                        <Link href="/jobs">
                            <GlassButton variant="ghost" size="sm" className="hidden md:flex !rounded-full !px-5 !py-1.5 text-xs font-bold tracking-wide uppercase">
                                {t.navAllRoles}
                            </GlassButton>
                        </Link>
                    ) : null}

                    {/* Language Switcher */}
                    <div className="bg-white/[0.04] rounded-full px-1.5 py-1 border border-white/[0.06] hidden sm:block">
                        <LanguageSwitcher />
                    </div>

                    {/* ── Assistant — inside the bar, right side ── */}
                    <motion.div
                        layout
                        id="demo-assistant-container"
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className={`flex flex-col items-center group ${isDemoMode ? `fixed cursor-pointer ${mobileMenuOpen ? 'top-[75vh] inset-x-0 mx-auto' : (isApplyPage ? 'top-auto bottom-6 right-6 left-auto mx-0' : (isSuccessPage ? 'top-[38vh] md:top-[43vh] inset-x-0 mx-auto' : (isJobsSection ? 'top-[82vh] md:top-[65vh] inset-x-0 mx-auto' : 'top-[35vh] inset-x-0 mx-auto')))} w-max pointer-events-none z-[1000]` : 'relative z-10 pointer-events-none'}`}
                        title={dir === "rtl" ? "مساعد ريمارك" : "Remark Assistant"}
                    >
                        {/* Icon — pointer-events-auto so the button itself is always clickable */}
                        <motion.div
                            layout
                            className={`relative flex items-center justify-center transition-all duration-[1.2s] ease-in-out pointer-events-auto ${isDemoMode ? (isSuccessPage || isJobsSection ? "w-10 h-10 md:w-14 md:h-14" : "w-16 h-16 md:w-24 md:h-24") : "w-7 h-7 md:w-10 md:h-10 cursor-pointer"}`}
                        >
                            <div
                                className={`absolute transition-all duration-[1.2s] ease-in-out ${isDemoMode && isSuccessPage ? "opacity-0 invisible" : "opacity-100 visible"}`}
                                style={{ transformOrigin: 'center center', transform: isDemoMode ? (isSuccessPage ? 'scale(1.6)' : (isJobsSection ? 'scale(1.4)' : 'scale(2.2)')) : 'scale(0.7)' }}
                            >
                                <AssistantHexagon
                                    isOpen={chatOpen}
                                    onClick={() => window.dispatchEvent(new Event('toggle-assistant-chat'))}
                                />
                            </div>
                        </motion.div>




                        {/* Demo Bubble */}
                        <AnimatePresence>
                            {showDemoBubble && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 15, x: isDemoMode && isApplyPage ? "0%" : "-50%" }}
                                    animate={{ opacity: 1, scale: 1, y: 0, x: isDemoMode && isApplyPage ? "0%" : "-50%" }}
                                    exit={{ opacity: 0, scale: 0.9, y: 15, x: isDemoMode && isApplyPage ? "0%" : "-50%", transition: { duration: 0.2 } }}
                                    className={`absolute origin-bottom-right w-[85vw] max-w-[340px] md:max-w-[420px] bg-slate-900/95 backdrop-blur-xl border border-violet-500/40 p-5 rounded-2xl shadow-2xl z-[150] pointer-events-auto ${isDemoMode ? (isApplyPage ? 'bottom-[65px] right-0 left-auto' : 'bottom-[75px] md:bottom-[100px] left-1/2') : 'top-[130%] left-1/2'}`}
                                >
                                    <p className="text-sm md:text-base text-white/95 leading-relaxed font-medium text-center">
                                        {demoBubble}
                                    </p>
                                    <div className={`absolute w-4 h-4 bg-slate-900/95 border-violet-500/40 transform origin-center rotate-45 ${isDemoMode && isApplyPage ? '-bottom-2 right-4 border-r border-b' : (isDemoMode ? 'left-1/2 -translate-x-1/2 -bottom-2 border-r border-b hidden md:block' : 'left-1/2 -translate-x-1/2 -top-2 border-l border-t')} ${isDemoMode && !isApplyPage && 'md:hidden -bottom-2 border-r border-b block'}`} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className={`pointer-events-auto absolute top-full left-4 right-4 mt-2 p-6 rounded-3xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] lg:hidden flex flex-col gap-6 overflow-hidden ${isMobile ? 'bg-black/70' : 'bg-black/40 backdrop-blur-3xl'}`}
                        dir={dir}
                    >
                        {/* Internal decorative glow — desktop only */}
                        {!isMobile && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-violet-500/10 rounded-full blur-[50px] pointer-events-none" />}

                        {mainNavLinks.map((link) => (
                            <motion.a
                                key={link.href}
                                variants={itemVariants}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-xl font-bold text-white/80 hover:text-white border-b border-white/5 pb-4 last:border-none transition-colors"
                            >
                                {link.label}
                            </motion.a>
                        ))}

                        <motion.div variants={itemVariants} className="flex flex-col gap-4 mt-2">
                            {/* Mobile Jobs Button */}
                            {!isJobsSection ? (
                                <Link href="/jobs" onClick={() => setMobileMenuOpen(false)} className="w-full" id="demo-mobile-jobs-btn">
                                    <GlassButton variant="primary" className="w-full justify-center !rounded-xl !py-3 text-sm font-bold tracking-wide uppercase bg-gradient-to-r from-violet-600/80 to-blue-600/80">
                                        {t.navJobs}
                                    </GlassButton>
                                </Link>
                            ) : isApplyPage ? (
                                <Link href="/jobs" onClick={() => setMobileMenuOpen(false)} className="w-full" id="demo-mobile-jobs-btn">
                                    <GlassButton variant="ghost" className="w-full justify-center !rounded-xl !py-3 text-sm font-bold tracking-wide uppercase">
                                        {t.navAllRoles}
                                    </GlassButton>
                                </Link>
                            ) : null}

                            {/* Mobile Language Switcher */}
                            <div className="flex justify-between items-center bg-white/[0.03] p-3 rounded-xl border border-white/5">
                                <span className="text-white/60 font-medium">Language</span>
                                <LanguageSwitcher />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
