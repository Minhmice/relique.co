"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { PortalSidebar } from "@/components/shell/PortalSidebar";
import { Bell, User } from "lucide-react";
import { tabNames } from "@/lib/utils/admin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Get display name from pathname
  const getDisplayName = () => {
    const tabId = pathname === "/admin" ? "dashboard" : pathname.replace("/admin/", "");
    return tabNames[tabId] || "Admin";
  };

  const handleLogout = async () => {
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error("Failed to logout:", err);
      router.push("/login");
    }
  };

  return (
    <div className="flex h-screen bg-bg-0 text-white overflow-hidden selection:bg-primary/30">
      <PortalSidebar onLogout={handleLogout} />
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-surface/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-3">
              <span className="w-1 h-4 bg-primary rounded-full shadow-[0_0_8px_rgba(0,85,255,1)]"></span>
              {getDisplayName()}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border-2 border-surface animate-pulse"></span>
            </button>
            <div className="h-8 w-[1px] bg-border mx-2"></div>
            <div className="flex items-center gap-3 pl-2 group">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-white">Relique Admin</p>
                <button
                  onClick={handleLogout}
                  className="text-[10px] text-gray-500 hover:text-destructive uppercase font-bold tracking-widest block transition-colors mt-0.5"
                >
                  Terminate Session
                </button>
              </div>
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20 cursor-pointer group-hover:scale-105 transition-transform">
                RA
              </div>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-transparent to-surface/20">
          {children}
        </div>
      </main>
    </div>
  );
}

