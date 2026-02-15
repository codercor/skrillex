import React, { useState, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

// --- REUSABLE COMPONENT: LiquidModal ---

function LiquidModal({ title, trigger, children }: { title: string, trigger: any, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const baseId = useId();
    const modalLayoutId = `modal-container-${baseId}`;
    const titleLayoutId = `modal-title-${baseId}`;

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
        <>
            <div className="relative inline-block ">
                {/* ÖNEMLİ DEĞİŞİKLİK: 
            Kapanışın pürüzsüz olması için Trigger butonlarında 'initial={{ opacity: 0 }}' olmamalı.
            Framer Motion 'layoutId' sayesinde zaten pozisyon ve boyut değişimini yönetiyor.
        */}
                <AnimatePresence mode="popLayout">
                    {!isOpen ? (
                        trigger({ open, layoutId: modalLayoutId, titleLayoutId, title })
                    ) : (
                        <motion.div
                            key="placeholder"
                            // Butonun yerini tutan görünmez kutu.
                            className="invisible"
                            initial={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            style={{ width: '100%', height: '100%' }}
                        />
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <ModalOverlay
                        onClose={close}
                        layoutId={modalLayoutId}
                        titleLayoutId={titleLayoutId}
                        title={title}
                    >
                        {children}
                    </ModalOverlay>
                )}
            </AnimatePresence>
        </>
    );
}

// --- INTERNAL COMPONENT: ModalOverlay ---
function ModalOverlay({ onClose, children, layoutId, titleLayoutId, title }: { onClose: () => void, children: React.ReactNode, layoutId: string, titleLayoutId: string, title: string }) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const modalContent = (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
            {/* Backdrop */}
            <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={onClose}
                className="fixed inset-0 bg-slate-900/30 cursor-pointer pointer-events-auto backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
                layoutId={layoutId}
                className="relative w-full max-w-3xl bg-white overflow-hidden shadow-2xl z-50 flex flex-col pointer-events-auto"
                style={{ borderRadius: 24 }}
                transition={{
                    type: "spring",
                    stiffness: 350, // Daha sıkı yay
                    damping: 25,    // Daha az sönümleme = Daha hızlı tepki
                    mass: 0.8
                }}
            >
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors z-20 outline-none"
                >
                    <X className="w-5 h-5" />
                </motion.button>

                <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex-shrink-0">
                    <motion.div
                        layoutId={titleLayoutId}
                        className="text-xl font-bold text-slate-900 mb-1 inline-block origin-left"
                    >
                        {title}
                    </motion.div>
                </div>

                {/* İÇERİK KAPANIŞ AYARI:
            Modal kapanırken içerik (form/yazılar) ANINDA kaybolmalı (duration: 0.1).
            Böylece göz sadece küçülen beyaz kutuya ve butona odaklanır.
        */}
                <motion.div
                    className="p-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}
                    exit={{ opacity: 0, y: 10, transition: { duration: 0.1 } }}
                >
                    {children}
                </motion.div>
            </motion.div>
        </div>
    );

    return createPortal(modalContent, document.body);
}

export default LiquidModal;
