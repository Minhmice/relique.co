"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { payloadContentService } from "@/lib/services/payloadContentService";

export function TestimonialsSection() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const testimonials = await payloadContentService.getTestimonials();
        setReviews(testimonials);
      } catch (error) {
        console.error("Failed to load testimonials:", error);
        // Fallback to empty array
        setReviews([]);
      }
    };
    loadTestimonials();
  }, []);

  if (reviews.length === 0) {
    return null;
  }
  return (
    <section className="py-32 bg-bgDark relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="text-primaryBlue font-black text-[10px] tracking-[0.4em] uppercase mb-4 block">
            Market Sentiment
          </span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 leading-none">
            Voices of <span className="text-primaryBlue">Authenticity</span>
          </h2>
          <div className="h-1 w-20 bg-highlightIce mx-auto mt-8 shadow-[0_0_20px_rgba(189,232,245,0.3)]" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              whileHover={{ y: -8, borderColor: "rgba(28, 77, 141, 0.5)" }}
              className="bg-cardDark border border-white/5 p-10 relative group transition-all"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <span key={i} className="text-primaryBlue text-xs">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-lg font-medium text-textSec mb-8 leading-relaxed italic">&quot;{review.quote}&quot;</p>
              <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="font-black uppercase text-xs text-white mb-1">{review.name}</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{review.role}</p>
                </div>
                {review.verified && (
                  <div className="w-8 h-8 rounded-full bg-primaryBlue/10 flex items-center justify-center border border-primaryBlue/20">
                    <span className="text-[8px] font-black text-primaryBlue">V</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

