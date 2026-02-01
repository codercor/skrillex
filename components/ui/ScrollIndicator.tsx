"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { useScrollStore } from "@/store/useScrollStore";
import { cn } from "@/lib/utils";

export function ScrollIndicator() {
    const activeSection = useScrollStore((state) => state.activeSection);
    const lenis = useScrollStore((state) => state.lenis);
    const [isVisible, setIsVisible] = useState(false);

    const fadeTimer = useRef<NodeJS.Timeout | null>(null);
    const hasTriggeredFade = useRef(false);

    // Only show on specific sections
    const targetSections = ["hero", "fractal-story-section", "connection"];
    const shouldRender = activeSection && targetSections.includes(activeSection);

    // Reset visibility when entering a new section
    useEffect(() => {
        if (shouldRender) {
            // eslint-disable-next-line
            if (!isVisible) setIsVisible(true);
            hasTriggeredFade.current = false;
        } else {
            if (isVisible) setIsVisible(false);
        }
        return () => {
            if (fadeTimer.current) clearTimeout(fadeTimer.current);
        };
    }, [activeSection, shouldRender]);

    // Handle scroll activity
    // Handle scroll activity
    useEffect(() => {
        if (!lenis || !shouldRender) return;

        const onScroll = () => {
            // Map active sections to their DOM IDs
            const sectionMap: Record<string, string> = {
                "hero": "hero-section",
                "fractal-story-section": "fractal-story-section",
                "connection": "platform"
            };

            if (!activeSection) return;

            const elementId = sectionMap[activeSection];
            const element = document.getElementById(elementId);

            if (element) {
                const scrollY = window.scrollY;

                // Check if element is pinned (GSAP wraps in .pin-spacer)
                const pinSpacer = element.closest('.pin-spacer') as HTMLElement;
                const targetElement = pinSpacer || element;

                const elementTop = targetElement.offsetTop;
                const diff = scrollY - elementTop;

                // Logic:
                // 1. If at top (within 100px), show immediately, reset fade trigger.
                // 2. If scrolled away (> 100px) AND haven't triggered fade yet:
                //    Start 2s timer to hide.

                if (diff < 100 && diff > -200) {
                    // At top
                    setIsVisible(true);
                    hasTriggeredFade.current = false;
                    if (fadeTimer.current) {
                        clearTimeout(fadeTimer.current);
                        fadeTimer.current = null;
                    }
                } else {
                    // Scrolled away
                    if (!hasTriggeredFade.current) {
                        hasTriggeredFade.current = true;
                        if (fadeTimer.current) clearTimeout(fadeTimer.current);
                        fadeTimer.current = setTimeout(() => {
                            setIsVisible(false);
                        }, 2000);
                    }
                }
            }
        };

        // Run once on mount/change to set initial state correctly
        onScroll();

        lenis.on('scroll', onScroll);
        return () => {
            lenis.off('scroll', onScroll);
            if (fadeTimer.current) clearTimeout(fadeTimer.current);
        };
    }, [lenis, activeSection, shouldRender]);

    // Position logic
    const getPositionClasses = () => {
        switch (activeSection) {
            case "hero":
                return "bottom-10 left-1/2 -translate-x-1/2";
            case "fractal-story-section":
                return "bottom-10 left-1/2 -translate-x-1/2";
            case "connection":
                return "bottom-10 left-1/2 -translate-x-1/2";
            default:
                return "bottom-10 left-1/2 -translate-x-1/2";
        }
    };

    return (
        <AnimatePresence>
            {isVisible && shouldRender && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                        "fixed z-40 flex flex-col items-center justify-center gap-2 pointer-events-none mix-blend-difference text-white",
                        getPositionClasses()
                    )}
                >
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-80">
                        Scroll Down
                    </span>
                    <div className="p-2 rounded-full border border-white/20 animate-pulse">
                        <ChevronDown className="w-5 h-5 animate-bounce" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
