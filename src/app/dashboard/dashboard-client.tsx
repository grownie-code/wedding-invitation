'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, MessageCircleHeart, Settings, LogOut, Loader2 } from 'lucide-react';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { Gatekeeper } from '@/components/admin/Gatekeeper';
import weddingData from '@/data/wedding-data.json';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const menuItems = [
        { icon: <LayoutDashboard size={18} />, label: 'Overview', path: '/dashboard' },
        { icon: <Users size={18} />, label: 'Tamu & RSVP', path: '/dashboard/guests' },
        { icon: <MessageCircleHeart size={18} />, label: 'Ucapan Doa', path: '/dashboard/messages' },
        { icon: <Settings size={18} />, label: 'Pengaturan', path: '/dashboard/settings' },
    ];

    // Logout
    const handleLogout = () => {
        sessionStorage.removeItem('is_admin');

        router.push('/');
    };

    const executeLogout = async () => {
        try {
            setIsLoggingOut(true);
            await new Promise((resolve) => setTimeout(resolve, 600)); 
            handleLogout();
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoggingOut(false);
            setShowLogoutConfirm(false);
        }
    };

    return (
        <Gatekeeper>
            <div className="min-h-screen bg-stone-50 flex">

                {/* SIDEBAR NAVIGATION (DESKTOP) */}
                <aside className="w-64 bg-white border-r border-stone-200 hidden md:flex flex-col shrink-0">
                    <div className="p-8">
                        <h1 className="font-serif text-xl text-stone-800">
                            {weddingData.headerDashboard}
                        </h1>
                        <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mt-0.5">
                            {weddingData.combinedShort}
                        </p>
                    </div>

                    <nav className="flex-1 px-4 space-y-1">
                        {menuItems.map((item) => (
                            <NavItem key={item.path}
                                href={item.path} 
                                icon={item.icon} 
                                label={item.label} 
                                currentPath={pathname} />
                        ))}
                    </nav>

                    {/* FOOTER */}
                    <div className="p-4 border-t border-stone-200/60 bg-gradient-to-b from-transparent to-stone-50/50">
                        <button type="button"
                                disabled={isLoggingOut}
                                onClick={() => setShowLogoutConfirm(true)} 
                                className="flex items-center justify-between px-4 py-3 text-stone-500 hover:text-red-700 hover:bg-red-50/40 w-full rounded-2xl transition-all duration-300 group select-none disabled:opacity-50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center text-stone-400 group-hover:bg-red-100/50 group-hover:text-red-600 transition-all duration-300 shrink-0">
                                    {isLoggingOut ? (
                                        <Loader2 size={14} className="animate-spin" />
                                    ) : (
                                        <LogOut size={14} className="group-hover:-translate-x-0.5 transition-transform duration-300 stroke-[2.5]" />
                                    )}
                                </div>
                                <span className="text-[11px] font-bold tracking-widest uppercase transition-colors font-sans">
                                    {isLoggingOut ? "Mengunci..." : weddingData.dashboardSettingsLogout}
                                </span>
                            </div>

                            <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-red-500 text-[10px] font-bold font-mono">
                                &rarr;
                            </div>
                        </button>

                        <ConfirmationModal isOpen={showLogoutConfirm}
                            onClose={() => setShowLogoutConfirm(false)}
                            onConfirm={executeLogout}
                            title={weddingData.dashboardSettingsLogout2}
                            message={weddingData.dashboardSettingsLogout3}
                            confirmText={isLoggingOut ? "MENGUNCI..." : weddingData.dashboardSettingsLogout4}
                            variant="danger"/>
                    </div>
                </aside>

                {/* CONTAINER */}
                <div className="flex-1 flex flex-col h-screen overflow-hidden">
                    {/* HEADER */}
                    <header className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-8 shrink-0">
                        <h2 className="font-sans font-bold text-stone-700 uppercase text-[10px] tracking-[0.2em]">
                            {weddingData.headerDashboard2}
                        </h2>
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-xs font-bold text-stone-800">
                                    {weddingData.combinedShort}
                                </p>
                                {/* <p className="text-[10px] text-stone-400 font-medium">
                                    Online
                                </p> */}
                            </div>
                            {/* AVATAR */}
                            <div className="w-9 h-9 rounded-full bg-stone-150 border border-stone-200 flex items-center justify-center overflow-hidden shadow-sm shrink-0">
                                <img src={weddingData.dashboardAvatar}
                                    alt={weddingData.dashboardAvatarAlt}
                                    loading="lazy" 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.style.display = 'none';
                                        const parent = e.currentTarget.parentElement;
                                        if (parent) {
                                            const span = document.createElement('span');
                                            span.className = 'font-serif text-xs font-bold text-stone-600';
                                            span.innerText = 'A';
                                            parent.appendChild(span);
                                        }
                                    }}/>
                            </div>
                        </div>
                    </header>

                    {/* DYNAMIC PAGES CONTENT */}
                    <main className="flex-1 overflow-y-auto p-6 md:p-8 pb-24 md:pb-8 bg-stone-50">
                        {children}
                    </main>
                </div>

                {/* BOTTOM NAVIGATION (MOBILE) */}
                <div className="fixed bottom-0 inset-x-0 bg-white/80 backdrop-blur-lg border-t border-stone-200/60 z-40 md:hidden px-4 py-2 flex justify-around items-center shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link key={item.path} 
                                href={item.path}
                                className="flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl relative">
                                <div className={`transition-colors duration-200 ${isActive ? 'text-stone-900' : 'text-stone-400'}`}>
                                    {item.icon}
                                </div>
                                <span className={`text-[9px] font-bold uppercase tracking-widest transition-colors duration-200 ${
                                    isActive ? 'text-stone-900' : 'text-stone-400'
                                    }`}>
                                    {item.label.split(' ')[0]}
                                </span>
                                {isActive && (
                                    <div className="absolute -top-2 w-1 h-1 rounded-full bg-stone-800 animate-pulse" />
                                )}
                            </Link>
                        );
                    })}
                </div>

            </div>
        </Gatekeeper>
    );
}

function NavItem({ href, icon, label, currentPath }: { href: string; icon: React.ReactNode; label: string; currentPath: string }) {
    const isActive = currentPath === href;
    return (
        <Link href={href} 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-xs font-bold uppercase tracking-wider ${
                isActive 
                ? 'bg-stone-100 text-stone-900' 
                : 'text-stone-500 hover:bg-stone-50/60 hover:text-stone-900'
            }`}>
            <div className={isActive ? 'text-stone-900' : 'text-stone-400'}>
                {icon}
            </div>
            {label}
        </Link>
    );
}