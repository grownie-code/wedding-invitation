'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import weddingData from '@/data/wedding-data.json';

interface PaginationProps {
    currentPage: number;
    totalCount: number;
    itemsPerPage: number;
    loading: boolean;
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalCount,
    itemsPerPage,
    loading,
    onPageChange,
}) => {
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    if (totalPages <= 1) return null;

    return (
        <div className="mt-10 pt-6 border-t border-stone-100 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* INFO DATA */}
            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">
                {weddingData.paginationData1} {Math.min(itemsPerPage, totalCount)} {weddingData.paginationData2} {totalCount} {weddingData.paginationData3}
            </p>

            {/* NAVIGASI */}
            <div className="flex items-center gap-1">
                {/* PREV */}
                <button onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                        disabled={currentPage === 1 || loading}
                        className="p-2 text-stone-400 hover:text-luxury-gold disabled:opacity-20 transition-colors">
                        <ChevronLeft size={18} />
                </button>

                {/* ANGKA */}
                <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        if (
                            page === 1 || 
                            page === totalPages || 
                            (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                            return (
                                <button key={`page-nav-${page}`}
                                        type="button"
                                        onClick={() => onPageChange(page)}
                                        disabled={loading}
                                        className={`w-9 h-9 rounded-full text-[10px] font-bold transition-all duration-300 flex items-center justify-center relative overflow-hidden select-none ${
                                            currentPage === page
                                            ? 'bg-gradient-to-br from-[#E6CA65] via-[#D4AF37] to-[#C5A028] text-white shadow-[0_4px_15px_rgba(197,160,40,0.25)] scale-105'
                                            : 'text-stone-400 hover:bg-stone-50 hover:text-stone-800 border border-transparent'
                                        }`}>
                                        {/* EFEK KILAU */}
                                        {currentPage === page && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                                        )}
                                        <span className="relative z-10">
                                            {page}
                                        </span>
                                </button>
                            );
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                            return <span key={page} className="text-stone-300 px-1 self-end pb-2">...</span>;
                        }
                            return null;
                    })}
                </div>

                {/* NEXT */}
                <button onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                        disabled={currentPage >= totalPages || loading}
                        className="p-2 text-stone-400 hover:text-luxury-gold disabled:opacity-20 transition-colors">
                        <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );
};