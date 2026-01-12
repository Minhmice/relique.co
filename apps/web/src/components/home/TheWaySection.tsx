"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export function TheWaySection() {
  const router = useRouter();

  const cards = [
    {
      id: "4.1",
      title: "Mission & Vision",
      sub: "Everything you need to know about our story from capital to collectible markets.",
      href: "/about#who-we-are",
      size: "col-span-12 md:col-span-6",
      bg: "bg-navy/40",
    },
    {
      id: "4.2",
      title: "Investment Vehicle",
      sub: "One to appreciates, but also one that appreciates.",
      href: "/about#investment-vehicle",
      size: "col-span-12 md:col-span-6",
      bg: "bg-primaryBlue/20",
    },
    {
      id: "4.3",
      title: "A Question of Trust",
      sub: "And an AI-powered answer.",
      href: "/about#question-of-trust",
      size: "col-span-12",
      bg: "bg-cardDark",
      highlight: true,
    },
  ];

  const handleCardClick = (href: string) => {
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
    <section id="about" className="py-24 bg-bgDark border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-primaryBlue font-black uppercase text-[10px] tracking-[0.4em] mb-4 block">
            Foundational Core
          </span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 leading-none">
            The Way <span className="text-primaryBlue">of Relique.co</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-12 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              onClick={() => handleCardClick(card.href)}
              className={`${card.size} p-12 border border-borderDark ${card.bg} group cursor-pointer relative overflow-hidden flex flex-col justify-end min-h-[350px] transition-all hover:border-highlightIce/30 shadow-xl`}
            >
              <div className="absolute top-8 left-8">
                <span className="text-primaryBlue/40 font-bold text-6xl tracking-tight select-none group-hover:text-primaryBlue/60 transition-colors">
                  {card.id}
                </span>
              </div>
              <div className="relative z-10">
                <h3 className="text-4xl font-semibold mb-4 leading-none group-hover:text-highlightIce transition-colors">
                  {card.title}
                </h3>
                <p className="text-textSec mb-8 text-lg leading-tight max-w-sm">{card.sub}</p>
                <div className="inline-flex items-center gap-4 text-highlightIce font-black uppercase text-[10px] tracking-widest">
                  Explore Insights <span>→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
