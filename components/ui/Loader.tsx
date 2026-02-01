"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Loader = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Set initial state for paths - hidden
        // We select all 'path' elements inside the SVG
        const paths = svgRef.current?.querySelectorAll("path");

        if (paths) {
            // Use fromTo for a clean animation start to end
            tl.fromTo(
                paths,
                {
                    strokeDasharray: 1000, // Make it large enough to cover the longest path
                    strokeDashoffset: 1000,
                    opacity: 1,
                    fillOpacity: 0,
                },
                {
                    strokeDashoffset: 0,
                    duration: 2.5, // Draw for 2.5 seconds
                    ease: "power2.inOut",
                    stagger: 0.1, // Slight stagger for a drawing effect
                }
            )
            if (containerRef.current) {
                tl.to(containerRef.current.querySelectorAll(".fill-part"), {
                    fillOpacity: 1,
                    duration: 1.5,
                    ease: "power2.out"
                }, "<0.5") // Start earlier
                    .to(containerRef.current, {
                        opacity: 0,
                        duration: 0.5, // Fade out for 0.5 seconds
                        ease: "power2.inOut",
                        onComplete: () => {
                            if (containerRef.current) {
                                containerRef.current.style.display = "none";
                            }
                        }
                    }, "+=0.2"); // Wait a bit after drawing
            }
        }
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-9999 flex items-center justify-center bg-background"
        >
            <svg
                ref={svgRef}
                width="230"
                height="108"
                viewBox="0 0 230 108"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-48 h-auto md:w-64" // Responsive sizing
            >
                <path d="M4.50043 45.5001L4.50043 99.5001" stroke="#6B5DD3" strokeWidth="8" />
                <path d="M41.0004 4.00009C40.0004 24.5001 28.0004 45.5 4.00042 48.5001" stroke="#6B5DD3" strokeWidth="8" strokeLinecap="round" />
                <path d="M40.5004 4.50006L40.5004 99.5001" stroke="#6B5DD3" strokeWidth="8" strokeLinecap="round" />
                <path d="M40.5005 4.49995C60.0004 40.5 92.0004 29.5 104.5 37.4999" stroke="#6B5DD3" strokeWidth="8" strokeLinecap="round" />
                <path d="M109.5 42.5001C79.0004 49.0001 60.5004 71.0001 56.5004 103.5" stroke="#6B5DD3" strokeWidth="8" strokeLinecap="round" />
                <path d="M0.500431 103.5H60.5004" stroke="#6B5DD3" strokeWidth="8" />
                <path d="M225.5 45.7707V99.7707" stroke="#6B5DD3" strokeWidth="8" />
                <path d="M189 4.27072C190 24.7707 202 45.7707 226 48.7707" stroke="#6B5DD3" strokeWidth="8" strokeLinecap="round" />
                <path d="M189.5 4.77069V99.7707" stroke="#6B5DD3" strokeWidth="8" strokeLinecap="round" />
                <path d="M189.5 4.77058C170 40.7707 138 29.7707 125.5 37.7706" stroke="#6B5DD3" strokeWidth="8" strokeLinecap="round" />
                <path d="M120.5 42.7707C151 49.2707 169.5 71.2707 173.5 103.771" stroke="#6B5DD3" strokeWidth="8" strokeLinecap="round" />
                <path d="M229.5 103.771H169.5" stroke="#6B5DD3" strokeWidth="8" />
                <path d="M89.6342 30.0616L139.105 30.4571C139.659 30.4616 139.795 31.23 139.277 31.4249L128.91 35.3126C128.373 35.514 127.998 36.0037 127.944 36.5743L127.089 45.5479C127.065 45.8043 126.849 46 126.591 46.0001H103.457C103.19 45.9998 102.97 45.7888 102.958 45.5215L102.532 35.7061C102.503 35.0557 102.059 34.498 101.431 34.3253L89.4975 31.043C88.9336 30.8878 89.0492 30.0569 89.6342 30.0616Z" fill="#6B5DD3" stroke="#6B5DD3" strokeWidth="1" className="fill-part" />
            </svg>
        </div>
    );
};

export default Loader;
