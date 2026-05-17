'use client';

import React, { useState, useEffect } from 'react';
import { Save, Bell, Lock, Globe, Music as MusicIcon, Eye, EyeOff, MessageSquare } from 'lucide-react';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { SuccessModal } from '@/components/ui/SuccessModal';
import { SuccessToast } from '@/components/ui/SuccessToast';
import { Footer } from '@/components/sections/Footer';
import { supabase } from '@/lib/supabase';
import weddingData from '@/data/wedding-data.json';

export default function SettingsPage() {
    // Secret Code
    const [secretCode, setSecretCode] = useState('');
    const [loadingSecret, setLoadingSecret] = useState(true);
    const [showSecret, setShowSecret] = useState(false);

    // Simpan
    const [showConfirmSave, setShowConfirmSave] = useState(false);
    const [showSuccessSave, setShowSuccessSave] = useState(false);

    // Reset
    const [showConfirmReset, setShowConfirmReset] = useState(false);
    const [showSuccessReset, setShowSuccessReset] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Logout
    const [showConfirmLogout, setShowConfirmLogout] = useState(false);

    // Success Toast
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');

    const [features, setFeatures] = useState({
        public_invitation: true,
        autoplay_music: true,
        auto_moderate: true
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                setLoadingSecret(true);
                const { data, error } = await supabase
                    .from('settings')
                    .select('access_code, public_invitation, autoplay_music, auto_moderate')
                    .maybeSingle();

                if (error) throw error;

                if (data) {
                    if (data.access_code) setSecretCode(data.access_code);
                    setFeatures({
                        public_invitation: data.public_invitation,
                        autoplay_music: data.autoplay_music,
                        auto_moderate: data.auto_moderate
                    });
                }
            } catch (err) {
                console.error("Gagal memuat pengaturan:", err);
            } finally {
                setLoadingSecret(false);
            }
        };

        fetchSettings();
    }, []);

    // Simpan
    const executeSaveSettings = async () => {
        if (!secretCode.trim()) {
            alert(weddingData.errorSaveSecretCode || "Kode akses tidak boleh kosong!");
            return;
        }

        try {
            setIsSaving(true);
            const { error } = await supabase
                .from('settings')
                .update({ 
                    access_code: secretCode.trim(),
                    public_invitation: features.public_invitation,
                    autoplay_music: features.autoplay_music,
                    auto_moderate: features.auto_moderate
                })
                .eq('id', 1);

            if (error) throw error;

            setShowConfirmSave(false);
            setToastMessage(weddingData.successSaveSecretCode || "Perubahan Berhasil Disimpan");
            setShowToast(true);
        } catch (err) {
            console.error("Gagal menyimpan:", err);
            alert(weddingData.gagalSaveSecretCode || "Gagal menyimpan perubahan. Silakan coba lagi");
        } finally {
            setIsSaving(false);
        }
    };

    // Reset
    const executeResetDefault = async () => {
        try {
            setIsSaving(true);
            const defaultSettings = {
                public_invitation: true,
                autoplay_music: true,
                auto_moderate: true
            };

            const { error } = await supabase
                .from('settings')
                .update(defaultSettings)
                .eq('id', 1);

            if (error) throw error;

            setFeatures({
                public_invitation: true,
                autoplay_music: true,
                auto_moderate: true
            });

            setShowConfirmReset(false);
            setToastMessage(weddingData.successResetSettings || "Pengaturan berhasil direset");
            setShowToast(true);

        } catch (err) {
            console.error(err);
        } finally {
            setIsSaving(false);
        }
    };

    // Logout
    const handleLogout = () => {
        sessionStorage.removeItem('is_admin');
        sessionStorage.clear();

        setShowConfirmLogout(false); 

        window.location.href = '/';
    };

    return (
        <div className="space-y-8">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-serif text-stone-800 italic">
                    {weddingData.dashboardSettingsHeader}
                </h1>
                <p className="text-stone-500 text-sm">
                    {weddingData.dashboardSettingsDescription}
                </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* SECRET CODE */}
                {/* <div className="bg-white rounded-[1rem] border border-stone-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-stone-100 bg-stone-50/40 flex items-center gap-3">
                        <Lock size={16} className="text-stone-400" />
                        <h3 className="text-[10px] font-bold text-stone-700 uppercase tracking-[0.2em]">
                            Akses Dashboard
                        </h3>
                    </div>
                    <div className="p-6 md:p-8 space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-stone-400 block">
                                Secret Access Code
                            </label>
                            <div className="relative max-w-sm">
                                <input 
                                    type={showSecret ? "text" : "password"} 
                                    value={loadingSecret ? "Memuat kode..." : secretCode} 
                                    onChange={(e) => setSecretCode(e.target.value)}
                                    disabled={loadingSecret || isSaving}
                                    className={`w-full px-5 py-3 border border-stone-200 rounded-xl text-sm font-mono text-stone-600 focus:outline-none transition-all ${
                                        loadingSecret ? 'bg-stone-50 text-stone-400 animate-pulse' : 'bg-white focus:border-stone-400'
                                    }`}/>
                                {!loadingSecret && (
                                    <button 
                                        type="button" 
                                        onClick={() => setShowSecret(!showSecret)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">
                                        {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* FITUR & NOTIFIKASI */}
                <div className="bg-white rounded-[1rem] border border-stone-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-stone-100 bg-stone-50/40 flex items-center gap-3">
                        <Bell size={16} className="text-stone-400" />
                        <h3 className="text-[10px] font-bold text-stone-700 uppercase tracking-[0.2em]">
                            {weddingData.dashboardSettingsTabel}
                        </h3>
                    </div>
                    <div className="p-6 md:p-8 space-y-6 divide-y divide-stone-100">
                        <ToggleItem icon={<Globe size={18} />} 
                            title={weddingData.dashboardSettingsTabelTittle1}
                            description={weddingData.dashboardSettingsTabelDescription1}
                            checked={features.public_invitation}
                            onChange={(val: boolean) => setFeatures({ ...features, public_invitation: val })}/>
                        <div className="pt-6">
                            <ToggleItem icon={<MusicIcon size={18} />} 
                                title={weddingData.dashboardSettingsTabelTittle2}
                                description={weddingData.dashboardSettingsTabelDescription2}
                                checked={features.autoplay_music}
                                onChange={(val: boolean) => setFeatures({ ...features, autoplay_music: val })}/>
                        </div>
                        <div className="pt-6">
                            <ToggleItem icon={<MessageSquare size={18} />} 
                                title={weddingData.dashboardSettingsTabelTittle3}
                                description={weddingData.dashboardSettingsTabelDescription3}
                                checked={features.auto_moderate}
                                onChange={(val: boolean) => setFeatures({ ...features, auto_moderate: val })}/>
                        </div>
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="space-y-4 pt-2">
                    <div className="flex flex-col sm:flex-row justify-end gap-3">
                        {/* BUTTON RESET */}
                        <button type="button" 
                                disabled={isSaving} 
                                onClick={() => setShowConfirmReset(true)} 
                                className="px-6 py-3 bg-red-100/90 hover:bg-red-200/90 text-red-700 hover:text-red-800 border border-red-200/50 hover:border-red-300 rounded-xl text-[10px] font-bold tracking-widest transition-all duration-300 shadow-sm active:scale-[0.99] uppercase disabled:opacity-40 disabled:cursor-not-allowed w-full sm:w-auto select-none">
                                {isSaving ? "PROSES..." : "RESET DEFAULT"}
                        </button>

                        {/* BUTTON SAVE */}
                        <button type="button" 
                                onClick={() => setShowConfirmSave(true)}
                                disabled={loadingSecret || isSaving}
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-stone-700 hover:bg-stone-800 text-stone-50 hover:text-white border border-stone-800/20 rounded-xl text-[10px] font-bold tracking-widest transition-all duration-300 shadow-md hover:shadow-[0_4px_15px_rgba(68,64,60,0.18)] uppercase disabled:opacity-40 disabled:cursor-not-allowed w-full sm:w-auto select-none">
                                <Save size={14} className={isSaving ? "animate-spin" : ""} />
                                {isSaving ? "MENYIMPAN..." : "SIMPAN"}
                        </button>
                    </div>

                    {/* DIVIDER */}
                    <div className="h-[1px] bg-stone-200/60 w-full my-2 sm:hidden" />

                    {/* BUTTON LOGOUT (MOBILE) */}
                    <div className="flex justify-end sm:hidden">
                        <button type="button" 
                                onClick={() => setShowConfirmLogout(true)}
                                disabled={isSaving}
                                className="w-full sm:w-auto px-6 py-3 bg-red-50 hover:bg-red-100/80 text-red-600 border border-red-200/60 rounded-xl text-[10px] font-bold tracking-widest transition-all uppercase text-center disabled:opacity-50">
                                {weddingData.dashboardSettingsLogout}
                        </button>
                    </div>

                    {/* TOAST */}
                    {/* RESET */}
                    <ConfirmationModal isOpen={showConfirmReset}
                        onClose={() => setShowConfirmReset(false)}
                        onConfirm={executeResetDefault}
                        title={weddingData.dashboardSettingsReset1}
                        message={weddingData.dashboardSettingsReset2}
                        confirmText={weddingData.dashboardSettingsReset3}
                        cancelText={weddingData.cancel}
                        variant="danger"
                        confirmButtonClassName="bg-red-100/90 hover:bg-red-200/90 !text-red-700 hover:!text-red-800 border border-red-200/50"/>

                    {/* SAVE */}
                    <ConfirmationModal isOpen={showConfirmSave}
                        onClose={() => setShowConfirmSave(false)}
                        onConfirm={executeSaveSettings}
                        title={weddingData.dashboardSettingsSave1}
                        message={weddingData.dashboardSettingsSave2}
                        confirmText={weddingData.dashboardSettingsSave3}
                        cancelText={weddingData.cancel}
                        variant="warning" 
                        confirmButtonClassName="bg-stone-700 hover:bg-stone-800"/>

                    {/* LOGOUT */}
                    <ConfirmationModal isOpen={showConfirmLogout}
                        onClose={() => setShowConfirmLogout(false)}
                        onConfirm={handleLogout}
                        title={weddingData.dashboardSettingsLogout2}
                        message={weddingData.dashboardSettingsLogout3}
                        confirmText={weddingData.dashboardSettingsLogout4}
                        variant="warning"
                        confirmButtonClassName="bg-red-100/90 hover:bg-red-200/90 !text-red-700 hover:!text-red-800 border border-red-200/50"/>

                    {/* SUCCESS TOAST */}
                    <SuccessToast 
                        show={showToast} 
                        message={toastMessage} 
                        onClose={() => setShowToast(false)} 
                        duration={3000} 
                        topClass="top-14 md:top-12"/>
                </div>
            </div>

            <Footer />
        </div>
    );
}

