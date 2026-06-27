import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { LocalBusinessJsonLd } from "@/lib/jsonld";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Golden North Mobile Tire Services",
  description: "24/7 mobile tire change, new & used tires, battery replacement, and roadside assistance across the Greater Toronto Area.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {/* Structured data — rendered once, in the document body. */}
        <LocalBusinessJsonLd />
        <Header />
        {/* pb-20 md:pb-0: leaves room for the fixed MobileCallBar below md. */}
        <main className="pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
