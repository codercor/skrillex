'use client'
import React from "react";
import { FullScreenScrollFX, FullScreenFXAPI } from "@/components/ui/full-screen-scroll-fx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useUIStore } from "@/store/useUIStore";


const sections = [
    {
        leftLabel: "Agents",
        title: <>Proliferation</>,
        rightLabel: "Everywhere",
        background: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=2400",
        audioSrc: "/sfx/click-01.mp3",
    },
    {
        leftLabel: "Code",
        title: <>Governance</>,
        rightLabel: "Is Law",
        background: "https://images.pexels.com/photos/2471234/pexels-photo-2471234.jpeg?auto=compress&cs=tinysrgb&w=2400",
        audioSrc: "/sfx/whoosh-02.mp3",
    },
    {
        leftLabel: "Policy",
        title: <>Enforcement</>,
        rightLabel: "Executed",
        background: "https://images.pexels.com/photos/8386365/pexels-photo-8386365.jpeg?auto=compress&cs=tinysrgb&w=2400",
        audioSrc: "/sfx/whoosh-02.mp3",
    },
    {
        leftLabel: "Trust",
        title: <>Assurance</>,
        rightLabel: "Absolute",
        background: "https://images.pexels.com/photos/3062948/pexels-photo-3062948.jpeg?auto=compress&cs=tinysrgb&w=2400",
        audioSrc: "/sfx/whoosh-02.mp3",
    },
];



export default function Carousel() {
    const apiRef = React.useRef<FullScreenFXAPI>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const setNavbarVisible = useUIStore((state) => state.setNavbarVisible);

    React.useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const st = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 100px", // triggers just before it hits top, or adjust as preferred
            end: "bottom top",
            onEnter: () => setNavbarVisible(false),
            onLeave: () => setNavbarVisible(true),
            onEnterBack: () => setNavbarVisible(false),
            onLeaveBack: () => setNavbarVisible(true),
        });

        return () => {
            st.kill();
            setNavbarVisible(true); // Ensure navbar is visible when unmounting
        };
    }, [setNavbarVisible]);


    return (
        <>
            <FullScreenScrollFX
                ref={containerRef}
                sections={sections}
                header={<><div>Agentic</div><div>Compliance</div></>}
                footer={<div></div>}
                showProgress
                durations={{ change: 0.7, snap: 800 }}
            />
        </>
    );
}