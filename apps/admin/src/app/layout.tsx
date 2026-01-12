import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { CommandPalette } from "@/components/command/CommandPalette";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3001"),
  title: {
    default: "Relique Admin",
    template: "%s | Relique Admin",
  },
  description: "Admin dashboard for managing verifications, consignments, and submissions.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-inter antialiased`}>
        {children}
        <Toaster />
        <CommandPalette />
      </body>
    </html>
  );
}

