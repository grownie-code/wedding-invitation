'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { rsvpSchema, RSVPFormData } from '@/schemas/rsvpSchema';
import { FadeInWhenVisible } from '../animation/FadeInWhenVisible';
import { ConfirmationModal } from '../ui/ConfirmationModal';
import { SuccessModal } from '@/components/ui/SuccessModal';
import { supabase } from '@/utils/supabaseClient';
import { ChevronDown, Check, MessageCircle, Heart, Signature, Sparkles, Loader2, CheckCircle, Users } from 'lucide-react';
import weddingData from '@/data/wedding-data.json';

interface GuestComment {
    id: number;
    name: string;
    attendance: 'hadir' | 'tidak_hadir';
    message: string;
    created_at: string;
}

export const RSVPSection: React.FC = () => {
    const [comments, setComments] = useState<GuestComment[]>([]);
    const [isLoadingComments, setIsLoadingComments] = useState<boolean>(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Error
    const [isErrorComments, setIsErrorComments] = useState<boolean>(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);

    const fetchComments = useCallback(async () => {
        try {
            setIsLoadingComments(true);
            setIsErrorComments(false);

            // TES ERROR
            // throw new Error("Simulasi database putus");

            const { data, error } = await supabase
                .from('rsvps')
                .select('id, name, attendance, message, created_at')
                .eq('status', 'approved')
                .order('created_at', { ascending: false });

            if (error) throw error;
            if (data) setComments(data as GuestComment[]);

        } catch (err) {
            console.error('Gagal mengambil data buku tamu:', err);
            setIsErrorModalOpen(true);
        } finally {
            setIsLoadingComments(false);
        }
    }, []);

    useEffect(() => {
        fetchComments();
    }, [fetchComments]);

    useEffect(() => {
        const handleClickOutside = () => setIsDropdownOpen(false);
        if (isDropdownOpen) {
            window.addEventListener('click', handleClickOutside);
        }
        return () => window.removeEventListener('click', handleClickOutside);
    }, [isDropdownOpen]);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<RSVPFormData>({
        resolver: zodResolver(rsvpSchema),
        defaultValues: { 
            name: '',
            attendance: '' as any,
            guestsCount: 1,
            message: ''
        },
    });

    const watchAttendance = watch('attendance');

    // Kirim data ke database
    const onSubmitForm = async (formData: RSVPFormData) => {
        try {
            const { data: settingsData } = await supabase
                .from('settings')
                .select('auto_moderate')
                .maybeSingle();

            const statusUcapan = settingsData?.auto_moderate ? 'approved' : 'pending';

            const { error } = await supabase.from('rsvps').insert([
                {
                    name: formData.name,
                    attendance: formData.attendance,
                    guests_count: formData.attendance === 'hadir' ? formData.guestsCount : 0,
                    message: formData.message,
                    status: statusUcapan
                },
            ]);

            if (error) throw error;

            reset();
            fetchComments();
            setShowSuccessModal(true);
        } catch (err) {
            console.error('Gagal menyimpan rsvp:', err);
            alert('Maaf, terjadi gangguan jaringan. Silakan coba kirim kembali.');
        }
    };

    // Format waktu
    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        });
    };

    return (
        <section className="w-full bg-stone-100/60 py-24 px-4 sm:px-6 lg:px-8 relative border-t border-stone-200">

            <div className="max-w-5xl mx-auto space-y-16">

                <div className="text-center space-y-3">
                    <FadeInWhenVisible delay={0.1}>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-bronze font-semibold">
                            {weddingData.judulRSVP}
                        </span>
                    </FadeInWhenVisible>
                    <FadeInWhenVisible delay={0.2}>
                        <h2 className="font-serif text-2xl md:text-3xl text-stone-800 italic">
                            {weddingData.tittleRSVP1}
                                <br /> 
                            &amp; 
                                <br />
                            {weddingData.tittleRSVP2}
                        </h2>
                    </FadeInWhenVisible>
                    <div className="w-12 h-[1px] bg-luxury-gold/30 mx-auto mt-2" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* FORM INPUT */}
                    <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-luxury-gold/10 shadow-xl space-y-6">
                        <h3 className="font-serif text-lg text-stone-800 italic flex items-center gap-2">
                            <CheckCircle size={18} className="text-luxury-bronze" />
                            {weddingData.judulFormRSVP}
                        </h3>

                        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4 font-sans text-xs">
                            <div className="space-y-1">
                                <label className="text-stone-600 font-medium">
                                    {weddingData.namaFormRSVP}
                                </label>
                                <input
                                {...register('name')}
                                    type="text"
                                    placeholder={weddingData.placeholderNamaFormRSVP}
                                    className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-luxury-bronze bg-stone-50 text-stone-800 placeholder:italic"/>
                                    {
                                        errors.name && 
                                        <p className="text-red-500 mt-0.5">
                                            {errors.name.message}
                                        </p>
                                    }
                            </div>

                            <div className="space-y-1">
                                <label className="text-stone-600 font-medium">
                                    {weddingData.konfirmasiKehadiranFromRSVP}
                                </label>
                                <div className="grid grid-cols-2 gap-3 pt-1">
                                    <button type="button"
                                            onClick={() => setValue('attendance', 'hadir', { shouldValidate: true })}
                                            className={`p-3 rounded-xl border text-center font-medium transition-all ${
                                            watchAttendance === 'hadir'
                                                ? 'border-luxury-bronze bg-luxury-bronze/10 text-luxury-bronze'
                                                : 'border-stone-200 bg-stone-50 text-stone-600'
                                            }`}>
                                            {weddingData.hadirRSVP}
                                    </button>
                                    <button type="button"
                                            onClick={() => setValue('attendance', 'tidak_hadir', { shouldValidate: true })}
                                            className={`p-3 rounded-xl border text-center font-medium transition-all ${
                                            watchAttendance === 'tidak_hadir'
                                                ? 'border-luxury-bronze bg-luxury-bronze/10 text-luxury-bronze'
                                                : 'border-stone-200 bg-stone-50 text-stone-600'
                                            }`}>
                                            {weddingData.tidakHadirRSVP}
                                    </button>
                                </div>
                                {
                                    errors.attendance && 
                                    <p className="text-red-500 mt-0.5">
                                        {errors.attendance.message}
                                    </p>
                                }
                            </div>

                            {watchAttendance === 'hadir' && (
                                <div className="space-y-1 relative">
                                    <label className="text-stone-600 font-medium flex items-center gap-1">
                                        <Users size={12} /> 
                                        {weddingData.jumlahTamuRSVP}
                                    </label>

                                    <div className="relative">
                                        <button type="button"
                                                onClick={(e) => {
                                                e.stopPropagation(); 
                                                setIsDropdownOpen(!isDropdownOpen);
                                                }}
                                                className="w-full p-3 rounded-xl border border-stone-200 bg-stone-50 text-stone-800 flex items-center justify-between transition-all hover:border-luxury-gold/50 focus:outline-none relative z-10">
                                            <span className="font-medium text-xs">
                                                {watch('guestsCount')} {weddingData.orangRSVP}
                                            </span>
                                            <motion.div
                                                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}>
                                                <ChevronDown size={14} className="text-stone-400" />
                                            </motion.div>
                                        </button>

                                        {/* MENU DROPDOWN */}
                                        <AnimatePresence>
                                            {isDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 5 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="absolute left-0 right-0 z-[60] bg-white border border-luxury-gold/20 rounded-2xl shadow-2xl overflow-hidden"
                                                    style={{ top: '100%' }} >
                                                    <div className="p-1.5 flex flex-col">
                                                        {[1, 2, 3, 4, 5].map((num) => (
                                                            <button key={`guest-option-${num}`} 
                                                                    type="button"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setValue('guestsCount', num);
                                                                        setIsDropdownOpen(false);
                                                                    }}
                                                                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs transition-all ${
                                                                        watch('guestsCount') === num
                                                                        ? 'bg-luxury-gold/10 text-luxury-bronze font-bold'
                                                                        : 'text-stone-600 hover:bg-stone-50'
                                                                    }`}>
                                                                <span>
                                                                    {num} {weddingData.orangRSVP}
                                                                </span>
                                                                {watch('guestsCount') === num && (
                                                                    <Check size={12} className="text-luxury-bronze" />
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-1">
                                <label className="text-stone-600 font-medium">
                                    {weddingData.ucapanFormRSVP}
                                </label>
                                <textarea {...register('message')}
                                    rows={4}
                                    placeholder={weddingData.placeholderUcapanFormRSVP}
                                    className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-luxury-bronze bg-stone-50 text-stone-800 resize-none leading-relaxed placeholder:italic"/>
                                    {
                                        errors.message && 
                                        <p className="text-red-500 mt-0.5">
                                            {errors.message.message}
                                        </p>
                                    }
                            </div>

                            <button type="submit"
                                    disabled={isSubmitting}
                                    className="w-full p-3.5 bg-gradient-to-r from-[#D4AF37]/90 via-[#E6CA65] to-[#C5A028]/90 text-white rounded-xl font-sans text-[10px] uppercase tracking-widest font-bold hover:from-[#C5A028] hover:to-[#A38118] disabled:from-stone-300 disabled:to-stone-400 disabled:text-stone-100 transition-all duration-500 flex items-center justify-center gap-2.5 shadow-[0_4px_15px_rgba(197,160,40,0.2)] relative overflow-hidden group select-none">
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={12} className="animate-spin text-white" />
                                            <span className="font-semibold text-white/90">
                                                {weddingData.loadingSubmitRSVP}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="relative flex items-center justify-center shrink-0">
                                                <MessageCircle size={14} className="text-white group-hover:rotate-[-10deg] transition-all duration-500 stroke-[2] fill-white/10" />
                                                <Heart size={6} className="absolute top-[4px] text-white fill-white group-hover:scale-110 transition-all duration-500" />
                                            </div>

                                            <span className="relative z-10 font-bold tracking-[0.25em]">
                                                {weddingData.btnSubmitRSVP}
                                            </span>

                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                                        </>
                                    )}
                            </button>
                        </form>
                    </div>

                    {/* SISI LIVE GUESTBOOK */}
                    <div className="lg:col-span-7 space-y-4 w-full">
                        <h3 className="font-serif text-xl text-stone-800 italic flex items-center gap-3">
                            <div className="relative flex items-center justify-center">
                                <Signature size={22} className="text-luxury-bronze" />
                                <Sparkles size={10} className="absolute -top-1 -right-1 text-luxury-gold animate-pulse" />
                            </div>
                            {weddingData.bukuTamuRSVP}
                        </h3>

                        <div className="space-y-4 max-h-[460px] overflow-y-auto pr-3 custom-scrollbar">
                            {isLoadingComments ? (
                                <div className="flex flex-col items-center justify-center py-12 text-stone-400 gap-2">
                                    <Loader2 size={24} className="animate-spin text-luxury-gold" />
                                    <p className="text-[11px] uppercase tracking-widest font-sans">
                                        {weddingData.loadingUcapanRSVP}
                                    </p>
                                </div>
                            ) : comments.length === 0 ? (
                                <p className="text-center text-xs text-stone-400 py-12 font-sans italic">
                                    {weddingData.emptyUcapanRSVP}
                                </p>
                            ) : (
                                comments.map((comment) => (
                                    <div key={comment.id}
                                        className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2.5 transition-all hover:border-luxury-gold/20">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-sans font-semibold text-stone-800 text-xs tracking-wide capitalize">
                                                {comment.name}
                                            </h4>
                                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium tracking-wider uppercase ${
                                                    comment.attendance === 'hadir' 
                                                    ? 'bg-green-50 text-green-700 border border-green-200' 
                                                    : 'bg-red-50 text-red-600 border-red-100'
                                                }`}>
                                                {comment.attendance === 'hadir' ? 'Hadir' : 'Tidak Hadir'}
                                            </span>
                                        </div>
                                        <p className="font-sans text-xs text-stone-600 leading-relaxed font-light">
                                            {comment.message}
                                        </p>
                                        <div className="text-[9px] text-stone-400 font-medium pt-1">
                                            {formatDate(comment.created_at)}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
            </div>

            <ConfirmationModal isOpen={isErrorModalOpen}
                            onClose={() => setIsErrorModalOpen(false)}
                            onConfirm={fetchComments}
                            title="Gagal Memuat"
                            message={weddingData.gagalMemuat || "Koneksi ke database terputus. Silakan coba segarkan kembali daftar ucapan doa restu."}
                            confirmText="Coba Lagi"
                            cancelText="Tutup"
                            variant="warning"
                            confirmButtonClassName="bg-stone-700 hover:bg-stone-800" />

            <SuccessModal isOpen={showSuccessModal} 
                onClose={() => setShowSuccessModal(false)}
                title={weddingData.successSubmitRSVP}
                message={weddingData.messageSuccessSubmitRSVP} />

        </section>
    );
};