'use client'
import React from "react";

import { useUIStore } from "@/store/useUIStore";
import { useScrollStore } from "@/store/useScrollStore";
import StaggeredMenu from "../StaggeredMenu";

export default function Header() {
    const isNavbarVisible = useUIStore((state) => state.isNavbarVisible);
    const isMobileMenuOpen = useUIStore((state) => state.isMobileMenuOpen);
    const setMobileMenuOpen = useUIStore((state) => state.setMobileMenuOpen);
    const lenis = useScrollStore((state) => state.lenis);

    // Initial menu items
    const menuItems = [
        { link: "/", text: "Home", image: "https://baselex.com/logo-main.svg" },
        { link: "#fractal-story-section", text: "Solution", image: "https://baselex.com/logo-mor.svg" },
        { link: "#platform", text: "Platform", image: "https://baselex.com/logo-mor.svg" },
        { link: "#team", text: "Team", image: "https://baselex.com/logo-mor.svg" },
        { link: "#pricing", text: "Packages", image: "https://baselex.com/logo-mor.svg" },
        { link: "#faq", text: "FAQ", image: "https://baselex.com/logo-mor.svg" },
    ];

    const handleScroll = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        console.log("Handle Scroll Triggered", id);

        if (!lenis) {
            console.error("Lenis instance not found in store");
            return;
        }

        const target = document.querySelector(id) as HTMLElement;
        if (!target) {
            console.error("Target element not found:", id);
            return;
        }
        console.log("Scrolling to:", target);

        // Custom easing: EaseInOutCubic (Start slow, fast middle, end slow)
        const easing = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        let offset = 0;

        let scrollTarget = target;
        const pinSpacer = target.closest('.pin-spacer');
        if (pinSpacer) {
            scrollTarget = pinSpacer as HTMLElement;
        }

        // Center alignment logic for Pricing and FAQ
        if (id === '#pricing' || id === '#faq' || id === '#team') {
            const vh = window.innerHeight;
            const elHeight = scrollTarget.offsetHeight;
            // We want the center of element to be at center of screen
            // ScrollTo target puts target top at viewport top (offset 0)
            // We want target top to be at (vh - elHeight) / 2
            // So we negatively offset by that amount
            offset = -((vh - elHeight) / 2);
        }

        lenis.scrollTo(scrollTarget, {
            offset,
            duration: 2.5, // Slower duration for emphasized effect
            easing
        });
    };

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-transform duration-500 ease-in-out ${isNavbarVisible || isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            {/* Level 1: Utility Bar (Dark, Global/Region) */}
            <div className={`h-10 bg-[#0B1220] text-white flex items-center  relative z-32 transition-all duration-500 ease-in-out`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between text-xs font-medium">
                    {/* Left: Global Brand/Context */}
                    <div className="flex items-center space-x-4 opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
                        <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
                            <span>Compliance Engine: Active</span>
                        </span>
                    </div>

                    {/* Right: Region, Support, Account */}
                    <div className="hidden md:flex items-center space-x-6">
                        <div className="flex items-center space-x-1 cursor-pointer hover:text-brand-accent transition-colors">
                            <span className="text-gray-400">Jurisdiction:</span>
                            <span>EU</span>
                            <span className="opacity-50">▼</span>
                        </div>
                        <div className="flex items-center space-x-1 cursor-pointer hover:text-brand-accent transition-colors">
                            <span>Support</span>
                        </div>
                        <div className="flex items-center space-x-1 cursor-pointer hover:text-brand-accent transition-colors relative group">
                            <span>English</span>
                            <span className="opacity-50 text-[10px] group-hover:rotate-180 transition-transform duration-200">▼</span>

                            {/* Dropdown Menu */}
                            <div className="absolute top-full right-0 mt-0 w-32 bg-[#0B1220] border border-gray-800 rounded-b-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50 flex flex-col py-2">
                                <span className="px-4 py-2 text-xs text-brand-accent bg-white/5">English</span>
                                <span className="px-4 py-2 text-xs hover:bg-white/10 text-gray-300 hover:text-white transition-colors">Deutsch</span>
                                <span className="px-4 py-2 text-xs hover:bg-white/10 text-gray-300 hover:text-white transition-colors">Français</span>
                                <span className="px-4 py-2 text-xs hover:bg-white/10 text-gray-300 hover:text-white transition-colors">Italiano</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Level 2: Main Navigation (White, Taller, Shadow) */}
            <div className={`h-16 border-b flex w-max-screen items-center shadow-sm bg-bg-header border-border-subtle px-4 relative transition-all duration-500 ease-in-out z-40`}>
                <div className="w-full w-max-screen lg:px-4 sm:px-6 flex items-center justify-between">
                    {/* Logo & Primary Links */}
                    <div className="flex items-center gap-8">
                        <div className="flex items-center group cursor-pointer gap-4 z-50">
                            {/* Added z-50 to keep logo clickable/visible above menu if needed, or menu covers it? Standard is menu covers everything but usually we want a close button or similar. Let's keep logo z-50 just in case we want to use it to close or navigate home. */}
                            <img
                                src="/logo-main.svg"
                                alt="SkrilLex Logo"
                                className="h-8 w-auto transition-transform group-hover:scale-105"
                            />
                            <span className="text-xl font-bold uppercase text-action-pressed hidden lg:block">Baselex</span>
                        </div>

                        <nav className="hidden lg:flex items-center space-x-6">
                            <a
                                href="#fractal-story-section"
                                onClick={(e) => handleScroll(e, '#fractal-story-section')}
                                className="font-semibold text-sm hover:text-action-primary text-text-main transition-colors"
                            >
                                Solution
                            </a>
                            <a
                                href="#platform"
                                onClick={(e) => handleScroll(e, '#platform')}
                                className="font-semibold text-sm hover:text-action-primary text-text-main transition-colors"
                            >
                                Platform
                            </a>
                            <a
                                href="#team"
                                onClick={(e) => handleScroll(e, '#team')}
                                className="font-semibold text-sm hover:text-action-primary text-text-main transition-colors"
                            >
                                Team
                            </a>
                            <a
                                href="#pricing"
                                onClick={(e) => handleScroll(e, '#pricing')}
                                className="font-semibold text-sm hover:text-action-primary text-text-main transition-colors"
                            >
                                Packages
                            </a>
                            <a
                                href="#faq"
                                onClick={(e) => handleScroll(e, '#faq')}
                                className="font-semibold text-sm hover:text-action-primary text-text-main transition-colors"
                            >
                                FAQ
                            </a>
                        </nav>
                    </div>

                    {/* Search & Actions */}
                    <div className="flex items-center space-x-4">
                        <div className="hidden lg:flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold bg-bg-utility text-text-inverse">
                            <span>Request Demo</span>
                        </div>
                        <div className="lg:hidden z-40">
                            <StaggeredMenu
                                onMenuOpen={() => setMobileMenuOpen(!isMobileMenuOpen)}
                                onMenuClose={() => setMobileMenuOpen(!isMobileMenuOpen)}
                                onLinkClick={(e, link) => handleScroll(e, link)}
                                items={[
                                    { label: "Solution", ariaLabel: "Solution", link: "#fractal-story-section" },
                                    { label: "Platform", ariaLabel: "Platform", link: "#platform" },
                                    { label: "Team", ariaLabel: "Team", link: "#team" },
                                    { label: "Packages", ariaLabel: "Packages", link: "#pricing" },
                                    { label: "FAQ", ariaLabel: "FAQ", link: "#faq" },
                                ]}

                                isFixed={true}
                            />
                        </div>
                    </div>
                </div>
            </div>


        </header>
    );
}
