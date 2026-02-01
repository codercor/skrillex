"use client";

import React from "react";
import { motion } from "motion/react";
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

    return (
        <section
            id="team"
            className="py-24 bg-black relative z-10 overflow-hidden"
            onMouseEnter={() => setActiveSection('team')}
            onMouseLeave={() => setActiveSection(null)}
        >
            <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-b from-white to-white/60 mb-4">
                        The Minds Behind BaseLex
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        A multidisciplinary team of legal experts and AI researchers dedicated to
                        redefining enterprise compliance.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-10 justify-items-center">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="w-full max-w-[170px] md:max-w-[220px]"
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
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
