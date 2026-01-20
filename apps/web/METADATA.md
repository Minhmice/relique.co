# Web Metadata Configuration

## Overview
Metadata đã được cấu hình đầy đủ cho SEO, social sharing, và PWA capabilities.

## Files Created/Updated

### 1. Core Metadata (`src/app/layout.tsx`)
- ✅ Basic SEO metadata (title, description, keywords)
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Card tags
- ✅ Favicon & Apple Touch Icon references
- ✅ Robots directives
- ✅ Google Site Verification
- ✅ Theme color for mobile browsers
- ✅ Apple mobile web app capabilities

### 2. Dynamic Icons
- `src/app/icon.tsx` - Dynamic favicon (32x32)
- `src/app/apple-icon.tsx` - Apple Touch Icon (180x180)

### 3. Social Media Images
- `src/app/opengraph-image.tsx` - Open Graph image generator (1200x630)
- `src/app/twitter-image.tsx` - Twitter Card image generator (1200x630)
- `/public/og-logo.png` - Static logo image fallback

### 4. SEO Files
- `src/app/robots.ts` - Robots.txt configuration
- `src/app/sitemap.ts` - Dynamic sitemap generator
- `src/app/manifest.ts` - PWA manifest file

### 5. Utility Files
- `src/lib/metadata.ts` - Reusable metadata construction helpers

## Features Implemented

### SEO
- ✅ Meta tags (title, description, keywords)
- ✅ Canonical URLs
- ✅ Structured robots directives
- ✅ Dynamic sitemap with marketplace, posts, and events
- ✅ Google Bot specific directives

### Open Graph (Facebook, LinkedIn, etc.)
- ✅ og:title
- ✅ og:description
- ✅ og:image (1200x1200)
- ✅ og:type
- ✅ og:url
- ✅ og:site_name
- ✅ og:locale

### Twitter Card
- ✅ twitter:card (summary_large_image)
- ✅ twitter:title
- ✅ twitter:description
- ✅ twitter:image (1200x630)
- ✅ twitter:site
- ✅ twitter:creator

### PWA Support
- ✅ Web App Manifest
- ✅ Theme color
- ✅ Multiple icon sizes (192x192, 512x512)
- ✅ Maskable icons
- ✅ Start URL
- ✅ Display mode (standalone)
- ✅ Orientation preferences

### Mobile Optimization
- ✅ Apple mobile web app capable
- ✅ Apple status bar style
- ✅ Theme color for mobile browsers
- ✅ Proper viewport configuration

## Image Specifications

### OG Logo (`/public/og-logo.png`)
- Format: PNG
- Background: Black (#000000)
- Logo: White "R" with serif font
- Accent: White dot
- Used for: Favicon, Apple Touch Icon, OG images

### Generated Images
All images are dynamically generated using Next.js `ImageResponse`:
- **Favicon**: 32x32, simple "R" on black
- **Apple Icon**: 180x180, larger "R" on black
- **OG Image**: 1200x630, full branding with text
- **Twitter Image**: 1200x630, full branding with text

## Environment Variables Required

```env
NEXT_PUBLIC_SITE_URL=https://relique.ch
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your_verification_code
```

## Testing

### Local Testing
```bash
npm run build
npm run start
```

Then check:
- `/manifest.json` - PWA manifest
- `/robots.txt` - Robots configuration
- `/sitemap.xml` - Sitemap
- `/icon` - Favicon
- `/apple-icon` - Apple Touch Icon
- `/opengraph-image` - OG Image
- `/twitter-image` - Twitter Card Image

### Online Testing Tools
- **Open Graph**: https://www.opengraph.xyz/
- **Twitter Card**: https://cards-dev.twitter.com/validator
- **Structured Data**: https://search.google.com/test/rich-results
- **Mobile Friendly**: https://search.google.com/test/mobile-friendly
- **Lighthouse**: Chrome DevTools > Lighthouse

## Usage in Other Pages

Use the `constructMetadata` helper for consistent metadata across pages:

```typescript
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Marketplace - Relique",
  description: "Browse authenticated collectibles",
  image: "/marketplace-og.png",
});
```

## Maintenance

### Updating Logo
Replace `/public/og-logo.png` and clear Next.js cache:
```bash
rm -rf .next
npm run build
```

### Adding New Routes to Sitemap
Edit `src/app/sitemap.ts` and add to `staticPages` array.

### Customizing Social Media Images
Edit `src/app/opengraph-image.tsx` or `src/app/twitter-image.tsx` to change the design.

## Performance

All metadata is:
- ✅ Statically generated at build time
- ✅ Properly cached with appropriate headers
- ✅ Optimized for Core Web Vitals
- ✅ Edge-ready (icons and images use edge runtime)

## Accessibility

- ✅ Proper alt texts for all images
- ✅ Semantic HTML structure
- ✅ Language attribute set
- ✅ Mobile-first responsive design
