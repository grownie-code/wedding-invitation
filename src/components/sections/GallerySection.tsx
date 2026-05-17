'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight, Sparkles, Maximize2, X } from 'lucide-react';
import { FadeInWhenVisible } from '../animation/FadeInWhenVisible';
import weddingData from '@/data/wedding-data.json';

const galleryImages = [
    { id: 1, url: weddingData.linkGallery1, title: weddingData.tittleGallery1 },
    { id: 2, url: weddingData.linkGallery2, title: weddingData.tittleGallery2 },
    { id: 3, url: weddingData.linkGallery3, title: weddingData.tittleGallery3 },
    { id: 4, url: weddingData.linkGallery4, title: weddingData.tittleGallery4 },
    { id: 5, url: weddingData.linkGallery5, title: weddingData.tittleGallery5 },
    { id: 6, url: weddingData.linkGallery6, title: weddingData.tittleGallery6 },
];

export const GallerySection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const thumbnailContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = thumbnailContainerRef.current;
        if (container) {
            const activeThumbnail = container.children[currentIndex] as HTMLElement;
            if (activeThumbnail) {
                const containerWidth = container.offsetWidth;
                const thumbnailOffset = activeThumbnail.offsetLeft;
                const thumbnailWidth = activeThumbnail.offsetWidth;

                container.scrollTo({
                    left: thumbnailOffset - containerWidth / 2 + thumbnailWidth / 2,
                    behavior: 'smooth',
                });
            }
        }
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    return (
        <section id="galeri" className="w-full bg-white py-20 px-4 sm:px-6 lg:px-8 relative border-t border-stone-100 overflow-hidden">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* HEADER */}
                <div className="text-center space-y-2">
                    <FadeInWhenVisible delay={0.1}>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-bronze font-semibold flex items-center justify-center gap-1.5">
                            <Camera size={11} />
                            {weddingData.judulGallery}
                        </span>
                    </FadeInWhenVisible>
                    <FadeInWhenVisible delay={0.2}>
                        <h2 className="font-serif text-2xl text-stone-800 italic">
                            {weddingData.descriptionGallery}
                        </h2>
                    </FadeInWhenVisible>
                    <div className="w-10 h-[1px] bg-luxury-gold/30 mx-auto mt-1" />
                </div>

                {/* SLIDE UTAMA (ATAS) */}
                <div className="relative aspect-[3/4] sm:aspect-[16/10] w-full rounded-[2rem] overflow-hidden border border-stone-200/60 shadow-xl bg-stone-50 group">
                    <AnimatePresence mode="wait">
                        <motion.img key={currentIndex}
                                    src={galleryImages[currentIndex].url}
                                    alt={galleryImages[currentIndex].title}
                                    initial={{ 
                                        opacity: 0, 
                                        scale: 1.02 
                                    }}
                                    animate={{ 
                                        opacity: 1, 
                                        scale: 1 
                                    }}
                                    exit={{ 
                                        opacity: 0, 
                                        scale: 0.98 
                                    }}
                                    transition={{ 
                                        duration: 0.5, 
                                        ease: 'easeInOut' 
                                    }}
                                    className="w-full h-full object-cover select-none"/>
                    </AnimatePresence>

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-stone-950/20 pointer-events-none" />

                    <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-10 text-white">
                        <div className="space-y-0.5">
                            <span className="text-[9px] uppercase tracking-[0.2em] text-[#F4E2BB]/90 font-medium flex items-center gap-1">
                                <Sparkles size={9} /> 
                                {weddingData.halamanGallery} {currentIndex + 1} {weddingData.of} {galleryImages.length}
                            </span>
                            <p className="font-serif text-lg italic tracking-wide">
                                {galleryImages[currentIndex].title}
                            </p>
                        </div>

                        {/* TOMBOL ZOOM */}
                        <button onClick={() => setIsLightboxOpen(true)}
                                className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all active:scale-95 shadow-lg">
                                <Maximize2 size={14} className="stroke-[2]" />
                        </button>
                    </div>

                    {/* PREV (HIDDEN DI MOBILE) */}
                    <button onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block">
                            <ChevronLeft size={16} />
                    </button>

                    {/* NEXT */}
                    <button onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block">
                            <ChevronRight size={16} />
                    </button>
                </div>

                {/* PREVIEW */}
                <div ref={thumbnailContainerRef}
                    className="flex gap-2.5 overflow-x-auto pb-2 pt-1 px-2 scrollbar-none snap-x snap-mandatory justify-start md:justify-center">
                    {galleryImages.map((image, index) => {
                        const isActive = currentIndex === index;
                        return (
                            <button key={`thumb-${image.id}`}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`relative h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden border shrink-0 transition-all duration-300 snap-center ${
                                    isActive 
                                        ? 'border-[#C5A028] shadow-md ring-2 ring-[#C5A028]/20 scale-102' 
                                        : 'border-stone-200/80 opacity-40 hover:opacity-70'
                                    }`}>
                                    <img src={image.url} 
                                        alt="Thumbnail"
                                        loading="lazy" 
                                        className="w-full h-full object-cover select-none" />
                                    {isActive && (
                                        <div className="absolute inset-0 bg-[#C5A028]/5 z-10" />
                                    )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* OVERLAY FULLSCREEN LIGHTBOX */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div initial={{ 
                                    opacity: 0 
                                }}
                                animate={{ 
                                    opacity: 1 
                                }}
                                exit={{ 
                                    opacity: 0 
                                }}
                                onClick={() => setIsLightboxOpen(false)}
                                className="fixed inset-0 bg-stone-950/98 z-[9999] flex items-center justify-center p-4 backdrop-blur-lg select-none">
                        <button onClick={() => setIsLightboxOpen(false)} 
                                className="absolute top-6 right-6 text-stone-400 hover:text-white p-2">
                                <X size={22} />
                        </button>

                        <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} 
                                className="absolute left-6 p-3 rounded-full bg-white/5 border border-white/10 text-stone-300 hover:text-white transition-all">
                                <ChevronLeft size={18} />
                        </button>

                        <motion.div key={currentIndex}
                                    initial={{ 
                                        scale: 0.98, 
                                        opacity: 0 
                                    }}
                                    animate={{ 
                                        scale: 1, 
                                        opacity: 1 
                                    }}
                                    exit={{ 
                                        scale: 0.98, 
                                        opacity: 0 
                                    }}
                                    className="relative max-w-3xl max-h-[80vh] flex flex-col items-center justify-center">
                            <img src={galleryImages[currentIndex].url} 
                                alt="Expanded view"
                                loading="lazy"
                                className="max-w-full max-h-[72vh] object-contain rounded-2xl border border-white/5 shadow-2xl"/>
                            <p className="text-stone-400 font-serif text-xs italic mt-3 tracking-wide">
                                {galleryImages[currentIndex].title}
                            </p>
                        </motion.div>

                        <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} 
                                className="absolute right-6 p-3 rounded-full bg-white/5 border border-white/10 text-stone-300 hover:text-white transition-all">
                                <ChevronRight size={18} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};