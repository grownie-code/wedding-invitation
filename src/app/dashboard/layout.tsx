import type { Metadata } from "next";
import weddingData from '@/data/wedding-data.json';
import DashboardClientLayout from './dashboard-client';

export const metadata: Metadata = {
    title: `${weddingData.dasboardSEO} | ${weddingData?.combinedShort || "Dashboard Admin Undangan Pernikahan"}`,
    description: `${weddingData.dashboardDescription} ${weddingData?.combinedShort || "Panel Kontrol Manajemen Undangan Pernikahan"}`,
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
        },
    },
};

export default function DashboardServerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DashboardClientLayout>
            {children}
        </DashboardClientLayout>
    );
}