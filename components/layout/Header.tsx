'use client'
import React from "react";

import { useUIStore } from "@/store/useUIStore";

export default function Header() {
    const isNavbarVisible = useUIStore((state) => state.isNavbarVisible);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-transform duration-500 ease-in-out ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
                }`}
        >
            {/* Level 1: Utility Bar (Dark, Global/Region) */}
            <div className="h-10 bg-[#0B1220] text-white flex items-center relative z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between text-xs font-medium">
                    {/* Left: Global Brand/Context */}
                    <div className="flex items-center space-x-4 opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
                        <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
                            <span>Compliance Engine: Active</span>
                        </span>
                    </div>

                    {/* Right: Region, Support, Account */}
                    <div className="flex items-center space-x-6">
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
            <div className="h-16 border-b flex items-center shadow-sm bg-bg-header border-border-subtle relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
                    {/* Logo & Primary Links */}
                    <div className="flex items-center gap-8">
                        <div className="flex items-center group cursor-pointer">
                            <img
                                src="/skrillex-logo-light.svg"
                                alt="SkrilLex Logo"
                                className="h-8 w-auto transition-transform group-hover:scale-105"
                            />
                        </div>

                        <nav className="hidden md:flex items-center space-x-6">
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
                        <div className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold bg-bg-utility text-text-inverse">
                            <span>Reach Out</span>
                        </div>
                        <div className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold text-text-tertiary bg-bg-surface-2 border border-border-subtle cursor-not-allowed opacity-80">
                            <span>Console</span>
                            <span className="bg-bg-utility/10 text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider font-extrabold text-text-secondary">
                                Soon
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
