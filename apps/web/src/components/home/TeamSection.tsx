"use client";

import { motion, Variants } from "framer-motion";

const TEAM = [
  {
    id: "1",
    name: "Do Tuan Kiet",
    role: "Co-founder & Head of SEA Operations",
    sub: "Financial Analyst & Business Consultant at Wander Wealth Partner",
    description: "Leads operations across Southeast Asia. Bringing extensive experience in capital management and risk assessment to Relique's strategies.",
  },
  {
    id: "2",
    name: "Vu Truong Son",
    role: "St. B Ecosystem Founder & Director",
    sub: "Msc Applied A.I at SWISS UMEF University",
    description: "Founder of St. B Sporting Ecosystem. Powers Relique's AI authentication tech with a Master's in Applied AI and international finance expertise.",
  },
  {
    id: "3",
    name: "Doan Trung Phong",
    role: "Head of St.B AI",
    sub: "AI Engineer at VNPAY; Ex Manager at Thang Long University",
    description: "Invaluable technical expertise in Deep Learning. Previously mind behind transaction fraud detectors for \"big 4\" commercial banks.",
  },
  {
    id: "4",
    name: "Trinh Duc Tan",
    role: "AI Engineer",
    sub: "AI Engineer at TDMK Ltd.",
    description: "Key technical contributor focusing on multi-layered signature comparison and pattern variance assessment.",
  },
  {
    id: "5",
    name: "Nguyen Huy Manh",
    role: "AI Engineer",
    sub: "AI Engineer at Pixta Vietnam",
    description: "Expert in computer vision integration for forensic material analysis and data-driven authenticity metrics.",
  },
];

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
          {TEAM.map((member) => (
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
                <p className="text-white/40 text-[9px] uppercase font-bold tracking-tight mb-6 leading-tight">{member.sub}</p>
                <p className="text-textSec text-sm leading-relaxed">{member.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
