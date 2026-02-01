import { create } from 'zustand';

interface UIState {
    isNavbarVisible: boolean;
    setNavbarVisible: (visible: boolean) => void;
    isMobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
    isNavbarVisible: true,
    setNavbarVisible: (visible) => set({ isNavbarVisible: visible }),
    isMobileMenuOpen: false,
    setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
}));
