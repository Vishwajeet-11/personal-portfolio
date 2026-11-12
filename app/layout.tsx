import type { Metadata } from "next";
import { Geist, Space_Mono } from "next/font/google";
import "./globals.css";
import { ClockBar } from "@/components/clock-bar";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { profile } from "@/data/profile";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || profile.website),
  title: { default: `${profile.name} — Software Engineer`, template: `%s | ${profile.name}` },
  description: "Vishwajeet Bharadia is a backend-focused software engineer building APIs, distributed systems, integrations, and full-stack products.",
  openGraph: { title: `${profile.name} — Software Engineer`, description: "Backend engineering, distributed systems, and product development.", type: "website" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${mono.variable}`}>
      <body className={`${geist.className} antialiased`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-mint focus:px-4 focus:py-2 focus:font-medium focus:text-black">Skip to content</a>
        <ClockBar />
        <div className="mx-auto w-full max-w-[1024px] px-4 pb-16 pt-4">
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
