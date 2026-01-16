"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { payloadContentService } from "@/lib/services/payloadContentService";

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
  const [team, setTeam] = useState<any[]>([]);

  useEffect(() => {
    const loadTeam = async () => {
      try {
        const members = await payloadContentService.getTeamMembers();
        setTeam(members);
      } catch (error) {
        console.error("Failed to load team:", error);
        setTeam([]);
      }
    };
    loadTeam();
  }, []);

  if (team.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-bgDark border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-primaryBlue font-black text-xs tracking-widest uppercase mb-4 block">Core Experts</span>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">Meet Our Team</h2>
          <div className="h-1 w-20 bg-highlightIce mx-auto mt-6" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {team.map((member) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="bg-cardDark border border-borderDark p-10 group transition-all duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="text-6xl font-black italic">R</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-1 group-hover:text-highlightIce transition-colors">
                  {member.name}
                </h3>
                <p className="text-primaryBlue font-black text-[10px] uppercase tracking-widest mb-2">{member.role}</p>
                {member.subtitle && (
                  <p className="text-white/40 text-[9px] uppercase font-bold tracking-tight mb-6 leading-tight">{member.subtitle}</p>
                )}
                <p className="text-textSec text-sm leading-relaxed">{member.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
