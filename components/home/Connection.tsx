"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React from "react";
import { GoogleGeminiEffect } from "../ui/google-gemini-effect";
import { useScrollStore } from "@/store/useScrollStore";

export function Connection() {
    const setActiveSection = useScrollStore(state => state.setActiveSection);
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
    const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
    const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
    const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
    const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

    return (
        <motion.div
            id="platform"
            className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] relative z-20 pt-40 overflow-clip"
            ref={ref}
            onViewportEnter={() => setActiveSection('connection')}
            onViewportLeave={() => setActiveSection(null)}
            viewport={{ amount: 0.1 }} // trigger when 10% visible
        >
            <GoogleGeminiEffect
                title="The Compliance Platform"
                description="Built to absorb complexity. We replace fragmented workflows with a unified infrastructure, ensuring your operations are audit-ready and friction-free by default."
                pathLengths={[
                    pathLengthFirst,
                    pathLengthSecond,
                    pathLengthThird,
                    pathLengthFourth,
                    pathLengthFifth,
                ]}
            />
        </motion.div>
    );
}
