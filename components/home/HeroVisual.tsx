"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SCENES = [
    {
        image: "/assets/officer1-opt.png",
        headline: "Regulatory Compliance Monitoring",
        subtext: "AI agents continuously scan policies, regulations, and internal actions — no manual checks, no blind spots.",
    },
    {
        image: "/assets/officer2-opt.png",
        headline: "Risk Assessment & Escalation",
        subtext: "Potential violations are detected, scored, and escalated automatically — before they become incidents.",
    },
    {
        image: "/assets/officer3-opt.png",
        headline: "Audit Trails & Reporting",
        subtext: "Every decision is logged, explainable, and audit-ready — in real time.",
    },
];

export default function HeroVisual() {
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
    const textsRef = useRef<(HTMLDivElement | null)[]>([]);

    // Subtle mouse interaction
    useGSAP(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;

            gsap.to(containerRef.current, {
                x: x * 20,
                y: y * 20,
                duration: 1.5,
                ease: "power2.out",
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, { scope: containerRef });

    // Main Sequence Animation
    useGSAP(() => {
        const tl = gsap.timeline({ repeat: -1 });
        const stepDuration = 5;
        const fadeDuration = 1.2;

        // Ensure everything is clean initially
        imagesRef.current.forEach((img, i) => {
            gsap.set(img, {
                opacity: i === 0 ? 1 : 0,
                scale: 1,
                filter: i === 0 ? "blur(0px)" : "blur(12px)",
                zIndex: i === 0 ? 2 : 1
            });
            gsap.set(textsRef.current[i], { opacity: 0, y: 12, display: "none" });
        });

        // Loop logic
        SCENES.forEach((_, i) => {
            const nextI = (i + 1) % SCENES.length;
            const img = imagesRef.current[i];
            const nextImg = imagesRef.current[nextI];
            const text = textsRef.current[i];

            const startTime = i * stepDuration;
            const fadeTime = startTime + stepDuration - fadeDuration;

            // --- Text Animation ---
            tl.set(text, { display: "block" }, startTime);
            tl.to(text, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            }, startTime + 0.2);

            tl.to(text, {
                opacity: 0,
                y: -5,
                duration: 0.8,
                ease: "power2.in",
                onComplete: () => { gsap.set(text, { display: "none", y: 12 }); }
            }, fadeTime - 0.5);


            // --- Image Animation ---
            // Active Phase: Force opacity 1 to insure visibility during hold
            tl.fromTo(img,
                { scale: 1, filter: "blur(0px)", opacity: 1 },
                { scale: 1.05, duration: stepDuration, ease: "none" },
                startTime
            );

            // Transition to Next
            tl.set(nextImg, { zIndex: 3 }, fadeTime - 0.1);

            // Next: Fade In + Blur Out
            tl.fromTo(nextImg,
                { opacity: 0, scale: 1, filter: "blur(12px)" },
                { opacity: 1, filter: "blur(0px)", duration: fadeDuration, ease: "power1.inOut" },
                fadeTime
            );

            // Current: Fade Out + Blur In
            tl.to(img, {
                opacity: 0,
                filter: "blur(12px)",
                duration: fadeDuration,
                ease: "power1.inOut",
                onComplete: () => {
                    gsap.set(img, { zIndex: 1, scale: 1, filter: "blur(12px)" });
                }
            }, fadeTime);
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative w-[360px] md:w-[400px] aspect-[4/5] perspective-1000">

            {/* Main Image Card */}
            <div className="absolute inset-0 w-full h-full rounded-[40px] overflow-hidden shadow-2xl bg-black/5 ring-1 ring-white/10">
                {SCENES.map((scene, i) => (
                    <div
                        key={`img-${i}`}
                        ref={(el) => { if (el) imagesRef.current[i] = el; }}
                        className="absolute inset-0 w-full h-full will-change-transform opacity-0"
                        style={{ zIndex: i === 0 ? 10 : 0 }}
                    >
                        <Image
                            src={scene.image}
                            alt={scene.headline}
                            fill
                            className="object-cover"
                            priority={i === 0}
                            quality={90}
                            unoptimized // Bypass Next.js optimization to serve static file directly
                        />
                        {/* Soft Vignette/Edge Blur Effect */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
                    </div>
                ))}

                {/* Additional Inner Shadow for softer edges */}
                <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.3)] rounded-[40px] pointer-events-none z-20" />
            </div>

            {/* Floating Text Card */}
            <div className="absolute -bottom-10 -left-12 z-30 w-[340px] bg-white/90 dark:bg-[#0B1220]/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4 text-text-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-violet animate-pulse-slow">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" opacity="0.5" />
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-xs font-semibold uppercase tracking-wider opacity-70">Active Monitoring</span>
                </div>

                <div className="relative min-h-[140px]">
                    {SCENES.map((scene, i) => (
                        <div
                            key={`text-${i}`}
                            ref={(el) => { if (el) textsRef.current[i] = el; }}
                            className="absolute inset-0"
                        >
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                                {scene.headline}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                {scene.subtext}
                            </p>
                            <div className="mt-4 flex gap-2">
                                <div className="h-1.5 w-16 rounded-full bg-brand-violet/20 overflow-hidden">
                                    <div className="h-full bg-brand-violet w-2/3 animate-shimmer" />
                                </div>
                                <div className="h-1.5 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-2 pt-4 border-t border-gray-100 dark:border-white/5 flex justify-between items-center">
                    <div className="inline-block bg-gray-100 dark:bg-white/5 rounded px-2 py-1">
                        <span className="text-[10px] font-mono text-text-tertiary">
                            17 CFR 275.206(4)-1(a)(7)
                        </span>
                    </div>
                    <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-violet animate-bounce" style={{ animationDelay: '0s' }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-violet animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-violet animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                </div>

            </div>
        </div>
    );
}
