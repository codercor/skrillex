"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "How does BaseLex ensure compliance without slowing down development?",
        answer: "BaseLex acts as an invisible compliance layer that runs in parallel with your development workflows. Instead of blocking deployment with manual reviews, our Policy Parser Agents convert regulations into executable constraints that are checked at runtime. This allows your engineering teams to ship at velocity while BaseLex guarantees that every action and output is pre-validated against your compliance architecture."
    },
    {
        question: "Can BaseLex handle multiple jurisdictions simultaneously?",
        answer: "Yes. The BaseLex Governance Control Plane is designed for global scale. You can define specific regulatory frameworks (e.g., EU AI Act, GDPR, CCPA) for different regions or agent swarms. Our Conflict Resolution Agents automatically detect and resolve contrasting rules between jurisdictions, ensuring that a compliant action in one region doesn't violate policy in another."
    },
    {
        question: "Is this a 'human-in-the-loop' system or fully autonomous?",
        answer: "BaseLex provides flexible autonomy levels. For high-risk decisions, you can configure 'Human-on-the-Loop' protocols where the system requires approval for specific actions. However, for the vast majority of compliance checks—data residency, PII detection, audit logging—BaseLex operates fully autonomously, transforming manual oversight into a seamless, automated infrastructure."
    }
];

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-black border-t border-white/5 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-violet/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-violet/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 text-gray-400 text-sm font-medium mb-4 border border-white/10">
                        Frequently Asked Questions
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">
                        Critical Answers for <span className="text-brand-violet">Enterprise Integrity</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border transition-all duration-300 rounded-2xl overflow-hidden ${activeIndex === index
                                ? "bg-white/5 border-brand-violet/50 shadow-[0_0_30px_rgba(107,93,211,0.1)]"
                                : "bg-white/[0.02] border-white/5 hover:border-white/10 hover:bg-white/[0.04]"
                                }`}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                            >
                                <span className={`text-lg font-medium transition-colors ${activeIndex === index ? "text-white" : "text-gray-300"}`}>
                                    {faq.question}
                                </span>
                                <span className={`shrink-0 p-1 rounded-full border transition-all duration-300 ${activeIndex === index
                                    ? "bg-brand-violet border-brand-violet text-white rotate-180"
                                    : "border-white/20 text-gray-400 bg-transparent rotate-0"
                                    }`}>
                                    {activeIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                </span>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 pt-0 text-gray-400 leading-relaxed text-base">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
