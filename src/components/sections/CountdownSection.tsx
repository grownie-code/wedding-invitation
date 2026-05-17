'use client';

import React from 'react';
import { CountdownTimer } from '../ui/CountdownTimer';
import { FadeInWhenVisible } from '../animation/FadeInWhenVisible';
import { CalendarDays } from 'lucide-react';
import weddingData from '@/data/wedding-data.json';

export const CountdownSection: React.FC = () => {
    const handleSaveDate = () => {
        const title = encodeURIComponent(`${weddingData.judulOpening} ${weddingData.combinedShort}`);
        const details = encodeURIComponent(`${weddingData.simpanKalender2} ${weddingData.combinedShort} ${weddingData.simpanKalendeer3}`);
        const location = encodeURIComponent(`${weddingData.simpanKalenderLocation}`);

        const startDate = weddingData.kalenderDate?.start || "20260516T090000Z";
        const endDate = weddingData.kalenderDate?.end || "20261018T160000Z";

        const dates = encodeURIComponent(`${startDate}/${endDate}`);
        // const dates = encodeURIComponent(`${weddingData.kalenderDate.start}/${weddingData.kalenderDate.end}`); // Format UTC: 16 Mei 2026 - 18 Mei 2026
        // 2026 = Tahun
        // 10 = Bulan
        // 18 = Hari
        // T = Pemisah Tanggal
        // 09 = Jam
        // 00 = Menit
        // 00 = Detik
        // Z = Zulu Time (UTC +0)
        // / = Sampai

        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
        window.open(googleCalendarUrl, '_blank');
    };

    return (
        <section className="w-full bg-luxury-champagne/40 py-20 px-4 text-center relative overflow-hidden border-y border-luxury-gold/10">
            <div className="absolute inset-0 bg-[radial-gradient(#A87C43_0.5px,transparent_0.5px)] [background-size:32px_32px] opacity-[0.03]" />

            <div className="max-w-3xl mx-auto space-y-10 relative z-10">
                <div className="space-y-3">
                    <FadeInWhenVisible delay={0.1}>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-bronze font-semibold">
                            {weddingData.judulCountdown}
                        </span>
                    </FadeInWhenVisible>
                    <FadeInWhenVisible delay={0.2}>
                        <h2 className="font-serif text-2xl md:text-3xl text-stone-800 italic">
                            {weddingData.tittleCountdown}
                        </h2>
                    </FadeInWhenVisible>
                </div>

                {/* COUNTDOWN */}
                <CountdownTimer targetDate="2026-06-01T09:00:00" />

                {/* SIMPAN KE KALENDAR */}
                <FadeInWhenVisible delay={0.4}>
                    <button onClick={handleSaveDate}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-luxury-bronze/30 font-sans text-[10px] uppercase tracking-widest text-luxury-bronze bg-white/40 hover:bg-luxury-bronze hover:text-white transition-all duration-500 shadow-sm">
                            <CalendarDays size={13} />
                            {weddingData.simpanKalender}
                    </button>
                </FadeInWhenVisible>
            </div>
        </section>
    );
};