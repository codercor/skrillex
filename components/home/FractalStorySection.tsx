import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollStore } from '@/store/useScrollStore';


// Tailwind CSS'in projenizde kurulu olduğunu varsayıyoruz.
// Değilse, index.html'e CDN ekleyebilirsiniz.

const FractalStorySection = () => {
    const setActiveSection = useScrollStore(state => state.setActiveSection);
    // --- Refs ---
    const sectionRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
    }, []);
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const coreRef = useRef<SVGCircleElement>(null);
    const indicatorRef = useRef<HTMLDivElement>(null);
    const pixelTrackRef = useRef<HTMLDivElement>(null);
    const profileCardRef = useRef<HTMLDivElement>(null);
    const whiteOutRef = useRef<HTMLDivElement>(null);

    // Profil referansları
    const profileImgRef = useRef<HTMLImageElement>(null);
    const profileNameRef = useRef<HTMLHeadingElement>(null);
    const profileRoleRef = useRef<HTMLSpanElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const textColumnRef = useRef<HTMLDivElement>(null);
    // Explicitly type the array ref
    const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

    // --- Sabitler ve Veri ---
    const employees = [
        {
            name: "Klaus Müller",
            role: "Head of Compliance (Legacy)",
            img: "https://i.pravatar.cc/150?u=klaus",
            range: [0.02, 0.15],
            cardClass: "border-gray-500"
        },
        {
            name: "Hannah Weber",
            role: "Risk Analyst Team Lead",
            img: "https://i.pravatar.cc/150?u=hannah",
            range: [0.18, 0.30],
            cardClass: "border-blue-500"
        },
        {
            name: "BaseLex Node 01",
            role: "Policy Parser Agent",
            img: "https://api.dicebear.com/7.x/bottts/svg?seed=baselex1",
            range: [0.35, 0.50],
            cardClass: "border-cyan-500"
        },
        {
            name: "BaseLex Node 07",
            role: "Conflict Resolution Agent",
            img: "https://api.dicebear.com/7.x/bottts/svg?seed=baselex2",
            range: [0.55, 0.70],
            cardClass: "border-violet-500"
        },
        {
            name: "System Overwatch",
            role: "Governance Control Plane",
            img: "https://api.dicebear.com/7.x/shapes/svg?seed=baselex3",
            range: [0.75, 0.90],
            cardClass: "border-emerald-500"
        }
    ];

    const colorClasses = ['active-blue', 'active-purple', 'active-green', 'active-cyan'];

    // --- Yardımcı Matematik Fonksiyonları ---
    const pseudoRandom = (seed: number) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
    };

    const growBranch = (x: number, y: number, angle: number, maxLen: number, currentDepth: number, maxDepth: number, globalProgress: number, seed: number) => {
        const depthStep = 1 / maxDepth;
        const startThreshold = currentDepth * depthStep * 0.8;

        if (globalProgress < startThreshold) return "";

        let localGrowth = (globalProgress - startThreshold) / (depthStep * 1.5);
        localGrowth = Math.max(0, Math.min(1, localGrowth));

        if (localGrowth <= 0) return "";

        const currentLen = (maxLen / maxDepth) * localGrowth;
        if (currentLen < 1) return "";

        let branchPath = "";
        const spiral = Math.sin(globalProgress * 2 + currentDepth) * 0.15;
        const nextAngle = angle + spiral + (pseudoRandom(seed) - 0.5) * 0.4;

        const nextX = x + Math.cos(nextAngle) * currentLen;
        const nextY = y + Math.sin(nextAngle) * currentLen;

        branchPath += `L ${nextX.toFixed(1)} ${nextY.toFixed(1)} `;

        if (currentDepth < maxDepth && localGrowth > 0.6) {
            // Ana dal
            branchPath += growBranch(nextX, nextY, nextAngle, maxLen * 0.9, currentDepth + 1, maxDepth, globalProgress, seed + 1);

            // Yan dal 1
            if (localGrowth > 0.8) {
                const sideAngle = nextAngle + (0.5 + pseudoRandom(seed + 5) * 0.5);
                branchPath += `M ${nextX.toFixed(1)} ${nextY.toFixed(1)} `;
                branchPath += growBranch(nextX, nextY, sideAngle, maxLen * 0.6, currentDepth + 1, maxDepth, globalProgress, seed + 2);
            }

            // Yan dal 2
            if (localGrowth > 0.9) {
                const otherSideAngle = nextAngle - (0.5 + pseudoRandom(seed + 10) * 0.5);
                branchPath += `M ${nextX.toFixed(1)} ${nextY.toFixed(1)} `;
                branchPath += growBranch(nextX, nextY, otherSideAngle, maxLen * 0.5, currentDepth + 1, maxDepth, globalProgress, seed + 3);
            }
        }

        return branchPath;
    };

    // --- Animasyon Mantığı ---
    useEffect(() => {
        // Window objesinden kütüphaneleri al -> Global tanımlı olduğu için gerek yok ama type safety için gsap importu kalmalı.

        // --- 1. Lenis Smooth Scroll Başlatma ---
        // Global Lenis kullanıldığı için buradaki yerel Lenis'i ve raf döngüsünü kaldırıyoruz.

        // --- 2. Pixel Grid Hazırlığı ---

        // --- 2. Pixel Grid Hazırlığı ---
        let pixelColumns: any[] = [];
        const rowsPerCol = 4;
        const pixelSize = 5;
        const gapSize = 2;

        const createPixelGrid = () => {
            if (!pixelTrackRef.current) return;

            pixelTrackRef.current.innerHTML = '';
            pixelColumns = [];

            const availableWidth = window.innerWidth - 40;
            const colWidth = pixelSize + gapSize;
            const totalCols = Math.floor(availableWidth / colWidth);

            for (let i = 0; i < totalCols; i++) {
                const col = document.createElement('div');
                col.className = 'flex flex-col gap-[2px] shrink-0';

                const bits = [];
                for (let j = 0; j < rowsPerCol; j++) {
                    const bit = document.createElement('div');
                    bit.className = 'w-[5px] h-[5px] bg-[#111] rounded-[1px] transition-all duration-100 pixel-bit';
                    col.appendChild(bit);
                    bits.push(bit);
                }

                pixelColumns.push({ element: col, bits: bits, processed: false });
                pixelTrackRef.current.appendChild(col);
            }
        };

        createPixelGrid();
        window.addEventListener('resize', createPixelGrid);

        // --- 3. Animasyon Fonksiyonları ---
        let lastProgress = 0;

        const updatePixelBar = (progress: number) => {
            const totalCols = pixelColumns.length;
            const activeColIndex = Math.floor(progress * totalCols);

            pixelColumns.forEach((colData, cIndex) => {
                if (cIndex <= activeColIndex) {
                    if (!colData.processed) {
                        colData.processed = true;
                        colData.bits.forEach((bit: HTMLDivElement) => {
                            if (Math.random() > 0.25) {
                                const randomColor = colorClasses[Math.floor(Math.random() * colorClasses.length)];
                                bit.classList.add(randomColor);
                                bit.style.opacity = (0.4 + Math.random() * 0.6).toString();
                            } else {
                                bit.style.backgroundColor = "#222";
                            }
                        });
                    }
                } else {
                    if (colData.processed) {
                        colData.processed = false;
                        colData.bits.forEach((bit: HTMLDivElement) => {
                            // Reset classes
                            colorClasses.forEach(c => bit.classList.remove(c));
                            bit.style.opacity = "1";
                            bit.style.backgroundColor = "";
                            bit.classList.add('bg-[#111]');
                        });
                    }
                }
            });

            const startX = 20;
            const currentLeft = startX + (progress * (window.innerWidth - 40));
            const tooltipWidth = 260;
            const safeLeft = Math.min(currentLeft, window.innerWidth - tooltipWidth - 20);

            if (profileCardRef.current) {
                profileCardRef.current.style.left = `${Math.max(20, safeLeft)}px`;
            }
        };

        const updateProfileCard = (progress: number) => {
            const activeEmployee = employees.find(emp => progress >= emp.range[0] && progress <= emp.range[1]);

            if (profileCardRef.current) {
                if (activeEmployee) {
                    const isVisible = profileCardRef.current.classList.contains('opacity-100');
                    const currentName = profileNameRef.current?.innerText;

                    if (isVisible && currentName === activeEmployee.name) return;

                    if (profileImgRef.current) profileImgRef.current.src = activeEmployee.img;
                    if (profileNameRef.current) profileNameRef.current.innerText = activeEmployee.name;
                    if (profileRoleRef.current) profileRoleRef.current.innerText = activeEmployee.role;

                    profileCardRef.current.className = `absolute top-[60px] flex items-center gap-3 bg-black/85 backdrop-blur-md border border-white/10 px-4 py-2.5 transition-opacity duration-300 pointer-events-none shadow-xl min-w-[240px] z-[60] opacity-100 ${activeEmployee.cardClass}`;
                } else {
                    profileCardRef.current.classList.remove('opacity-100');
                    profileCardRef.current.classList.add('opacity-0');
                }
            }
        };

        const generateInsideOutFractal = (progress: number) => {
            lastProgress = progress;
            const drawProgress = Math.min(1, progress * 1.18);

            updatePixelBar(progress);
            updateProfileCard(progress);

            const cx = 600, cy = 600;
            const coreSize = Math.max(0, (drawProgress * 50) - 5);

            if (coreRef.current) {
                coreRef.current.setAttribute('r', coreSize > 0 ? (2 + coreSize).toString() : "0");
                coreRef.current.style.opacity = (progress > 0.8 ? 1 - ((progress - 0.8) * 5) : 1 - (drawProgress * 0.5)).toString();
            }

            let pathData = "";
            const mainBranches = 16;
            const maxGrowthRadius = 550;

            for (let i = 0; i < mainBranches; i++) {
                const angle = (i / mainBranches) * Math.PI * 2;
                pathData += `M ${cx} ${cy} `;
                pathData += growBranch(cx, cy, angle, maxGrowthRadius, 0, 8, drawProgress, i * 13.3);
            }

            if (pathRef.current) {
                pathRef.current.setAttribute('d', pathData);
                const opacity = 0.4 + drawProgress * 0.6;
                pathRef.current.setAttribute('stroke', `rgba(107, 93, 211, ${opacity})`);
                pathRef.current.setAttribute('stroke-width', Math.max(0.3, 1.5 - (drawProgress * 1.0)).toString());
            }

            if (indicatorRef.current) {
                indicatorRef.current.innerText = `NETWORK EXPANSION // ${(progress * 100).toFixed(2)}%`;
            }
        };

        // --- 4. GSAP Zaman Çizelgesi ---
        const ctx = gsap.context(() => {

            gsap.to(svgRef.current, {
                rotation: -360,
                duration: 50,
                repeat: -1,
                ease: "none",
                transformOrigin: "center center"
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=600%",
                    pin: true,
                    scrub: 1,
                    onUpdate: (self) => generateInsideOutFractal(self.progress),
                    onEnter: () => setActiveSection('fractal-story-section'),
                    onEnterBack: () => setActiveSection('fractal-story-section'),
                    onLeave: () => setActiveSection(null), // or next section
                    onLeaveBack: () => setActiveSection(null) // or prev section
                }
            });

            const TOTAL_STEPS = 6;
            const stepDuration = 1 / TOTAL_STEPS;
            // Slightly compress final range to ensure completion
            // const stepDuration = 0.16; 

            stepsRef.current.forEach((step, i) => {
                if (!step) return;
                const start = i * stepDuration;
                const end = (i + 1) * stepDuration;

                tl.fromTo(step,
                    { autoAlpha: 0, scale: 0.95, y: 30 },
                    { autoAlpha: 1, scale: 1, y: 0, duration: 0.1 },
                    start
                );
                tl.to(step,
                    { autoAlpha: 0, scale: 1.05, y: -30, duration: 0.1 },
                    end - 0.05
                );
            });

            // Final Sequence
            tl.to([headerRef.current, textColumnRef.current, indicatorRef.current], {
                autoAlpha: 0,
                duration: 0.1
            }, 0.82);

            tl.to(svgRef.current, {
                scale: 6,
                x: "-25vw",
                opacity: 0,
                filter: "blur(20px)",
                duration: 0.18,
                ease: "power2.in"
            }, 0.82);

        }, sectionRef);

        generateInsideOutFractal(0);

        return () => {
            window.removeEventListener('resize', createPixelGrid);
            // lenis.destroy(); // Global instance used
            ctx.revert();
        };
    }, []);

    // --- JSX ---
    return (
        <>
            <style>{`
        .pixel-bit.active-blue { background-color: #3b82f6; box-shadow: 0 0 4px rgba(59, 130, 246, 0.6); }
        .pixel-bit.active-purple { background-color: #a855f7; box-shadow: 0 0 4px rgba(168, 85, 247, 0.6); }
        .pixel-bit.active-green { background-color: #10b981; box-shadow: 0 0 4px rgba(16, 185, 129, 0.6); }
        .pixel-bit.active-cyan { background-color: #06b6d4; box-shadow: 0 0 4px rgba(6, 182, 212, 0.6); }
        
        .profile-tooltip::before {
            content: ''; position: absolute; top: -5px; left: 15px; width: 10px; height: 10px;
            background: rgba(15, 15, 20, 0.85);
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            border-left: 1px solid rgba(255, 255, 255, 0.08);
            transform: rotate(45deg);
        }
      `}</style>

            {/* Ön Hazırlık / Spacer (Demo amaçlı) */}


            <section
                id="fractal-story-section"
                ref={sectionRef}
                className="h-screen w-full relative z-10 bg-[#030303] overflow-hidden font-sans text-white"
            >


                {/* Transition Overlay */}
                <div ref={whiteOutRef} className="absolute inset-0 bg-white opacity-0 pointer-events-none z-100"></div>

                {/* Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] h-screen w-full max-w-[1800px] mx-auto relative">

                    {/* Left Column: Texts */}
                    <div ref={textColumnRef} className="flex flex-col justify-center px-6 lg:px-[10%] relative z-30 pointer-events-none mt-[-20vh] lg:mt-0">
                        {[
                            { title: "01. The Manual Burden", text: "Compliance used to mean armies of auditors fighting a losing battle. Thousands of spreadsheets, endless meetings, and human error at every turn." },
                            { title: "02. The Integrity Gap", text: "As regulations multiplied, the 'human firewall' collapsed. No team leads could verify constraints across millions of daily transactions." },
                            { title: "03. Infrastructure, Not Apps", text: "We didn't build another dashboard. We built the compliance control plane. A fundamental infrastructure layer that processes regulation as code." },
                            { title: "04. Multi-Agent Swarm", text: "Where a team of 50 struggled, autonomous agents thrive. Parsing policy, resolving conflicts, and enforcing logic in milliseconds." },
                            { title: "05. Runtime Governance", text: "We moved compliance from 'post-audit' to 'runtime'. Constraints are enforced live, ensuring every action is valid before it executes." },
                            { title: "06. Effortless Order", text: "The complexity remains, but the friction is gone. A trillion-dollar regulatory problem, solved by a native, multi-agent architecture." }
                        ].map((item, i) => (
                            <div
                                key={i}
                                ref={el => { stepsRef.current[i] = el; }}
                                className="absolute opacity-0 invisible pointer-events-none"
                            >
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 tracking-tight text-white leading-none">
                                    {item.title.split('. ').map((part, idx) => (
                                        <span key={idx} className="block">{idx === 0 ? part + '.' : part}</span>
                                    ))}
                                </h2>
                                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-gray-400 max-w-[500px] bg-black/50 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none p-4 lg:p-0 rounded-lg">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Right Column: Visual */}
                    <div className="absolute inset-0 lg:relative flex items-end lg:items-center justify-center bg-[radial-gradient(circle_at_center,rgba(107,93,211,0.05)_0%,transparent_70%)] z-10 lg:z-auto opacity-100 lg:opacity-100 pt-48 lg:pb-0">
                        <svg
                            ref={svgRef}
                            viewBox="0 0 1200 1200"
                            className="w-full h-full max-w-[1100px] max-h-[1100px] drop-shadow-[0_0_40px_rgba(107,93,211,0.15)] origin-center"
                        >
                            <circle ref={coreRef} cx="600" cy="600" r="2" className="fill-white blur-xl opacity-80" />
                            <path
                                ref={pathRef}
                                d=""
                                fill="none"
                                stroke="#6B5DD3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>

                {/* Footer Indicator */}
                <div ref={indicatorRef} className="absolute bottom-12 left-[10%] text-[0.65rem] uppercase tracking-[0.5em] text-gray-400 font-semibold">
                    NETWORK EXPANSION // 0.00%
                </div>
                {/* Header & Pixel Progress */}
                <div
                    ref={headerRef}
                    className="absolute bottom-20 left-0 w-full px-5 py-4 z-50 flex flex-col items-start bg-linear-to-b from-[#030303] via-[#030303]/90 to-transparent"
                >
                    {/* Pixel Track */}
                    <div ref={pixelTrackRef} className="flex gap-[2px] w-full opacity-100"></div>

                    {/* Profile Tooltip (JS ile pozisyonlanır) */}
                    <div
                        ref={profileCardRef}
                        className="absolute top-[60px] flex items-center gap-3 bg-black/85 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-lg opacity-0 transition-opacity duration-300 pointer-events-none shadow-xl min-w-[240px] z-60"
                    >
                        <img
                            ref={profileImgRef}
                            className="w-9 h-9 rounded-full object-cover border-2 border-white/10"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                            alt="Profile"
                        />
                        <div className="leading-tight">
                            <h4 ref={profileNameRef} className="text-sm font-semibold text-white m-0"></h4>
                            <span ref={profileRoleRef} className="text-[0.7rem] text-gray-400 block"></span>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default FractalStorySection;