'use client';

import { ReactLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useScrollStore } from '@/store/useScrollStore';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<any>(null);
    const setLenis = useScrollStore((state) => state.setLenis);

    useEffect(() => {
        if (lenisRef.current?.lenis) {
            setLenis(lenisRef.current.lenis);
        }
    }, [setLenis]);

    useEffect(() => {
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000);
        }

        gsap.ticker.add(update);

        return () => {
            gsap.ticker.remove(update);
        };
    }, []);

    return (
        <ReactLenis
            ref={lenisRef}
            root
            options={{
                lerp: 0.05, // Lower = smoother/slower (default ~0.1)
                duration: 1.5, // Alternative to lerp, sets scroll duration
                smoothWheel: true,
                wheelMultiplier: 0.8, // Slower scrolling per wheel event
            }}
        >
            {children}
        </ReactLenis>
    );
}
