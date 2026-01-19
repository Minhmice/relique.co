"use client";

import { motion, Variants } from "framer-motion";
import { teamMembers } from "@/data/team.data";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function TeamSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-bgDark border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <span className="text-primaryBlue font-black text-[10px] sm:text-xs tracking-widest uppercase mb-3 sm:mb-4 block">Core Experts</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">Meet Our Team</h2>
          <div className="h-1 w-16 sm:w-20 bg-highlightIce mx-auto mt-4 sm:mt-6" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="bg-cardDark border border-borderDark p-6 sm:p-8 md:p-10 group transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-3 sm:p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="text-4xl sm:text-5xl md:text-6xl font-black italic">R</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-semibold mb-1 group-hover:text-highlightIce transition-colors">
                  {member.name}
                </h3>
                <p className="text-primaryBlue font-black text-[9px] sm:text-[10px] uppercase tracking-widest mb-2">{member.role}</p>
                <p className="text-white/40 text-[8px] sm:text-[9px] uppercase font-bold tracking-tight mb-4 sm:mb-6 leading-tight">{member.sub}</p>
                <p className="text-textSec text-xs sm:text-sm leading-relaxed">{member.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
