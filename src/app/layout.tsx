import type { Metadata } from "next";
import { Inter, Saira_Condensed } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const saira = Saira_Condensed({ subsets: ["latin"], weight: ["500","600","700"], variable: "--font-saira" });

export const metadata: Metadata = {
  title: "Golden North Mobile Tire Services",
  description: "24/7 mobile tire change, new & used tires, battery replacement, and roadside assistance across the Greater Toronto Area.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${saira.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
