"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ItemGalleryProps {
  images: string[];
  alt: string;
  className?: string;
}

export function ItemGallery({ images, alt, className }: ItemGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="relative w-full h-96 border bg-muted">
        {images[selectedIndex] && (
          <Image
            src={images[selectedIndex]}
            alt={`${alt} - Image ${selectedIndex + 1}`}
            fill
            className="object-cover"
          />
        )}
      </div>
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "relative w-full h-20 border bg-muted transition-opacity",
                selectedIndex === index
                  ? "opacity-100 border-primary"
                  : "opacity-60 hover:opacity-80"
              )}
            >
              <Image
                src={image}
                alt={`${alt} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

