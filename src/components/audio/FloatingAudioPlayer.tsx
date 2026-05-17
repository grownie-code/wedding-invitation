'use client';

import React, { useEffect, useRef } from 'react';
import { useAudioStore } from '@/store/audioStore';
import { Music, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingAudioPlayer: React.FC<{ src: string }> = ({ src }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const { isPlaying, isMuted, volume, hasInteracted, pause, toggleMute } = useAudioStore();

    useEffect(() => {
        audioRef.current = new Audio(src);
        audioRef.current.loop = true;
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [src]);

    useEffect(() => {
        if (!audioRef.current) return;
        if (isPlaying && hasInteracted) {
            audioRef.current.play().catch(() => pause());
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, hasInteracted, pause]);

    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.muted = isMuted;
        audioRef.current.volume = volume;
    }, [isMuted, volume]);

    if (!hasInteracted) return null;

    return (
        <div className="fixed bottom-20 right-1 z-40 flex items-center justify-center h-20 w-20">

            {/* AKSEN GARIS LINGKARAN */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* LINGKARAN LUAR */}
                <div className="absolute w-full h-full rounded-full border border-luxury-gold/5" />
                {/* LINGKARAN TENGAH */}
                <div className="absolute w-[80%] h-[80%] rounded-full border border-luxury-gold/10" />
                {/* LINGKARAN DALAM */}
                <div className="absolute w-[60%] h-[60%] rounded-full border border-luxury-gold/20" />
            </div>

            <motion.button initial={{ 
                    scale: 0, 
                    opacity: 0 
                }}
                animate={{ 
                    scale: 1, 
                    opacity: 1 
                }}
                onClick={toggleMute}
                className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-luxury-bronze shadow-sm border border-luxury-gold/20 transition-all"
                whileHover={{ 
                    scale: 1.05 
                }}
                whileTap={{ 
                    scale: 0.95 
                }}>
                <AnimatePresence mode="wait">
                    {isMuted ? (
                        <motion.div key="muted" 
                                    initial={{ 
                                        opacity: 0 
                                    }} 
                                    animate={{ 
                                        opacity: 1 
                                    }} 
                                    exit={{ 
                                        opacity: 0 
                                    }}>
                            <VolumeX size={16} className="text-stone-400" />
                        </motion.div>
                    ) : (
                        <motion.div key="playing" 
                                    initial={{ 
                                        opacity: 0 
                                    }} 
                                    animate={{ 
                                        opacity: 1 
                                    }} 
                                    exit={{ 
                                        opacity: 0 
                                    }}
                                    className="relative">
                            <motion.div animate={{ 
                                    rotate: 360 
                                }}
                                transition={{ 
                                    duration: 10, 
                                    repeat: Infinity, 
                                    ease: 'linear' 
                                }}>
                                <Music size={16} />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};