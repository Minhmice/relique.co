import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/shell/Header";
import { Footer } from "@/components/shell/Footer";
import { Toaster } from "@/components/ui/sonner";
import { CompareProvider, CompareDrawer } from "@/components/interactive/CompareDrawer";
import { SpeedInsights } from "@vercel/speed-insights/next"

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
  display: "swap",
});

const zapfRenaissance = localFont({
  src: "../fonts/Zapf Renaissance Book.ttf",
  variable: "--font-zapf-renaissance",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://relique.ch"),
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
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://relique.ch"}/og-logo.png`,
        width: 1200,
        height: 1200,
        alt: "Relique - Authentic Collectibles",
      },
    ],
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
      <body className={`${workSans.variable} ${zapfRenaissance.variable} font-work-sans antialiased`}>
        <CompareProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CompareDrawer />
          <Toaster />
          <SpeedInsights />
        </CompareProvider>
      </body>
    </html>
  );
}
