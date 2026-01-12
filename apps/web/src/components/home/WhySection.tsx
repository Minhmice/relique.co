"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function WhySection() {
  return (
    <section className="py-32 bg-bgDark overflow-hidden relative border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 md:order-1"
          >
            <div className="inline-block px-4 py-1 bg-primaryBlue/10 border border-primaryBlue/20 mb-6">
              <span className="text-primaryBlue font-black text-[10px] tracking-[0.3em] uppercase">Relique.co</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-tight mb-8">
              A standards-driven sports memorabilia platform built on{" "}
              <span className="text-highlightIce">trust, transparency, and long-term value.</span>
            </h2>
            <div className="flex items-center gap-8">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/authenticate"
                  className="px-10 py-4 bg-primaryBlue text-white font-black uppercase text-xs tracking-widest transition-colors shadow-2xl inline-block"
                >
                  Authenticate Now
                </Link>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-textSec">In Partnership with</span>
                <span className="text-lg font-black italic text-highlightIce">St.B AI</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="order-1 md:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-square bg-cardDark border border-white/10 p-12 flex items-center justify-center group">
              <div className="absolute inset-0 bg-primaryBlue/5 group-hover:bg-primaryBlue/10 transition-all" />
              <div className="text-7xl font-black italic tracking-tighter text-white flex flex-col items-center">
                <span>LOGO</span>
                <span className="text-primaryBlue">2</span>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-highlightIce pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
