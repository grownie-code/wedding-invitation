'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { MessageSquare, Search, Trash2, Quote, MessageCircle, Heart, Clock, Check, Loader2 } from 'lucide-react';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { SuccessToast } from '@/components/ui/SuccessToast';
import { Footer } from '@/components/sections/Footer';
import { Pagination } from '@/components/ui/Pagination';
import weddingData from '@/data/wedding-data.json';

export default function MessagesPage() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Approve
    const [approveModalOpen, setApproveModalOpen] = useState(false);
    const [selectedApproveId, setSelectedApproveId] = useState<number | null>(null);

    // Delete
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedIdToDelete, setSelectedIdToDelete] = useState<number | null>(null);

    // Success Toast
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved'>('all');
    const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const itemsPerPage = 6;

    const fetchMessages = useCallback(async () => {
        try {
            setLoading(true);
            const from = (currentPage - 1) * itemsPerPage;
            const to = from + itemsPerPage - 1;

            let query = supabase
                .from('rsvps')
                .select('*', { count: 'exact' })
                .neq('message', '');

            if (activeTab === 'pending') {
                query = query.eq('status', 'pending');
            } else if (activeTab === 'approved') {
                query = query.eq('status', 'approved');
            }

            if (searchTerm) {
                query = query.ilike('name', `%${searchTerm}%`);
            }

            const { data, count, error } = await query
                .order('created_at', { ascending: false })
                .range(from, to);

            if (error) throw error;
            setMessages(data || []);
            setTotalCount(count || 0);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [currentPage, searchTerm, activeTab]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    // Setujui
    const triggerApprove = (id: number) => {
        setSelectedApproveId(id);
        setApproveModalOpen(true);
    };
    const handleApprove = async () => {
        if (!selectedApproveId) return;

        try {
            setActionLoadingId(selectedApproveId);

            const { error } = await supabase
                .from('rsvps')
                .update({ status: 'approved' })
                .eq('id', selectedApproveId);

            if (error) throw error;

            setToastMessage(weddingData.successApprove || "Ucapan Berhasil Disetujui");
            setShowToast(true);

            fetchMessages();
        } catch (err) {
            console.error("Gagal menyetujui ucapan:", err);
            alert(weddingData.gagalApprove || "Gagal menyetujui ucapan. Silakan coba lagi");
        } finally {
            setActionLoadingId(null);
            setSelectedApproveId(null);
        }
    };

    // Hapus
    const handleDelete = async (id: number) => {
        try {
            setActionLoadingId(id);
            const { error } = await supabase
                .from('rsvps')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setToastMessage(weddingData.successDelete || "Ucapan Berhasil Dihapus");
            setShowToast(true);

            if (messages.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);
            } else {
                fetchMessages();
            }
        } catch (err) {
            console.error("Gagal menghapus ucapan:", err);
            alert(weddingData.gagalDelete || "Gagal menghapus ucapan. Silakan coba lagi");
        } finally {
            setActionLoadingId(null);
            setSelectedIdToDelete(null);
        }
    };

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return (
        <div className="space-y-8">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-serif text-stone-800 italic">
                        {weddingData.dashboardMessageHeader}
                    </h1>
                    <p className="text-stone-500 text-sm">
                        {weddingData.dashboardMessageDescription}
                    </p>
                </div>

                <div className="relative w-full md:w-72">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                    <input type="text"
                        placeholder={weddingData.dashboardMessageSearch}
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        className="w-full pl-12 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-luxury-gold/40 shadow-sm placeholder:italic"/>
                </div>
            </div>

            {/* TABS */}
            <div className="flex border-b border-stone-200 gap-6 text-sm font-sans">
                <button 
                    onClick={() => { setActiveTab('all'); setCurrentPage(1); }}
                    className={`pb-3 font-medium transition-all relative ${activeTab === 'all' ? 'text-stone-900 border-b-2 border-stone-900' : 'text-stone-400 hover:text-stone-600'}`}>
                    {weddingData.dashboardMessageTab1}
                </button>
                <button 
                    onClick={() => { setActiveTab('pending'); setCurrentPage(1); }}
                    className={`pb-3 font-medium transition-all relative ${activeTab === 'pending' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-stone-400 hover:text-stone-600'}`}>
                    {weddingData.dashboardMessageTab2}
                </button>
                <button 
                    onClick={() => { setActiveTab('approved'); setCurrentPage(1); }}
                    className={`pb-3 font-medium transition-all relative ${activeTab === 'approved' ? 'text-green-600 border-b-2 border-green-600' : 'text-stone-400 hover:text-stone-600'}`}>
                    {weddingData.dashboardMessageTab3}
                </button>
            </div>

            {/* MESSAGES */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-48 bg-stone-200/50 animate-pulse rounded-3xl" />
                    ))
                ) : messages.length > 0 ? (
                    messages.map((msg) => (
                        <div key={msg.id} 
                            className="group bg-white p-8 rounded-3xl border border-stone-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between">
                            <span className={`absolute top-4 right-4 text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full z-20 ${msg.status === 'pending' ? 'bg-amber-50 text-amber-600 border border-amber-200' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                                {msg.status === 'pending' ? 'Pending' : 'Live'}
                            </span>

                            {/* Quote */}
                            <Quote className="absolute -right-2 -top-2 text-stone-100 group-hover:text-luxury-gold/10 transition-colors" size={80} />

                            <div className="relative z-10 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                                        <MessageCircle size={18} 
                                            className="text-luxury-gold group-hover:rotate-[-10deg] transition-transform duration-500" />
                                        <Heart size={8} 
                                            className="absolute text-luxury-gold fill-luxury-gold group-hover:scale-125 transition-transform duration-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-stone-800 text-sm leading-none">
                                            {msg.name}
                                        </h4>
                                        <p className="text-[10px] text-stone-400 uppercase tracking-widest mt-1">
                                            {weddingData.dashboardMessage1}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-stone-600 text-sm italic leading-relaxed font-serif">
                                    "{msg.message}"
                                </p>
                            </div>

                            <div className="relative z-10 pt-6 mt-6 border-t border-stone-50 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-stone-400">
                                    <Clock size={12} />
                                    <span className="text-[10px] font-medium">
                                        {new Date(msg.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                    </span>
                                </div>

                                {/* ACTION */}
                                <div className="flex items-center gap-2">
                                    {msg.status === 'pending' && (
                                        <button type="button"
                                                disabled={actionLoadingId !== null}
                                                onClick={() => triggerApprove(msg.id)}
                                                className="text-green-600 bg-green-50 hover:bg-green-100 rounded-lg p-1.5 transition-colors border border-green-100 flex items-center gap-1 text-[10px] font-sans font-medium disabled:opacity-40 disabled:cursor-not-allowed">
                                                {actionLoadingId === msg.id ? (
                                                    <Loader2 size={12} className="animate-spin" />
                                                ) : (
                                                    <Check size={12} />
                                                )}
                                            {weddingData.dashboardMessageApprove}
                                        </button>
                                    )}

                                    <button disabled={actionLoadingId === msg.id}
                                            onClick={() => {
                                                setSelectedIdToDelete(msg.id);
                                                setShowDeleteConfirm(true);
                                            }}
                                            className="text-red-300 hover:text-red-400 hover:bg-red-50 hover:border-red-100 rounded-lg p-1.5 transition-all border border-transparent">
                                            <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                    ) : (
                    <div className="col-span-full py-20 text-center space-y-3">
                        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-300">
                            <MessageSquare size={32} />
                        </div>
                        <p className="text-stone-400 text-sm italic">
                            {weddingData.dashboardMessageEmpty}
                        </p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <Pagination currentPage={currentPage}
                        totalCount={totalCount}
                        itemsPerPage={itemsPerPage}
                        loading={loading}
                        onPageChange={(page) => setCurrentPage(page)} />

            {/* Approve */}
            <ConfirmationModal isOpen={approveModalOpen}
                onClose={() => {
                    setApproveModalOpen(false);
                    setSelectedApproveId(null);
                }}
                onConfirm={handleApprove}
                title={weddingData.dashboardMessageConfirm1}
                message={weddingData.dashboardMessageConfirm2}
                confirmText={weddingData.dashboardMessageConfirm3}
                cancelText={weddingData.cancel}
                variant="warning"
                confirmButtonClassName="bg-stone-700 hover:bg-stone-800"/>

            {/* Delete */}
            <ConfirmationModal isOpen={showDeleteConfirm}
                onClose={() => {
                    setShowDeleteConfirm(false);
                    setSelectedIdToDelete(null);
                }}
                onConfirm={() => {
                    if (selectedIdToDelete !== null) {
                        handleDelete(selectedIdToDelete);
                    }
                }}
                title={weddingData.dashboardMessageDelete1}
                message={weddingData.dashboardMessageDelete2}
                confirmText={weddingData.dashboardMessageDelete3}
                cancelText={weddingData.cancel}
                variant="danger"
                confirmButtonClassName="bg-red-500 hover:bg-red-600"/>

            {/* Success Toast */}
            <SuccessToast show={showToast} 
                message={toastMessage}
                onClose={() => setShowToast(false)} 
                duration={3000} 
                topClass="top-10 md:top-24"/>

            <Footer />
        </div>
    );
}