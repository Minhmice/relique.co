# Performance Optimization Notes

Tài liệu này mô tả các optimization đã được thực hiện và best practices cho performance.

## Image Optimization

### Hero Images
- **Priority Loading**: Hero images sử dụng `priority={true}` để load ngay lập tức
- **Sizes Attribute**: Tự động set theo variant (hero = 100vw, card = responsive)
- **Format**: Next.js tự động optimize images
- **Placeholder**: Có thể thêm blur placeholder cho hero images

### Card Images
- **Lazy Loading**: Card images sử dụng lazy loading mặc định
- **LazyImage Component**: Wrapper component cho lazy loading images
- **Sizes**: Responsive sizes cho mobile/tablet/desktop

## Font Optimization

- **Self-hosted Fonts**: Geist Sans và Geist Mono được self-host trong `/app/fonts/`
- **Display Swap**: Fonts sử dụng `display: swap` để tránh layout shift
- **Variable Fonts**: Sử dụng variable fonts để giảm file size

## Component Boundaries

### Server Components (Default)
- Static content pages (Home, About, Policies, Terms)
- Metadata generation
- Data fetching (mock data)

### Client Components (When Needed)
- Interactive components (forms, buttons, dropdowns)
- State management (useState, useEffect)
- Browser APIs (localStorage, window)
- Theme switching

### Best Practices
1. **Default to Server**: Bắt đầu với server component, chỉ chuyển sang client khi cần
2. **Minimize Client Boundaries**: Giữ client components nhỏ, tách logic ra hooks
3. **Dynamic Imports**: Sử dụng dynamic imports cho heavy modules (carousel, gallery)

## Dynamic Imports

Heavy modules nên được import dynamically:

```tsx
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("@/components/HeavyComponent"), {
  loading: () => <LoadingState />,
  ssr: false, // Nếu không cần SSR
});
```

## Lighthouse Readiness Checklist

- ✅ Hero images có priority loading
- ✅ Card images lazy loading
- ✅ Fonts self-hosted với display swap
- ✅ No layout shifts lớn (hero có chiều cao ổn định)
- ✅ Không load ảnh quá nặng ở above-the-fold
- ✅ Không block main thread bằng animation quá đà

## Future Optimizations

- [ ] Image CDN cho production
- [ ] Service Worker cho offline support
- [ ] Code splitting cho routes
- [ ] Bundle analysis và optimization

