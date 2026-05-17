'use client';

import React from 'react';
import { FadeInWhenVisible } from '../animation/FadeInWhenVisible';
import weddingData from '@/data/wedding-data.json';

export const BrideGroomSection: React.FC = () => {
    const rawPriaImage = weddingData.priaFotoUrl || "/images/mempelai/mempelaiPria.webp";
    const srcPriaImage = rawPriaImage.includes('unsplash.com')
        ? `${rawPriaImage}?q=80&w=600`
        : rawPriaImage;

    const rawWanitaImage = weddingData.wanitaFotoUrl || "/images/mempelai/mempelaiWanita.webp";
    const srcWanitaImage = rawWanitaImage.includes('unsplash.com')
        ? `${rawWanitaImage}?q=80&w=600`
        : rawWanitaImage;

    const linkPriaIg = weddingData.linkInstagramPria || "https://instagram.com";
    const linkWanitaIg = weddingData.linkInstagramWanita || "https://instagram.com";

    return (
        <section className="w-full bg-stone-50 py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* DEKORASI BACKGROUND */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 select-none opacity-[0.02] pointer-events-none whitespace-nowrap hidden md:block">
                <span className="font-serif text-[180px] italic font-light text-stone-900">
                    {weddingData.dekorasiBackground}
                </span>
            </div>

            <div className="max-w-5xl mx-auto space-y-20 relative z-10">

                {/* KUTIPAN / AYAT */}
                <div className="text-center max-w-2xl mx-auto space-y-4">
                    <FadeInWhenVisible delay={0.1}>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-bronze font-semibold">
                            {weddingData.judulKutipan}
                        </span>
                    </FadeInWhenVisible>

                    <FadeInWhenVisible delay={0.3}>
                        <p className="font-serif italic text-stone-600 text-sm md:text-base leading-relaxed">
                            {weddingData.judulDescription}
                        </p>
                    </FadeInWhenVisible>

                    <FadeInWhenVisible delay={0.4}>
                        <div className="w-12 h-[1px] bg-luxury-gold/30 mx-auto mt-4" />
                    </FadeInWhenVisible>
                </div>

                {/* PROFIL PENGANTIN */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 items-center">

                    {/* MEMPELAI PRIA */}
                    <div className="flex flex-col items-center text-center space-y-6">
                        {/* BINGKAI FOTO */}
                        <FadeInWhenVisible direction="left" delay={0.2}>
                            <div className="relative w-64 h-80 rounded-t-[120px] rounded-b-[20px] overflow-hidden shadow-2xl border-2 border-white bg-stone-200 group">
                                <img src={weddingData.priaFotoUrl}
                                    alt={weddingData.priaName}
                                    loading="lazy"
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700"/>
                            </div>
                        </FadeInWhenVisible>

                        <div className="space-y-2">
                            <FadeInWhenVisible delay={0.3}>
                                <h3 className="font-serif text-3xl font-light text-stone-800">
                                    {weddingData.priaFullName}
                                </h3>
                            </FadeInWhenVisible>

                            <FadeInWhenVisible delay={0.4}>
                                <p className="text-xs text-stone-500 tracking-wide">
                                    {weddingData.mempelaiPriaDescription} {weddingData.priaBapak} 
                                        <br /> 
                                    &amp; 
                                        <br />
                                    {weddingData.priaIbu}
                                </p>
                            </FadeInWhenVisible>
                        </div>

                        <FadeInWhenVisible delay={0.5}>
                            <a href={weddingData.linkInstagramPria}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-luxury-bronze hover:text-luxury-gold transition-colors duration-300">
                                <svg className="w-3.5 h-3.5 fill-current" 
                                    viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                </svg>
                                {weddingData.instagramPria}
                            </a>
                        </FadeInWhenVisible>
                    </div>

                    {/* MEMPELAI WANITA */}
                    <div className="flex flex-col items-center text-center space-y-6">
                        {/* BINGKAI FOTO */}
                        <FadeInWhenVisible direction="right" delay={0.3}>
                            <div className="relative w-64 h-80 rounded-t-[20px] rounded-b-[120px] overflow-hidden shadow-2xl border-2 border-white bg-stone-200 group">
                                <img src={weddingData.wanitaFotoUrl}
                                    alt={weddingData.wanitaName}
                                    loading="lazy"
                                    className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700"/>
                            </div>
                        </FadeInWhenVisible>

                        <div className="space-y-2">
                            <FadeInWhenVisible delay={0.4}>
                                <h3 className="font-serif text-3xl font-light text-stone-800">
                                    {weddingData.wanitaFullName}
                                </h3>
                            </FadeInWhenVisible>

                            <FadeInWhenVisible delay={0.5}>
                                <p className="text-xs text-stone-500 tracking-wide">
                                    {weddingData.mempelaiWanitaDescription} {weddingData.wanitaBapak} 
                                        <br /> 
                                    &amp;
                                        <br />
                                    {weddingData.wanitaIbu}
                                </p>
                            </FadeInWhenVisible>
                        </div>

                        <FadeInWhenVisible delay={0.6}>
                            <a href={weddingData.linkInstagramWanita} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-luxury-bronze hover:text-luxury-gold transition-colors duration-300">
                                <svg className="w-3.5 h-3.5 fill-current" 
                                    viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                </svg>
                                {weddingData.instagramWanita}
                            </a>
                        </FadeInWhenVisible>
                    </div>

                </div>
            </div>
        </section>
    );
};