# Relique.co - Web Application

Frontend application for Relique, a probabilistic authentication platform for collectibles and memorabilia. Built with Next.js 16 App Router, featuring modern design, animations, and service integrations.

## Overview

Relique.co is a high-performance web application that provides authentication, verification, and marketplace services for sports memorabilia. The application features a sleek dark-themed design with smooth animations, responsive layout, and integrated service layer for seamless data management.

## Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

```bash
# From workspace root
pnpm install

# Or specifically for web app
cd apps/web
pnpm install
```

### Development

```bash
# From workspace root
pnpm dev

# Or specifically for web app
cd apps/web
pnpm dev
```

The application will be available at `http://localhost:3000`

### New Developer Resources (Phase 7)

The project now includes standardized utilities for faster development:

- **Motion Variants:** Pre-built animation patterns (`@/lib/motion-variants`)
- **Theme Utilities:** Status helpers, typography, colors (`@/lib/theme-utils`)  
- **Typography Classes:** Consistent text styles (`.text-display-hero`, `.text-metadata`, etc.)

See [Design System](#design-system) section below for complete details.

### Environment Variables

Create `.env.local` file in `apps/web/`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Build

```bash
# From workspace root
pnpm build

# Or specifically for web app
cd apps/web
pnpm build
```

### Type Checking

```bash
cd apps/web
pnpm check-types
```

## Tech Stack

- **Framework:** Next.js 16.1.0 (App Router), React 19.2.0, TypeScript 5.9.2
- **Styling:** Tailwind CSS 3.4.17, shadcn/ui (Radix UI)
- **Animation:** Framer Motion 12.25.0 với centralized variants library
- **Forms:** React Hook Form 7.69.0 + Zod 4.3.2
- **Utilities:** Motion variants, Theme utilities, Typography classes
- **State:** React hooks + localStorage persistence

## Project Structure

```
apps/web/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Home page
│   ├── about/                    # About page
│   ├── authenticate/             # Authenticate page
│   ├── consign/                  # Consign page
│   ├── contact/                  # Contact page
│   ├── marketplace/              # Marketplace pages
│   ├── policies/                 # Privacy policy
│   ├── posts/                    # Blog posts
│   ├── terms/                    # Terms of service
│   ├── verify/                   # Verify page
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── robots.ts                 # robots.txt
│   └── sitemap.ts                # sitemap.xml
├── src/
│   ├── fonts/                    # Local fonts
│   │   └── Zapf Renaissance Book.ttf
│   ├── components/
│   │   ├── logo/                 # Brand logo components (3)
│   │   │   ├── ReliqueMark.tsx
│   │   │   ├── ReliqueWordmark.tsx
│   │   │   ├── ReliqueLogo.tsx
│   │   │   └── index.ts
│   │   ├── ui/                   # shadcn/ui components (DO NOT EDIT)
│   │   ├── shell/                # Header, Footer
│   │   ├── home/                 # Home page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── WhySection.tsx
│   │   │   ├── MarketplaceSection.tsx
│   │   │   ├── DualBlocks.tsx
│   │   │   ├── TheWaySection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── StrategicPartnerSection.tsx
│   │   │   └── TeamSection.tsx
│   │   ├── shared/               # Shared components
│   │   ├── marketplace/          # Marketplace components
│   │   └── content/              # Content components
│   ├── lib/
│   │   ├── services/             # Service layer
│   │   │   ├── marketplaceService.ts
│   │   │   ├── verifyService.ts
│   │   │   └── consignService.ts
│   │   ├── types.ts              # TypeScript types
│   │   ├── utils.ts              # Utility functions
│   │   └── storage.ts            # localStorage helpers
│   └── mocks/                    # Mock JSON data
└── public/
    └── brand/                    # Brand assets
```

## Route Map

### Public Routes

- **`/`** - Home page with hero, sections, testimonials, and team
- **`/authenticate`** - Submit items for authentication
- **`/verify`** - Verify product ID/certificate code
- **`/marketplace`** - Browse authenticated items
- **`/marketplace/[slug]`** - Item detail page
- **`/consign`** - Consignment submission form
- **`/about`** - About page (sections: 4.1, 4.2, 4.3, 4.3.2)
- **`/contact`** - Contact form
- **`/policies`** - Privacy policy
- **`/terms`** - Terms of service
- **`/posts`** - Blog posts listing
- **`/posts/[slug]`** - Blog post detail

## Home Page Sections

The home page (`/`) consists of the following sections:

1. **HeroSection** - Main hero with "Relique Official Portal" badge, CTA button
2. **WhySection** - "The Why of Relics" with partnership mention
3. **MarketplaceSection** - Featured marketplace items with drag scroll
4. **DualBlocks** - Verification Services and Asset Consignment blocks
5. **TheWaySection** - "The Way of Relique.co" with 3 cards (4.1, 4.2, 4.3)
6. **TestimonialsSection** - Customer testimonials with ratings
7. **StrategicPartnerSection** - Strategic partner (St.B) information
8. **TeamSection** - Team members grid

## Component Architecture

### Shell Components (`src/components/shell/`)

- **Header.tsx** - Main navigation with:
  - Logo "Relique.co"
  - Desktop navigation menu
  - Mobile sidebar menu with animations
  - Scroll-based styling (backdrop blur when scrolled)
  
- **Footer.tsx** - Footer with:
  - Logo "Relique.co"
  - Navigation links
  - Newsletter subscription form
  - Social media links

### Home Sections (`src/components/home/`)

All home page sections are client components with Framer Motion animations:

- **HeroSection** - Hero banner with badge and CTA
- **WhySection** - Value proposition with partnership badge
- **MarketplaceSection** - Horizontal scrollable marketplace preview
- **DualBlocks** - Two-column service blocks (Verify & Consign)
- **TheWaySection** - Three-card grid with about page links
- **TestimonialsSection** - Customer testimonials grid
- **StrategicPartnerSection** - Partner information
- **TeamSection** - Team members grid with hover effects

### Logo Components (`src/components/logo/`)

Reusable brand identity components with Zapf Renaissance font:

- **ReliqueMark.tsx** - Logo icon/mark (R. symbol)
  - Props: `size` (sm/md/lg/xl or number), `className`, `animated`
  - Size presets: sm: 24px, md: 40px, lg: 64px, xl: 96px
  - Example: `<ReliqueMark size="lg" animated />`

- **ReliqueWordmark.tsx** - Logo wordmark (text with Zapf Renaissance)
  - Props: `size` (sm/md/lg/xl), `text`, `className`, `animated`
  - Font: Zapf Renaissance auto-applied
  - Example: `<ReliqueWordmark size="xl" text="Relique" animated />`

- **ReliqueLogo.tsx** - Combined mark + wordmark
  - Props: `markSize`, `wordmarkSize`, `gap`, `href`, `animated`, `text`
  - Auto-wraps in Link if `href` provided
  - Example: `<ReliqueLogo href="/" animated />`

### UI Components (`src/components/ui/`)

All shadcn/ui components installed via CLI. **⚠️ IMPORTANT:** Do NOT edit files in `src/components/ui/`. These are managed by shadcn CLI. Create wrappers in `src/components/shared/` or `src/components/app/` if customization is needed.

## Design System

### Overview

Relique.co uses a comprehensive design system with standardized utilities for consistent UI development.

**Documentation:** See [`docs/THEME.md`](../../docs/THEME.md) for complete guidelines

### Theme Tokens

#### Fonts

```tsx
// Body/UI Font: Work Sans (Google Fonts, variable weight)
font-family: var(--font-work-sans);  // 400-700

// Display/Brand Font: Zapf Renaissance (local)
font-family: var(--font-zapf-renaissance);  // serif
// Location: src/fonts/Zapf Renaissance Book.ttf
// Used for: Hero headings, display text, brand wordmark

// Tailwind classes
font-work-sans          // Body, UI, buttons
font-zapf-renaissance   // Display, hero, brand
```

#### Colors

```tsx
// Brand colors (from tailwind.config.ts)
navy: '#0F2854'           // Navy chủ đạo
primaryBlue: '#1C4D8D'    // Primary CTA, highlights
accentBlue: '#498BC4'     // Hover states, secondary
highlightIce: '#BDE8F5'   // Premium features, AI scores

// Surfaces
bgDark: '#0A0A0A'         // Page background
cardDark: '#121212'       // Cards, panels
borderDark: '#333333'     // Borders

// Text
textPrimary: '#FFFFFF'    // Main text
textSecondary: '#B3B3B3'  // Muted content
```

#### Typography Scale

```tsx
// Display (Hero)
.text-display-hero        // 80-120px, Zapf Renaissance, serif
.text-display-section     // 48-72px, Work Sans, bold
.text-display-subsection  // 32-48px, Work Sans, semibold

// Cards
.text-card-title          // 24px, semibold
.text-card-subtitle       // 16px, muted

// Metadata (Labels)
.text-metadata            // 10px, uppercase, tracking-[0.4em], black
.text-metadata-primary    // + primaryBlue color
.text-metadata-ice        // + highlightIce color

// Interactive
.text-link-arrow          // Uppercase, tracking-[0.2em], flex gap-2
.text-button-primary      // Button text style

// Accents
.text-accent-blue         // primaryBlue color
.text-accent-ice          // highlightIce color
```

**Usage:**

```tsx
<h2 className="text-display-section">
  Section <span className="text-accent-blue">Title</span>
</h2>
<span className="text-metadata-primary">Category</span>
```

### Motion System

**Library:** `src/lib/motion-variants.ts`

#### Pre-built Variants

```tsx
import { 
  fadeInUp,           // Standard fade from bottom
  slideInLeft,        // Slide from left
  slideInRight,       // Slide from right
  scaleIn,            // Scale + fade
  staggerContainer,   // For lists/grids
  staggerItem,        // Child items
  hoverLift,          // Card hover
  VIEWPORT_ONCE       // Viewport config
} from "@/lib/motion-variants";

// Standard usage
<motion.div
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={VIEWPORT_ONCE}
>
  Content
</motion.div>

// Stagger children
<motion.div variants={staggerContainer} initial="hidden" whileInView="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={staggerItem}>
      {item.content}
    </motion.div>
  ))}
</motion.div>

// Hover effects
<motion.div
  initial="rest"
  whileHover="hover"
  variants={hoverLift}
>
```

#### Easing Functions

```tsx
PREMIUM_EASING = [0.16, 1, 0.3, 1]  // Smooth luxury feel
SHARP_EASING = "easeInOut"          // Quick interactions
LINEAR_EASING = "linear"            // Infinite loops
```

**See:** [`docs/THEME.md#motion-system`](../../docs/THEME.md#4-motion-system) for complete reference

### Theme Utilities

**Library:** `src/lib/theme-utils.ts`

#### Status Helpers

```tsx
import { 
  getStatusClasses,     // Get CSS classes
  getStatusBadge,       // Get badge config
  getStatusColor,       // Timeline colors
  getStatusExplanation  // Human-readable text
} from "@/lib/theme-utils";

// Usage
<Badge className={getStatusClasses(item.status)}>
  {getStatusBadge(item.status).label}
</Badge>

<p>{getStatusExplanation(item.status)}</p>
```

#### Typography Helpers

```tsx
import { getMetadataClasses, getLinkArrowClasses } from "@/lib/theme-utils";

<span className={getMetadataClasses("primary")}>Category</span>
<div className={getLinkArrowClasses("ice")}>
  View More <span>→</span>
</div>
```

#### Formatting

```tsx
import { formatPrice, formatDate, getRelativeTime } from "@/lib/theme-utils";

formatPrice(1250000)           // "$1,250,000"
formatDate(new Date())         // "Jan 19, 2026"
getRelativeTime(pastDate)      // "2 hours ago"
```

**See:** [`docs/THEME.md#component-patterns`](../../docs/THEME.md#5-component-patterns) for patterns

### Focus Management

Enhanced focus indicators for accessibility:

```tsx
// Focus ring utilities (in globals.css)
.focus-ring-primary   // Primary blue ring
.focus-ring-ice       // Ice blue ring
.focus-ring-white     // White ring

// Usage
<button className="focus-ring-primary">Click me</button>
<Link href="/page" className="focus-ring-ice">Navigate</Link>
```

### Component Architecture

**Inventory:** See [`docs/COMPONENT_STRUCTURE.md`](../../docs/COMPONENT_STRUCTURE.md)

**Total Components:** ~97
- Home: 12 components
- Marketplace: 13 components
- Consign: 14 components
- Verify: 9 components
- Content: 8 components
- Sections: 12 components
- Shared: 5 components
- Shell: 5 components
- UI (shadcn): 19 components

**Component Rules:**

1. **File Size:** Max 300 lines (200 for app components)
2. **shadcn Guard:** Never edit `src/components/ui/**` directly
3. **Composition:** Prefer composition over inheritance
4. **TypeScript:** Full type safety, no `any`

**See:** Component guidelines in [`docs/COMPONENT_STRUCTURE.md`](../../docs/COMPONENT_STRUCTURE.md)

## Services

Mock services với localStorage persistence:

- **Marketplace Service** - Browse, filter, sort, search items
- **Verify Service** - Product verification với status display
- **Consign Service** - Form submission với draft autosave
- **Content Service** - Posts và events management

## Development Guidelines

**Component Rules:**
1. File size ≤300 lines (200 for app-specific)
2. Never edit `src/components/ui/**` (shadcn guard)
3. Use motion variants library cho animations
4. Use theme utilities cho status, typography, formatting
5. TypeScript strict mode, no `any` types

**See:** [`docs/THEME.md`](../../docs/THEME.md) for complete guidelines

## Build & Deployment

```bash
# Production build
pnpm build

# Start production
pnpm start
```

**Browser Support:** Modern browsers (Chrome, Firefox, Safari, Edge)  
**Responsive:** Desktop-first với mobile support (md: 768px, lg: 1024px)

## Documentation

- **Design System:** [`docs/THEME.md`](../../docs/THEME.md)
- **Components:** [`docs/COMPONENT_STRUCTURE.md`](../../docs/COMPONENT_STRUCTURE.md)
- **Improvements:** [`docs/THEME_IMPROVEMENTS.md`](../../docs/THEME_IMPROVEMENTS.md)
- **Project Structure:** [`docs/PROJECT_STRUCTURE.md`](../../docs/PROJECT_STRUCTURE.md)
