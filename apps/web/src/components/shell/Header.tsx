"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { storage } from "@/lib/storage";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [session, setSession] = useState<typeof storage.session extends { get: () => infer T } ? T : null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSession(storage.session.get());
  }, []);

  const navItems = [
    { href: "/authenticate", label: "Authenticate" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/verify", label: "Verify" },
    { href: "/consign", label: "Consign" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 overflow-hidden">
          <Image
            src="/logo.svg"
            alt="Relique"
            width={120}
            height={40}
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isActive
                    ? "text-primary border-b-2 border-accent pb-1"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <DropdownMenu>
            <DropdownMenuTrigger className={cn(
              "text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              pathname === "/policies" || pathname === "/terms"
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            )}>
              Policies
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/policies">Policies</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/terms">Terms</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="flex items-center space-x-2">
          {mounted && session ? (
            <Button asChild variant="outline">
              <Link href="/app">Account</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
