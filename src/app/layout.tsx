import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import weddingData from '@/data/wedding-data.json';

// Font Sans-Serif
const sansFont = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
    preload: true,
});

// Font Serif
const serifFont = Playfair_Display({
    subsets: ["latin"],
    style: ["normal", "italic"],
    variable: "--font-serif",
    display: "swap",
    preload: false,
});

// SEO Metadata
export const metadata: Metadata = {
    // META TAG SEO GOOGLE
    title: `${weddingData.combinedShort} | Undangan Pernikahan`,
    description: `${weddingData.descriptionSEO} | Undangan Pernikahan Digital`,
    keywords: ["undangan digital", "wedding invitation", "pernikahan", weddingData?.combinedShort],
    authors: [{ name: "Grownie Code" }],

    // OPEN GRAPH (FB WHATSAPP, TELEGRAM)
    openGraph: {
        title: `${weddingData.combinedShort} | Undangan Pernikahan`,
        description: `${weddingData.descriptionSEO} | Undangan Pernikahan Digital`,
        url: `${weddingData.linkDeveloper}`,
        siteName: "Wedding Invitation",
        images: [
            {
                url: "/ogImage/og-image.webp", // (Ukuran rekomendasi: 1200 x 630 px)
                width: 1200,
                height: 630,
                alt: `Foto Pernikahan ${weddingData?.combinedShort}`,
            },
        ],
        locale: "id_ID",
        type: "website",
    },

    // TWITTER
    twitter: {
        card: "summary_large_image",
        title: `${weddingData.combinedShort} | Undangan Pernikahan`,
        description: `${weddingData.descriptionSEO} | Undangan Pernikahan Digital`,
        images: ["/ogImage/og-image.webp"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
return (
    <html lang="id">
        <body className={`${sansFont.variable} ${serifFont.variable} antialiased font-sans bg-stone-50 text-stone-900`}>
            {children}
        </body>
    </html>
);
}