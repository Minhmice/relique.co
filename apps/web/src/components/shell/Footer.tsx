import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/authenticate" className="text-muted-foreground hover:text-foreground transition-colors">
                  Authenticate
                </Link>
              </li>
              <li>
                <Link href="/consign" className="text-muted-foreground hover:text-foreground transition-colors">
                  Consign
                </Link>
              </li>
              <li>
                <Link href="/verify" className="text-muted-foreground hover:text-foreground transition-colors">
                  Verify
                </Link>
              </li>
              <li>
                <Link href="/about#artificial-intelligence" className="text-muted-foreground hover:text-foreground transition-colors">
                  AI
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/policies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Policies
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/brand/logo_2.svg"
                alt="Relique"
                width={100}
                height={32}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Authenticating collectibles with probabilistic verification.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            Authentication is probabilistic and based on available evidence. Results
            are not guaranteed and should be used as a reference only.
          </p>
          <p className="mt-2">© {new Date().getFullYear()} Relique. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
