import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // === Site Layout (Light, artistic via subtle tints) ===
                "bg-page": "#F7F9FC",        // ana arka plan
                "bg-page-tint": "#F2F6FF",   // çok hafif mavi haze (section ayrımı)
                "bg-page-warm": "#FAF7F2",   // çok hafif warm wash (nadir kullan)
                "bg-surface": "#FFFFFF",     // kart / modal
                "bg-surface-2": "#F9FAFF",   // ikinci yüzey (pricing/feature blocks)
                "bg-header": "#FFFFFF",
                "bg-utility": "#0B1220",     // dark/ink alanlar (footer, hero contrast)

                // === Typography ===
                "text-main": "#0B1220",
                "text-secondary": "#52607A",
                "text-tertiary": "#7B8AA5",
                "text-inverse": "#FFFFFF",

                // === Borders / Dividers ===
                "border-subtle": "#E5EAF3",
                "border-highlight": "#CBD5E1",
                "border-strong": "#9AA9C1",

                // === Brand & Actions (corporate + tasteful “art” accent) ===
                "action-primary": "#6B5DD3", // violet trust
                "action-hover": "#5A4CB4",   // deep violet hover
                "action-pressed": "#483D8F",
                "brand-accent": "#00B3A4",   // teal clarity
                "brand-ink": "#0B1220",
                "brand-violet": "#6B5DD3",   // muted violet
                "brand-violet-soft": "#E9E6FF",

                // === Status ===
                "status-success": "#16A34A",
                "status-warn": "#D97706",
                "status-critical": "#DC2626",

                // === Focus / Rings ===
                "ring-primary": "#6B5DD3",
                "ring-accent": "#00B3A4",
            },

            // Subtle “art direction” without being colorful
            backgroundImage: {
                // hero/section wash: çok hafif, kurumsal
                "wash": "radial-gradient(1200px 600px at 20% 0%, rgba(107,93,211,0.10), transparent 55%), radial-gradient(900px 500px at 85% 15%, rgba(107,93,211,0.05), transparent 50%)",
                // CTA gradient (buton / küçük highlight)
                "brand": "linear-gradient(135deg, #6B5DD3 0%, #8B5CF6 55%, #00B3A4 110%)",
                // very light divider sheen
                "sheen": "linear-gradient(90deg, transparent 0%, rgba(203,213,225,0.7) 50%, transparent 100%)",
            },

            boxShadow: {
                // clean, premium elevation
                "elev-1": "0 1px 2px rgba(11,18,32,0.06), 0 1px 1px rgba(11,18,32,0.04)",
                "elev-2": "0 12px 30px rgba(11,18,32,0.10), 0 2px 6px rgba(11,18,32,0.06)",
                "ring-soft": "0 0 0 6px rgba(30,64,255,0.10)",
            },

            fontFamily: {
                sans: ["var(--font-dm-sans)", "sans-serif"],
                heading: ["var(--font-urbanist)", "sans-serif"],
                mono: ["monospace"],
            },
        },
    },
    plugins: [],
};

export default config;
