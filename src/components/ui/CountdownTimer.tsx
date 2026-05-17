'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import weddingData from '@/data/wedding-data.json';

interface CountdownTimerProps {
    targetDate: string; // Format: "YYYY-MM-DDTHH:mm:ss"
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Hitung sisa waktu
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();
            let timeLeftData: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

            if (difference > 0) {
                timeLeftData = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }
            return timeLeftData;
        };

        setTimeLeft(calculateTimeLeft());
        setIsHydrated(true);

        // Interval per detik
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (!isHydrated) {
        return <div className="h-24 animate-pulse bg-stone-100 rounded-2xl w-full max-w-xl mx-auto" />;
    }

    const timeBlocks = [
        { label: weddingData.countdownDay || 'Day', value: timeLeft.days },
        { label: weddingData.countdownHour || 'Hour', value: timeLeft.hours },
        { label: weddingData.countdownMinute || 'Minute', value: timeLeft.minutes },
        { label: weddingData.countdownSecond || 'Second', value: timeLeft.seconds },
    ];

    return (
        <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-xl mx-auto w-full px-2">
            {timeBlocks.map((block, idx) => (
                <motion.div key={block.label}
                            initial={{ 
                                opacity: 0, 
                                y: 20 
                            }}
                            whileInView={{ 
                                opacity: 1, 
                                y: 0 
                            }}
                            transition={{ 
                                duration: 0.6, 
                                delay: 
                                idx * 0.1 
                            }}
                            viewport={{ 
                                once: true 
                            }}
                            className="flex flex-col items-center justify-center p-3 md:p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-luxury-gold/10 shadow-sm relative overflow-hidden">
                    {/* AKSEN GOLD */}
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-luxury-gold/40 to-transparent" />

                    <span className="font-serif text-2xl md:text-4xl font-light text-stone-800 tracking-tight tabular-nums">
                        {String(block.value).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-luxury-bronze font-medium mt-1">
                        {block.label}
                    </span>
                </motion.div>
            ))}
        </div>
    );
};