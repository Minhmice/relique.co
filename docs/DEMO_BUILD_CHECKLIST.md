# Demo Build Checklist

Final checklist to verify Phase 6 completion and demo readiness.

## Pre-Demo Verification

### Build & Quality
- [ ] `pnpm check` passes (lint + typecheck + e2e + build)
- [ ] No TypeScript errors
- [ ] No ESLint errors (including boundary violations)
- [ ] Both apps build successfully (`apps/web` and `apps/app-portal`)

### Presets
- [ ] Collector preset applies successfully
- [ ] Investor preset applies successfully
- [ ] Dealer preset applies successfully
- [ ] Empty preset applies successfully
- [ ] Preset data appears in both web and portal apps

### Demo Mode
- [ ] Demo mode toggle works
- [ ] Fixed 5s latency for verify flow
- [ ] Zero error rate in demo mode
- [ ] Demo tools only visible when `NEXT_PUBLIC_DEMO_TOOLS=true`

### Demo Script
- [ ] Demo script (`docs/DEMO_SCRIPT.md`) complete
- [ ] All persona flows documented
- [ ] Talk tracks included
- [ ] Troubleshooting section complete
- [ ] Script can be followed by non-technical user

## Public-Facing Hygiene

### Metadata & OG
- [ ] Global metadata configured in `app/layout.tsx`
- [ ] Dynamic OG images for marketplace listings
- [ ] Dynamic OG images for posts
- [ ] Dynamic OG images for events
- [ ] Canonical URLs set
- [ ] Twitter card metadata complete

### Sitemap & Robots
- [ ] Sitemap includes all static pages
- [ ] Sitemap includes dynamic routes (marketplace, posts, events)
- [ ] Robots.txt disallows admin routes
- [ ] Sitemap link in robots.txt correct

### Favicon & Manifest
- [ ] Favicon set
- [ ] Manifest configured
- [ ] Theme colors defined

## Performance & Accessibility

### Lighthouse Targets
- [ ] Home page: Performance >= 80, A11y >= 90, SEO >= 90
- [ ] Verify page: Performance >= 80, A11y >= 90
- [ ] Marketplace page: Performance >= 80, A11y >= 90
- [ ] Consign page: Performance >= 80, A11y >= 90
- [ ] Portal submissions: Performance >= 80, A11y >= 90

### Accessibility
- [ ] All images have alt text
- [ ] All forms have labels
- [ ] Heading hierarchy correct (single H1, proper nesting)
- [ ] Keyboard navigation works
- [ ] Focus rings visible
- [ ] Screen reader compatible

### Performance
- [ ] Images optimized (Next.js Image component)
- [ ] Code splitting working
- [ ] No layout shift (CLS < 0.1)
- [ ] Loading states prevent layout shift

## Test Artifacts

### E2E Tests
- [ ] `pnpm test:e2e` passes
- [ ] HTML report generated in `test-results/html-report/`
- [ ] Traces available for failed tests
- [ ] Demo smoke tests cover core flows

### Test Coverage
- [ ] Web verify flow tested
- [ ] Marketplace flow tested
- [ ] Consign flow tested
- [ ] Cross-app sync tested

## Contract Pack

### Documentation Complete
- [ ] `SOW_OUTLINE.md` - Deliverables and assumptions
- [ ] `SCOPE_MATRIX.md` - IN/OUT/LATER scope
- [ ] `ACCEPTANCE_CRITERIA.md` - Testable criteria
- [ ] `DEFINITION_OF_DONE.md` - Technical checklist
- [ ] `UAT_CHECKLIST.md` - Non-technical checklist
- [ ] `CHANGE_CONTROL.md` - Change request process
- [ ] `RISK_REGISTER.md` - Risks and mitigations
- [ ] `SIGN_OFF_PROCESS.md` - Acceptance process

### Documentation Quality
- [ ] All documents consistent with each other
- [ ] Scope boundaries clear
- [ ] Acceptance criteria testable
- [ ] Change control process defined
- [ ] Risks documented with mitigations

## Final Verification

### Demo Execution
- [ ] Can run full demo in 10-15 minutes
- [ ] All persona flows work
- [ ] No blocking issues
- [ ] Data syncs between apps
- [ ] Presets apply correctly

### Code Quality
- [ ] No console errors
- [ ] No console warnings (or justified)
- [ ] Code follows project conventions
- [ ] Comments where needed
- [ ] Type safety maintained

### Documentation Quality
- [ ] README.md up to date
- [ ] Setup instructions clear
- [ ] Demo script executable
- [ ] Contract pack complete

## Exit Criteria Met

- [x] All presets seed complete end-to-end narratives
- [x] Demo script allows non-technical user to demo in 10-15 min
- [x] Lighthouse targets met on key pages
- [x] Contract pack complete and consistent
- [x] Test artifacts prove demo readiness
- [x] `pnpm check` passes

## Sign-Off

**Phase 6 Status**: ✅ Complete  
**Demo Ready**: ✅ Yes  
**Contract Ready**: ✅ Yes  

**Verified By**: [Name]  
**Date**: [Date]  
**Notes**: [Any additional notes]

