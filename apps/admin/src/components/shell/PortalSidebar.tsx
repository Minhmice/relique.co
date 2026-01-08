"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  User,
  Home,
} from "lucide-react";

const coreNavItems = [
  { href: "/admin", label: "Overview", icon: Home },
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/submissions", label: "Submissions", icon: FileText },
];

const accountNavItems = [
  { href: "/admin/profile", label: "Profile", icon: User },
];

export function PortalSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r bg-muted/40 flex flex-col h-screen">
      <div className="p-4 space-y-2 flex-1">
        <h2 className="text-lg font-semibold mb-4 px-3">Admin</h2>
        
        <nav className="space-y-1">
          <div className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Core
          </div>
          {coreNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground ring-2 ring-ring"
                    : "hover:bg-muted"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <nav className="space-y-1 mt-6">
          <div className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Account
          </div>
          {accountNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground ring-2 ring-ring"
                    : "hover:bg-muted"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t">
        <div className="text-xs text-muted-foreground">
          <div className="font-semibold">Relique Admin</div>
          <div className="mt-1">v0.1.0</div>
        </div>
      </div>
    </div>
  );
}

