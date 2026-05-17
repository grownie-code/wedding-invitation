'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioStore } from '@/store/audioStore';
import { Button } from '../ui/Button';
// import { MailCheck } from 'lucide-react';
import weddingData from '@/data/wedding-data.json';

interface OpeningScreenProps {
    guestName: string;
    isOpen: boolean;
    onOpen: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ guestName, isOpen, onOpen }) => {
    const triggerInteraction = useAudioStore((state) => state.triggerInteraction);

    const handleOpenInvitation = () => {
        triggerInteraction();
        onOpen();
    };

    return (
        <AnimatePresence>
            {!isOpen && (
                <motion.div initial={{ 
                            opacity: 1 
                            }}
                            exit={{ 
                                y: '-100vh',
                                transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
                            }}
                            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-luxury-champagne px-4 text-center select-none overflow-hidden">

                    <div className="absolute inset-0 bg-[radial-gradient(#A87C43_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-[0.07]" />

                    <motion.div initial={{ 
                                    opacity: 0, 
                                    scale: 0.95 
                                }}
                                animate={{ 
                                    opacity: 1, 
                                    scale: 1 
                                }}
                                transition={{ 
                                    duration: 1 
                                }}
                                className="z-10 max-w-sm w-full space-y-8 px-6 py-12 rounded-3xl bg-white/30 backdrop-blur-sm border border-white/40 shadow-xl">
                        <div className="space-y-3">
                            <span className="text-[10px] uppercase tracking-[0.4em] text-luxury-bronze font-semibold block">
                                {weddingData.judulOpening}
                            </span>
                            <h1 className="font-serif text-3xl md:text-4xl text-stone-800 italic">
                                {weddingData.combinedShort}
                            </h1>
                        </div>

                        {/* DIVIDER */}
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-8 h-[1px] bg-luxury-gold/40" />
                            <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold/60" />
                            <div className="w-8 h-[1px] bg-luxury-gold/40" />
                        </div>

                        <div className="space-y-2">
                            <p className="text-[10px] text-stone-500 tracking-widest">
                                {weddingData.sambutanOpening}
                            </p>
                            <h2 className="text-lg font-sans font-semibold text-stone-800 capitalize tracking-wide bg-gradient-to-r from-stone-800 via-luxury-bronze to-stone-800 bg-clip-text text-transparent px-2">
                                {guestName || 'Tamu Undangan'}
                            </h2>
                        </div>

                        <motion.div whileHover={{ scale: 1.02 }} 
                                    whileTap={{ scale: 0.98 }}
                                    className="pt-2">
                            <Button onClick={handleOpenInvitation} className="w-full gap-2">
                                {/* <MailCheck size={14} className="text-stone-900" /> */}
                                {weddingData.bukaUndangan}
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* DASHBOARD ADMIN */}
                    <div className="absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center justify-center gap-4 text-center select-none">
                        <button onClick={() => window.location.href = '/dashboard'}
                                className="text-[8px] uppercase tracking-[0.4em] text-stone-400/20 hover:text-luxury-bronze/60 transition-all duration-700 px-4 py-2">
                                {weddingData.dashboardLogin}
                        </button>

                        {/* DIVIDER */}
                        <div className="w-6 h-[1px] bg-stone-200/40" />

                        <div className="flex flex-col items-center gap-1 font-sans">
                            <p className="text-[8px] uppercase tracking-[0.3em] text-stone-400 font-medium">
                                {weddingData.footerOpening}
                            </p>
                            <p className="text-[8px] uppercase tracking-[0.3em] text-stone-500 font-sans mb-0.5">
                                {weddingData.developer}
                            </p>

                            <a href={weddingData.linkDeveloper}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-2 py-1 rounded-full border border-luxury-gold/30 bg-luxury-gold/15 text-stone-500 hover:bg-luxury-gold hover:text-white transition-all duration-500 group">
                                <span className="text-[7px] uppercase tracking-[0.2em] font-black group-hover:tracking-[0.35em] transition-all duration-500 leading-none pl-[0.2em] group-hover:pl-[0.35em] text-stone-600 group-hover:text-white">
                                    {weddingData.developerName}
                                </span>
                            </a>
                        </div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};