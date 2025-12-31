# OG Images Specification

Tài liệu này mô tả specification cho Open Graph (OG) images trong ứng dụng Relique.

## Standard Dimensions

- **Width**: 1200px
- **Height**: 630px
- **Aspect Ratio**: 1.91:1
- **Format**: PNG hoặc JPG
- **Max File Size**: 1MB (recommended: < 300KB)

## Safe Zones

- **Text Safe Zone**: 120px từ mỗi cạnh
- **Logo Safe Zone**: Top-left hoặc top-right, 40px padding
- **Content Area**: 960x510px (center)

## Typography

- **Title Font**: Geist Sans Bold, 48-64px
- **Description Font**: Geist Sans Regular, 24-32px
- **Meta Font**: Geist Sans Medium, 18-24px
- **Line Height**: 1.2-1.4

## Color Scheme

- **Background**: Navy (#1a2e4a) hoặc White (#ffffff)
- **Text**: White (trên navy) hoặc Navy (trên white)
- **Accent**: Gold (#d4af37) cho highlights
- **Border Radius**: 0px (theo design system)

## Variants

### Default OG Image

- Layout: Brand logo + title + description
- Use case: Home page, About page, general pages

### Marketplace Item OG Image

- Layout: Product image + title + product code + price
- Use case: `/marketplace/[slug]` pages
- Elements:
  - Product image (left, 630x630px)
  - Title (right, top)
  - Product code (right, middle)
  - Price (right, bottom)

### Post OG Image

- Layout: Featured image + title + category + date
- Use case: `/posts/[slug]` pages
- Elements:
  - Featured image (background, overlay)
  - Title (center, large)
  - Category tag (top-left)
  - Date (bottom-left)

### Event OG Image

- Layout: Event image + title + date + location
- Use case: `/events/[slug]` pages
- Elements:
  - Event image (background, overlay)
  - Title (center, large)
  - Date (bottom-left)
  - Location (bottom-right)

## Implementation Notes

- OG images được generate động hoặc serve từ static files
- Sử dụng `generateOGImageUrl()` utility để tạo URL
- Metadata được set trong page-level `generateMetadata()` functions
- Fallback: Default OG image nếu không có specific image

## Testing

- Test với [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- Test với [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- Test với [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

