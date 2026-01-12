"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden diagonal-bg pt-20">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-8 flex items-center gap-4">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center p-3">
              <span className="font-black italic text-primaryBlue text-xl">L1</span>
            </div>
            <span className="text-primaryBlue font-black text-xs tracking-[0.4em] uppercase">Relique Official Portal</span>
          </div>

          <h1 className="text-7xl md:text-[90px] font-black tracking-tighter leading-[0.85] uppercase mb-8 italic">
            Relics you <br />
            <span className="text-primaryBlue relative inline-block">can rely on</span>
          </h1>

          <div className="flex flex-wrap gap-6">
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(28, 77, 141, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/authenticate"
                className="px-12 py-5 bg-primaryBlue hover:bg-accentBlue text-white font-black uppercase text-xs tracking-[0.2em] transition-all shadow-[0_20px_40px_rgba(28,77,141,0.3)] inline-block"
              >
                Authenticate Now
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative aspect-square max-w-xl mx-auto border-2 border-white/5 shadow-2xl overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1200"
              alt="Heritage"
              width={1200}
              height={1200}
              className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-105 transition-transform duration-[4s]"
              priority
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[120px] font-black italic opacity-10 select-none tracking-widest leading-none pointer-events-none">
                RELIQUE
              </div>
            </div>
            {/* Dynamic Highlight overlay */}
            <div className="absolute inset-0 bg-primaryBlue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
