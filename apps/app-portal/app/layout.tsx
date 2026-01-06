import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { CommandPalette } from "@/components/command/CommandPalette";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_PORTAL_URL || "http://localhost:3001"),
  title: {
    default: "Relique Portal",
    template: "%s | Relique Portal",
  },
  description: "Client Portal for managing verifications, consignments, and saved items.",
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
      <body className="antialiased">
        {children}
        <Toaster />
        <CommandPalette />
      </body>
    </html>
  );
}

