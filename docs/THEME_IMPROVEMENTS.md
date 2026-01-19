# Theme System Improvements Roadmap

**Version:** 1.0  
**Last Updated:** January 19, 2026  
**Status:** Planning

Tài liệu này outline các cải tiến được đề xuất cho Relique.co design system, được phân loại theo priority và timeline.

---

## 📋 Mục lục

1. [Overview](#1-overview)
2. [Quick Wins (Phase 1)](#2-quick-wins-phase-1)
3. [Performance Optimizations (Phase 2)](#3-performance-optimizations-phase-2)
4. [Accessibility Enhancements (Phase 3)](#4-accessibility-enhancements-phase-3)
5. [Developer Experience (Phase 4)](#5-developer-experience-phase-4)
6. [Design System Evolution (Phase 5)](#6-design-system-evolution-phase-5)
7. [Implementation Checklist](#7-implementation-checklist)

---

## 1. Overview

### Mục tiêu

- **Standardization**: Giảm code duplication, tăng consistency
- **Performance**: Improve page load và animation performance
- **Accessibility**: WCAG 2.1 AA compliance
- **DX**: Faster component development, better documentation
- **Scalability**: Prepare cho future features và team growth

### Metrics

**Current State:**
- Animation variants: ~15 duplicated patterns
- Typography: Ad-hoc inline styles
- Status colors: 3-4 implementations of same logic
- Component creation time: ~30 minutes (với boilerplate)

**Target State:**
- Animation variants: Centralized library (reduce duplication 70%)
- Typography: Utility classes (consistent everywhere)
- Status colors: Single source of truth
- Component creation time: ~10 minutes (với templates)

---

## 2. Quick Wins (Phase 1)

**Timeline:** 1-2 weeks  
**Priority:** ⭐⭐⭐ HIGH  
**Effort:** Low-Medium  
**Impact:** High

### 2.1 Motion Variants Library

**Problem:** Animation variants duplicated across 15+ components

**Solution:** Centralized motion library

**File:** `apps/web/src/lib/motion-variants.ts`

```typescript
import type { Variants } from "framer-motion";

/**
 * Premium easing for luxury feel
 */
export const PREMIUM_EASING = [0.16, 1, 0.3, 1] as const;

/**
 * Fade in from bottom with upward motion
 */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: PREMIUM_EASING }
  }
};

/**
 * Slide in from left
 */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

/**
 * Slide in from right
 */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

/**
 * Scale and fade in
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: PREMIUM_EASING }
  }
};

/**
 * Container for staggered children
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

/**
 * Child item for stagger effect
 */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

/**
 * Hover lift effect
 */
export const hoverLift = {
  rest: { y: 0 },
  hover: { y: -8, transition: { duration: 0.3 } }
};

/**
 * Standard viewport config
 */
export const VIEWPORT_ONCE = { once: true };
export const VIEWPORT_EARLY = { once: true, margin: "-100px" };
```

**Migration Example:**

```tsx
// Before
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
>

// After
import { fadeInUp, VIEWPORT_ONCE } from "@/lib/motion-variants";

<motion.div
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={VIEWPORT_ONCE}
>
```

**Benefits:**
- Giảm 70% code duplication
- Consistent animations across site
- Easier to update globally
- Better IntelliSense/autocomplete

**Effort:** 2-3 hours
**Files affected:** ~15 components

---

### 2.2 Typography Utility Classes

**Problem:** Inconsistent typography patterns, inline styles

**Solution:** Extend `globals.css` với semantic typography classes

**File:** `apps/web/src/app/globals.css` (add to existing)

```css
/* ========================================
   Display Typography
   ======================================== */

.text-display-hero {
  @apply text-5xl md:text-[80px] lg:text-[120px] font-medium tracking-tight leading-[0.85];
  font-family: "Times New Roman", Times, serif;
}

.text-display-section {
  @apply text-4xl md:text-6xl font-bold tracking-tight;
}

.text-display-subsection {
  @apply text-3xl md:text-5xl font-semibold tracking-tight;
}

/* ========================================
   Card Typography
   ======================================== */

.text-card-title {
  @apply text-2xl font-semibold;
}

.text-card-subtitle {
  @apply text-base text-textSec;
}

/* ========================================
   Metadata Typography
   ======================================== */

.text-metadata {
  @apply text-[10px] font-black uppercase tracking-[0.4em];
}

.text-metadata-sm {
  @apply text-[9px] font-black uppercase tracking-[0.3em];
}

.text-metadata-primary {
  @apply text-metadata text-primaryBlue;
}

.text-metadata-ice {
  @apply text-metadata text-highlightIce;
}

/* ========================================
   Interactive Typography
   ======================================== */

.text-link-arrow {
  @apply text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2;
}

.text-button-primary {
  @apply text-xs font-black uppercase tracking-[0.2em];
}

/* ========================================
   Accents
   ======================================== */

.text-accent-blue {
  @apply text-primaryBlue;
}

.text-accent-ice {
  @apply text-highlightIce;
}
```

**Usage Example:**

```tsx
// Before
<h2 className="text-4xl md:text-6xl font-bold tracking-tight">
  Section <span className="text-primaryBlue">Title</span>
</h2>

<span className="text-[10px] font-black uppercase tracking-[0.4em] text-primaryBlue">
  Category
</span>

// After
<h2 className="text-display-section">
  Section <span className="text-accent-blue">Title</span>
</h2>

<span className="text-metadata-primary">
  Category
</span>
```

**Benefits:**
- Consistent typography everywhere
- Easier to maintain (change once, update everywhere)
- Shorter class names
- Self-documenting

**Effort:** 2 hours
**Files affected:** ~30 components

---

### 2.3 Status Style Utility

**Problem:** Status color logic duplicated in 4+ components

**Solution:** Centralized status utility function

**File:** `apps/web/src/lib/theme-utils.ts`

```typescript
/**
 * Get CSS classes for status badges
 */
export function getStatusClasses(
  status: "qualified" | "inconclusive" | "disqualified" | string
): string {
  const statusMap = {
    qualified: "bg-green-600 text-white border-0",
    inconclusive: "bg-amber-600 text-white border-0",
    disqualified: "bg-red-600 text-white border-0",
  };
  
  return statusMap[status as keyof typeof statusMap] || "bg-muted text-muted-foreground";
}

/**
 * Get status badge component
 */
export function getStatusBadge(
  status: "qualified" | "inconclusive" | "disqualified" | string
) {
  const labels = {
    qualified: "Qualified",
    inconclusive: "Inconclusive",
    disqualified: "Disqualified",
  };
  
  return {
    className: getStatusClasses(status),
    label: labels[status as keyof typeof labels] || status,
  };
}

/**
 * Get status color for timeline dots, etc.
 */
export function getStatusColor(
  status: "qualified" | "inconclusive" | "disqualified" | string
): string {
  const colorMap = {
    qualified: "border-green-500 bg-green-500",
    inconclusive: "border-amber-500 bg-amber-500",
    disqualified: "border-red-500 bg-red-500",
  };
  
  return colorMap[status as keyof typeof colorMap] || "border-muted bg-muted";
}

/**
 * Get status explanation text
 */
export function getStatusExplanation(status: string): string {
  const explanations = {
    qualified: "This item has been verified with high confidence. Our AI analysis indicates strong authenticity markers.",
    inconclusive: "This item requires additional verification. Some authenticity markers are present but more information is needed.",
    disqualified: "This item did not pass our authentication process. Authenticity markers were not sufficient.",
  };
  
  return explanations[status as keyof typeof explanations] || "Status unknown.";
}
```

**Usage Example:**

```tsx
// Before
function getStatusColor(status: Status) {
  switch (status) {
    case Status.QUALIFIED:
      return "text-green-400 bg-green-400/10";
    case Status.INCONCLUSIVE:
      return "text-amber-400 bg-amber-400/10";
    // ...
  }
}

// After
import { getStatusClasses, getStatusBadge } from "@/lib/theme-utils";

<Badge className={getStatusClasses(item.status)}>
  {getStatusBadge(item.status).label}
</Badge>
```

**Benefits:**
- Single source of truth
- Consistent status display
- Easy to add new statuses
- TypeScript autocomplete

**Effort:** 1 hour
**Files affected:** 5-6 components

---

### 2.4 Viewport Configuration Constants

**Problem:** Repeated viewport configs

**Solution:** Export constants từ motion-variants

```typescript
// In motion-variants.ts
export const VIEWPORT_ONCE = { once: true };
export const VIEWPORT_EARLY = { once: true, margin: "-100px" };
export const VIEWPORT_LATE = { once: true, margin: "-50px" };
```

**Usage:**
```tsx
import { VIEWPORT_ONCE } from "@/lib/motion-variants";

<motion.div viewport={VIEWPORT_ONCE}>
```

**Effort:** 15 minutes

---

## 3. Performance Optimizations (Phase 2)

**Timeline:** 2-3 weeks  
**Priority:** ⭐⭐ MEDIUM-HIGH  
**Effort:** Medium  
**Impact:** Medium-High

### 3.1 Image Optimization Strategy

**Current Issues:**
- No blur placeholders
- Inconsistent `priority` usage
- Missing `sizes` attribute
- No responsive image strategy

**Solutions:**

#### A. Blur Data URLs

```typescript
// apps/web/src/lib/image-utils.ts

/**
 * Generate blur data URL for placeholder
 */
export function generateBlurDataURL(
  width: number = 10,
  height: number = 10,
  color: string = "#0A0A0A"
): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <filter id="blur">
        <feGaussianBlur stdDeviation="10"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#blur)" fill="${color}"/>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

/**
 * Default blur placeholder (dark)
 */
export const DEFAULT_BLUR_DATA_URL = generateBlurDataURL(10, 10, "#0A0A0A");
```

**Usage:**
```tsx
import { DEFAULT_BLUR_DATA_URL } from "@/lib/image-utils";

<Image
  src={item.image}
  alt={item.title}
  placeholder="blur"
  blurDataURL={DEFAULT_BLUR_DATA_URL}
/>
```

#### B. Responsive Images với Sizes

```tsx
// Hero images
<Image
  src={hero}
  alt="Hero"
  sizes="100vw"
  priority
/>

// Marketplace cards (3 cols on desktop)
<Image
  src={item.image}
  alt={item.title}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  loading="lazy"
/>

// Full-width feature images
<Image
  src={feature}
  alt="Feature"
  sizes="(max-width: 1280px) 100vw, 1280px"
/>
```

#### C. Priority Guidelines

**ADD `priority` cho:**
- Hero images (above fold)
- First 3 marketplace cards on homepage
- Logo in header

**USE `loading="lazy"` cho:**
- All other images
- Images below fold
- Carousel images (except first)

**Effort:** 3-4 hours
**Expected Impact:** 
- Lighthouse score: +10-15 points
- LCP improvement: -500ms to -1s

---

### 3.2 Code Splitting

**Current Issues:**
- Heavy components load upfront
- No dynamic imports
- Large bundle size

**Solutions:**

#### A. Dynamic Component Imports

```tsx
// apps/web/src/components/home/MarketplaceSection.tsx
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load heavy drag carousel
const MarketplaceCarousel = dynamic(
  () => import("./MarketplaceCarousel").then(mod => ({ default: mod.MarketplaceCarousel })),
  {
    loading: () => <MarketplaceCarouselSkeleton />,
    ssr: false // Client-only (uses drag events)
  }
);

// Skeleton component
function MarketplaceCarouselSkeleton() {
  return (
    <div className="flex gap-8 px-6">
      {[1, 2, 3].map(i => (
        <Skeleton key={i} className="w-[420px] h-[580px]" />
      ))}
    </div>
  );
}
```

#### B. Route-based Code Splitting

```tsx
// app/marketplace/page.tsx
import dynamic from "next/dynamic";

const AdvancedFilters = dynamic(() => import("@/components/marketplace/AdvancedFilters"));
const CompareDrawer = dynamic(() => import("@/components/marketplace/CompareDrawer"));
```

**Targets for code splitting:**
- MarketplaceSection carousel (drag interactions)
- CompareDrawer (heavy table)
- AdvancedFilters (many form fields)
- Charts/graphs (if added later)

**Effort:** 2-3 hours
**Expected Impact:**
- Initial bundle: -100-200 KB
- Page load: -300-500ms

---

### 3.3 Reduced Motion Support

**Current Issue:** No respect for `prefers-reduced-motion`

**Solution:** Custom hook + conditional animations

```typescript
// apps/web/src/hooks/useReducedMotion.ts
import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return prefersReducedMotion;
}
```

**Usage:**
```tsx
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeInUp } from "@/lib/motion-variants";

function MyComponent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : fadeInUp}
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
    >
      Content
    </motion.div>
  );
}
```

**Alternative:** Global wrapper

```tsx
// lib/motion-variants.ts
export function createVariants(variants: Variants, options?: { respectReducedMotion?: boolean }) {
  if (options?.respectReducedMotion) {
    // Return static variants if reduced motion
    // Implementation depends on approach
  }
  return variants;
}
```

**Effort:** 2 hours
**Impact:** Accessibility improvement, better UX for motion-sensitive users

---

### 3.4 Animation Performance Audit

**Tasks:**
1. Replace `width`/`height` animations với `scale`
2. Use `transform` và `opacity` only (GPU-accelerated)
3. Add `will-change` cho heavy animations
4. Reduce simultaneous animations (use stagger)

**Example:**

```tsx
// BAD - causes reflow
<motion.div animate={{ width: 100, height: 100 }}>

// GOOD - GPU accelerated
<motion.div animate={{ scale: 1.2 }}>

// Add will-change for heavy animations
<motion.div style={{ willChange: "transform" }}>
```

**Effort:** 3-4 hours
**Impact:** Smoother animations, better frame rate

---

## 4. Accessibility Enhancements (Phase 3)

**Timeline:** 1-2 weeks  
**Priority:** ⭐⭐⭐ HIGH  
**Effort:** Medium  
**Impact:** High (Compliance + UX)

### 4.1 Focus Indicators

**Current Issue:** Limited focus styles

**Solution:** Enhanced focus ring system

```css
/* apps/web/src/app/globals.css */

/* ========================================
   Focus Indicators
   ======================================== */

.focus-ring-primary {
  @apply focus-visible:outline-none 
         focus-visible:ring-2 
         focus-visible:ring-primaryBlue 
         focus-visible:ring-offset-2 
         focus-visible:ring-offset-bgDark;
}

.focus-ring-ice {
  @apply focus-visible:outline-none 
         focus-visible:ring-2 
         focus-visible:ring-highlightIce 
         focus-visible:ring-offset-2 
         focus-visible:ring-offset-bgDark;
}

.focus-ring-white {
  @apply focus-visible:outline-none 
         focus-visible:ring-2 
         focus-visible:ring-white 
         focus-visible:ring-offset-2 
         focus-visible:ring-offset-bgDark;
}

/* Enhanced focus for interactive cards */
.focus-card {
  @apply focus-visible:outline-none 
         focus-visible:ring-4 
         focus-visible:ring-primaryBlue/50 
         focus-visible:ring-offset-2 
         focus-visible:ring-offset-bgDark;
}
```

**Application:**
```tsx
<button className="focus-ring-primary">
<Link href="/verify" className="focus-card">
<input className="focus-ring-white" />
```

**Checklist:**
- [ ] All buttons have visible focus
- [ ] All links have focus indicators
- [ ] Cards/interactive elements have focus
- [ ] Focus visible on keyboard nav, not mouse clicks (`focus-visible`)

**Effort:** 2-3 hours

---

### 4.2 Skip to Content Link

**Solution:** Add skip link to layout

```tsx
// apps/web/src/app/layout.tsx

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {/* Skip to main content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-primaryBlue focus:text-white focus:font-black focus:uppercase focus:text-xs focus:tracking-widest focus:shadow-2xl"
        >
          Skip to main content
        </a>

        <Header />
        
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
```

**Effort:** 30 minutes

---

### 4.3 ARIA Labels và Roles

**Checklist:**

#### Buttons với Icons Only
```tsx
<button 
  aria-label="Add to favorites"
  className="focus-ring-primary"
>
  <HeartIcon aria-hidden="true" />
</button>
```

#### Status Badges
```tsx
<Badge 
  className={getStatusClasses(status)}
  role="status"
  aria-label={`Authentication status: ${status}`}
>
  {status}
</Badge>
```

#### Loading States
```tsx
<div role="status" aria-live="polite" aria-busy="true">
  <Spinner />
  <span className="sr-only">Loading results...</span>
</div>
```

#### Form Errors
```tsx
<input 
  aria-invalid={!!error}
  aria-describedby={error ? `${id}-error` : undefined}
/>
{error && (
  <p id={`${id}-error`} role="alert" className="text-red-500">
    {error}
  </p>
)}
```

**Effort:** 4-5 hours

---

### 4.4 Keyboard Navigation

**Enhancements:**

#### Drag Carousel Keyboard Support
```tsx
// MarketplaceSection.tsx
function handleKeyDown(e: React.KeyboardEvent) {
  if (e.key === "ArrowLeft") {
    // Scroll left
    controls.start({ x: x.get() + 300 });
  } else if (e.key === "ArrowRight") {
    // Scroll right
    controls.start({ x: x.get() - 300 });
  }
}

<div 
  onKeyDown={handleKeyDown}
  tabIndex={0}
  role="region"
  aria-label="Marketplace items carousel"
>
```

#### Modal Focus Trap
```tsx
import { FocusTrap } from "@headlessui/react";

<Dialog>
  <FocusTrap>
    <DialogContent>
      {/* Content */}
    </DialogContent>
  </FocusTrap>
</Dialog>
```

**Effort:** 3-4 hours

---

### 4.5 Color Contrast Audit

**Tool:** Use Lighthouse + manual check

**Requirements:** WCAG 2.1 AA
- Normal text: 4.5:1
- Large text (18px+): 3:1
- UI components: 3:1

**Known Issues to Fix:**
- `text-white/40` on dark backgrounds (likely fails)
- `text-textSec` (#B3B3B3) on `bg-cardDark` (#121212)

**Solutions:**
```css
/* Increase contrast for tertiary text */
--relique-text-tertiary: #CCCCCC; /* Instead of white/40 */

.text-tertiary {
  @apply text-[#CCCCCC];
}
```

**Effort:** 2 hours

---

## 5. Developer Experience (Phase 4)

**Timeline:** 2-4 weeks  
**Priority:** ⭐ MEDIUM  
**Effort:** High  
**Impact:** Medium (Long-term)

### 5.1 Component Generator CLI

**Tool:** plop.js or custom script

```bash
pnpm create-component MySectionName --type=section
pnpm create-component MyCard --type=card
```

**Templates:**

#### Section Template
```tsx
"use client";

import { motion } from "framer-motion";
import { fadeInUp, VIEWPORT_ONCE } from "@/lib/motion-variants";

export function {{name}}() {
  return (
    <section className="py-24 bg-bgDark border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <span className="text-metadata-primary mb-4 block">
            Category
          </span>
          <h2 className="text-display-section mb-8">
            {{name}}
          </h2>
          
          {/* Content */}
        </motion.div>
      </div>
    </section>
  );
}
```

**plopfile.js:**
```javascript
module.exports = function (plop) {
  plop.setGenerator("component", {
    description: "Create a new component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name (PascalCase):",
      },
      {
        type: "list",
        name: "type",
        message: "Component type:",
        choices: ["section", "card", "form", "layout", "ui"],
      },
    ],
    actions: [
      {
        type: "add",
        path: "apps/web/src/components/{{kebabCase name}}.tsx",
        templateFile: "plop-templates/{{type}}.tsx.hbs",
      },
    ],
  });
};
```

**Effort:** 6-8 hours
**Benefit:** Component creation time: 30 min → 5 min

---

### 5.2 Storybook Integration

**Setup:**

```bash
pnpm add -D -w @storybook/react @storybook/nextjs storybook
pnpm storybook init
```

**Config:** `.storybook/preview.ts`

```typescript
import type { Preview } from "@storybook/react";
import "../apps/web/src/app/globals.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#0A0A0A" },
        { name: "card", value: "#121212" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
```

**Example Story:**

```tsx
// packages/ui/src/modules/bento-grid.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { BentoGrid, BentoTile } from "./bento-grid";

const meta: Meta<typeof BentoGrid> = {
  title: "Modules/BentoGrid",
  component: BentoGrid,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof BentoGrid>;

export const Default: Story = {
  render: () => (
    <BentoGrid>
      <BentoTile colSpan={6}>Half</BentoTile>
      <BentoTile colSpan={6}>Half</BentoTile>
      <BentoTile colSpan={12}>Full</BentoTile>
    </BentoGrid>
  ),
};
```

**Effort:** 12-16 hours (setup + document 20-30 components)
**Benefit:** Visual component documentation, easier testing

---

### 5.3 Theme Tokens as TypeScript

**Export CSS variables as TypeScript constants**

```typescript
// apps/web/src/lib/theme-tokens.ts

/**
 * Design tokens exported from CSS variables
 * Auto-generated - do not edit manually
 */

export const colors = {
  // Brand
  navy: "#0F2854",
  primaryBlue: "#1C4D8D",
  accentBlue: "#498BC4",
  highlightIce: "#BDE8F5",
  
  // Surfaces
  bgDark: "#0A0A0A",
  cardDark: "#121212",
  borderDark: "#333333",
  
  // Text
  textPrimary: "#FFFFFF",
  textSecondary: "#B3B3B3",
} as const;

export const spacing = {
  section: {
    sm: "40px",
    md: "56px",
    lg: "96px",
  },
  container: {
    padding: "24px",
  },
} as const;

export const typography = {
  fontFamily: {
    sans: "var(--font-work-sans), sans-serif",
    serif: '"Times New Roman", Times, serif',
  },
  
  fontSize: {
    hero: {
      mobile: "80px",
      desktop: "120px",
    },
    section: {
      mobile: "48px",
      desktop: "72px",
    },
    metadata: "10px",
  },
} as const;

// Type exports
export type Color = keyof typeof colors;
export type SpacingKey = keyof typeof spacing;
```

**Usage:**

```tsx
import { colors } from "@/lib/theme-tokens";

<div style={{ backgroundColor: colors.primaryBlue }}>
```

**Benefit:** Type-safe theme access, autocomplete

**Effort:** 2-3 hours

---

### 5.4 VSCode Snippets

**File:** `.vscode/relique.code-snippets`

```json
{
  "Relique Section": {
    "prefix": "rq-section",
    "body": [
      "\"use client\";",
      "",
      "import { motion } from \"framer-motion\";",
      "import { fadeInUp, VIEWPORT_ONCE } from \"@/lib/motion-variants\";",
      "",
      "export function ${1:SectionName}() {",
      "  return (",
      "    <section className=\"py-24 bg-bgDark border-t border-white/5\">",
      "      <div className=\"container mx-auto px-6\">",
      "        <motion.div",
      "          variants={fadeInUp}",
      "          initial=\"hidden\"",
      "          whileInView=\"visible\"",
      "          viewport={VIEWPORT_ONCE}",
      "        >",
      "          <span className=\"text-metadata-primary mb-4 block\">",
      "            ${2:Category}",
      "          </span>",
      "          <h2 className=\"text-display-section mb-8\">",
      "            ${3:Title}",
      "          </h2>",
      "          ",
      "          ${0}",
      "        </motion.div>",
      "      </div>",
      "    </section>",
      "  );",
      "}"
    ],
    "description": "Relique section template"
  },
  
  "Relique Card": {
    "prefix": "rq-card",
    "body": [
      "<motion.div",
      "  whileHover={{ y: -8 }}",
      "  className=\"bg-cardDark border border-borderDark p-8 group\"",
      ">",
      "  ${0}",
      "</motion.div>"
    ]
  }
}
```

**Effort:** 1 hour

---

## 6. Design System Evolution (Phase 5)

**Timeline:** Ongoing  
**Priority:** ⭐ LOW  
**Effort:** Low (incremental)  
**Impact:** Low-Medium

### 6.1 Systematic Spacing Scale

**Current:** Ad-hoc spacing (px-6, py-24, gap-8)

**Proposed:** Systematic scale

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    spacing: {
      0: "0",
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "20px",
      6: "24px",
      8: "32px",
      10: "40px",
      12: "48px",
      16: "64px",
      20: "80px",
      24: "96px",
      32: "128px",
    },
  },
};
```

**Migration:** Gradual (update as components are edited)

**Effort:** Ongoing

---

### 6.2 Component Size Variants

**Goal:** Standardize `sm`, `md`, `lg` sizes

**Example:** Button sizes

```tsx
const sizeClasses = {
  sm: "px-6 py-2 text-xs",
  md: "px-10 py-4 text-xs",
  lg: "px-12 py-5 text-sm",
};

<Button size="lg">
```

**Apply to:** Buttons, Inputs, Cards, Badges

**Effort:** 4-6 hours

---

### 6.3 Animation Duration Scale

**Standardize durations:**

```typescript
export const duration = {
  fast: 150,      // Micro-interactions
  normal: 300,    // Standard transitions
  slow: 600,      // Premium animations
  verySlow: 1000, // Dramatic effects
} as const;
```

**Usage:**
```tsx
transition={{ duration: duration.slow / 1000 }} // Convert to seconds
```

**Effort:** 1 hour

---

### 6.4 Grid System Documentation

**Document grid patterns:**

```tsx
// 2-column split
grid grid-cols-1 md:grid-cols-2 gap-16

// 3-column cards
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8

// Bento (12-col)
grid grid-cols-12 gap-6

// Asymmetric (2:1)
grid grid-cols-1 md:grid-cols-3 gap-8
  <div className="md:col-span-2">
  <div className="md:col-span-1">
```

**Create guide:** `docs/GRID_PATTERNS.md`

**Effort:** 2 hours

---

## 7. Implementation Checklist

### Phase 1: Quick Wins (Week 1-2)

- [ ] Create `motion-variants.ts` với all standard variants
- [ ] Migrate 5 components to use motion variants
- [ ] Add typography utilities to `globals.css`
- [ ] Create `theme-utils.ts` với status helpers
- [ ] Migrate status logic to use utilities
- [ ] Update 10 components to use new typography classes

**Success Metrics:**
- Code duplication reduced by 50%+
- All team members using new utilities

---

### Phase 2: Performance (Week 3-4)

- [ ] Add blur placeholders to all images
- [ ] Audit và fix `priority` và `loading` attributes
- [ ] Add `sizes` attribute to all images
- [ ] Implement code splitting for heavy components
- [ ] Create `useReducedMotion` hook
- [ ] Apply reduced motion to 10+ animated components
- [ ] Audit animations for performance (GPU-only)

**Success Metrics:**
- Lighthouse score: 85+ → 95+
- LCP: -500ms improvement

---

### Phase 3: Accessibility (Week 5-6)

- [ ] Add focus ring utilities
- [ ] Apply focus styles to all interactive elements
- [ ] Implement skip-to-content link
- [ ] Audit và add ARIA labels/roles
- [ ] Add keyboard navigation to carousel
- [ ] Test with screen reader (VoiceOver/NVDA)
- [ ] Run Lighthouse accessibility audit
- [ ] Fix all contrast issues

**Success Metrics:**
- Lighthouse Accessibility: 100
- WCAG 2.1 AA compliance

---

### Phase 4: Developer Experience (Week 7-10)

- [ ] Setup component generator CLI
- [ ] Create 4-5 component templates
- [ ] Setup Storybook
- [ ] Document 20-30 key components in Storybook
- [ ] Create theme tokens TypeScript file
- [ ] Add VSCode snippets
- [ ] Write contribution guide

**Success Metrics:**
- Component creation time: < 10 minutes
- 90% of shared components documented

---

### Phase 5: Design System Evolution (Ongoing)

- [ ] Document spacing scale
- [ ] Create size variant system
- [ ] Standardize animation durations
- [ ] Create grid patterns guide
- [ ] Monthly design system review

---

## 📊 Progress Tracking

**Template for weekly updates:**

```markdown
## Week N Progress

### Completed
- [x] Item 1
- [x] Item 2

### In Progress
- [ ] Item 3 (50% complete)

### Blocked
- [ ] Item 4 - waiting on X

### Metrics
- Components migrated: 15/50
- Lighthouse score: 92 (+7)
- Lines of code reduced: 500

### Next Week
- Focus on X, Y, Z
```

---

## 🎯 Success Criteria

### Phase 1 Complete When:
- ✅ 80%+ components use motion variants library
- ✅ All status logic uses theme-utils
- ✅ Typography utilities used in 50%+ components

### Phase 2 Complete When:
- ✅ Lighthouse Performance score ≥ 95
- ✅ LCP < 2.5s
- ✅ All images optimized

### Phase 3 Complete When:
- ✅ Lighthouse Accessibility score = 100
- ✅ WCAG 2.1 AA compliant
- ✅ Screen reader tested

### Phase 4 Complete When:
- ✅ Component generator functional
- ✅ 80%+ shared components in Storybook
- ✅ Team trained on new tools

### Phase 5 Complete When:
- ✅ Design system documentation complete
- ✅ Spacing/sizing systematized
- ✅ Monthly review process established

---

## 🔗 Tài liệu liên quan

- [THEME.md](./THEME.md) - Theme guidelines
- [COMPONENT_STRUCTURE.md](./COMPONENT_STRUCTURE.md) - Component inventory
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Project structure

---

**Maintained by:** Relique.co Development Team  
**Questions?** Discuss in team meetings hoặc GitHub issues
