'use client';

import React, { useState, useEffect } from 'react';
import { OpeningScreen } from '@/components/sections/OpeningScreen';
import { Navbar } from '@/components/layout/Navbar';
import { FloatingAudioPlayer } from '@/components/audio/FloatingAudioPlayer';
import { HeroSection } from '@/components/sections/HeroSection';
import { BrideGroomSection } from '@/components/sections/BrideGroomSection';
import { CountdownSection } from '@/components/sections/CountdownSection';
import { EventSection } from '@/components/sections/EventSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { RSVPSection } from '@/components/sections/RSVPSection';
import { GiftSection } from '@/components/sections/GiftSection';
import { Footer } from '@/components/sections/Footer';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

export default function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [guestName, setGuestName] = useState('');
    const [shouldAutoplay, setShouldAutoplay] = useState(true);

    useEffect(() => {
        // BACA URL (?to=Nama)
        if (typeof window !== 'undefined') {
            const searchParams = new URLSearchParams(window.location.search);
            const toParam = searchParams.get('to');
            if (toParam) {
                setGuestName(decodeURIComponent(toParam));
            }
        }

        // BACA DATABASE (SUPABASE) & INJECT META TAG SEO
        const fetchLiveSettings = async () => {
            try {
                const { data, error } = await supabase
                .from('settings')
                .select('public_invitation, autoplay_music')
                .maybeSingle();

                if (error) throw error;

                if (data) {
                    setShouldAutoplay(data.autoplay_music);

                    // PENGATURAN ROBOTS GOOGLE VIA DOM
                    let metaRobots = document.querySelector('meta[name="robots"]');
                    let metaGooglebot = document.querySelector('meta[name="googlebot"]');

                    if (!data.public_invitation) {
                        if (!metaRobots) {
                        metaRobots = document.createElement('meta');
                        metaRobots.setAttribute('name', 'robots');
                        document.head.appendChild(metaRobots);
                        }
                        metaRobots.setAttribute('content', 'noindex, nofollow, noarchive');

                        if (!metaGooglebot) {
                            metaGooglebot = document.createElement('meta');
                            metaGooglebot.setAttribute('name', 'googlebot');
                            document.head.appendChild(metaGooglebot);
                        }
                        metaGooglebot.setAttribute('content', 'noindex, nofollow');

                        console.log("SEO Status: PRIVAT (Google diblokir)");
                    } else {
                        if (metaRobots) {
                            metaRobots.setAttribute('content', 'index, follow');
                        }
                        if (metaGooglebot) {
                            metaGooglebot.setAttribute('content', 'index, follow');
                        }
                        console.log("SEO Status: PUBLIK (Google diizinkan)");
                    }
                }
            } catch (err) {
                console.error("Gagal memuat preferensi halaman depan:", err);
            }
        };

        fetchLiveSettings();
    }, []);

    return (
        <main className="relative min-h-screen bg-stone-50 text-stone-900 overflow-x-hidden antialiased custom-scrollbar">

            <OpeningScreen guestName={guestName} isOpen={isOpen} onOpen={() => setIsOpen(true)} />

            {/* AUDIO PLAYER */}
            <FloatingAudioPlayer 
                src={shouldAutoplay && isOpen ? "music/wedding-songs.mp3" : ""} />

            {isOpen && (
                <motion.div initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="w-full flex flex-col">
                    <Navbar />

                    <section id="hero">
                        <HeroSection />
                    </section>

                    <section id="mempelai">
                        <BrideGroomSection />
                    </section>

                    <section id="countdown">
                        <CountdownSection />
                    </section>

                    <section id="acara">
                        <EventSection />
                    </section>

                    <section>
                        <GallerySection />
                    </section>

                    <section id="rsvp">
                        <RSVPSection />
                    </section>

                    <section id="gift">
                        <GiftSection />
                    </section>

                    <div className="pb-24">
                        <Footer />
                    </div>

                </motion.div>
            )}
        </main>
    );
}