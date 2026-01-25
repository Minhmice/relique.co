"use client";

import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { PressArticle } from "@/data/press.data";

const FALLBACK_IMAGE = "/mock-images/consign.jpg";

export interface PressCoverageSectionProps {
  items: PressArticle[];
  eyebrow?: string;
  title?: string;
}

interface ArticleMeta {
  title: string | null;
  description: string | null;
  imageUrl: string | null;
  publishedAt: string | null;
  readingTime: string | null;
  publisher: string | null;
}

/**
 * Hook để fetch full article metadata từ API
 */
function useArticleMeta(items: PressArticle[]) {
  const [metadata, setMetadata] = useState<Record<string, ArticleMeta>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      const results: Record<string, ArticleMeta> = {};
      
      await Promise.all(
        items.map(async (item) => {
          try {
            const res = await fetch(`/api/article-meta?url=${encodeURIComponent(item.href)}`);
            const data = await res.json();
            
            if (!data.error) {
              results[item.href] = data;
            }
          } catch {
            // Ignore errors, will show loading state
          }
        })
      );
      
      setMetadata(results);
      setLoading(false);
    };

    fetchMetadata();
  }, [items]);

  return { metadata, loading };
}

/**
 * Format ISO date to readable format
 */
function formatDate(isoDate: string | null | undefined): string | null {
  if (!isoDate) return null;
  try {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

export function PressCoverageSection({
  items,
  eyebrow = "Editorial Insights",
  title = "Featured Post",
}: PressCoverageSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { metadata, loading } = useArticleMeta(items);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused, items.length]);

  const currentArticle = items[currentIndex];
  if (!currentArticle) return null;

  const isFeatured = currentArticle.tone === "featured";

  return (
    <section className="py-20 lg:py-24 bg-bgDark border-t border-white/5 relative overflow-hidden">
      {/* Background Decor - Hidden on mobile */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primaryBlue/5 -skew-x-12 translate-x-1/2 pointer-events-none hidden lg:block" />

      <div className="container mx-auto px-4 lg:px-6">
        {/* Header - Centered on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 lg:mb-12"
        >
          <span className="text-primaryBlue font-semibold uppercase text-[10px] lg:text-xs tracking-wider mb-2 lg:mb-3 block text-center lg:text-left">
            {eyebrow}
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-white text-center lg:text-left">
            {title}
          </h1>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="bg-cardDark border border-white/5 group overflow-hidden shadow-2xl relative"
        >
          {/* Grid: Stacked on mobile, Split on desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-[600px_1fr] gap-0">
            {/* Visual Column - Fixed aspect ratios */}
            <div className="relative aspect-[4/3] lg:aspect-[3/3] overflow-hidden bg-black border-b lg:border-b-0 border-white/5">
              <AnimatePresence mode="wait">
                {(() => {
                  const meta = metadata[currentArticle.href];
                  const imageSrc = meta?.imageUrl || FALLBACK_IMAGE;
                  return (
                    <motion.div
                      key={imageSrc}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: loading ? 0.5 : 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={imageSrc}
                        alt={meta?.title || "Article"}
                        fill
                        unoptimized={imageSrc.startsWith("http")}
                        className="object-cover grayscale brightness-50 lg:brightness-75 transition-all duration-700 group-hover:grayscale-0"
                      />
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
              {/* Gradient: Bottom on mobile, Right on desktop */}
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-bgDark/80 lg:from-bgDark/40 to-transparent pointer-events-none" />

              {/* Source Badge - Compact on mobile */}
              <div className="absolute top-3 left-3 lg:top-6 lg:left-6 px-3 py-1.5 lg:px-4 lg:py-2 bg-bgDark/80 backdrop-blur-md border border-white/10 z-10">
                <p className="text-[9px] lg:text-[10px] font-semibold uppercase tracking-wider text-primaryBlue">
                  Trusted Press
                </p>
              </div>
            </div>

            {/* Content Column - Matches image height on desktop */}
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center relative bg-bgDark min-h-[320px] lg:min-h-0">
              <AnimatePresence mode="wait">
                {(() => {
                  const meta = metadata[currentArticle.href];
                  const displayTitle = meta?.title || (loading ? "Loading..." : "Article");
                  const displayExcerpt = meta?.description;
                  const displayDate = formatDate(meta?.publishedAt);
                  const displayReadTime = meta?.readingTime;
                  const displayPublisher = meta?.publisher || (loading ? "..." : "Press");
                  
                  return (
                    <motion.div
                      key={currentIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="flex-grow flex flex-col justify-center mb-16 lg:mb-0"
                    >
                      {/* Badge & Publisher */}
                      <div className="flex items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
                        {isFeatured && (
                          <span className="px-2 py-0.5 lg:px-3 lg:py-1 bg-primaryBlue text-white text-[10px] lg:text-xs font-semibold">
                            Featured
                          </span>
                        )}
                        <span className="text-[11px] lg:text-xs font-medium text-white/50">
                          {displayPublisher}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight mb-4 lg:mb-6 text-white group-hover:text-highlightIce transition-colors">
                        {displayTitle}
                      </h3>

                      {/* Excerpt */}
                      {displayExcerpt && (
                        <p className="text-textSec text-sm lg:text-base leading-relaxed mb-6 lg:mb-8 line-clamp-3">
                          {displayExcerpt}
                        </p>
                      )}

                      {/* Metadata & CTA */}
                      <div className="space-y-4 lg:space-y-6 pt-4 lg:pt-6 border-t border-white/10">
                        <div className="flex flex-wrap gap-4 lg:gap-6 text-sm">
                          {displayDate && (
                            <div>
                              <p className="text-[10px] lg:text-xs text-white/40 mb-0.5 lg:mb-1">
                                Published
                              </p>
                              <p className="text-white text-xs lg:text-sm font-medium">
                                {displayDate}
                              </p>
                            </div>
                          )}
                          {displayReadTime && (
                            <div>
                              <p className="text-[10px] lg:text-xs text-white/40 mb-0.5 lg:mb-1">
                                Read Time
                              </p>
                              <p className="text-primaryBlue text-xs lg:text-sm font-medium">
                                {displayReadTime}
                              </p>
                            </div>
                          )}
                        </div>

                        <Link
                          href={currentArticle.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full lg:w-fit inline-flex items-center justify-center lg:justify-start gap-2 px-6 py-3 bg-primaryBlue text-white text-xs lg:text-sm font-semibold transition-all hover:bg-primaryBlue/80"
                        >
                          Read Full Article
                          <span>→</span>
                        </Link>
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>

              {/* Navigation Controls - Smaller on mobile */}
              <NavControls
                currentIndex={currentIndex}
                total={items.length}
                onPrev={prevSlide}
                onNext={nextSlide}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function NavControls({
  currentIndex,
  total,
  onPrev,
  onNext,
}: {
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="absolute bottom-0 right-0 flex border-t border-l border-white/10">
      <div className="px-3 lg:px-6 flex items-center border-r border-white/10 bg-cardDark/50">
        <span className="text-xs lg:text-sm font-medium text-primaryBlue">
          {String(currentIndex + 1).padStart(2, "0")}
        </span>
        <span className="mx-1 lg:mx-2 text-white/20">/</span>
        <span className="text-xs lg:text-sm font-medium text-white/40">
          {String(total).padStart(2, "0")}
        </span>
      </div>
      <button
        onClick={onPrev}
        className="w-12 h-12 lg:w-14 lg:h-14 bg-cardDark hover:bg-primaryBlue transition-all flex items-center justify-center border-r border-white/10 group/btn"
      >
        <span className="text-base lg:text-lg text-white group-hover/btn:-translate-x-0.5 transition-transform">
          ←
        </span>
      </button>
      <button
        onClick={onNext}
        className="w-12 h-12 lg:w-14 lg:h-14 bg-cardDark hover:bg-primaryBlue transition-all flex items-center justify-center group/btn"
      >
        <span className="text-base lg:text-lg text-white group-hover/btn:translate-x-0.5 transition-transform">
          →
        </span>
      </button>
    </div>
  );
}
