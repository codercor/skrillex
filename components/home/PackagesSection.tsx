import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import PixelBlast from "../PixelBlast";

interface PackageFeature {
    text: string;
    included: boolean;
}

interface ServicePackage {
    name: string;
    targetAudience: string;
    description: string;
    features: PackageFeature[];
    highlighted?: boolean;
    badge?: string;
}

const packages: ServicePackage[] = [
    {
        name: "Business Unit",
        targetAudience: "Single-Domain Teams",
        description: "For isolated agent swarms (e.g., just Trading or just Legal) needing individual governance and policy validation.",
        features: [
            { text: "EU Data Sovereignty & Residency", included: true },
            { text: "EU Cloud / Air-Gapped Self-Host", included: true },
            { text: "Single-Domain Policy Encoding", included: true },
            { text: "Agent-Specific Guardrails", included: true },
            { text: "Basic 'Glass Box' Transparency", included: true },
            { text: "Policy Breach Prevention", included: true },
            { text: "Standard Incident Reporting", included: true },
            { text: "Multi-Agent Conflict Resolution", included: false },
        ],
    },
    {
        name: "Enterprise",
        targetAudience: "Cross-Functional Orgs",
        description: "For organizations orchestrating multiple agent types (Finance + Legal + Risk) into a unified, conflict-resolved workflow.",
        features: [
            { text: "Everything in Business Unit, plus:", included: true },
            { text: "Multi-Agent Conflict Resolution", included: true },
            { text: "Cross-Silo Audit Trails", included: true },
            { text: "Inter-Agent Policy Enforcement", included: true },
            { text: "M&A / Due Diligence Workflows", included: true },
            { text: "Role-Based Agent Access Control", included: true },
            { text: "Compliance Drift Kill-Switch", included: true },
            { text: "Custom API for Agent Swarms", included: true },
        ],
        highlighted: true,
        badge: "Most Popular",
    },
    {
        name: "Sovereign",
        targetAudience: "National & Defense",
        description: "For central banks, defense sectors, and state actors requiring air-gapped infrastructure and absolute jurisdiction control.",
        features: [
            { text: "Everything in Enterprise, plus:", included: true },
            { text: "Enterprise-Wide Constitution", included: true },
            { text: "Bespoke Agent Jurisdictions", included: true },
            { text: "Infinite Compliance Retention", included: true },
            { text: "Red-Teaming & Stress Testing", included: true },
            { text: "Full Source Code Escrow", included: false },
            { text: "White-Glove Agent Onboarding", included: true },
            { text: "Dedicated Engineering Squad", included: true },
        ],
    },
];

function PackageCard({ pkg }: { pkg: ServicePackage }) {
    return (
        <div
            className={cn(
                "relative flex flex-col p-6 sm:p-8 rounded-2xl transition-all duration-300 h-full",
                pkg.highlighted
                    ? "bg-[#1A2333] border-2 border-brand-violet shadow-[0_0_30px_rgba(107,93,211,0.15)] scale-[1.02] lg:scale-105 z-10"
                    : "bg-[#0F1725] border border-white/5 hover:border-white/10 hover:bg-[#131B2C]"
            )}
        >
            {pkg.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-brand-violet text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg border border-white/10">
                        {pkg.badge}
                    </span>
                </div>
            )}

            <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-sm font-medium text-brand-accent mb-4">
                    {pkg.targetAudience}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                    {pkg.description}
                </p>
            </div>

            <div className="flex-1 space-y-4 mb-8">
                {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div
                            className={cn(
                                "mt-0.5 shrink-0 p-0.5 rounded-full",
                                feature.included
                                    ? "text-brand-accent"
                                    : "text-gray-700"
                            )}
                        >
                            <Check className="h-4 w-4" />
                        </div>
                        <span
                            className={cn(
                                "text-sm",
                                feature.included
                                    ? "text-gray-300"
                                    : "text-gray-600 line-through"
                            )}
                        >
                            {feature.text}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-auto">
                <button
                    className={cn(
                        "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2",
                        pkg.highlighted
                            ? "bg-brand-violet hover:bg-[#5A4CB4] text-white shadow-lg shadow-brand-violet/20"
                            : "bg-white/5 hover:bg-white/10 text-white border border-white/5"
                    )}
                >
                    Contact Sales
                    <ArrowRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}

export function PackagesSection() {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-bg-utility relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <PixelBlast
                    variant="square"
                    pixelSize={4}
                    color="#6B5DD3" // Brand Violet
                    speed={10}
                    pixelSizeJitter={0.5}
                    enableRipples={true}
                    rippleIntensityScale={1.5}
                    rippleSpeed={0.5}
                />
            </div>
            {/* Background Gradients/Noise could go here */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(107,93,211,0.08),transparent_50%)]" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-brand-violet/10 text-brand-violet text-sm font-medium mb-4 border border-brand-violet/20">
                        Service Packages
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance tracking-tight">
                        Solutions Tailored to Your Scale
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto text-pretty">
                        Choose the package that aligns with your organization&apos;s needs.
                        Contact our sales team for detailed pricing and custom configurations.
                    </p>
                </div>

                {/* Package Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
                    {packages.map((pkg) => (
                        <PackageCard key={pkg.name} pkg={pkg} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-20">
                    <div className="relative rounded-2xl p-8 sm:p-10 bg-[#1A2333] border border-white/5 overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-center md:text-left">
                                <h3 className="text-xl font-bold text-white mb-2">
                                    Need a Custom Solution?
                                </h3>
                                <p className="text-gray-400">
                                    Our team will work with you to create a package that fits your exact requirements.
                                </p>
                            </div>
                            <button className="whitespace-nowrap bg-white text-bg-utility hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors">
                                Schedule a Consultation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PackagesSection;
