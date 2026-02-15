"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Briefcase, Check, ArrowRight, Loader2, Building2 } from "lucide-react";

interface RequestDemoFormProps {
    onClose?: () => void;
}

export default function RequestDemoForm({ onClose }: RequestDemoFormProps) {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        // API isteğini simüle ediyoruz (1.5 saniye)
        setTimeout(() => {
            setStatus('success');

            // Başarılı mesajını gösterdikten 2 saniye sonra modalı kapat
            setTimeout(() => {
                if (onClose) onClose();
            }, 2000);
        }, 1500);
    };

    return (
        <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
                {status === 'success' ? (
                    // SUCCESS STATE
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, type: "spring" }}
                        className="flex flex-col items-center justify-center h-full text-center py-12"
                    >
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                            <Check className="w-10 h-10 text-green-600" strokeWidth={3} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Sent!</h3>
                        <p className="text-slate-500 max-w-xs">
                            Thank you for your interest. Our team will contact you within 24 hours.
                        </p>
                    </motion.div>
                ) : (
                    // FORM STATE
                    <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                        onSubmit={handleSubmit}
                    >
                        {/* 2-Column Grid Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Left Column */}
                            <div className="space-y-4">
                                {/* First Name */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        First Name <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        disabled={status === 'submitting'}
                                        className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50"
                                        placeholder="Jane"
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                                        Work Email <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                        <input
                                            required
                                            type="email"
                                            disabled={status === 'submitting'}
                                            className="w-full pl-10 p-3 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50"
                                            placeholder="jane@company.com"
                                        />
                                    </div>
                                </div>

                                {/* Industry */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        Industry
                                    </label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 z-10" />
                                        <select
                                            disabled={status === 'submitting'}
                                            className="w-full pl-10 p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none disabled:opacity-50"
                                        >
                                            <option value="">Select your industry</option>
                                            <option value="financial">Financial Services</option>
                                            <option value="healthcare">Healthcare</option>
                                            <option value="technology">Technology</option>
                                            <option value="legal">Legal Services</option>
                                            <option value="manufacturing">Manufacturing</option>
                                            <option value="retail">Retail & E-commerce</option>
                                            <option value="government">Government & Public Sector</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <div className="absolute right-3 top-3.5 pointer-events-none text-slate-400">
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                {/* Last Name */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        Last Name <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        disabled={status === 'submitting'}
                                        className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50"
                                        placeholder="Doe"
                                    />
                                </div>

                                {/* Company Name */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        Company Name <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                        <input
                                            required
                                            type="text"
                                            disabled={status === 'submitting'}
                                            className="w-full pl-10 p-3 bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50"
                                            placeholder="Acme Corp"
                                        />
                                    </div>
                                </div>

                                {/* Primary Interest */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        Primary Interest <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            required
                                            disabled={status === 'submitting'}
                                            className="w-full p-3 bg-slate-50 rounded-lg border border-slate-200 text-slate-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none disabled:opacity-50"
                                        >
                                            <option value="">What are you interested in?</option>
                                            <option value="enterprise">Enterprise Console 2.0</option>
                                            <option value="compliance">Compliance & Governance</option>
                                            <option value="audit">Audit Trails & Reporting</option>
                                            <option value="integration">System Integration</option>
                                            <option value="migration">Platform Migration</option>
                                            <option value="other">General Inquiry</option>
                                        </select>
                                        <div className="absolute right-3 top-3.5 pointer-events-none text-slate-400">
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button - Full Width */}
                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full bg-indigo-600 text-white p-3.5 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all flex justify-center items-center gap-2 group disabled:opacity-70 disabled:pointer-events-none mt-2"
                        >
                            {status === 'submitting' ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Sending Request...</span>
                                </>
                            ) : (
                                <>
                                    <span>Request Demo</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        {/* Privacy Notice */}
                        <p className="text-center text-xs text-slate-400 mt-2">
                            By submitting this form, you agree to our{" "}
                            <a href="#" className="text-indigo-600 hover:underline">Terms</a> and{" "}
                            <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
                        </p>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}
