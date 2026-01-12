"use client";

import { motion } from "framer-motion";

export function StrategicPartnerSection() {
  return (
    <section className="py-24 bg-navy/20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Strategic Partner
            </h2>
            <p className="text-textSec text-xl leading-relaxed mb-8">
              We are backed by <span className="text-white font-bold">ST.B</span>, providing unparalleled
              infrastructure and compliance for high-value physical assets. Together, we ensure every piece in our
              marketplace is secured, insured, and verified to institutional standards.
            </p>
            <div className="flex items-center gap-6">
              <div className="h-[2px] w-12 bg-primaryBlue" />
              <span className="text-xs font-black uppercase tracking-[0.3em]">Excellence Defined</span>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-72 h-72 bg-bgDark border-2 border-accentBlue rotate-3 flex items-center justify-center group overflow-hidden">
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
              />
              <span className="text-6xl font-black tracking-widest text-primaryBlue transition-transform group-hover:scale-110">
                ST.B
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

