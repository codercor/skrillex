import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

// --- Yardımcı Fonksiyonlar ---

const random = (min: number, max: number) => Math.random() * (max - min) + min;

// --- RENK PALETİ ---
const COLORS = [
    "#6B5DD3", // Ana Mor
    "#483D8F", // Koyu Mavi/Mor
    "#00B3A4"  // Turkuaz/Teal
];

// Chaos için rastgele renk seçici
const getRandomPaletteColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

// DAHA FAZLA KARMAŞA İÇİN GÜNCELLENDİ
const generateChaosPath = (index: number, total: number, width: number, height: number) => {
    const startY = (height / total) * index + random(-200, 200);
    const endY = height / 2;

    const cp1x = width * random(0.05, 0.45);
    const cp1y = startY + random(-600, 600);

    const cp2x = width * random(0.15, 0.45);
    const cp2y = endY + random(-500, 500);

    return `M -50 ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${width * 0.5} ${endY}`;
};

const generateOrderPath = (index: number, total: number, width: number, height: number) => {
    const startY = height / 2;
    const spacing = height / (total + 1);
    const endY = spacing * (index + 1);
    const cp1x = width * 0.6;
    const cp1y = startY;
    const cp2x = width * 0.7;
    const cp2y = endY;
    return `M ${width * 0.5} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${width} ${endY}`;
};

// --- Alt Bileşen: Tekil Çizgi Animasyonu ---
const AnimatedLine = ({ pathString, strokeColor, progress, range, opacity = 1, filter = "none", strokeWidth = 2 }: { pathString: string, strokeColor: string, progress: any, range: any, opacity?: number, filter?: string, strokeWidth?: number }) => {
    const pathLength = useTransform(progress, range, [0, 1]);

    return (
        <motion.path
            d={pathString}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            filter={filter}
            style={{
                pathLength: pathLength,
                opacity: opacity
            }}
        />
    );
};

