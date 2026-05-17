'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyRound, RefreshCw, AlertCircle, ArrowLeft } from 'lucide-react';
import weddingData from '@/data/wedding-data.json';
import { supabase } from '@/lib/supabase';

export const Gatekeeper = ({ children }: { children: React.ReactNode }) => {
    const [passcode, setPasscode] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [dbSecretCode, setDbSecretCode] = useState('');
    const [loadingCode, setLoadingCode] = useState(true);
    const [errorType, setErrorType] = useState<'none' | 'validation' | 'wrong_code'>('none');

    useEffect(() => {
        const fetchCurrentSecret = async () => {
            try {
                setLoadingCode(true);
                const { data, error } = await supabase
                    .from('settings')
                    .select('access_code')
                    .eq('id', 1)
                    .maybeSingle();

                if (error) throw error;
                if (data && data.access_code) {
                    setDbSecretCode(data.access_code);
                } else {
                    setDbSecretCode("Wedding2026@!"); 
                }
            } catch (err) {
                console.error("Gatekeeper gagal mengambil kode dari database:", err);
                setDbSecretCode("Wedding2026@!"); 
            } finally {
                setLoadingCode(false);
                setIsAuthenticated(sessionStorage.getItem('is_admin') === 'true');
            }
        };

        const adminStatus = sessionStorage.getItem('is_admin');
        if (adminStatus === 'true') {
            setIsAuthenticated(true);
            setLoadingCode(false);
        } else {
            fetchCurrentSecret();
        }
    }, []);

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (loadingCode) return;

        setErrorType('none');

        const minLength = passcode.length >= 8;
        const hasUpperCase = /[A-Z]/.test(passcode);
        const hasLowerCase = /[a-z]/.test(passcode);
        const hasNumber = /[0-9]/.test(passcode);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>_+\-=\[\]\\\/]/.test(passcode);

        if (!minLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSymbol) {
            setErrorType('validation');
            setPasscode('');
            return;
        }

        if (passcode === dbSecretCode) {
            setIsAuthenticated(true);
            setErrorType('none');
            sessionStorage.setItem('is_admin', 'true');
        } else {
            setErrorType('wrong_code');
            setPasscode('');
        }

        // if (passcode === dbSecretCode || passcode === '123456') {
        //     setIsAuthenticated(true);
        //     setErrorType('none');
        //     sessionStorage.setItem('is_admin', 'true');
        // } else {
        //     setErrorType('wrong_code');
        //     setPasscode('');
        // }
    };

    if (isAuthenticated === null) {
        return (
            <div className="fixed inset-0 bg-stone-50 flex flex-col items-center justify-center text-luxury-gold gap-3">
                <RefreshCw size={22} className="animate-spin text-luxury-gold" />
                <p className="text-[10px] font-sans tracking-[0.2em] uppercase text-luxury-gold/50 font-bold">
                    Membaca Enkripsi Keamanan...
                </p>
            </div>
        );
    }

    if (isAuthenticated) return <>{children}</>;

    return (
        <div className="fixed inset-0 bg-stone-100 z-[9999] flex items-center justify-center p-4 font-sans text-xs select-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-stone-50 via-stone-100 to-stone-200/60 opacity-100" />

            <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-sm w-full bg-white border border-stone-200/80 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-xl text-center space-y-6 relative z-10">
                <div className="w-14 h-14 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-center mx-auto text-stone-700 shadow-sm relative">
                    <KeyRound size={20} className={loadingCode ? 'animate-spin text-stone-400' : 'animate-pulse text-stone-700'} />
                </div>

                <div className="space-y-1.5">
                    <h2 className="font-serif text-2xl text-stone-800 italic tracking-wide">
                        {weddingData.authentication}
                    </h2>
                    <p className="text-stone-400 leading-relaxed px-1">
                        {weddingData.authenticationDescription}
                    </p>
                </div>

                <form onSubmit={handleVerify} 
                    className="space-y-4" 
                    autoComplete="off">
                    <input type="text" 
                        name="fake_user_validation" 
                        className="hidden" 
                        aria-hidden="true" 
                        tabIndex={-1} 
                        autoComplete="off" />
                    <input type="password" 
                        name="fake_pass_validation" 
                        className="hidden" 
                        aria-hidden="true" 
                        tabIndex={-1} 
                        autoComplete="new-password" />

                    <div className="relative">
                        <input
                            type="password"
                            value={passcode}
                            onChange={(e) => setPasscode(e.target.value)}
                            placeholder={loadingCode ? "MENYALURKAN KONEKSI..." : "• • • • • • • •"}
                            disabled={loadingCode}
                            name="wedding_secure_access_token"
                            autoComplete="new-password"
                            className={`w-full px-5 py-3.5 bg-stone-50/50 border rounded-xl text-center font-mono text-stone-800 text-sm tracking-widest focus:outline-none focus:ring-0 transition-colors shadow-inner ${
                                errorType !== 'none' ? 'border-red-300 bg-red-50/50 focus:border-red-400' : 'border-stone-200 focus:border-stone-400 focus:bg-white'
                            }`}/>
                    </div>

                    <AnimatePresence mode="wait">
                        {errorType === 'validation' && (
                            <motion.div initial={{ 
                                            opacity: 0, 
                                            scale: 0.98 
                                        }} 
                                        animate={{ 
                                            opacity: 1, 
                                            scale: 1 
                                        }} 
                                        exit={{ 
                                            opacity: 0 
                                        }} 
                                        className="p-4 bg-red-50/60 border border-red-100 rounded-xl text-red-700 text-left space-y-1">
                                <div className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-wider text-red-700">
                                    <AlertCircle size={13} className="shrink-0 stroke-[2.5]" />
                                    <span>
                                        {weddingData.errorValidation}
                                    </span>
                                </div>
                                <p className="text-[10px] text-stone-500 leading-normal font-normal">
                                    <strong>{weddingData.secretCode}</strong> {weddingData.secretCodeDescription}
                                </p>
                            </motion.div>
                        )}

                        {errorType === 'wrong_code' && (
                            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} 
                                        className="p-3.5 bg-red-50/60 border border-red-100 rounded-xl text-red-700 flex items-center justify-center gap-2 font-bold text-[10px] uppercase tracking-widest">
                                <AlertCircle size={14} className="shrink-0 text-red-600 stroke-[2.5]" />
                                <span>
                                    {weddingData.errorValidation}
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <button type="submit" 
                            disabled={loadingCode || !passcode} 
                            className="w-full bg-stone-900 text-white py-3.5 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-stone-800 transition-all duration-300 shadow-md disabled:opacity-20">
                        {loadingCode ? "Memproses Kunci..." : "Login"}
                    </button>
                </form>

                <button onClick={() => window.location.href = '/'} 
                        className="inline-flex items-center justify-center gap-1.5 w-full text-stone-400 text-[10px] uppercase tracking-widest hover:text-stone-600 transition-colors pt-2 font-bold">
                    <ArrowLeft size={10} className="stroke-[2.5]" />
                    {weddingData.kembali}
                </button>
            </motion.div>
        </div>
    );
};