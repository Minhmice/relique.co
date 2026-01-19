"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function DualBlocks() {
  return (
    <section className="flex flex-col md:flex-row min-h-[600px] overflow-hidden">
      {/* Verification Block */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "circOut" }}
        whileHover={{ flex: 1.1 }}
        className="flex-1 bg-navy relative p-12 md:p-24 flex flex-col justify-center border-r border-borderDark group overflow-hidden cursor-pointer"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/mock-images/verify.JPG"
            alt="Verification"
            fill
            className="object-cover"
            priority
          />
        </div>
        <Link href="/verify" className="absolute inset-0 z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40 pointer-events-none z-[1]" />
        <div className="relative z-10">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            className="text-highlightIce font-black text-6xl absolute -top-10 -left-10 select-none"
          >
            01
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-none">
            Items <br /> Verification
          </h2>
          <div className="inline-flex items-center gap-4 text-highlightIce font-black uppercase text-sm tracking-widest group-hover:gap-6 transition-all">
            Verify Now <span>→</span>
          </div>
        </div>
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.05, 0.08, 0.05] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute -bottom-20 -right-20 w-64 h-64 border-[40px] border-white rounded-full pointer-events-none"
        />
      </motion.div>

      {/* Consignment Block */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "circOut" }}
        whileHover={{ flex: 1.1 }}
        className="flex-1 bg-primaryBlue relative p-12 md:p-24 flex flex-col justify-center group overflow-hidden cursor-pointer"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/mock-images/cosign.JPG"
            alt="Consignment"
            fill
            className="object-cover"
            priority
          />
        </div>
        <Link href="/consign" className="absolute inset-0 z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40 pointer-events-none z-[1]" />
        <div className="relative z-10">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.3 }}
            className="text-white font-black text-6xl absolute -top-10 -left-10 select-none"
          >
            02
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-none">
            Asset <br /> Consignment
          </h2>
          <div className="inline-flex items-center gap-4 text-white font-black uppercase text-sm tracking-widest group-hover:gap-6 transition-all">
            Consign Now <span>→</span>
          </div>
        </div>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute -bottom-10 -right-10 w-48 h-48 bg-highlightIce/10 pointer-events-none"
        />
      </motion.div>
    </section>
  );
}
