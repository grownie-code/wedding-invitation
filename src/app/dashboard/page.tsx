'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { Footer } from '@/components/sections/Footer';

export default function DashboardPage() {
    const [stats, setStats] = useState({ total: 0, hadir: 0, tidakHadir: 0, ucapan: 0 });
    const [recentMessages, setRecentMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 10;

    const fetchDashboardData = useCallback(async (page: number) => {
        try {
            setLoading(true);

            const { data, count, error } = await supabase
                .from('rsvps')
                .select('*', { count: 'exact' })
                .order('created_at', { ascending: false })
                .range(0, 9);

            if (error) throw error;

            if (data) {
                setRecentMessages(data);
                if (count !== null) setTotalCount(count);

                // Ambil statistik
                const { data: allData } = await supabase.from('rsvps').select('attendance');
                if (allData) {
                        const totalrsvps = allData.length;
                        const totalHadir = allData.filter((item: any) => 
                            item.attendance.toLowerCase() === 'hadir'
                        ).length;

                        const totalTidakHadir = totalrsvps - totalHadir;

                        setStats({
                            total: totalrsvps,
                            hadir: totalHadir,
                            tidakHadir: totalTidakHadir,
                            ucapan: totalrsvps
                        });
                    }
                }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }, [itemsPerPage]);

    useEffect(() => {
        fetchDashboardData(currentPage);
    }, [currentPage, fetchDashboardData]);

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
        <div className="space-y-8">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-serif text-stone-800 italic">
                        Dashboard Statistik
                    </h3>
                    <p className="text-stone-500 text-sm">
                        Pantau statistik kehadiran dan ucapan dari para tamu undangan.
                    </p>
                </div>
                <button onClick={() => fetchDashboardData(currentPage)}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-full text-[10px] font-bold tracking-widest text-stone-600 hover:bg-stone-50 transition-all shadow-sm w-fit">
                        <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                        REFRESH DATA
                </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Konfirmasi" value={stats.total} subtitle="Tamu telah mengisi RSVP" />
                <StatCard title="Hadir" value={stats.hadir} subtitle="Tamu menyatakan hadir" color="text-green-600" />
                <StatCard title="Tidak Hadir" value={stats.tidakHadir} subtitle="Tamu berhalangan hadir" color="text-red-500" />
                <StatCard title="Total Ucapan" value={stats.ucapan} subtitle="Pesan doa di guestbook" />
            </div>

            {/* DATA TABLE */}
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
                <div className="mb-6">
                    <h4 className="font-bold text-stone-800 text-sm uppercase tracking-wider">
                        Daftar Kehadiran Terbaru
                    </h4>
                </div>

                <div className="space-y-4 min-h-[400px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-64 space-y-3">
                        <div className="w-8 h-8 border-2 border-luxury-gold/20 border-t-luxury-gold rounded-full animate-spin" />
                            <p className="text-[10px] text-stone-400 tracking-[0.2em]">
                                MEMPERBARUI DAFTAR...
                            </p>
                        </div>
                    ) : recentMessages.length > 0 ? (
                        recentMessages.slice(0, 10).map((msg) => (
                        <div key={msg.id} className="p-5 bg-stone-50 rounded-xl flex justify-between items-start border border-stone-100 hover:border-luxury-gold/20 transition-colors">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-sm text-stone-800">
                                        {msg.name}
                                    </p>
                                    <span className="text-[10px] px-2 py-0.5 bg-stone-200 text-stone-600 rounded-md font-medium">
                                        {msg.guests_count} Tamu
                                    </span>
                                </div>
                                <p className="text-xs text-stone-500 italic leading-relaxed">
                                    "{msg.message}"
                                </p>
                                <p className="text-[9px] text-stone-400 font-medium tracking-tighter uppercase">
                                    {new Date(msg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                            <span className={`text-[9px] px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                                msg.attendance.toLowerCase() === 'hadir' 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-red-100 text-red-700'
                                }`}>
                                {msg.attendance?.replace('_', ' ').toLowerCase()}
                            </span>
                        </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-64 text-stone-400 text-xs italic">
                            Belum ada data RSVP yang masuk.
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}

function StatCard({ title, value, subtitle, color = "text-stone-800" }: any) {
    return (
        <div className="bg-white p-7 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-stone-400 text-[10px] uppercase font-bold tracking-[0.2em] mb-2">
                {title}
            </p>
            <p className={`text-4xl font-serif ${color}`}>
                {value}
            </p>
            <p className="text-stone-500 text-[11px] mt-3 font-medium">
                {subtitle}
            </p>
        </div>
    );
}