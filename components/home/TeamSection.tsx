"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProfileCard from "@/components/ProfileCard";
import { useScrollStore } from "@/store/useScrollStore";

const teamMembers = [
    {
        name: "Erhan Erol",
        title: "Chief Executive Officer",
        handle: "erhan_baselex",
        status: "Online",
        avatarUrl: "/assets/erhan.jpeg",
        contactText: "Connect"
    },
    {
        name: "Ahmet Fisenkci",
        title: "Chief Technology Officer",
        handle: "ahmet_tech",
        status: "Coding",
        avatarUrl: "/assets/ahmet.png",
        contactText: "Tech"
    },
    {
        name: "Yeliz Demir",
        title: "Chief Legal Officer",
        handle: "yeliz_legal",
        status: "Reviewing",
        avatarUrl: "/assets/yeliz.jpeg",
        contactText: "Legal"
    },
    {
        name: "Alejandro Bes",
        title: "Strategic Advisor",
        handle: "alex_advisory",
        status: "Available",
        avatarUrl: "/assets/alex.jpeg",
        contactText: "Consult"
    }
];

export default function TeamSection() {
    const setActiveSection = useScrollStore(state => state.setActiveSection);
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const q = gsap.utils.selector(containerRef);

            // autoAlpha handles opacity + visibility:hidden for better optimization
            gsap.fromTo(q(".team-card"),
                {
                    autoAlpha: 0,
                    scale: 0.8,
                    filter: "blur(20px) grayscale(100%)",
                    skewX: 20, // Digital distortion start
                },
                {
                    autoAlpha: 1,
                    scale: 1,
                    filter: "blur(0px) grayscale(0%)",
                    skewX: 0,
                    duration: 1,
                    stagger: {
                        amount: 0.5,
                        from: "start"
                    },
                    ease: "steps(5)", // 5 distinct frames/jumps for glitch feel
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%", // Trigger slightly earlier
                        end: "bottom top",
                        toggleActions: "play none none reverse",
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="team"
            ref={containerRef}
            className="py-24 bg-black relative z-10 overflow-hidden"
            onMouseEnter={() => setActiveSection('team')}
            onMouseLeave={() => setActiveSection(null)}
        >
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 opacity-0 team-card">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-b from-white to-white/60 mb-4">
                        The Minds Behind BaseLex
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        A multidisciplinary team of legal experts and AI researchers dedicated to
                        redefining enterprise compliance.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-10 justify-items-center">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="team-card w-full max-w-[170px] md:max-w-[220px] will-change-transform"
                        >
                            <ProfileCard
                                name={member.name}
                                title={member.title}
                                handle={member.handle}
                                status={member.status}
                                avatarUrl={member.avatarUrl}
                                miniAvatarUrl={member.avatarUrl}
                                contactText={member.contactText}
                                enableTilt={true}
                                enableMobileTilt={true}
                                behindGlowEnabled={true}
                                behindGlowColor="rgba(111, 111, 190, 0.4)"
                                showUserInfo={false}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
