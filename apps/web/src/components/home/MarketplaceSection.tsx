"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

enum Status {
  QUALIFIED = "Qualified",
  INCONCLUSIVE = "Inconclusive",
  DISQUALIFIED = "Disqualified",
}

interface MarketplaceItem {
  id: string;
  name: string;
  athlete: string;
  year: string;
  category: string;
  image: string;
  status: Status;
}

const MOCK_ITEMS: MarketplaceItem[] = [
  {
    id: "1",
    name: "Championship Jersey",
    athlete: "Michael Jordan",
    year: "1998",
    category: "Basketball",
    status: Status.QUALIFIED,
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    name: "Match Worn Boots",
    athlete: "Lionel Messi",
    year: "2022",
    category: "Football",
    status: Status.QUALIFIED,
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    name: "Signed Baseball",
    athlete: "Shohei Ohtani",
    year: "2023",
    category: "Baseball",
    status: Status.INCONCLUSIVE,
    image: "https://images.unsplash.com/photo-1516731415730-0c607149933a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "4",
    name: "Race Helmet",
    athlete: "Lewis Hamilton",
    year: "2021",
    category: "F1",
    status: Status.QUALIFIED,
    image: "https://picsum.photos/800/800?random=market4",
  },
  {
    id: "5",
    name: "Grand Slam Racket",
    athlete: "Roger Federer",
    year: "2017",
    category: "Tennis",
    status: Status.QUALIFIED,
    image: "https://picsum.photos/800/800?random=market5",
  },
  {
    id: "6",
    name: "Limited Edition Bat",
    athlete: "Virat Kohli",
    year: "2019",
    category: "Cricket",
    status: Status.QUALIFIED,
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=800",
  },
];

export function MarketplaceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const x = useMotionValue(0);

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current) {
        const contentWidth = containerRef.current.scrollWidth;
        const viewWidth = containerRef.current.offsetWidth;
        const padding = window.innerWidth > 768 ? (window.innerWidth - 1280) / 2 : 24;
        setConstraints({
          left: -(contentWidth - viewWidth + padding),
          right: padding > 0 ? padding : 0,
        });
      }
    };

    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  const getStatusColor = (status: Status) => {
    switch (status) {
      case Status.QUALIFIED:
        return "text-green-400 bg-green-400/10";
      case Status.INCONCLUSIVE:
        return "text-amber-400 bg-amber-400/10";
      case Status.DISQUALIFIED:
        return "text-red-400 bg-red-400/10";
    }
  };

  const scrollProgress = useTransform(
    x,
    constraints.left ? [0, constraints.left] : [0, -1000],
    ["0%", "300%"]
  );

  return (
    <section id="marketplace" className="py-24 bg-bgDark overflow-hidden select-none">
      <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primaryBlue font-black uppercase text-xs tracking-widest mb-2 block">
            Curated Listings
          </span>
          <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
            Consigned Marketplace
          </h2>
        </motion.div>
        <div className="hidden md:flex flex-col items-end gap-2">
          <div className="flex gap-2 items-center mb-1">
            <div className="w-8 h-[1px] bg-highlightIce/30" />
            <span className="text-[10px] text-highlightIce/50 font-black uppercase tracking-widest">
              Swipe or Drag
            </span>
          </div>
          <Link
            href="/marketplace"
            className="px-6 py-2 border border-borderDark hover:bg-highlightIce hover:text-navy text-xs font-black uppercase tracking-widest transition-all clip-path-slant inline-block"
          >
            Explore All
          </Link>
        </div>
      </div>

      <div className="relative overflow-visible" ref={containerRef}>
        <motion.div
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.08}
          dragTransition={{ power: 0.2, timeConstant: 200 }}
          style={{ x }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
          className="flex gap-8 px-6 md:px-[calc((100vw-1280px)/2)] pb-12 cursor-grab active:cursor-grabbing touch-pan-y"
        >
          {MOCK_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={!isDragging ? { y: -12, scale: 1.02 } : {}}
              className="flex-none w-[300px] md:w-[420px] bg-cardDark border border-borderDark/60 relative group"
            >
              <div className="relative h-[450px] md:h-[580px] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={800}
                  height={800}
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110 pointer-events-none"
                  draggable={false}
                />

                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-bgDark/90" />

                <div className="absolute top-6 left-6 z-10">
                  <div className="bg-navy/80 backdrop-blur-md border border-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    {item.category}
                  </div>
                </div>

                <div className="absolute top-6 right-6 z-10">
                  <span
                    className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-xl ${getStatusColor(item.status)}`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="p-8 relative">
                <div className="absolute -top-12 left-0 w-full h-12 bg-gradient-to-t from-cardDark to-transparent" />

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[11px] font-black tracking-[0.3em] uppercase text-primaryBlue mb-2">
                      {item.athlete}
                    </p>
                    <h3 className="text-2xl font-black uppercase italic leading-tight group-hover:text-highlightIce transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <span className="text-sm font-bold text-highlightIce/40">{item.year}</span>
                </div>

                <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                  <div className="flex gap-1">
                    <div className="w-1 h-4 bg-primaryBlue" />
                    <div className="w-1 h-4 bg-accentBlue" />
                  </div>
                  <motion.span
                    className="text-white font-black text-xs tracking-[0.2em] uppercase flex items-center gap-2"
                    whileHover={{ x: 5 }}
                  >
                    View History <span className="text-primaryBlue">▶</span>
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-6 mt-4 flex items-center gap-4">
        <div className="h-[1px] flex-grow bg-white/10 relative overflow-hidden">
          <motion.div className="absolute top-0 left-0 h-full bg-primaryBlue w-1/4" style={{ x: scrollProgress }} />
        </div>
        <span className="text-[10px] font-black text-textSec uppercase tracking-widest">End of Collection</span>
      </div>
    </section>
  );
}

