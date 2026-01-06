# Definition of Done

Technical checklist that must be satisfied before a feature/deliverable is considered complete.

## Code Quality

- [ ] **Lint Pass**: `pnpm lint` runs without errors
- [ ] **Typecheck Pass**: `pnpm typecheck` runs without errors
- [ ] **Build Pass**: `pnpm build` completes successfully for both apps
- [ ] **No Boundary Violations**: ESLint boundary rules pass (no restricted imports)
- [ ] **Type Safety**: All TypeScript errors resolved, no `any` types (unless justified)

## Testing

- [ ] **Unit Tests**: Critical logic has unit tests (if applicable)
- [ ] **E2E Tests**: Core flows covered by Playwright tests
- [ ] **Test Reports**: HTML reports and traces available in `test-results/`
- [ ] **Manual Testing**: Feature tested manually in both apps

## Documentation

- [ ] **Code Comments**: Complex logic has inline comments
- [ ] **API Documentation**: Service contracts documented
- [ ] **Component Docs**: New components added to component catalog (if applicable)
- [ ] **Demo Script Updated**: Demo script reflects new features (if applicable)

## Performance

- [ ] **Lighthouse Audit**: Key pages meet targets (Performance >= 80, A11y >= 90)
- [ ] **Image Optimization**: All images use Next.js Image with alt text
- [ ] **Code Splitting**: Heavy components use dynamic imports
- [ ] **Layout Shift**: No CLS issues (skeletons, fixed dimensions)

## Accessibility

- [ ] **Keyboard Navigation**: All interactive elements keyboard accessible
- [ ] **Screen Reader**: ARIA labels and roles correct
- [ ] **Form Labels**: All inputs have labels
- [ ] **Heading Hierarchy**: Proper H1-H6 nesting
- [ ] **Color Contrast**: Meets WCAG AA standards

## Architecture

- [ ] **Service Contracts**: New services follow contract pattern from `@relique/shared/domain/contracts`
- [ ] **Storage Keys**: New storage uses keys from `@relique/shared/domain/storage/keys`
- [ ] **No Direct localStorage**: UI never accesses localStorage directly
- [ ] **Package Boundaries**: No cross-app imports, no deep package imports

## Demo Readiness

- [ ] **Preset Support**: New features work with presets (if applicable)
- [ ] **Demo Mode**: Feature behaves predictably in demo mode
- [ ] **Empty States**: Empty states implemented
- [ ] **Error States**: Error handling follows ServiceError pattern

## Phase 6 Specific

- [ ] **Metadata Complete**: All pages have proper metadata and OG tags
- [ ] **Sitemap Updated**: Dynamic routes included in sitemap
- [ ] **Robots.txt**: Admin routes disallowed
- [ ] **Contract Pack**: All 8 documents complete and consistent

## Sign-Off Checklist

Before marking Phase 6 as complete:

- [ ] All items above checked
- [ ] `pnpm check` passes
- [ ] Demo script runs successfully
- [ ] Contract pack reviewed
- [ ] Test artifacts available
- [ ] Client sign-off received (if applicable)

