"use client";

import GlowBackground from "@/components/GlowBackground";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ComingSoonSection from "@/components/sections/ComingSoonSection";
import ImpactSection from "@/components/sections/ImpactSection";
import ClientsSection from "@/components/sections/ClientsSection";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import DemoScript from "@/components/DemoScript";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {
    const { dir } = useLanguage();

    return (
        <main className="relative min-h-screen" dir={dir}>
            <DemoScript />
            <GlowBackground />
            <HeroSection />
            <ServicesSection />
            <ComingSoonSection />
            <ImpactSection />
            <ClientsSection />
            <AboutSection />
            <ContactSection />
            <Footer />
        </main>
    );
}
