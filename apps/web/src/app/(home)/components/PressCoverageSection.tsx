"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { fadeInUp, VIEWPORT_ONCE } from "@/lib/motion-variants";
import { PressArticleCard, PressArticleCardProps } from "@/components/wrappers/press/PressArticleCard";

export interface PressCoverageSectionProps {
  items: PressArticleCardProps[];
  eyebrow?: string;
  title?: string;
  accent?: string;
}

export function PressCoverageSection({
  items,
  eyebrow = "Press",
  title = "Trusted media coverage",
  accent = "about Relique",
}: PressCoverageSectionProps) {
  return (
    <section className="py-24 bg-bgDark border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="text-primaryBlue font-black uppercase text-[10px] tracking-[0.4em] mb-4 block">
            {eyebrow}
          </span>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            {title} <span className="text-primaryBlue">{accent}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <PressArticleCard key={`${item.publisher}-${item.title}`} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
