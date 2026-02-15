"use client";
import React from "react";
import { motion } from "motion/react";
import { useScrollStore } from "@/store/useScrollStore";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ShimmerButton } from "../ui/shimmer-button";
import HeroVisual from "./HeroVisual";
import LiquidModal from "../ui/LiquidModal";
import RequestDemoForm from "../forms/RequestDemoForm";

const Globe = dynamic(() => import("../ui/globe-client").then(mod => ({ default: mod.World })), {
    ssr: false,
});

const sampleArcs = [
    // Europe to Americas
    {
        order: 1,
        startLat: 51.5074,
        startLng: -0.1278,
        endLat: 40.7128,
        endLng: -74.0060,
        arcAlt: 0.3,
        color: "#a78bfa",
    },
    // Asia to Europe
    {
        order: 2,
        startLat: 35.6762,
        startLng: 139.6503,
        endLat: 48.8566,
        endLng: 2.3522,
        arcAlt: 0.3,
        color: "#c4b5fd",
    },
    // North America to Asia
    {
        order: 3,
        startLat: 37.7749,
        startLng: -122.4194,
        endLat: 31.2304,
        endLng: 121.4737,
        arcAlt: 0.35,
        color: "#8b5cf6",
    },
    // South America to Europe
    {
        order: 4,
        startLat: -23.5505,
        startLng: -46.6333,
        endLat: 52.5200,
        endLng: 13.4050,
        arcAlt: 0.3,
        color: "#a78bfa",
    },
    // Australia to Asia
    {
        order: 5,
        startLat: -33.8688,
        startLng: 151.2093,
        endLat: 1.3521,
        endLng: 103.8198,
        arcAlt: 0.2,
        color: "#c4b5fd",
    },
    // Africa to Middle East
    {
        order: 6,
        startLat: -1.2921,
        startLng: 36.8219,
        endLat: 25.2048,
        endLng: 55.2708,
        arcAlt: 0.15,
        color: "#8b5cf6",
    },
    // India to Europe
    {
        order: 7,
        startLat: 28.6139,
        startLng: 77.2090,
        endLat: 51.5074,
        endLng: -0.1278,
        arcAlt: 0.25,
        color: "#a78bfa",
    },
    // Canada to Asia
    {
        order: 8,
        startLat: 43.6532,
        startLng: -79.3832,
        endLat: 35.6762,
        endLng: 139.6503,
        arcAlt: 0.35,
        color: "#c4b5fd",
    },
    // Mexico to South America
    {
        order: 9,
        startLat: 19.4326,
        startLng: -99.1332,
        endLat: -12.0464,
        endLng: -77.0428,
        arcAlt: 0.2,
        color: "#8b5cf6",
    },
    // Russia to North America
    {
        order: 10,
        startLat: 55.7558,
        startLng: 37.6173,
        endLat: 49.2827,
        endLng: -123.1207,
        arcAlt: 0.4,
        color: "#a78bfa",
    },
    // Southeast Asia interconnect
    {
        order: 11,
        startLat: 13.7563,
        startLng: 100.5018,
        endLat: 14.5995,
        endLng: 120.9842,
        arcAlt: 0.15,
        color: "#c4b5fd",
    },
    // Middle East to Africa
    {
        order: 12,
        startLat: 25.2048,
        startLng: 55.2708,
        endLat: -26.2041,
        endLng: 28.0473,
        arcAlt: 0.2,
        color: "#8b5cf6",
    },
    // South America interconnect
    {
        order: 13,
        startLat: -34.6037,
        startLng: -58.3816,
        endLat: -23.5505,
        endLng: -46.6333,
        arcAlt: 0.15,
        color: "#a78bfa",
    },
    // Europe interconnect
    {
        order: 14,
        startLat: 41.9028,
        startLng: 12.4964,
        endLat: 40.4168,
        endLng: -3.7038,
        arcAlt: 0.1,
        color: "#c4b5fd",
    },
    // Asia Pacific
    {
        order: 15,
        startLat: 22.3193,
        startLng: 114.1694,
        endLat: -37.8136,
        endLng: 144.9631,
        arcAlt: 0.3,
        color: "#8b5cf6",
    },
];

