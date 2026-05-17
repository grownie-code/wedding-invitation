'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, CalendarDays, Camera, MessageCircleHeart } from 'lucide-react';

const navItems = [
    { id: 'hero', icon: Heart, label: 'Home' },
    { id: 'mempelai', icon: Sparkles, label: 'Mempelai' },
    { id: 'acara', icon: CalendarDays, label: 'Acara' },
    { id: 'galeri', icon: Camera, label: 'Galeri' },
    { id: 'rsvp', icon: MessageCircleHeart, label: 'RSVP' },
    // { id: 'gift', icon: ImageIcon, label: 'Gift' },
];

export const Navbar = () => {
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => document.getElementById(item.id));
            const scrollPosition = window.scrollY + 300;

            sections.forEach(section => {
                if (section && scrollPosition >= section.offsetTop) {
                    setActiveSection(section.id);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="fixed bottom-1 left-0 right-0 z-[100] flex justify-center px-4">
            <motion.nav initial={{ 
                            y: 100, 
                            opacity: 0 
                        }}
                        animate={{ 
                            y: 0, 
                            opacity: 1 
                        }}
                        className="bg-white/70 backdrop-blur-md border border-white/40 shadow-2xl rounded-full px-4 py-2 flex items-center gap-1 md:gap-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;

                    return (
                        <button key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="relative w-16 h-16 flex items-center justify-center transition-all duration-300 group">
                            {/* INDIKATOR AKTIF */}
                            <AnimatePresence>
                                {isActive && (
                                    <motion.div layoutId="activeTab"
                                                className="absolute w-12 h-12 bg-luxury-gold/15 rounded-full border border-luxury-gold/20"
                                                transition={{ 
                                                    type: "spring", 
                                                    bounce: 0.2, 
                                                    duration: 0.6 
                                                }}/>
                                )}
                            </AnimatePresence>

                            {/* IKON & LABEL */}
                            <div className="relative z-10 flex flex-col items-center justify-center">
                                <Icon size={18} className={`transition-colors duration-300 ${
                                        isActive ? 'text-luxury-bronze' : 'text-stone-400 group-hover:text-stone-600'
                                    }`} />
                                <span className={`text-[7px] uppercase tracking-tighter mt-0.5 font-bold transition-colors duration-300 ${
                                        isActive ? 'text-luxury-bronze' : 'text-stone-400 group-hover:text-stone-600'
                                    }`}>
                                    {item.label}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </motion.nav>
        </div>
    );
};