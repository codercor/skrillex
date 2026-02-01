'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollStore } from '@/store/useScrollStore';
import { useUIStore } from '@/store/useUIStore';
import animationData from '../../assets/baselex-animation.json';

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function LottieSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lottieRef = useRef<any>(null);
    const setScrollProgress = useScrollStore((state) => state.setScrollProgress);
    const setNavbarVisible = useUIStore((state) => state.setNavbarVisible);

    useGSAP(() => {
        if (!containerRef.current) return;

        // Force stop to prevent any autoplay
        if (lottieRef.current) {
            lottieRef.current.stop();
        }

        // Create a proxy object to hold the frame progress
        const animState = { frame: 0 };

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top top',
            end: '+=1000%', // Long distance
            pin: true,
            onUpdate: (self) => {
                // Update global store with RAW scroll progress (fast)
                setScrollProgress(self.progress);
            },
            onEnter: () => setNavbarVisible(false),
            onLeave: () => setNavbarVisible(true),
            onEnterBack: () => setNavbarVisible(false),
            onLeaveBack: () => setNavbarVisible(true),
        });

        // Use a separate GSAP tween to handle the smooth scrubbing of the animation
        // We get the total frames directly from the JSON source to be accurate
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const totalFrames = (animationData as any).op || 120;

        gsap.to(animState, {
            frame: totalFrames - 1,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: '+=1000%',
                scrub: 2, // 2s smooth scrubbing (braking)
            },
            onUpdate: () => {
                if (lottieRef.current) {
                    lottieRef.current.goToAndStop(animState.frame, true);
                }
            }
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-screen flex items-center justify-center bg-bg-page overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-linear-to-b from-transparent to-brand-violet-soft/20 pointer-events-none z-10"></div>

            <div className="absolute inset-0 w-full h-full">
                <Lottie
                    lottieRef={lottieRef}
                    animationData={animationData}
                    autoplay={false}
                    loop={false}
                    className="w-full h-full object-cover"
                    onDOMLoaded={() => {
                        lottieRef.current?.stop();
                    }}
                />
            </div>
        </section>
    );
}
