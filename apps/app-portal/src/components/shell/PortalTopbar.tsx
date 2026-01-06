"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { storage } from "@/lib/storage";
import type { MockSession } from "@/lib/storage";
import { User, Settings, Search } from "lucide-react";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const pageTitles: Record<string, { title: string; subtitle?: string }> = {
  "/app": { title: "Dashboard", subtitle: "Overview and quick access" },
  "/app/submissions": { title: "Submissions", subtitle: "Verify and Consign records" },
  "/app/saved": { title: "Saved", subtitle: "Favorites and Collections" },
  "/app/profile": { title: "Profile", subtitle: "Preferences and data tools" },
  "/app/devtools": { title: "DevTools", subtitle: "Development utilities" },
};

export function PortalTopbar() {
  const pathname = usePathname();
  const [session, setSession] = useState<MockSession | null>(null);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
    setSession(storage.sessionMock.get());
    
    // Listen for storage changes (multi-tab sync)
    const handleStorageChange = () => {
      setSession(storage.sessionMock.get());
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const pageInfo = pageTitles[pathname] || { title: "Portal", subtitle: "" };
  const displayName = session?.displayName || "Collector";

  if (!mounted) {
    return (
      <div className="border-b bg-background p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b bg-background p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-xl font-semibold">{pageInfo.title}</h1>
          {pageInfo.subtitle && (
            <p className="text-sm text-muted-foreground">{pageInfo.subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search portal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <NotificationCenter />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  {getInitials(displayName)}
                </div>
                <span className="hidden md:inline">{displayName}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/app/profile" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/app/profile" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

