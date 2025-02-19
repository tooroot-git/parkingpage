import type { Metadata } from "next";
import localFont from "next/font/local";
import "../styles/globals.css";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/react"
import { TailwindIndicator } from '@/components/dev/tailwind-indicator'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.metaDescription,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.metaDescription,
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <TailwindIndicator />
        <Analytics />
      </body>
    </html>
  );
}
