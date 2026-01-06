# Statement of Work (SOW) Outline

## Project Overview

**Project Name**: Relique Platform - Frontend Demo & Contract-Ready Package  
**Client**: [Client Name]  
**Delivery Date**: [Date]  
**Status**: Phase 6 Complete - Demo Ready

## Deliverables by Phase

### Phase 1: Domain Source of Truth
- ✅ Centralized schemas, types, fixtures in `@relique/shared`
- ✅ Storage keys and helpers standardized
- ✅ Verify domain implemented end-to-end

### Phase 2: UI Consolidation
- ✅ All UI components in `@relique/ui`
- ✅ shadcn/ui components centralized
- ✅ Tailwind CSS configuration for monorepo

### Phase 3: Domain Data De-duplication
- ✅ All domain data (marketplace, consign, content) in `@relique/shared`
- ✅ Unified preset/seed system
- ✅ Storage contract v1 complete

### Phase 4: Service Layer Cleanup
- ✅ Service contracts in `@relique/shared/domain/contracts`
- ✅ Result + Error model standardized
- ✅ Adapter layer for mock/localStorage implementations
- ✅ Backward-compatible service wrappers

### Phase 5: Quality Gates
- ✅ TypeScript Project References
- ✅ ESLint boundary enforcement
- ✅ Playwright E2E tests
- ✅ CI-ready scripts pipeline

### Phase 6: Demo Packaging + Contract Pack
- ✅ Enhanced presets (Collector/Investor/Dealer)
- ✅ Demo mode stabilization
- ✅ Demo script documentation
- ✅ Public-facing hygiene (metadata/OG/sitemap)
- ✅ Performance & accessibility targets
- ✅ Contract pack documentation

## Assumptions

1. **Frontend-Only**: All data is mock/localStorage-based. No backend API integration.
2. **Demo Purpose**: Platform is designed for demo/presentation, not production use.
3. **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions).
4. **LocalStorage**: All data persistence uses browser localStorage (subject to quota limits).
5. **No Authentication**: Portal app goes directly to dashboard (no login required for demo).

## Out of Scope

### Explicitly Excluded
- Backend API development
- Real authentication system (OAuth, JWT, etc.)
- Payment processing integration
- Real AI/ML authentication pipeline
- Database design/implementation
- Production deployment infrastructure
- Mobile app development
- Third-party service integrations (Stripe, SendGrid, etc.)

### Future Phases (Not Included)
- Production backend development
- Real authentication implementation
- Payment gateway integration
- Real-time features (WebSockets, SSE)
- Advanced analytics
- Multi-tenant support
- Internationalization (i18n)

## Success Criteria

1. ✅ Both apps (web + portal) run stable on localhost
2. ✅ Presets apply successfully with one click
3. ✅ Demo script can be followed by non-technical user in 10-15 minutes
4. ✅ Lighthouse targets met (Performance >= 80, A11y >= 90, SEO >= 90)
5. ✅ All contract pack documents complete
6. ✅ Test artifacts available (HTML reports, traces)

## Handoff Deliverables

1. **Code Repository**: Complete monorepo with all phases implemented
2. **Documentation**: Contract pack (8 documents) + demo script
3. **Test Artifacts**: Playwright HTML reports and traces
4. **Demo Instructions**: Step-by-step guide for running demos

## Change Management

See `CHANGE_CONTROL.md` for process on scope changes and re-quotes.

