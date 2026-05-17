/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Menghubungkan CSS Variable dari next/font ke utility class Tailwind
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },
      // Kita tambahkan juga warna dasar bertema Luxury/Romantic (Champagne & Earthy Gold)
      colors: {
        luxury: {
          gold: "#D4AF37",
          champagne: "#F7F4EF",
          bronze: "#A87C43",
          dark: "#1C1917",
        }
      }
    },
  },
  plugins: [],
}