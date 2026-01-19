"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden diagonal-bg pt-20">
      <div className="container mx-auto px-6 flex items-center justify-center relative z-10">
        <motion.div
          className="text-center max-w-5xl"
          style={{ fontFamily: '"Times New Roman", Times, serif' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-8 flex items-center justify-center gap-4">
            <span className="text-xl tracking-[0.4em] uppercase">Relique Official Portal</span>
          </div>

          <h1 className="text-5xl md:text-[80px] lg:text-[120px] font-medium tracking-tight leading-[0.85] mb-8" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
            <span className="text-white">Relique</span> <span className="text-primaryBlue">you</span>
            <br />
            <span className="text-primaryBlue">can </span>
            <span className="text-white">rely</span> <span className="text-primaryBlue">on</span>
          </h1>

          <div className="flex flex-wrap gap-6 justify-center">
            <motion.div
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(28, 77, 141, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/authenticate"
                className="px-12 py-5 bg-primaryBlue hover:bg-accentBlue text-white font-black uppercase text-xs tracking-[0.2em] transition-all shadow-[0_20px_40px_rgba(28,77,141,0.3)] inline-block font-work-sans"
                style={{ fontFamily: 'var(--font-work-sans), sans-serif' }}
              >
                Authenticate Now
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}