const BaselexChaosToOrder = () => {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const logoOpacity = useTransform(smoothProgress, [0.4, 0.5], [0, 1]);
    const logoScale = useTransform(smoothProgress, [0.4, 0.6], [0.8, 1.1]);
    // Glow rengini paletin en parlak rengi olan Teal/Turkuaz'a yakın bir tonda güncelledim
    const logoGlow = useTransform(smoothProgress, [0.4, 0.6], ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 60px rgba(107, 93, 211, 0.6)"]);

    const chaosGroupOpacity = useTransform(smoothProgress, [0.85, 1], [1, 0.2]);

    const LINE_COUNT = 60;
    const WIDTH = 1200;
    const HEIGHT = 800;

    const paths = useMemo(() => {
        return Array.from({ length: LINE_COUNT }).map((_, i) => {
            const chaosStart = random(0, 0.25);
            const chaosEnd = random(0.40, 0.50);

            const orderStart = random(0.55, 0.65);
            const orderEnd = random(0.85, 1.0);

            return {
                id: i,
                chaos: generateChaosPath(i, LINE_COUNT, WIDTH, HEIGHT),
                order: generateOrderPath(i, LINE_COUNT, WIDTH, HEIGHT),
                // Chaos renklerini belirtilen paletten seçiyoruz
                colorChaos: getRandomPaletteColor(),
                timing: {
                    chaos: [chaosStart, chaosEnd],
                    order: [orderStart, orderEnd]
                }
            };
        });
    }, []);

    return (
        <div id='platform' className="bg-slate-950 min-h-screen text-white font-sans selection:bg-[#00B3A4] selection:text-white">

            {/* Main Animation Container */}
            <div ref={containerRef} className="h-[300vh] relative">
                <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-slate-950">

                    {/* Background Grid - Biraz daha morumsu bir grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#483D8F20_1px,transparent_1px),linear-gradient(to_bottom,#483D8F20_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

                    {/* SVG Canvas */}
                    <svg
                        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                        className="w-full h-full max-w-[1600px] absolute z-0"
                        preserveAspectRatio="xMidYMid slice"
                    >
                        <defs>
                            <filter id="chaosBlur" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>

                            {/* Chaos Gradient (Opsiyonel kullanım için) - Koyu Mavi'den Mora */}
                            <linearGradient id="gradChaos" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#483D8F" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#6B5DD3" stopOpacity="0.8" />
                            </linearGradient>

                            {/* Order Gradient - Mordan Turkuaza (Paletteki renkler) */}
                            <linearGradient id="gradOrder" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#6B5DD3" /> {/* Mor */}
                                <stop offset="100%" stopColor="#00B3A4" /> {/* Turkuaz */}
                            </linearGradient>
                        </defs>

                        {/* CHAOS LINES (Sol Taraf) */}
                        <motion.g style={{ opacity: chaosGroupOpacity }} filter="url(#chaosBlur)">
                            {paths.map((p) => (
                                <AnimatedLine
                                    key={`chaos-${p.id}`}
                                    pathString={p.chaos}
                                    strokeColor={p.colorChaos} // Paletteki renklerden biri
                                    progress={smoothProgress}
                                    range={p.timing.chaos}
                                    strokeWidth={random(1, 3)}
                                    opacity={0.7} // Hafif transparanlık
                                />
                            ))}
                        </motion.g>

                        {/* ORDER LINES (Sağ Taraf) */}
                        <g>
                            {paths.map((p) => (
                                <AnimatedLine
                                    key={`order-${p.id}`}
                                    pathString={p.order}
                                    strokeColor="url(#gradOrder)" // Mor -> Turkuaz Gradient
                                    progress={smoothProgress}
                                    range={p.timing.order}
                                    strokeWidth={2}
                                />
                            ))}
                        </g>
                    </svg>

                    {/* BASELEX ENGINE (Merkez Obje) */}
                    <motion.div
                        className="absolute z-10 flex flex-col items-center justify-center p-8 rounded-2xl border border-[#483D8F]/50 backdrop-blur-xl bg-slate-900/90"
                        style={{
                            opacity: logoOpacity,
                            scale: logoScale,
                            boxShadow: logoGlow
                        }}
                    >
                        {/* Baselex İkonu */}
                        <div className="relative mb-6 flex items-center justify-center">
                            {/* Arkaya hafif mor bir glow efekti */}
                            <div className="absolute inset-0 bg-[#6B5DD3]/20 blur-3xl rounded-full scale-125"></div>

                            <svg width="140" viewBox="0 0 230 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 drop-shadow-[0_0_15px_rgba(107,93,211,0.4)]">
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
                                <path d="M89.6342 30.0616L139.105 30.4571C139.659 30.4616 139.795 31.23 139.277 31.4249L128.91 35.3126C128.373 35.514 127.998 36.0037 127.944 36.5743L127.089 45.5479C127.065 45.8043 126.849 46 126.591 46.0001H103.457C103.19 45.9998 102.97 45.7888 102.958 45.5215L102.532 35.7061C102.503 35.0557 102.059 34.498 101.431 34.3253L89.4975 31.043C88.9336 30.8878 89.0492 30.0569 89.6342 30.0616Z" fill="#6B5DD3" stroke="#6B5DD3" />
                            </svg>
                        </div>

                        <h2 className="text-3xl font-bold text-white tracking-widest uppercase">
                            Baselex
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="h-[1px] w-8 bg-[#00B3A4]/50"></span>
                            <span className="text-xs font-mono text-[#00B3A4] tracking-[0.2em] uppercase">Infrastructure</span>
                            <span className="h-[1px] w-8 bg-[#00B3A4]/50"></span>
                        </div>
                    </motion.div>

                    <motion.div style={{ opacity: useTransform(smoothProgress, [0, 0.3], [0, 1]) }} className="absolute left-10 bottom-20 text-[#483D8F] font-mono text-sm rotate-90 origin-left">
                        INPUT :: UNSTRUCTURED_DATA
                    </motion.div>
                    <motion.div style={{ opacity: useTransform(smoothProgress, [0.6, 1], [0, 1]) }} className="absolute right-10 top-20 text-[#00B3A4] font-mono text-sm -rotate-90 origin-right">
                        OUTPUT :: STRUCTURED_VALUE
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default BaselexChaosToOrder;