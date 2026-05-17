'use client';

import React, { useState } from 'react';
import { FadeInWhenVisible } from '../animation/FadeInWhenVisible';
import { Copy, Check, CreditCard, Gift } from 'lucide-react';
import { SuccessToast } from '@/components/ui/SuccessToast';
import weddingData from '@/data/wedding-data.json';

interface BankAccount {
    id: string;
    bankName: string;
    accountNumber: string;
    accountHolder: string;
}

export const GiftSection: React.FC = () => {
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');

    const accounts: BankAccount[] = [
        {
            id: weddingData.bankID1,
            bankName: weddingData.bankName1,
            accountNumber: weddingData.bankRekening1,
            accountHolder: weddingData.bankAtasNama1,
        },
        {
            id: weddingData.bankIDD2,
            bankName: weddingData.bankName2,
            accountNumber: weddingData.bankRekening2,
            accountHolder: weddingData.bankAtasNama2,
        },
    ];

    const handleCopy = async (accountNumber: string, bankId: string) => {
        try {
            await navigator.clipboard.writeText(accountNumber);

            setToastMessage(weddingData.successSalinRekening || "Nomor rekening berhasil disalin");
            setShowToast(true);

            setCopiedId(bankId);
            setTimeout(() => {
                setCopiedId(null);
            }, 3000);

        } catch (err) {
            console.error(weddingData.gagalSalinRekening || "Gagal menyalin nomor rekening. Silakan coba lagi", err);
        }
    };

    return (
        <section className="w-full bg-white py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-stone-100">
            {/* ORNAMEN */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-champagne/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-luxury-champagne/20 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mx-auto space-y-16 relative z-10">
                {/* HEADER */}
                <div className="text-center space-y-3">
                    <FadeInWhenVisible delay={0.1}>
                        <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-bronze font-semibold">
                            {weddingData.judulGift}
                        </span>
                    </FadeInWhenVisible>
                    <FadeInWhenVisible delay={0.2}>
                        <h2 className="font-serif text-2xl md:text-3xl text-stone-800 italic">
                            {weddingData.tittleGift}
                        </h2>
                    </FadeInWhenVisible>
                    <FadeInWhenVisible delay={0.3}>
                        <p className="font-sans text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
                            {weddingData.descriptionGift}
                        </p>
                    </FadeInWhenVisible>
                    <FadeInWhenVisible delay={0.4}>
                        <div className="w-12 h-[1px] bg-luxury-gold/30 mx-auto mt-4" />
                    </FadeInWhenVisible>
                </div>

                {/* REKENING */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {accounts.map((acc, idx) => (
                        <FadeInWhenVisible key={acc.id} delay={0.2 + idx * 0.1}>
                            <div className="bg-gradient-to-br from-stone-50 to-stone-100/50 p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4 relative overflow-hidden group hover:shadow-md hover:border-luxury-gold/20 transition-all duration-300">
                                <div className="absolute top-0 inset-x-0 h-[3px] bg-luxury-gold/30" />

                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-luxury-bronze">
                                            {acc.bankName}
                                        </span>
                                        <p className="font-sans text-xs font-semibold text-stone-800 tracking-wide pt-1">
                                            {acc.accountHolder}
                                        </p>
                                    </div>
                                    <CreditCard size={18} className="text-stone-400 group-hover:text-luxury-bronze transition-colors" />
                                </div>

                                <div className="bg-white/80 border border-stone-200/60 p-3 rounded-xl flex items-center justify-between gap-2">
                                    <span className="font-mono text-xs md:text-sm font-medium text-stone-700 tracking-wider tabular-nums">
                                        {acc.accountNumber}
                                    </span>

                                    <button onClick={() => handleCopy(acc.accountNumber, acc.id)}
                                            className={`p-2.5 rounded-lg transition-all duration-300 flex items-center justify-center shrink-0 border select-none ${
                                                copiedId === acc.id 
                                                    ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                                                    : 'bg-stone-100/70 hover:bg-stone-800 border-stone-200/40 text-stone-600 hover:text-white'
                                            }`}
                                            title="Salin Nomor Rekening">
                                            {copiedId === acc.id ? (
                                                <Check size={12} className="stroke-[2.5]" />
                                            ) : (
                                                <Copy size={12} className="stroke-[2]" />
                                            )}
                                    </button>
                                </div>
                            </div>
                        </FadeInWhenVisible>
                    ))}
                </div>

                <div className="text-center pt-4">
                    <FadeInWhenVisible delay={0.5}>
                        <div className="inline-flex flex-col items-center gap-2">
                            <Gift size={20} className="text-luxury-gold/70 animate-bounce" />
                            <p className="font-serif text-sm text-stone-700 italic">
                                {weddingData.penutupGift}
                            </p>
                            <p className="font-sans text-[10px] text-stone-400 uppercase tracking-widest mt-1">
                                {weddingData.combinedShort}
                            </p>
                        </div>
                    </FadeInWhenVisible>
                </div>

                {/* TOAST */}
                <SuccessToast show={showToast} 
                    message={toastMessage}
                    onClose={() => setShowToast(false)} 
                    duration={3000}
                    topClass="-top-12 md:-top-12" />
            </div>
        </section>
    );
};