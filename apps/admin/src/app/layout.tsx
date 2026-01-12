import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { CommandPalette } from "@/components/command/CommandPalette";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
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
      <body className={`${workSans.variable} font-work-sans antialiased`}>
        {children}
        <Toaster />
        <CommandPalette />
      </body>
    </html>
  );
}

