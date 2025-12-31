# Asset Usage Table

Tài liệu này mô tả cách sử dụng assets (images) trong ứng dụng Relique.

## Asset Manifest

Tất cả assets được định nghĩa trong `src/lib/assets/manifest.ts` với metadata đầy đủ:
- `id`: Unique identifier
- `src`: Image URL
- `alt`: Alt text cho accessibility
- `creditText`: Credit text (optional)
- `creditUrl`: Credit URL (optional)
- `tags`: Tags để search/filter
- `dominantTone`: "dark" | "light" để theme matching
- `section`: Section sử dụng asset
- `component`: Component sử dụng asset
- `variant`: "hero" | "card" | "banner" | "avatar" | "logo-strip"
- `aspectRatio`: Aspect ratio (optional)

## Media Component

Sử dụng `Media` component từ `@/components/shared/Media` để render images với optimization tự động.

### Variants

- **hero**: Hero images (1200x800, priority loading)
- **card**: Card images (800x600, lazy loading)
- **banner**: Banner images (1200x400)
- **avatar**: Avatar images (1:1, 48-64px)
- **logo-strip**: Logo strip images (contain fit)

### Usage Examples

```tsx
import { Media } from "@/components/shared/Media";

// Hero image với priority
<Media
  src="https://..."
  alt="Hero image"
  variant="hero"
  priority
  fill
/>

// Card image với lazy loading
<Media
  src="https://..."
  alt="Card image"
  variant="card"
  fill
/>
```

## Asset Mapping by Section

### Home Page

| Asset ID | Component | Variant | Usage |
|----------|-----------|---------|-------|
| home.hero | HeroSection | hero | Main hero image |
| home.bento.1 | QuickActions | card | Verify action card |
| home.bento.2 | QuickActions | card | Marketplace action card |
| home.bento.3 | QuickActions | card | Consign action card |
| home.bento.4 | QuickActions | card | Learn more card |
| home.featured.items | FeaturedItems | card | Featured marketplace items |
| home.featured.posts | FeaturedPosts | card | Featured blog posts |
| home.events | UpcomingEvents | card | Upcoming events |

### Marketplace

| Asset ID | Component | Variant | Usage |
|----------|-----------|---------|-------|
| marketplace.card | MarketplaceCard | card | Listing card images |
| marketplace.detail.hero | ItemGallery | hero | Item detail gallery |

### Verify

| Asset ID | Component | Variant | Usage |
|----------|-----------|---------|-------|
| verify.hero | VerifyPage | hero | Verify page hero |
| verify.result.bg | VerifyResult | banner | Result background |

### Consign

| Asset ID | Component | Variant | Usage |
|----------|-----------|---------|-------|
| consign.hero | ConsignPage | hero | Consign page hero |
| consign.form.banner | ConsignForm | banner | Form banner |

### About

| Asset ID | Component | Variant | Usage |
|----------|-----------|---------|-------|
| about.section.4_1 | AnchorSection | card | Who We Are section |
| about.section.4_2 | AnchorSection | card | One to Appreciate section |
| about.section.4_3 | AnchorSection | card | Question of Trust section |
| about.section.4_3_2 | AnchorSection | card | Artificial Intelligence section |

### Legal

| Asset ID | Component | Variant | Usage |
|----------|-----------|---------|-------|
| legal.hero | LegalLayout | banner | Legal pages hero banner |

## Image Optimization Rules

1. **Hero images**: Priority loading, 1200x800, cover fit
2. **Card images**: Lazy loading, 800x600, cover fit
3. **Banner images**: 1200x400, cover fit
4. **Avatar images**: 1:1 aspect ratio, 48-64px
5. **Article images**: 16:9 aspect ratio
6. **Team images**: 1:1 hoặc 4:5 aspect ratio

## Remote vs Local Assets

- **Logos**: Local trong `/public/brand/` (logo_1.svg, logo_2.svg)
- **Stock images**: Remote URLs từ Unsplash (configured trong next.config.js)
- **Future**: Có thể tải về `/public/stock/*` để offline demo

## Performance Considerations

- Hero images: `priority={true}` để load ngay
- Card images: Lazy loading mặc định
- Sizes attribute: Tự động set theo variant
- Placeholder: Có thể thêm blur placeholder cho hero images

