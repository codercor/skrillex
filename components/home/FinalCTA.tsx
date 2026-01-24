"use client";
import React from 'react';
import PixelBlast from '../PixelBlast';

export default function FinalCTA() {
    return (
        <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
            {/* PixelBlast Background */}
            <div className="absolute inset-0 z-0">
                <PixelBlast
                    variant="square"
                    pixelSize={4}
                    color="#6B5DD3" // Brand Violet
                    speed={25}
                    pixelSizeJitter={0.5}
                    enableRipples={true}
                    rippleIntensityScale={1.5}
                    rippleSpeed={0.5}
                />
            </div>

            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/80 z-10 pointer-events-none"></div>

            {/* Content Content */}
            <div className="relative z-20 max-w-4xl mx-auto px-6 text-center space-y-8">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    Compliance is Solved.
                </h2>
                <p className="text-xl md:text-2xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
                    The era of manual governance is over. <br className="hidden md:block" />
                    Welcome to the age of <span className="text-brand-accent font-semibold">executable law</span>.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                    <button className="px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-neutral-200 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                        Request Access
                    </button>
                    <a href="#" className="text-neutral-400 hover:text-white transition-colors underline-offset-4 hover:underline text-lg">
                        Read the Whitepaper
                    </a>
                </div>
            </div>
        </section>
    );
}
