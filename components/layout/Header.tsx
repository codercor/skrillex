'use client'
import React from "react";

import { useUIStore } from "@/store/useUIStore";
import StaggeredMenu from "../StaggeredMenu";

export default function Header() {
    const isNavbarVisible = useUIStore((state) => state.isNavbarVisible);
    const isMobileMenuOpen = useUIStore((state) => state.isMobileMenuOpen);
    const setMobileMenuOpen = useUIStore((state) => state.setMobileMenuOpen);
    const menuRef = React.useRef<HTMLDivElement>(null);

    // Initial menu items
    const menuItems = [
        { link: "/", text: "Home", image: "https://baselex.com/logo-mor.svg" },
        { link: "#", text: "Products", image: "https://baselex.com/logo-mor.svg" },
        { link: "#", text: "Solutions", image: "https://baselex.com/logo-mor.svg" },
        { link: "#", text: "Pricing", image: "https://baselex.com/logo-mor.svg" },
        { link: "#", text: "Docs", image: "https://baselex.com/logo-mor.svg" },
    ];



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
                                src="/logo-mor.svg"
                                alt="SkrilLex Logo"
                                className="h-8 w-auto transition-transform group-hover:scale-105"
                            />
                            <span className="text-xl font-bold uppercase text-action-pressed hidden lg:block">Baselex</span>
                        </div>

                        <nav className="hidden lg:flex items-center space-x-6">
                            <div className="flex items-center space-x-1 cursor-pointer font-semibold text-sm hover:text-action-primary text-text-main transition-colors">
                                <span>Products</span>
                            </div>
                            <div className="flex items-center space-x-1 cursor-pointer font-semibold text-sm hover:text-action-primary text-text-main transition-colors">
                                <span>Solutions</span>
                            </div>
                            <a
                                href="#"
                                className="font-semibold text-sm hover:text-action-primary text-text-main transition-colors"
                            >
                                Pricing
                            </a>
                            <a
                                href="#"
                                className="font-semibold text-sm hover:text-action-primary text-text-main transition-colors"
                            >
                                Documentation
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
                                items={[
                                    { label: "Products", ariaLabel: "Products", link: "/#products" },
                                    { label: "Solutions", ariaLabel: "Solutions", link: "/#solutions" },
                                    { label: "Pricing", ariaLabel: "Pricing", link: "/#pricing" },
                                    { label: "Documentation", ariaLabel: "Documentation", link: "/#documentation" },
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
