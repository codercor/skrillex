import { create } from 'zustand';
import Lenis from 'lenis';

interface ScrollState {
    lenis: Lenis | undefined;
    setLenis: (lenis: Lenis) => void;
    scrollProgress: number;
    setScrollProgress: (progress: number) => void;
    activeSection: string | null;
    setActiveSection: (section: string | null) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
    lenis: undefined,
    setLenis: (lenis) => set({ lenis }),
    scrollProgress: 0,
    setScrollProgress: (progress) => set({ scrollProgress: progress }),
    activeSection: null,
    setActiveSection: (section) => set({ activeSection: section }),
}));
