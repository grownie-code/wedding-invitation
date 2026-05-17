'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface SuccessToastProps {
    show: boolean;
    message: string;
    onClose: () => void;
    duration?: number;
    topClass?: string;
}

export function SuccessToast({ show, message, onClose, duration = 3000, topClass = "top-6 md:top-10" }: SuccessToastProps) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [show, duration, onClose]);

    return (
        <AnimatePresence>
            {show && (
                <div className={`fixed ${topClass} inset-x-0 md:left-auto md:right-10 z-[10000] flex justify-center md:justify-end px-4 pointer-events-none`}>
                    <motion.div initial={{ 
                                    opacity: 0, 
                                    y: -30, 
                                    scale: 0.95 
                                }}
                                animate={{ 
                                    opacity: 1, 
                                    y: 0, 
                                    scale: 1 
                                }}
                                exit={{ 
                                    opacity: 0, 
                                    y: -15, 
                                    scale: 0.95 
                                }}
                                transition={{ 
                                    type: "spring", 
                                    stiffness: 350, 
                                    damping: 25 
                                }}
                                className="pointer-events-auto flex items-center gap-3.5 px-5 py-3.5 bg-white/90 border border-[#D4AF37]/25 text-stone-800 rounded-2xl shadow-[0_10px_25px_rgba(197,160,40,0.05)] backdrop-blur-md max-w-full md:max-w-md select-none">

                        {/* CHECKLIST */}
                        <div className="w-4.5 h-4.5 rounded-full bg-gradient-to-br from-[#E6CA65] to-[#C5A028] flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(197,160,40,0.15)]">
                            <Check size={10} className="text-white stroke-[3.5]" />
                        </div>

                        {/* TEKS */}
                        <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-stone-700 whitespace-nowrap">
                            {message}
                        </p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}