# Scope Boundaries

Tài liệu này mô tả scope boundaries của Phase 5 để ghi vào hợp đồng cho rõ ràng.

## What's Included (Phase 5)

### Frontend-Only Application
- ✅ Complete Next.js frontend application
- ✅ Mock data và localStorage persistence
- ✅ Client-side routing và navigation
- ✅ Responsive design (desktop-first)
- ✅ Dark/Light theme system

### Mock Features
- ✅ Mock authentication (3 login options)
- ✅ Mock verification flow (5s loading → result)
- ✅ Mock marketplace (browse, filter, detail)
- ✅ Mock consignment form (autosave, validation)
- ✅ Mock admin CRUD (localStorage)

### Design System
- ✅ Complete design tokens (navy/gold, rounded-0)
- ✅ Typography system
- ✅ Component library (shadcn/ui + custom)
- ✅ Bento grid modules
- ✅ Asset manifest và Media component

### SEO & Metadata
- ✅ Page-level metadata
- ✅ OG images strategy
- ✅ robots.txt và sitemap.xml
- ✅ Dynamic metadata cho detail pages

### Documentation
- ✅ README với setup instructions
- ✅ Component catalog
- ✅ Structure map
- ✅ QA checklist
- ✅ Demo script
- ✅ Smoke tests

## What's NOT Included

### Backend/API
- ❌ Real backend server
- ❌ Database integration
- ❌ API endpoints
- ❌ Server-side data processing

### Real Authentication
- ❌ Real authentication flow (OAuth, email verification)
- ❌ User management system
- ❌ Role-based access control (RBAC)
- ❌ Session management (server-side)

### Payment Processing
- ❌ Payment gateway integration
- ❌ Transaction processing
- ❌ Invoice generation
- ❌ Fee calculation

### Real Marketplace
- ❌ Real inventory management
- ❌ Real search indexing
- ❌ Real-time inventory updates
- ❌ Order processing
- ❌ Shipping integration

### File Upload (Cloud)
- ❌ Cloud storage integration (S3, Cloudinary)
- ❌ Image processing pipeline
- ❌ CDN integration
- ❌ File management system

### Moderation & Audit
- ❌ Content moderation system
- ❌ Audit logs
- ❌ Admin approval workflows
- ❌ Reporting system

### Email Notifications
- ❌ Email service integration
- ❌ Transactional emails
- ❌ Notification system

### Real-time Features
- ❌ WebSocket connections
- ❌ Real-time updates
- ❌ Live chat
- ❌ Notifications

## Data Persistence

### Current (Phase 5)
- **localStorage:** Session, theme, favorites, drafts, verify history
- **In-memory:** Mock data từ JSON files
- **No Database:** Tất cả data là mock/temporary

### Future (Post-Phase 5)
- **Database:** PostgreSQL/MongoDB cho persistent data
- **API:** REST/GraphQL API cho data operations
- **File Storage:** Cloud storage cho uploads
- **Cache:** Redis cho caching

## Testing

### Included
- ✅ Smoke tests cho critical flows
- ✅ Manual QA checklist
- ✅ Accessibility audit

### Not Included
- ❌ Comprehensive E2E test suite
- ❌ Unit tests cho components
- ❌ Integration tests
- ❌ Performance testing
- ❌ Load testing

## Deployment

### Included
- ✅ Build configuration
- ✅ Environment variables setup
- ✅ Static asset optimization

### Not Included
- ❌ Deployment pipeline
- ❌ CI/CD configuration
- ❌ Production hosting setup
- ❌ Domain configuration
- ❌ SSL certificates

## Support & Maintenance

### Included
- ✅ Documentation đầy đủ
- ✅ Code comments và structure
- ✅ Component catalog

### Not Included
- ❌ Ongoing support
- ❌ Bug fixes sau handoff
- ❌ Feature additions
- ❌ Performance monitoring
- ❌ Error tracking

## Assumptions

1. **Mock Data:** Tất cả data là mock, không có real data
2. **LocalStorage:** Data chỉ persist trong browser, không sync across devices
3. **No Backend:** Không có backend server, tất cả là frontend-only
4. **Desktop-First:** Responsive nhưng ưu tiên desktop experience
5. **No Production:** Application chưa ready cho production deployment

## Handoff Deliverables

1. **Code Repository:** Complete source code
2. **Documentation:** All documentation files
3. **Build Instructions:** README với setup steps
4. **Demo Script:** Script để trình bày cho client
5. **Component Catalog:** List tất cả components
6. **Scope Boundaries:** This document

## Next Steps After Contract

Sau khi ký hợp đồng, các next steps được mô tả trong `docs/NEXT_STEPS.md`:

- Phase Backend/API integration
- Real authentication implementation
- Payment processing integration
- Real marketplace inventory
- Moderation & audit system

