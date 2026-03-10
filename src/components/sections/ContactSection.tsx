"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import GlassButton from "@/components/GlassButton";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { useIsMobile } from "@/lib/useIsMobile";

export default function ContactSection() {
    const { t, dir } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [sent, setSent] = useState(false);
    const isMobile = useIsMobile();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 3000);
    };

    const contactDetails = [
        {
            icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
            label: t.contactInfoEmail,
            href: "mailto:info@remark-agency.com"
        },
        {
            icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
            label: t.contactInfoPhone,
            href: "tel:+9647728808888"
        },
        {
            icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
            label: t.contactInfoAddress,
        },
        {
            icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>,
            label: "@remark.iq",
            href: "https://instagram.com/remark.iq"
        },
    ];

    return (
        <section ref={ref} id="contact" className="relative py-16 md:py-36 px-6 overflow-hidden" dir={dir}>
            {/* Ambient glow — desktop only */}
            {!isMobile && <div className="absolute inset-0 pointer-events-none z-[0]">
                <div className="absolute bottom-[20%] left-[20%] w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-[150px]" />
            </div>}

            <div className="relative z-10 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-sm font-bold uppercase tracking-[0.2em] mb-6">
                        {t.contactTag}
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white/90 mb-4 sm:mb-6">
                        {t.contactTitle}
                    </h2>
                    <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto font-medium">
                        {t.contactSub}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: dir === "rtl" ? 15 : -15 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.15, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                        className="lg:col-span-3 h-full"
                    >
                        <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.15)" className="h-full p-5 sm:p-6 md:p-10 !rounded-[2rem] bg-white/[0.01]">
                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-white/60 text-sm font-bold mb-2 uppercase tracking-wide">{t.contactName}</label>
                                        <input
                                            type="text"
                                            required
                                            value={form.name}
                                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                            className="input-glass !rounded-xl !bg-white/[0.03] focus:!bg-white/[0.08]"
                                            placeholder={dir === "rtl" ? "محمد علي" : "John Doe"}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white/60 text-sm font-bold mb-2 uppercase tracking-wide">{t.contactEmail}</label>
                                        <input
                                            type="email"
                                            required
                                            value={form.email}
                                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                            className="input-glass !rounded-xl !bg-white/[0.03] focus:!bg-white/[0.08]"
                                            placeholder="email@example.com"
                                            dir="ltr"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-white/60 text-sm font-bold mb-2 uppercase tracking-wide">{t.contactMessage}</label>
                                    <textarea
                                        required
                                        rows={6}
                                        value={form.message}
                                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                                        className="input-glass resize-none !rounded-xl !bg-white/[0.03] focus:!bg-white/[0.08]"
                                        placeholder={t.contactMessage}
                                    />
                                </div>
                                <GlassButton
                                    variant="primary"
                                    size="lg"
                                    type="submit"
                                    className="w-full !rounded-xl py-4 mt-2 text-base"
                                >
                                    {sent ? "✓ Message Sent" : t.contactSend}
                                </GlassButton>
                            </form>
                        </SpotlightCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: dir === "rtl" ? -15 : 15 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                        className="lg:col-span-2 h-full"
                    >
                        <SpotlightCard spotlightColor="rgba(6, 182, 212, 0.15)" className="h-full p-5 sm:p-6 md:p-10 !rounded-[2rem] flex flex-col justify-center space-y-6 sm:space-y-8 bg-white/[0.01]">
                            {contactDetails.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                                >
                                    {item.href ? (
                                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300 shrink-0">
                                                {item.icon}
                                            </div>
                                            <span className="text-white/60 text-base font-medium group-hover:text-white transition-colors">{item.label}</span>
                                        </a>
                                    ) : (
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border border-white/10 flex items-center justify-center text-violet-400 shrink-0">
                                                {item.icon}
                                            </div>
                                            <span className="text-white/60 text-base font-medium">{item.label}</span>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </SpotlightCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
