# Performance & Accessibility Targets

## Lighthouse Targets (Desktop-First)

### Quality Gates
- **Performance**: >= 80
- **Accessibility**: >= 90
- **Best Practices**: >= 90
- **SEO**: >= 90

### Key Pages to Audit
1. Home (`/`)
2. Verify (`/verify`)
3. Marketplace (`/marketplace`)
4. Marketplace Detail (`/marketplace/[slug]`)
5. Consign (`/consign`)
6. Portal Submissions (`http://localhost:3001/app/submissions`)

## Common Fixes Applied

### Images
- ✅ All images have `alt` text
- ✅ Hero images use `priority={true}` for above-fold content
- ✅ Card images use lazy loading
- ✅ Images use Next.js Image component for optimization
- ✅ Proper aspect ratios to prevent layout shift

### Form Labels
- ✅ All inputs have associated labels or `aria-label`
- ✅ Form validation provides clear error messages
- ✅ Required fields are marked with `aria-required`

### Heading Hierarchy
- ✅ Single H1 per page
- ✅ Proper nesting (H1 → H2 → H3)
- ✅ Section headings use semantic HTML

### Keyboard Navigation
- ✅ All interactive elements are keyboard accessible
- ✅ Focus rings visible on focus
- ✅ Tab order is logical
- ✅ Skip links for main content (if needed)

### Layout Shift Prevention
- ✅ Fixed dimensions for loading skeletons
- ✅ Aspect ratios set for images
- ✅ Reserved space for dynamic content
- ✅ Verify loading component has fixed height

## Performance Optimizations

### Code Splitting
- ✅ Route-based code splitting (Next.js automatic)
- ✅ Dynamic imports for heavy components
- ✅ Lazy loading for below-fold content

### Asset Optimization
- ✅ Image optimization via Next.js Image
- ✅ Font optimization (local fonts with `display: swap`)
- ✅ CSS minification and purging (Tailwind)

### Caching Strategy
- ✅ Static pages cached at build time
- ✅ Dynamic routes use ISR where possible
- ✅ API responses cached appropriately

## Accessibility Checklist

### WCAG 2.1 Level AA Compliance
- ✅ Color contrast ratios meet AA standards
- ✅ Text is resizable up to 200% without loss of functionality
- ✅ Focus indicators are visible
- ✅ Keyboard navigation works throughout
- ✅ Screen reader announcements for dynamic content
- ✅ Form errors are announced
- ✅ Images have descriptive alt text
- ✅ Headings structure content logically

### ARIA Usage
- ✅ Buttons have appropriate `aria-label` when icon-only
- ✅ Form fields have `aria-describedby` for help text
- ✅ Loading states use `aria-live` regions
- ✅ Error messages are associated with inputs

## Testing Recommendations

### Automated Testing
- Run Lighthouse CI in build pipeline
- Use axe-core for accessibility testing

### Manual Testing
- Test with keyboard only (no mouse)
- Test with screen reader (NVDA/JAWS/VoiceOver)
- Test with browser zoom at 200%
- Test with high contrast mode

## Monitoring

### Metrics to Track
- First Contentful Paint (FCP) < 1.8s
- Largest Contentful Paint (LCP) < 2.5s
- Time to Interactive (TTI) < 3.8s
- Cumulative Layout Shift (CLS) < 0.1
- Total Blocking Time (TBT) < 200ms

### Tools
- Lighthouse (Chrome DevTools)
- WebPageTest
- Chrome User Experience Report
- Next.js Analytics (if enabled)

