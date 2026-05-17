'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileSpreadsheet, Filter, UserCheck, UserX, Users, Copy, Send, Sparkles, Check } from 'lucide-react';
import { SuccessToast } from '@/components/ui/SuccessToast';
import { Footer } from '@/components/sections/Footer';
import { Pagination } from '@/components/ui/Pagination';
import weddingData from '@/data/wedding-data.json';

export default function GuestsPage() {
    const [guests, setGuests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [newGuestName, setNewGuestName] = useState('');

    // Link Generator
    const [generatedLink, setGeneratedLink] = useState('');
    const [isCopied, setIsCopied] = useState(false);

    // Detail
    const [selectedGuest, setSelectedGuest] = useState<any | null>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    // Toast
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');

    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 10;

    const fetchGuests = useCallback(async () => {
        try {
        setLoading(true);
        const from = (currentPage - 1) * itemsPerPage;
        const to = from + itemsPerPage - 1;

        let query = supabase.from('rsvps').select('*', { count: 'exact' });

        if (searchTerm) query = query.ilike('name', `%${searchTerm}%`);
        if (filterStatus !== 'all') query = query.eq('attendance', filterStatus);

        const { data, count, error } = await query
            .order('created_at', { ascending: false })
            .range(from, to);

        if (error) throw error;
        setGuests(data || []);
        setTotalCount(count || 0);
        } catch (err) {
        console.error(err);
        } finally {
        setLoading(false);
        }
    }, [currentPage, searchTerm, filterStatus]);

    useEffect(() => { fetchGuests(); }, [fetchGuests]);

    // Modal
    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;

        if (showDetailModal) {
            html.style.overflow = 'hidden';
            html.style.height = '100%';
            body.style.overflow = 'hidden';
            body.style.height = '100%';
        } else {
            html.style.overflow = '';
            html.style.height = '';
            body.style.overflow = '';
            body.style.height = '';
        }

        return () => {
            html.style.overflow = '';
            html.style.height = '';
            body.style.overflow = '';
            body.style.height = '';
        };
    }, [showDetailModal]);

    const generateLink = () => {
        if (!newGuestName) return;
        const baseUrl = window.location.origin;
        const link = `${baseUrl}?to=${encodeURIComponent(newGuestName)}`;
        setGeneratedLink(link);
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText("tautan_yang_disalin");

            setToastMessage(weddingData.successSalinLink || "Tautan berhasil disalin");
            setShowToast(true);

            setIsCopied(true);

            setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch (err) {
            console.error("Gagal menyalin:", err);
        }
    };

    const shareWhatsApp = () => { 
        const message = `${weddingData.shareWhatsApp}\n\n${weddingData.shareWhatsApp2}\n\n${weddingData.shareWhatsApp3}\n${generatedLink}\n\n${weddingData.shareWhatsApp4}\n\n${weddingData.shareWhatsApp5}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
    };

    const handleExportExcel = async () => {
        try {
        const { data, error } = await supabase
            .from('rsvps')
            .select('name, attendance, guests_count, message, created_at')
            .order('created_at', { ascending: false });

        if (error) throw error;
        if (!data || data.length === 0) return;

        const formattedData = data.map((guest: any, index: number) => ({
            'No': index + 1,
            'Nama Tamu': guest.name,
            'Status Kehadiran': guest.attendance.toUpperCase(),
            'Jumlah Tamu': guest.guests_count,
            'Pesan': guest.message || '-',
            'Tanggal': new Date(guest.created_at).toLocaleDateString('id-ID')
        }));

        const XLSX = await import('xlsx');
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Daftar Tamu');
        XLSX.writeFile(workbook, `Daftar_Tamu_RSVP.xlsx`);
        } catch (err) {
        console.error(err);
        }
    };

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
        <div className="max-w-6xl mx-auto space-y-10 relative">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-serif text-stone-800 italic">
                        {weddingData.dashboardRSVPHeader}
                    </h1>
                    <p className="text-stone-500 text-sm">
                        {weddingData.dashboardRSVPDescription}
                    </p>
                </div>
            </div>

            {/* LINK GENERATOR */}
            <section className="bg-white rounded-[1rem] border border-stone-200 shadow-sm overflow-hidden">
                <div className="p-6 md:p-8">
                    <div className="flex items-center gap-2.5 mb-5">
                        <div className="p-1.5 bg-luxury-gold/10 rounded-lg text-luxury-gold shrink-0">
                            <Sparkles size={16} />
                        </div>
                        <h3 className="text-[10px] font-bold text-stone-800 uppercase tracking-[0.25em]">
                            {weddingData.dashboardLinkGenerator}
                        </h3>
                    </div>

                    <div className="flex flex-col md:flex-row gap-2">
                        <input type="text"
                            placeholder={weddingData.dashboardPlaceholderLink}
                            value={newGuestName}
                            onChange={(e) => {
                                setNewGuestName(e.target.value);
                                if (generatedLink) setGeneratedLink('');
                            }}
                            className="flex-1 px-5 py-3 bg-stone-50/50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-luxury-gold/40 shadow-sm placeholder:italic" />
                        <button type="button"
                                onClick={generateLink}
                                className="px-6 py-3 bg-stone-700 hover:bg-stone-800 text-stone-50 hover:text-white border border-stone-800/20 rounded-xl text-[10px] font-bold tracking-widest transition-all duration-300 shadow-sm hover:shadow-[0_4px_12px_rgba(68,64,60,0.15)] active:scale-[0.97] uppercase shrink-0 h-[46px] md:h-auto font-sans">
                                {weddingData.dashboardbtnGenerate}
                        </button>
                    </div>

                    <AnimatePresence>
                        {generatedLink && (
                            <motion.div initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden">
                                <div className="mt-6 pt-6 border-t border-stone-100 flex flex-col md:flex-row items-center gap-3">
                                    <div className="flex-1 bg-stone-50 px-4 py-3 rounded-xl w-full border border-stone-100 flex items-center">
                                        <p className="text-[11px] font-mono text-stone-500 break-all select-all w-full text-center md:text-left">
                                            {generatedLink}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 w-full md:w-auto shrink-0">
                                        <button type="button"
                                                onClick={handleCopyLink}
                                                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300 select-none
                                                    ${isCopied 
                                                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm shadow-emerald-100' 
                                                        : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-stone-300'
                                                    }`}>
                                            {isCopied ? (
                                                <motion.div initial={{ scale: 0.7 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                                                    <Check size={13} className="stroke-[2.5]" />
                                                    <span>
                                                        {weddingData.dashboardCopySuccess}
                                                    </span>
                                                </motion.div>
                                            ) : (
                                                <>
                                                    <Copy size={13} /> 
                                                    <span>
                                                        {weddingData.dashboardbtnCopy}
                                                    </span>
                                                </>
                                            )}
                                        </button>
                                        <button onClick={shareWhatsApp}
                                                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366] text-white rounded-xl hover:shadow-md hover:shadow-green-500/10 text-[10px] font-bold uppercase tracking-wider transition-all">
                                                <Send size={13} /> 
                                                {weddingData.dashboardbtnWhatsApp}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* FILTER & ACTIONS */}
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
                <div className="relative flex-1 md:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                    <input 
                        type="text"
                        placeholder={weddingData.dashboardPlaceholderSearch}
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-12 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-luxury-gold/40 shadow-sm placeholder:italic" />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                    <div className="relative flex items-center gap-2 flex-1 md:flex-initial">
                        <div className="relative w-full md:w-48">
                            <button type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full flex items-center justify-between px-4 py-3 bg-white border border-stone-200 rounded-xl text-xs text-stone-600 font-bold shadow-sm hover:border-stone-300 transition-all text-left">
                                <Filter size={15} className="text-stone-400 shrink-0 hidden sm:block" />
                                <span className="capitalize truncate">
                                    {filterStatus === 'all' ? 'Semua Status' : filterStatus === 'hadir' ? 'Hadir' : 'Absen'}
                                </span>
                                <svg className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-300 shrink-0 ml-2 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor" 
                                    strokeWidth="2.5">
                                    <path strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <>
                                        <div className="fixed inset-0 z-20" onClick={() => setIsDropdownOpen(false)} />
                                        <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                    transition={{ duration: 0.15, ease: "easeOut" }}
                                                    className="absolute right-0 left-0 mt-2 bg-white border border-stone-200 rounded-xl shadow-xl z-30 overflow-hidden py-1 min-w-[160px]">
                                            <DropdownItem label="Semua Status" 
                                                    active={filterStatus === 'all'} 
                                                    onClick={() => { setFilterStatus('all'); setCurrentPage(1); setIsDropdownOpen(false); }} />
                                            <DropdownItem label="Hadir" 
                                                    active={filterStatus === 'hadir'} 
                                                    onClick={() => { setFilterStatus('hadir'); setCurrentPage(1); setIsDropdownOpen(false); }} />
                                            <DropdownItem label="Tidak Hadir" 
                                                    active={filterStatus === 'tidak hadir'} 
                                                    onClick={() => { setFilterStatus('tidak hadir'); setCurrentPage(1); setIsDropdownOpen(false); }} />
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <button onClick={handleExportExcel}
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-[#107c41] text-white rounded-xl text-[9px] font-bold tracking-widest hover:bg-[#0a5c30] active:scale-95 transition-all shadow-sm w-fit h-[42px] uppercase shrink-0">
                        <FileSpreadsheet size={12} className="stroke-[2.5]" /> 
                        <span>
                            {weddingData.dashboardExportExcel}
                        </span>
                    </button>
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-[1rem] border border-stone-200 shadow-sm overflow-hidden p-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-stone-50/80 border-b border-stone-100 text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">
                                <th className="px-8 py-6">
                                    {weddingData.dashboardTamuTabel1}
                                </th>
                                <th className="px-6 py-6 text-center">
                                    {weddingData.dashboardTamuTabel2}
                                </th>
                                <th className="px-6 py-6 text-center">
                                    {weddingData.dashboardTamuTabel3}
                                </th>
                                <th className="px-8 py-6 text-right">
                                    {weddingData.dashboardTamuTabel4}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-50">
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={4} className="px-8 py-8 bg-stone-50/20"></td>
                                    </tr>
                                ))
                            ) : guests.length > 0 ? (
                                guests.map((guest) => (
                                    <tr key={guest.id} className="hover:bg-stone-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-bold text-stone-800">
                                                {guest.name}
                                            </p>
                                            <p className="text-[11px] text-stone-400 mt-1 italic line-clamp-1">
                                                "{guest.message || 'Hanya konfirmasi kehadiran'}"
                                            </p>
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            <span className={`inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                                guest.attendance.toLowerCase() === 'hadir' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {guest.attendance.toLowerCase() === 'hadir' ? <UserCheck size={10} /> : <UserX size={10} />}
                                                {guest.attendance?.replace('_', ' ').toLowerCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            <div className="flex items-center justify-center gap-2 text-stone-500">
                                                <Users size={14} 
                                                    className="text-stone-300" />
                                                    <span className="text-sm font-medium">
                                                        {guest.guests_count}
                                                    </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button type="button"
                                                    onClick={() => {
                                                        setSelectedGuest(guest);
                                                        setShowDetailModal(true);
                                                    }}
                                                    className="text-[10px] font-bold text-stone-400 hover:text-stone-900 transition-colors uppercase tracking-[0.2em]">
                                                    {weddingData.dashboardTamuTabelDetail}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-8 py-20 text-center text-stone-400 text-xs italic">
                                        {weddingData.dashboardTamuTabelEmpty}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <Pagination currentPage={currentPage}
                            totalCount={totalCount}
                            itemsPerPage={itemsPerPage}
                            loading={loading}
                            onPageChange={(page) => setCurrentPage(page)} />
            </div>

            <Footer />

            {/* TOAST / NOTIFICATION */}
            <SuccessToast show={showToast} 
                message={toastMessage}
                onClose={() => setShowToast(false)} 
                duration={3000} 
                topClass="top-8 md:top-8"/>

            {/* MODAL DETAIL */}
            <AnimatePresence>
                {showDetailModal && selectedGuest && (
                    <motion.div initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-x-0 -top-12 -bottom-12 h-[calc(100dvh+6rem)] bg-stone-950/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
                        <motion.div initial={{ scale: 0.96, y: 10 }}
                                    animate={{ scale: 1, y: 0 }}
                                    exit={{ scale: 0.96, y: 10 }}
                                    transition={{ type: "spring", duration: 0.4 }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="max-w-md w-full bg-white border border-stone-200/80 rounded-[2rem] p-6 shadow-2xl space-y-6 relative overflow-hidden select-none mt-12">

                            {/* AKSEN GARIS EMAS HIASAN ATAS */}
                            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E6CA65] via-[#D4AF37] to-[#C5A028]" />

                            {/* HEADER */}
                            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                                <div className="space-y-0.5">
                                    <span className="text-[9px] font-sans font-bold text-stone-400 uppercase tracking-[0.2em] block">
                                        {weddingData.dashboardTamuDetail1}
                                    </span>
                                    <h4 className="text-base font-serif font-bold text-stone-800 italic capitalize">
                                        {selectedGuest.name}
                                    </h4>
                                </div>

                                {/* BADGE STATUS */}
                                <span className={`text-[9px] px-3 py-1 rounded-full font-bold capitalize tracking-wider ${
                                    selectedGuest.attendance?.toLowerCase() === 'hadir' 
                                        ? 'bg-green-100 text-green-700' 
                                        : 'bg-red-100 text-red-700'
                                    }`}>
                                    {selectedGuest.attendance?.replace('_', ' ').toLowerCase()}
                                </span>
                            </div>

                            {/* DETAIL KONTEN */}
                            <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                                <div className="p-3 bg-stone-50 border border-stone-100 rounded-xl space-y-1">
                                    <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">
                                        {weddingData.dashboardTamuDetail2}
                                    </span>
                                    <p className="font-bold text-stone-800 text-xs">
                                        {selectedGuest.guests_count} {weddingData.dashboardTamuDetail3}
                                    </p>
                                </div>
                                <div className="p-3 bg-stone-50 border border-stone-100 rounded-xl space-y-1">
                                    <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">
                                        {weddingData.dashboardTamuDetail4}
                                    </span>
                                    <p className="font-medium text-stone-700 text-[11px] leading-tight">
                                        {new Date(selectedGuest.created_at).toLocaleDateString('id-ID', { 
                                            day: 'numeric', 
                                            month: 'short', 
                                            hour: '2-digit', 
                                            minute: '2-digit' 
                                        })}
                                    </p>
                                </div>
                            </div>

                            {/* UCAPAN */}
                            <div className="space-y-1.5">
                                <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">
                                    {weddingData.dashboardTamuDetail5}
                                </span>
                                <div className="p-4 bg-stone-50/50 border border-stone-100 rounded-2xl min-h-[100px] max-h-[180px] overflow-y-auto">
                                    <p className="text-stone-600 italic leading-relaxed text-xs font-light">
                                        "{selectedGuest.message || 'Tamu tidak meninggalkan pesan ucapan.'}"
                                    </p>
                                </div>
                            </div>

                            <button type="button"
                                    onClick={() => setShowDetailModal(false)}
                                    className="w-full py-3.5 bg-red-100 hover:bg-red-200 text-red-700 hover:text-red-800 border border-red-200 hover:border-red-300 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all duration-300 shadow-sm active:scale-[0.99]">
                                    {weddingData.modalClose}
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function DropdownItem({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
    return (
        <button type="button"
                onClick={onClick}
                className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors duration-150 flex items-center justify-between ${
                    active 
                    ? 'bg-stone-50 text-stone-900 font-bold' 
                    : 'text-stone-600 hover:bg-stone-50/70 hover:text-stone-900'
                }`}>
                {label}
                {active && 
                    <Check size={14} className="text-luxury-gold stroke-[3]" />
                }
        </button>
    );
}