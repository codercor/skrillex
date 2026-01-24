'use client';

import { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function GSAPRegistry({ children }: { children: React.ReactNode }) {
    useGSAP(() => {
        // Global GSAP configuration can go here if needed
    });

    return <>{children}</>;
}
