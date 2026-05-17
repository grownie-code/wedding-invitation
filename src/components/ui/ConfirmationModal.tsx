'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning';
    confirmButtonClassName?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = 'Ya, Lanjutkan',
    cancelText = 'Batal',
    variant = 'warning',
    confirmButtonClassName
}) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* BACKDROP OVERLAY */}
                    <motion.div initial={{ 
                                    opacity: 0 
                                }}
                                animate={{ 
                                    opacity: 1 
                                }}
                                exit={{ 
                                    opacity: 0 
                                }}
                                onClick={(e) => e.stopPropagation()}
                                className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm"/>

                    {/* CONTENT WRAPPER */}
                    <motion.div initial={{ 
                                    opacity: 0, 
                                    scale: 0.95, 
                                    y: 10 
                                }}
                                animate={{ 
                                    opacity: 1, 
                                    scale: 1, 
                                    y: 0 
                                }}
                                exit={{ 
                                    opacity: 0, 
                                    scale: 0.95, 
                                    y: 10 
                                }}
                                transition={{ 
                                    type: 'spring', 
                                    duration: 0.4 
                                }}
                                className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-stone-100 z-10 space-y-6 font-sans text-xs">

                        {/* CLOSE */}
                        <button onClick={onClose}
                                className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 transition-colors p-1 rounded-full hover:bg-stone-50">
                                <X size={16} />
                        </button>

                        {/* ICON & TITTLE */}
                        <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-2xl shrink-0 ${variant === 'danger' ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-500'}`}>
                                <AlertTriangle size={20} />
                            </div>
                            <div className="space-y-1 pt-0.5">
                                <h3 className="text-sm font-bold text-stone-800 tracking-wide">
                                    {title}
                                </h3>
                                <p className="text-stone-500 leading-relaxed">
                                    {message}
                                </p>
                            </div>
                        </div>

                        {/* ACTION BUTTON */}
                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button type="button"
                                    onClick={onClose}
                                    className="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-600 font-medium hover:bg-stone-50 transition-all">
                                    {cancelText}
                            </button>
                            <button type="button"
                                    onClick={() => {
                                        onConfirm();
                                        onClose();
                                    }}
                                    className={`px-4 py-2.5 rounded-xl text-white font-medium shadow-sm transition-all ${
                                        confirmButtonClassName 
                                            ? confirmButtonClassName 
                                            : variant === 'danger' 
                                                ? 'bg-red-500 hover:bg-red-600' 
                                                : 'bg-stone-900 hover:bg-stone-800'
                                    }`}>
                                    {confirmText}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};