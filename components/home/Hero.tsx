import React from "react";
import Image from "next/image";
import { Globe } from "../ui/globe";
import { NoiseBackground } from "../ui/noise-background";
import { ShimmerButton } from "../ui/shimmer-button";

export default function Hero() {
    return (
        <section className="pt-32 pb-16 min-h-screen sm:pt-40 sm:pb-24 lg:pb-32 overflow-hidden relative">
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
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-main mb-6 leading-tight">
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
                            <ShimmerButton>
                                Request a demo
                            </ShimmerButton>
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
            </div>
            <div className='relative w-screen'>
                <Globe />
            </div>
        </section>
    );
}
