# Scope Matrix

## IN Scope ✅

### Frontend Development
- ✅ React/Next.js web application (`apps/web`)
- ✅ React/Next.js portal application (`apps/app-portal`)
- ✅ Shared UI component library (`packages/ui`)
- ✅ Shared domain logic package (`packages/shared`)

### Features Implemented
- ✅ Verify flow (product code input → loading → result → save)
- ✅ Marketplace (browse, filter, sort, detail, favorite)
- ✅ Consign form (long form, file upload, autosave)
- ✅ Content hub (posts, events, bookmarks)
- ✅ Portal dashboard (submissions, saved items, activity)

### Data & State Management
- ✅ Mock data fixtures (marketplace, posts, events)
- ✅ localStorage-based persistence
- ✅ Preset system (Collector/Investor/Dealer personas)
- ✅ Cross-app data sync via shared storage keys

### Quality & Testing
- ✅ TypeScript type safety
- ✅ ESLint boundary enforcement
- ✅ Performance optimization (images, code splitting)
- ✅ Accessibility compliance (WCAG 2.1 AA)

### Documentation
- ✅ Demo script with persona-specific flows
- ✅ Contract pack (8 documents)
- ✅ Component catalog
- ✅ API/service contracts

## OUT Scope ❌

### Backend & Infrastructure
- ❌ Backend API development
- ❌ Database design/implementation
- ❌ Server-side rendering optimization
- ❌ CDN configuration
- ❌ Production deployment setup

### Authentication & Security
- ❌ Real authentication system (OAuth, JWT, etc.)
- ❌ User management
- ❌ Role-based access control (RBAC)
- ❌ Session management
- ❌ Password reset flows

### Payments & Commerce
- ❌ Payment processing (Stripe, PayPal, etc.)
- ❌ Shopping cart
- ❌ Checkout flow
- ❌ Order management
- ❌ Invoice generation

### Real AI/ML Pipeline
- ❌ Actual authentication AI model
- ❌ Image processing pipeline
- ❌ Signature verification algorithm
- ❌ Confidence score calculation
- ❌ Machine learning training

### Third-Party Integrations
- ❌ Email service (SendGrid, Mailchimp)
- ❌ SMS notifications
- ❌ Social media integration
- ❌ Analytics (Google Analytics, Mixpanel)
- ❌ Error tracking (Sentry, Rollbar)

## LATER (Future Phases) 🔮

### Phase 7+ Considerations
- 🔮 Production backend API
- 🔮 Real authentication (NextAuth, Clerk, etc.)
- 🔮 Payment integration
- 🔮 Real AI authentication pipeline
- 🔮 Database migration from localStorage
- 🔮 Production deployment (Vercel, AWS, etc.)
- 🔮 CI/CD pipeline
- 🔮 Monitoring & logging
- 🔮 Internationalization (i18n)
- 🔮 Mobile app (React Native)

## Scope Boundaries

### What "Frontend-Only" Means
- All data operations use mock services
- No network requests to real APIs
- localStorage is the only persistence layer
- All authentication is mocked
- All payments are simulated

### What "Demo-Ready" Means
- Stable, predictable behavior (fixed latency, zero errors)
- One-click preset application
- Cross-app data sync works
- All core flows functional
- Documentation complete

### What "Contract-Ready" Means
- Clear scope boundaries documented
- Acceptance criteria testable
- Change control process defined
- Risk register maintained
- Sign-off process established

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| Phase 1 | Use localStorage for all persistence | Frontend-only requirement, no backend |
| Phase 2 | Consolidate UI in shared package | Avoid duplication, ensure consistency |
| Phase 4 | Result pattern for services | Prepare for API integration, error handling |
| Phase 5 | TypeScript Project References | Faster builds, better editor experience |
| Phase 6 | Demo mode with fixed latency | Stable demos, predictable behavior |

