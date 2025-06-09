import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "../components/Navbar";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazir",
});

export const metadata: Metadata = {
  title: "آیلتس پرو - ارزیابی نوشته‌های آیلتس",
  description:
    "ارزیابی حرفه‌ای نوشته‌های آیلتس با بازخورد دقیق و پیش‌بینی نمره در کمتر از ۱۲ ساعت",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <Providers>
        <Navbar />
        <body className={`${vazir.variable} font-sans antialiased`}>
          {children}
        </body>
      </Providers>
    </html>
  );
}
