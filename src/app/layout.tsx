import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BUSINESS } from "@/lib/business";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCallBar } from "@/components/layout/MobileCallBar";
import { LocalBusinessJsonLd } from "@/lib/jsonld";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  // Absolute base for every relative URL Next generates (OG images, icons,
  // canonicals). Without this Next warns at build and emits relative OG URLs
  // that crawlers and social scrapers can't resolve.
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: "GoldenNorth Mobile Tire Services",
    template: `%s | ${BUSINESS.shortName}`,
  },
  description:
    "24/7 mobile tire change, new & used tires, battery replacement, and roadside assistance across the Greater Toronto Area.",
  applicationName: BUSINESS.name,
  // Lets the owner verify ownership in Google Search Console without a code
  // change: drop the token into GOOGLE_SITE_VERIFICATION in .env.local.
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        {/* Structured data — rendered once, in the document body. */}
        <LocalBusinessJsonLd />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
