'use client';

import React, { useEffect } from 'react'; // Tambahkan useEffect
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Heart } from 'lucide-react';
import weddingData from '@/data/wedding-data.json';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, title, message }) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        } return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* OVERLAY */}
                    <motion.div initial={{ 
                                    opacity: 0 
                                }}
                                animate={{ 
                                    opacity: 1 
                                }}
                                exit={{ 
                                    opacity: 0
                                }}
                                className="fixed inset-0 z-[100] bg-stone-100/40 backdrop-blur-md"/>

                    {/* CONTENT */}
                    <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div initial={{ 
                                        opacity: 0, 
                                        scale: 0.9, 
                                        y: 20 
                                    }}
                                    animate={{ 
                                        opacity: 1, 
                                        scale: 1, 
                                        y: 0 
                                    }}
                                    exit={{ 
                                        opacity: 0, 
                                        scale: 0.9, 
                                        y: 20 
                                    }}
                                    className="bg-[#fcfbf9] w-full max-w-sm rounded-[40px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-luxury-gold/20 text-center space-y-7 pointer-events-auto relative overflow-hidden">

                            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-luxury-gold/20 via-luxury-gold to-luxury-gold/20" />

                            <div className="flex justify-center relative">
                                <div className="w-20 h-20 rounded-full bg-stone-50 border border-luxury-gold/10 flex items-center justify-center text-luxury-bronze shadow-inner">
                                    <Check size={36} strokeWidth={2.5} />
                                </div>
                            </div>

                            <div className="space-y-3 relative">
                                <h3 className="font-serif text-3xl text-stone-800 italic font-light tracking-wide">
                                    {title}
                                </h3>
                                <p className="font-sans text-xs text-stone-500 leading-relaxed px-2">
                                    {message}
                                </p>
                            </div>

                            <button onClick={onClose}
                                    className="w-full py-4 bg-gradient-to-r from-[#c5a059] via-[#d4af37] to-[#c5a059] text-white rounded-full font-sans text-[10px] uppercase tracking-[0.3em] font-bold hover:brightness-110 active:scale-95 transition-all duration-300 shadow-[0_10px_20px_rgba(197,160,89,0.3)]">
                                    {weddingData.modalClose}
                            </button>

                            <div className="flex items-center justify-center gap-2 text-[9px] text-stone-400 uppercase tracking-[0.2em] pt-2 font-medium">
                                <Heart size={10} className="text-rose-300 fill-rose-300" />
                                <span>
                                    {weddingData.combinedShort}
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};