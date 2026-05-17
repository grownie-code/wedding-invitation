'use client';

import React from 'react';
import { FadeInWhenVisible } from '../animation/FadeInWhenVisible';
import { Clock, MapPin, CalendarDays } from 'lucide-react';
import weddingData from '@/data/wedding-data.json';

export const EventSection: React.FC = () => {
    // const googleMapsUrl = "https://maps.app.goo.gl/KkM4rvP2cQdJbqEd8";

    const events = [
        {
            title: weddingData.tittleEvent1,
            time: weddingData.timeEvent1,
            date: weddingData.dateEvent1,
            place: weddingData.placeEvent1,
            address: weddingData.addressEvent1,
            mapsUrl: weddingData.mapsUrlEvent1,
            delay: 0.2,
            frameStyle: 'rounded-tl-[80px] rounded-br-[80px] rounded-tr-2xl rounded-bl-2xl',
        },
        {
            title: weddingData.tittleEvent2,
            time: weddingData.timeEvent2,
            date: weddingData.dateEvent2,
            place: weddingData.placeEvent2,
            address: weddingData.addressEvent2,
            mapsUrl: weddingData.mapsUrlEvent2,
            delay: 0.4,
            frameStyle: 'rounded-tr-[80px] rounded-bl-[80px] rounded-tl-2xl rounded-br-2xl',
        },
    ];

    return (
        <section className="w-full bg-stone-50 py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* ORNAMEN */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-luxury-champagne/30 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="max-w-5xl mx-auto space-y-16 relative z-10">
                {/* HEADER */}
                <div className="text-center space-y-3">
                    <FadeInWhenVisible delay={0.1}>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-bronze font-semibold">
                            {weddingData.judulEvent}
                        </span>
                    </FadeInWhenVisible>
                    <FadeInWhenVisible delay={0.2}>
                        <h2 className="font-serif text-2xl md:text-3xl text-stone-800 italic">
                            {weddingData.tittleEvent}
                        </h2>
                    </FadeInWhenVisible>
                    <FadeInWhenVisible delay={0.3}>
                        <div className="w-12 h-[1px] bg-luxury-gold/30 mx-auto mt-2" />
                    </FadeInWhenVisible>
                </div>

                {/* CARD */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {events.map((event, idx) => (
                        <FadeInWhenVisible key={idx} delay={event.delay} direction={idx === 0 ? 'left' : 'right'}>
                            <div className={`bg-white/70 backdrop-blur-md border border-luxury-gold/10 p-8 md:p-10 shadow-xl space-y-6 relative hover:shadow-2xl hover:border-luxury-gold/20 transition-all duration-500 group ${event.frameStyle}`}>

                                {/* EFEK GARIS */}
                                <div className="absolute inset-3 border border-luxury-gold/5 pointer-events-none rounded-[inherit]" />

                                <div className="space-y-2">
                                    <h3 className="font-serif text-2xl font-light text-stone-800 tracking-wide text-center group-hover:text-luxury-bronze transition-colors duration-300">
                                        {event.title}
                                    </h3>
                                    <div className="w-8 h-[1px] bg-luxury-gold/30 mx-auto" />
                                </div>

                                {/* Baris Informasi Detail */}
                                <div className="space-y-4 font-sans text-xs text-stone-600 leading-relaxed pt-2">
                                    <div className="flex items-start gap-3">
                                        <CalendarDays size={16} className="text-luxury-bronze shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-stone-800">
                                                {weddingData.day} &amp; {weddingData.date}
                                            </p>
                                            <p>
                                                {event.date}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Clock size={16} className="text-luxury-bronze shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-stone-800">
                                                {weddingData.time}
                                            </p>
                                            <p>
                                                {event.time}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <MapPin size={16} className="text-luxury-bronze shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-semibold text-stone-800">
                                                {event.place}
                                            </p>
                                            <p className="text-stone-500 mt-0.5">
                                                {event.address}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* MAPS */}
                                <div className="text-center pt-5">
                                    <a href={event.mapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-[#FDFBF7] via-[#F3E9DC] to-[#EAE0D5] text-luxury-bronze border border-luxury-gold/40 rounded-full font-sans text-[10px] uppercase tracking-[0.2em] font-bold hover:from-luxury-bronze hover:to-[#8B7E74] hover:text-white hover:border-luxury-bronze transition-all duration-500 shadow-[0_4px_15px_rgba(197,160,40,0.08)] relative overflow-hidden group select-none transform active:scale-95">
                                        <MapPin 
                                            size={13} 
                                            className="text-luxury-bronze group-hover:text-white group-hover:animate-bounce transition-all duration-500 stroke-[1.8]" />
                                        <span className="relative z-10">
                                            {weddingData.mapsLocation}
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                                    </a>
                                </div>

                            </div>
                        </FadeInWhenVisible>
                    ))}
                </div>
            </div>
        </section>
    );
};