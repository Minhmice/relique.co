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

### Core Framework
- **Next.js 16.1.0** (App Router)
- **React 19.2.0**
- **TypeScript 5.9.2**

### Styling & UI
- **Tailwind CSS 3.4.17**
- **shadcn/ui** (Radix UI primitives)
- **Framer Motion 12.25.0** (animations)
- **next-themes** (theme management)

### Forms & Validation
- **React Hook Form 7.69.0**
- **Zod 4.3.2**
- **@hookform/resolvers 5.2.2**

### Utilities
- **class-variance-authority** (component variants)
- **clsx** & **tailwind-merge** (conditional classes)
- **sonner** (toast notifications)

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
│   ├── components/
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

### UI Components (`src/components/ui/`)

All shadcn/ui components installed via CLI. **⚠️ IMPORTANT:** Do NOT edit files in `src/components/ui/`. These are managed by shadcn CLI. Create wrappers in `src/components/shared/` or `src/components/app/` if customization is needed.

## Design System

### Theme

The application uses a dark-only theme with custom color palette:

- **Background:** `#0A0A0A` (bgDark)
- **Card:** `#121212` (cardDark)
- **Navy:** `#0F2854`
- **Primary Blue:** `#1C4D8D`
- **Accent Blue:** `#498BC4`
- **Highlight Ice:** `#BDE8F5`
- **Text Secondary:** `#B3B3B3`
- **Border Dark:** `#333333`

### Typography

- **Font Family:** System fonts (Inter, -apple-system, etc.)
- **Headings:** Bold, uppercase, italic, tight tracking
- **Body:** Regular weight, relaxed leading

### Animations

- **Framer Motion** for page transitions and component animations
- **Scroll-triggered animations** using `whileInView`
- **Hover effects** with scale and color transitions
- **Mobile menu** with slide-in animation

## Services Integration

The application integrates with service layer for data management:

### Marketplace Service
- Browse items with filters and sorting
- Item detail views
- Search functionality

### Verify Service
- Product ID verification
- Certificate code validation
- Result display with status (Qualified, Inconclusive, Disqualified)

### Consign Service
- Draft saving
- Form submission
- Autosave functionality

All services use mock data with localStorage persistence.

## Development Guidelines

### Component Rules

1. **File Size Limit:** Each `.tsx` file MUST be under 300 lines
2. **shadcn Protection:** Never edit `src/components/ui/**` directly
3. **Client Components:** Use `"use client"` for interactive components
4. **Server Components:** Default for pages (use client only when needed)

### File Naming

- Components: PascalCase (`Header.tsx`, `HeroSection.tsx`)
- Utilities: camelCase (`utils.ts`, `storage.ts`)
- Routes: lowercase with dashes (Next.js convention)

### Import Paths

Use `@/` alias for imports:
- `@/components/home/HeroSection`
- `@/lib/services/marketplaceService`
- `@/lib/types`

### Adding New Routes

1. Create page file in `app/` directory
2. Add route to this README's Route Map
3. Update navigation in `Header.tsx` if it's a public route

### Adding New Components

1. If it's a UI primitive, check shadcn first: `npx shadcn@latest add [component]`
2. If custom, create in appropriate directory:
   - `src/components/home/` for home page sections
   - `src/components/shared/` for reusable components
3. Keep components under 300 lines - extract logic to hooks if needed

## Image Optimization

The application uses Next.js `Image` component for optimized images. External image domains are configured in `next.config.js`:

- `picsum.photos`
- `images.unsplash.com`

## Responsive Design

- **Desktop-first** design approach
- **Breakpoints:**
  - Mobile: default
  - Tablet: `md:` (768px+)
  - Desktop: `lg:` (1024px+)
- **Mobile menu** for navigation on smaller screens

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2020+ features
- CSS Grid and Flexbox

## Build & Deployment

### Production Build

```bash
pnpm build
```

### Start Production Server

```bash
pnpm start
```

### Environment Setup

Ensure `NEXT_PUBLIC_SITE_URL` is set in production environment for proper metadata and OG image generation.

## Documentation

See `docs/` directory for detailed documentation:

- **COMPONENT_CATALOG.md** - Component catalog with props and usage
- **STRUCTURE.md** - Architecture overview and file organization
- **SCOPE_BOUNDARIES.md** - Scope boundaries for contract
- **NEXT_STEPS.md** - Next steps checklist

## License

Private project - All rights reserved
