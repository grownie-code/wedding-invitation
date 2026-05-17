'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ReactDOM from 'react-dom';
// import heroImage from '@/components/images/heroImage.jpg';
import weddingData from '@/data/wedding-data.json';

export const HeroSection: React.FC = () => {
    const { scrollY } = useScroll();
    const yBackground = useTransform(scrollY, [0, 500], [0, 150]);
    const opacityText = useTransform(scrollY, [0, 300], [1, 0]);
    const yText = useTransform(scrollY, [0, 300], [0, 50]);

    // Preload hero image
    ReactDOM.preload(weddingData.backgroundHeroImage, { 
        as: 'image', 
        fetchPriority: 'high' 
    });

    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* BACKGROUND EFEK PARALAKS */}
            <motion.div style={{ 
                            y: yBackground,
                            backgroundImage: `url("${weddingData.backgroundHeroImage}")`
                        }}
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"/>

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950/40 via-stone-950/20 to-stone-50" />

            {/* FRAME */}
            <div className="absolute inset-4 md:inset-8 border border-white/20 pointer-events-none rounded-2xl z-10 flex items-center justify-center">
                <div className="w-[calc(100%-16px)] h-[calc(100%-16px)] border border-white/5 rounded-xl" />
            </div>

            {/* CONTENT */}
            <motion.div style={{ 
                            opacity: opacityText, 
                            y: yText 
                        }}
                        className="relative z-20 text-center text-white px-4 space-y-6 max-w-2xl">
                <motion.p initial={{ 
                            opacity: 0, 
                            letterSpacing: "0.2em" 
                        }}
                        animate={{ 
                            opacity: 1, 
                            letterSpacing: "0.4em" 
                        }}
                        transition={{ 
                            duration: 1.2, 
                            delay: 0.5 
                        }}
                        className="text-[10px] md:text-xs uppercase font-medium text-luxury-gold tracking-[0.4em]">
                        {weddingData.footerDescription}
                </motion.p>

                <motion.h2 initial={{ 
                            opacity: 0, 
                            y: 30 
                        }}
                        animate={{ 
                            opacity: 1, 
                            y: 0 
                        }}
                        transition={{ 
                            duration: 1.5, 
                            delay: 0.8, 
                            ease: [0.16, 1, 0.3, 1] 
                        }}
                        className="font-serif text-5xl md:text-7xl font-light italic tracking-wide">
                        {weddingData.priaName} 
                            <br /> 
                        &amp; 
                            <br /> 
                        {weddingData.wanitaName}
                </motion.h2>

                {/* DIVIDER */}
                <motion.div initial={{ 
                                scaleX: 0 
                            }}
                            animate={{ 
                                scaleX: 1 
                            }}
                            transition={{ 
                                duration: 1, 
                                delay: 1.2 
                            }}
                            className="w-24 h-[1px] bg-luxury-gold/50 mx-auto" />

                <motion.p initial={{ 
                            opacity: 0 
                        }}
                        animate={{ 
                            opacity: 1 
                        }}
                        transition={{ 
                            duration: 1, 
                            delay: 1.4
                        }}
                        className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase font-light text-stone-200">
                        {weddingData.hari}
                            <br />
                        {weddingData.combinedDate}
                </motion.p>
            </motion.div>

            {/* INDIKATOR SCROLL DOWN */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20">
                <motion.div initial={{ 
                                opacity: 0, y: 10 
                            }}
                            animate={{ 
                                opacity: 0.6, y: 0 
                            }}
                            transition={{ 
                                duration: 1, delay: 1 
                            }}
                            className="flex flex-col items-center space-y-3 select-none">

                        <span className="text-[9px] uppercase tracking-[0.3em] text-stone-500 font-sans font-bold">
                            {weddingData.scrollDown}
                        </span>

                    <div className="w-5 h-9 rounded-full border border-stone-400/80 flex justify-center p-1.5 relative">
                        <motion.div animate={{ 
                                        y: [0, 12, 0],
                                        opacity: [1, 0, 1] 
                                    }}
                                    transition={{ 
                                        duration: 2, 
                                        repeat: Infinity, 
                                        ease: "easeInOut" 
                                    }}
                                    className="w-1 h-1.5 rounded-full bg-stone-600" />
                        <motion.div animate={{ 
                                        scaleY: [0.3, 1, 0.3], 
                                        opacity: [0.2, 0.6, 0.2] 
                                    }}
                                    transition={{ 
                                        duration: 2, 
                                        repeat: Infinity, 
                                        ease: "easeInOut" 
                                    }}
                                    className="w-[1px] h-4 bg-stone-400 absolute -bottom-5 origin-top"/>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};