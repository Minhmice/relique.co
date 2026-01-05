import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/shell/Header";
import { Footer } from "@/components/shell/Footer";
import { Toaster } from "@/components/ui/sonner";
import { DemoTools } from "@/components/dev/DemoTools";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  display: "swap",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://relique.co"),
  title: {
    default: "Relique - Authentic Collectibles",
    template: "%s | Relique",
  },
  description: "Probabilistic authentication for collectibles and memorabilia. Verify, authenticate, and consign your collectibles with confidence.",
  keywords: [
    "collectibles",
    "authentication",
    "memorabilia",
    "verification",
    "probabilistic authentication",
    "sports memorabilia",
    "certificate of authenticity",
    "COA",
  ],
  authors: [{ name: "Relique" }],
  creator: "Relique",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Relique",
    title: "Relique - Authentic Collectibles",
    description: "Probabilistic authentication for collectibles and memorabilia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Relique - Authentic Collectibles",
    description: "Probabilistic authentication for collectibles and memorabilia",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
        <DemoTools />
      </body>
    </html>
  );
}