const globeConfig = {
    pointSize: 4,
    globeColor: "#1a0b2e",
    showAtmosphere: true,
    atmosphereColor: "#a78bfa",
    atmosphereAltitude: 0.2,
    emissive: "#4c1d95",
    emissiveIntensity: 0.15,
    shininess: 0.9,
    polygonColor: "rgba(167, 139, 250, 0.6)",
    ambientLight: "#c4b5fd",
    directionalLeftLight: "#a78bfa",
    directionalTopLight: "#c4b5fd",
    pointLight: "#ddd6fe",
    arcTime: 1500,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
};

export default function Hero() {
    const setActiveSection = useScrollStore(state => state.setActiveSection);

    return (
        <motion.section
            id="hero-section"
            className="pt-32 pb-16 min-h-screen max-h-screen sm:pt-40 sm:pb-24 lg:pb-32 overflow-hidden relative"
            onViewportEnter={() => setActiveSection('hero')}
            onViewportLeave={() => setActiveSection(null)}
        >
            {/* Background Image - Absolute at section level */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/assets/baselex-hero-bg-1.png"
                    alt="Hero Background"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                />
            </div>

            {/* Overlay - Absolute at section level, on top of image */}
            <div className="absolute inset-0 bg-white/40 dark:bg-black/40 mix-blend-overlay"></div>

            {/* Content Container - Relative with z-10 to sit above background */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    {/* Left Content */}
                    <div className="lg:col-span-7 flex flex-col justify-center text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center space-x-2 mb-6">
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-violet-soft text-action-primary border border-brand-violet/20">
                                NEW: Enterprise Console 2.0
                            </span>
                            <span className="text-sm font-medium text-text-secondary hover:text-action-primary cursor-pointer flex items-center">
                                Read the blog{" "}
                                <svg
                                    className="ml-1 w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-text-main mb-6 leading-tight">
                            The agentic platform that <br className="hidden lg:block" />
                            <span className="text-transparent bg-clip-text bg-brand">
                                scales with you.
                            </span>
                        </h1>

                        {/* Subhead */}
                        <p className="text-lg sm:text-xl text-text-secondary mb-10 max-w-2xl leading-relaxed">
                            Design, fuel, and operationalize systems that learn and adapt—on
                            an open cloud platform that adapts to your business’s needs.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <LiquidModal
                                title="Request Demo"
                                trigger={({ open, layoutId, titleLayoutId, title }: any) => (
                                    <motion.div
                                        layoutId={layoutId}
                                        onClick={open}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition={{ duration: 0.2 }}
                                        className="inline-block"
                                    >
                                        <ShimmerButton>
                                            <motion.span layoutId={titleLayoutId} className="inline-block">{title}</motion.span>
                                        </ShimmerButton>
                                    </motion.div>
                                )}
                            >
                                <RequestDemoForm />
                            </LiquidModal>
                        </div>

                        {/* Trust/Status Line */}
                        <div className="mt-10 pt-8 border-t border-border-subtle flex items-center space-x-6 text-sm text-text-tertiary">
                            <div className="flex items-center">
                                <div className="w-2 h-2 rounded-full bg-status-success mr-2"></div>
                                <span>99.99% Uptime SLA</span>
                            </div>
                            <div className="flex items-center">
                                <svg
                                    className="w-4 h-4 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                                </svg>
                                <span>SOC2 Type II Certified</span>
                            </div>
                        </div>
                    </div>




                </div>

                {/* Absolutely Positioned Visual - Top Right */}
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
                    <div className="pointer-events-auto origin-center scale-[0.85] xl:scale-100 translate-x-12">
                        <HeroVisual />
                    </div>
                </div>
            </div>
            <div className='relative w-full h-[100vh] flex items-center justify-center'>
                <Globe globeConfig={globeConfig} data={sampleArcs} />
            </div>
        </motion.section >
    );
}