function ToggleItem({ icon, title, description, checked, onChange }: any) {
    return (
        <div className="flex items-start justify-between gap-6 group">
            <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-stone-400 group-hover:text-luxury-gold transition-colors shrink-0">
                    {icon}
                </div>
                <div className="space-y-1">
                    <h4 className="text-sm font-bold text-stone-800">
                        {title}
                    </h4>
                    <p className="text-xs text-stone-400 leading-relaxed max-w-md">
                        {description}
                    </p>
                </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer mt-1 shrink-0 select-none">
                <input 
                    type="checkbox" 
                    checked={checked} 
                    onChange={(e) => onChange(e.target.checked)} 
                    className="sr-only peer" />
                <div className="w-11 h-6 rounded-full peer 
                                {/* OFF */}
                                bg-stone-300/80 
                                {/* ON */}
                                peer-checked:bg-emerald-600 
                                {/* COLOR TRANSITION */}
                                transition-colors duration-300 focus:outline-none
                                {/* KNOB */}
                                after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                                after:rounded-full after:h-5 after:w-5 after:transition-all duration-300
                                {/* SHADOW */}
                                after:shadow-[0_1px_4px_rgba(0,0,0,0.15)]
                                peer-checked:after:translate-x-full peer-checked:after:border-white"/>
            </label>
        </div>
    );
}