"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Footer() {
  const router = useRouter();

  const links = [
    { name: "Authenticate", href: "/authenticate" },
    { name: "Consign", href: "/consign" },
    { name: "Verify", href: "/verify" },
    { name: "Artificial Intelligence", href: "/about#ai-powered" },
    { name: "About Us", href: "/about#who-we-are" },
    { name: "Contact", href: "/contact" },
    { name: "Policies", href: "/policies" },
  ];

  const handleNavClick = (href: string) => {
    const [path, hash] = href.split("#");
    router.push(path || "/");
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView();
      }, 100);
    }
  };

  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-3 mb-8 cursor-pointer group" onClick={() => router.push("/")}>
              <div className="w-10 h-10 bg-primaryBlue rounded-sm flex items-center justify-center font-bold text-white group-hover:scale-110 transition-transform">
                R
              </div>
              <span className="text-4xl font-bold tracking-tight uppercase">Relique.ch</span>
            </div>
            <p className="text-textSec max-w-sm mb-10 text-lg leading-relaxed font-medium">
              Establishing the forensic gold standard for sports memorabilia through AI-driven authentication and digital trust.
            </p>
            <div className="flex gap-4">
              {["Twitter", "Instagram", "LinkedIn"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-10 h-10 border border-white/10 flex items-center justify-center rounded-full hover:bg-primaryBlue hover:border-primaryBlue transition-all group"
                >
                  <span className="text-[10px] font-black uppercase text-white/40 group-hover:text-white">{s[0]}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black uppercase text-[11px] tracking-[0.3em] mb-10 text-primaryBlue">Navigation</h4>
            <ul className="flex flex-col gap-5">
              {links.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-textSec hover:text-highlightIce transition-colors text-xs font-black uppercase tracking-[0.1em] flex items-center gap-2 group text-left"
                  >
                    <span className="w-0 h-[1px] bg-primaryBlue group-hover:w-4 transition-all" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase text-[11px] tracking-[0.3em] mb-10 text-primaryBlue">Newsletter</h4>
            <p className="text-textSec text-sm mb-6 font-medium">Sign up for our newsletter to stay updated on our latest news and products.</p>
            <div className="flex bg-cardDark border border-white/10 p-1 group focus-within:border-highlightIce transition-all">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="bg-transparent px-4 py-3 text-[10px] font-black w-full focus:outline-none"
              />
              <button className="bg-primaryBlue px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-accentBlue transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black tracking-[0.4em] uppercase text-textSec">
            © {new Date().getFullYear()} RELIQUE.CH. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6">
            {["TW", "IG", "LI"].map((social) => (
              <a key={social} href="#" className="text-textSec hover:text-white font-black text-xs">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
