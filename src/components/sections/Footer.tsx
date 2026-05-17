'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import weddingData from '@/data/wedding-data.json';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-stone-50 pt-8 px-6 border-t border-stone-200/40 shrink-0">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                <div className="mb-3 text-center">
                    <h3 className="font-serif text-xl md:text-2xl text-stone-600 italic tracking-wide">
                        {weddingData.combinedShort}
                    </h3>
                    <div className="flex items-center justify-center gap-3 mt-2">
                        <div className="w-8 h-[1px] bg-luxury-gold/20" />
                        <Heart size={10} className="text-luxury-gold fill-luxury-gold/10" />
                        <div className="w-8 h-[1px] bg-luxury-gold/20" />
                    </div>
                </div>
                <div className="flex flex-col items-center space-y-4 text-center">
                    <div className="flex flex-col items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-stone-500 font-sans">
                        <span className="font-light">
                            {weddingData.footerDescription}
                        </span>

                        <span className="hidden sm:inline text-stone-200">

                        </span>
                        <span className="font-medium">
                            &copy; {currentYear} - {weddingData.allrightsreserved}
                        </span>
                    </div>
                    <div className="pt-4 mt-4 border-t border-stone-200/60 w-32 text-center">
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
            </div>
        </footer>
    );
};