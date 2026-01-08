# Relique.co - Frontend Application

**Version:** 1.0  
**Status:** Demo-Ready / Contract-Ready  
**Type:** Frontend-Only (Mock Data)

---

## 📋 Tổng quan dự án

Relique.co là platform probabilistic authentication cho collectibles và memorabilia. Dự án này phát triển frontend demo-ready application để showcase platform capabilities và chốt hợp đồng phát triển tiếp.

### Mục tiêu

- ✅ Tạo frontend application hoàn chỉnh với mock data để demo cho client
- ✅ Thiết lập design system và component library có thể scale
- ✅ Chuẩn bị foundation để integrate với backend trong phases tiếp theo
- ✅ Deliver demo-ready application đủ để chốt hợp đồng

### Đặc điểm chính

- **Frontend-Only:** Không có backend, tất cả data là mock
- **Mock Verification:** Loading ~5s, result table với status explanations
- **Mock Marketplace:** Browse, filter, favorite, detail view
- **Mock Consignment:** Form với autosave, file upload (local), validation
- **Theme System:** Dark-only (single-tone dark theme)
- **Responsive:** Desktop-first design
- **Monorepo Structure:** Web app (port 3000) + Admin Dashboard (port 3001)

---

## 🛠️ Tech Stack

### Core
- **Framework:** Next.js 16+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui (Radix UI + Tailwind)
- **Forms:** React Hook Form + Zod
- **State:** React hooks + localStorage
- **Theme:** Dark-only (forced dark mode)

### Design System
- **Theme:** rounded-0 (no border radius)
- **Colors:** Navy/blue primary + Gold accent
- **Modes:** Dark-only (single-tone dark)
- **Typography:** Geist Sans (variable font)
- **Responsive:** Desktop-first design

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) hoặc npm/yarn

### Installation

```bash
# Clone repository
git clone [repository-url]
cd relique.co

# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Development

```bash
# Run web app (port 3000)
pnpm dev:web
# hoặc
cd apps/web
pnpm dev

# Run admin dashboard (port 3001)
pnpm dev:admin
# hoặc
cd apps/admin
pnpm dev

# Run cả hai apps cùng lúc
pnpm dev:all
```

- Web app: `http://localhost:3000`
- Admin dashboard: `http://localhost:3001`

---

## 📁 Project Structure

```
relique.co/
├── apps/
│   ├── web/                 # Main Next.js application (port 3000)
│   │   ├── app/            # Next.js App Router
│   │   │   ├── (public)/   # Public routes
│   │   │   ├── (admin)/    # Admin routes (requires dev flag)
│   │   │   └── (legal)/    # Legal pages
│   │   ├── src/
│   │   │   ├── components/ # React components
│   │   │   ├── lib/        # Utilities, services, hooks
│   │   │   └── mocks/      # Mock data (JSON)
│   │   └── public/         # Static assets
│   ├── admin/              # Admin dashboard (port 3001)
│   │   ├── app/            # Next.js App Router
│   │   │   ├── login/      # Login page
│   │   │   └── admin/      # Admin routes (Overview, Dashboard, Submissions, Profile)
│   │   └── src/
│   │       ├── components/ # React components
│   │       └── lib/        # Utilities, services
│   └── docs/               # Documentation app
├── packages/
│   ├── shared/             # Shared schemas, types, storage (NEW)
│   ├── ui/                 # Shared UI components
│   ├── eslint-config/      # ESLint configs
│   └── typescript-config/   # TypeScript configs
└── README.md
```

### Route Groups

- **`(public)`:** Public pages (Home, Verify, Marketplace, Consign, About, Contact, Posts, Events)
- **`(portal)`:** Admin dashboard (Login, Overview, Dashboard, Submissions, Profile)
- **`(admin)`:** Admin-lite (Dashboard, Marketplace CRUD, Content CRUD)
- **`(legal)`:** Legal pages (Policies, Terms)

---

## 🎯 Features

### Public Pages

- **Home (`/`):** Module-based layout với bento grid, hero section, featured items/posts/events
- **Verify (`/verify`):** Input code, loading ~5s, result table với status explanations, save history
- **Marketplace (`/marketplace`):** List với search, filters, sort, grid/list toggle, pagination
- **Marketplace Detail (`/marketplace/[slug]`):** Gallery, metadata, trust panel, related items, favorite button
- **Consign (`/consign`):** Long form, drag/drop upload, autosave draft, validation
- **About (`/about`):** Anchor navigation, 4 sections, partner block, team grid
- **Policies/Terms:** Long-form readable content với TOC
- **Contact (`/contact`):** Simple form với validation
- **Posts/Events:** Content hub với list + detail pages

### Admin Dashboard (Separate App - Port 3001)

Admin dashboard là một Next.js app riêng trong monorepo, chạy trên port 3001:

- **Login (`/login`):** 3 login methods (Email/Password, Magic Link, Social) - UI tabs, mock authentication
- **Overview (`/admin`):** Home page với quick stats và quick actions
- **Dashboard (`/admin/dashboard`):** Welcome message, quick stats, recent activity
- **Submissions (`/admin/submissions`):** Consign drafts + verify history list với advanced search và table personalization
- **Profile (`/admin/profile`):** User profile, data export/reset

**Chạy admin dashboard:**
```bash
pnpm dev:admin
# hoặc
cd apps/admin
pnpm dev
```

### Admin-Lite (Mock)

**Lưu ý:** Admin chỉ accessible khi set `NEXT_PUBLIC_ENABLE_ADMIN=true` trong `.env.local`

- **Admin Dashboard (`/admin`):** Admin shell
- **Admin Marketplace (`/admin/marketplace`):** CRUD mock cho listings (localStorage)
- **Admin Content (`/admin/content`):** CRUD mock cho posts/events (localStorage)

---

## 🎨 Design System

### Theme Tokens

- **Primary:** Navy/Blue (`#1e3a8a`, `#3b82f6`)
- **Accent:** Gold (`#d4af37`, `#fbbf24`)
- **Background:** Dark-only (`#0a0a0a`) - forced dark mode
- **Card Background:** Slightly lighter dark (`#0f0f0f`) for subtle 2-level surfaces
- **Border Radius:** `rounded-0` (enforced toàn app)

### Components

- **Shell:** Header, Footer, Sidebar, Topbar
- **Sections:** Hero, Bento Grid, Media Cards, Stat Rows, Ticker
- **Forms:** Input, Textarea, Select, File Upload
- **Tables:** DataTable với sorting, filtering, pagination
- **UI:** Button, Card, Dialog, Dropdown, Tabs, Badge, Skeleton

### Component Rules

- **File Size Limit:** Mỗi component file ≤ 200 lines
- **shadcn Guard:** Không edit trực tiếp `components/ui/**`, dùng wrapper/compose pattern
- **Media Component:** Dùng `Media` component cho tất cả images
- **Rounded-0:** Enforced toàn app (audit pass)

---

## 📝 Development Guidelines

### Code Quality

- **TypeScript:** Strict mode, no `any` types
- **Linting:** ESLint với max-warnings 0
- **Formatting:** Prettier (nếu configured)
- **File Size:** Components ≤ 200 lines

### Component Structure

```typescript
// Example component structure
"use client";

import { ComponentProps } from "react";
import { BaseComponent } from "@/components/ui/base";

type Props = ComponentProps<typeof BaseComponent> & {
  // Custom props
};

export function MyComponent({ ...props }: Props) {
  return <BaseComponent {...props} />;
}
```

### Mock Data

- **Location:** `src/mocks/*.json`
- **Services:** `src/lib/services/*Service.ts`
- **Storage:** `packages/shared/src/storage/*` (typed localStorage helpers with versioning)

### State Management

- **Client State:** React hooks (`useState`, `useEffect`)
- **Persistence:** localStorage với versioned keys (`relique.v1.*`)
- **Shared Types:** `@repo/shared` package (schemas + types + storage)
- **Form State:** React Hook Form + Zod validation

---

## 🧪 Testing

### Smoke Tests

```bash
# Run smoke tests
cd apps/web
pnpm test
```

Smoke tests cover critical flows:
- Login mock → Dashboard (app-portal)
- Verify → Result → Save history
- Marketplace → Detail → Favorite
- Consign → Upload → Autosave → Submit
- Storage sync between web and app-portal (shared keys)

### Manual Testing

See `UAT_CHECKLIST.md` for manual testing checklist.

---

## 📚 Documentation

### Project Documentation

- **README.md:** This file
- **Component Catalog:** Component usage và examples
- **Structure Map:** Architecture overview
- **Scope Boundaries:** Scope IN/OUT matrix

### Contract-Ready Documentation

- **SOW Outline:** Statement of Work structure
- **Scope Matrix:** Scope IN/OUT boundaries
- **Acceptance Criteria:** Per-route acceptance criteria
- **Definition of Done:** Global DoD checklist
- **UAT Checklist:** User acceptance testing checklist
- **Known Limitations:** Documented limitations
- **Change Control:** Change request process
- **Risk Register:** Risk tracking và mitigations
- **Sign-off Process:** Acceptance và payment gate

---

## ⚠️ Known Limitations

### Mock-Only

- **Authentication:** Mock - nhập bất kỳ email/password đều login được
- **Verification:** Result là mock - không có real authentication logic
- **Marketplace:** Data là mock - không có real inventory
- **Consignment:** Submission là mock - không có real processing

### LocalStorage

- **Data Persistence:** Tất cả data persist trong localStorage (browser only)
- **Storage Keys:** Versioned keys (`relique.v1.*`) - clean slate approach (no migration from old keys)
- **Storage Sync:** Web app và app-portal share data qua cùng storage keys (localStorage sync)
- **File Uploads:** Chỉ lưu metadata (name, size, type) - không lưu binary files vào localStorage
- **Blob URLs:** File preview URLs có thể mất khi reload (chỉ lưu metadata)
- **Session:** Session chỉ lưu trong localStorage, không secure
- **Size Limits:** Guardrails để tránh localStorage quá lớn (max 200 items/key, 100KB/item)

### Frontend-Only

- **No Backend:** Không có backend server, không có API endpoints
- **No Database:** Không có database, không có persistent storage
- **No Real-time:** Không có real-time updates

Xem `KNOWN_LIMITATIONS.md` để biết chi tiết.

---

## 🔧 Environment Variables

Tạo file `.env.local` trong `apps/web/`:

```env
# Optional: Add environment variables here
# Currently no required env vars (all mock data)
```

---

## 🚢 Build & Deploy

### Build

```bash
# Build web app
cd apps/web
pnpm build

# Build from root
pnpm build --filter=web
```

### Production

```bash
# Start production server
pnpm start
```

**Note:** Application chưa ready cho production deployment (frontend-only, mock data).

---

## 📦 Deliverables

### Phase 1-3: Foundation & Features
- ✅ Next.js setup với TypeScript + Tailwind + shadcn/ui
- ✅ Design system (rounded-0, navy/gold, dark-only)
- ✅ Public pages (Verify, Marketplace, Consign, About, Policies/Terms)
- ✅ App portal tách riêng (port 3001) - Login, Dashboard, Saved, Submissions, Profile
- ✅ Admin-lite (CRUD mock)
- ✅ Content hub (Posts, Events)

### Phase 4: Hardening & Polish
- ✅ Route groups/layouts (Public/App/Admin/Legal)
- ✅ Dark-only mode (single-tone dark theme)
- ✅ App portal tách riêng trong monorepo
- ✅ Verify flow hoàn chỉnh
- ✅ Forms: RHF+Zod validation + autosave
- ✅ Metadata/OG + robots + sitemap

### Phase 5: Final Polish & Demo Readiness
- ✅ Asset Manifest + Media component
- ✅ QA checklist pass
- ✅ Smoke tests
- ✅ Demo script
- ✅ Handoff documentation

### Phase 6: Contract-Ready Scope Pack ✅ HOÀN THÀNH

**Mục tiêu:** Chuẩn hóa toàn bộ dự án thành "contract-ready" với documentation đầy đủ để chốt hợp đồng với client.

**Đã hoàn thành:**

1. **SOW Outline (`docs/SOW_OUTLINE.md`)**
   - Statement of Work với 10 sections đầy đủ
   - Project overview, Scope IN/OUT, Deliverables
   - Client responsibilities, Assumptions, Dependencies
   - Change Control, Acceptance process, Warranty, IP/Payment

2. **Scope Matrix (`docs/SCOPE_MATRIX.md`)**
   - Clear IN/OUT boundaries (1 trang summary)
   - Key boundaries: Mock vs Real, Local vs Cloud, Frontend vs Backend
   - Change Request rule-of-thumb

3. **Acceptance Criteria Matrix (`docs/ACCEPTANCE_CRITERIA.md`)**
   - Testable, outcome-focused criteria cho từng route/page
   - Columns: Must-have UI, States & Behaviors, Persist/Mock, Notes
   - Detailed acceptance criteria cho 20+ routes

4. **Definition of Done (`docs/DEFINITION_OF_DONE.md`)**
   - Global DoD checklist (8 sections)
   - Code Quality, Design System Compliance, Responsive Design
   - State Coverage, Accessibility, Mock Persistence, Documentation, Testing

5. **UAT Checklist (`docs/UAT_CHECKLIST.md`)**
   - 5 critical flows với pass/fail criteria:
     - Flow 1: Theme Toggle + Persistence
     - Flow 2: Login Mock → Dashboard → Logout
     - Flow 3: Verify → Loading → Result → Save History
     - Flow 4: Marketplace → Detail → Favorite → Saved
     - Flow 5: Consign → Upload → Autosave → Reload → Restore → Submit
   - Additional test cases: Navigation, Responsive, Accessibility

6. **Known Limitations (`docs/KNOWN_LIMITATIONS.md`)**
   - Documented limitations: Mock-Only, LocalStorage, Frontend-Only
   - Performance, Browser, Design, SEO, Testing limitations
   - Client acknowledgment section

7. **Change Control Process (`docs/CHANGE_CONTROL.md`)**
   - 4-step process: CR Submission → Impact Assessment → Approval → Scope Update
   - Change Request template form
   - Change Request log format
   - Examples và best practices

8. **Risk Register (`docs/RISK_REGISTER.md`)**
   - Top 6 risks với format: Risk | Probability | Impact | Severity | Trigger | Mitigation | Owner | Status
   - Risks: Scope Creep, Asset/Content Delay, Dark/Light Contrast, Upload Local Limitations, Performance, Expectation Gap
   - Risk monitoring và escalation strategies

9. **Sign-off & Payment Gate (`docs/SIGN_OFF_PROCESS.md`)**
   - Acceptance Gate criteria (DoD + Acceptance Criteria + UAT pass)
   - Sign-off methods: Email confirmation hoặc Biên bản nghiệm thu
   - Payment gate process và schedule
   - Feedback window và dispute resolution

**Kết quả:**
- ✅ Dự án đã sẵn sàng cho contract-ready phase
- ✅ Documentation đầy đủ để chốt hợp đồng với client
- ✅ Clear scope boundaries, acceptance criteria, và risk management
- ✅ Process rõ ràng cho change control và sign-off

---

## 🚀 Tiếp theo - Roadmap

### Phase 7: Backend Integration (Tương lai)

**Mục tiêu:** Integrate frontend với real backend API, thay thế mock data bằng real data.

**Planned work:**

1. **API Integration**
   - Setup API client (Axios/Fetch wrapper)
   - Replace mock services với real API calls
   - Error handling và retry logic
   - Loading states và error states

2. **Real Authentication**
   - Integrate OAuth providers (Google, Apple)
   - JWT token management
   - Server-side session management
   - Protected routes với middleware

3. **Database Integration**
   - Connect to database (PostgreSQL/MongoDB)
   - Replace localStorage với database persistence
   - Real-time data sync
   - Data migration từ mock data

4. **File Upload (Cloud)**
   - Integrate cloud storage (S3, Cloudinary)
   - Image processing pipeline
   - CDN integration
   - File management system

5. **Real Features**
   - Real verification logic với backend processing
   - Real marketplace với inventory management
   - Real consignment workflow với review process
   - Real-time notifications

### Phase 8: Production Deployment (Tương lai)

**Mục tiêu:** Deploy application lên production environment.

**Planned work:**

1. **Infrastructure**
   - Setup production environment (Vercel/AWS)
   - Domain configuration
   - SSL certificates
   - CDN setup

2. **CI/CD Pipeline**
   - GitHub Actions / GitLab CI
   - Automated testing
   - Automated deployment
   - Rollback strategy

3. **Monitoring & Analytics**
   - Error tracking (Sentry)
   - Performance monitoring
   - User analytics
   - Uptime monitoring

4. **Security**
   - Security audit
   - Penetration testing
   - Rate limiting
   - CORS configuration

5. **Documentation**
   - API documentation
   - Deployment guide
   - Runbook
   - Troubleshooting guide

### Phase 9: Feature Enhancements (Tương lai)

**Mục tiêu:** Thêm features và enhancements dựa trên user feedback.

**Planned work:**

1. **Advanced Features**
   - Advanced search với filters
   - Recommendation engine
   - Social features (sharing, comments)
   - Notifications system

2. **Mobile App**
   - React Native app
   - Mobile-optimized UI/UX
   - Push notifications
   - Offline support

3. **Admin Panel**
   - Full admin functionality
   - User management
   - Content moderation
   - Analytics dashboard

4. **Payment Integration**
   - Payment gateway integration
   - Transaction processing
   - Invoice generation
   - Fee calculation

---

## 📊 Project Status

### Current Status: ✅ Contract-Ready

- **Phase 1-3:** ✅ Completed (Foundation & Features)
- **Phase 4:** ✅ Completed (Hardening & Polish)
- **Phase 5:** ✅ Completed (Final Polish & Demo Readiness)
- **Phase 6:** ✅ Completed (Contract-Ready Scope Pack)

### Next Milestones

- **Phase 7:** Backend Integration (Planning)
- **Phase 8:** Production Deployment (Planning)
- **Phase 9:** Feature Enhancements (Planning)

---

## 🤝 Contributing

### Development Workflow

1. Create feature branch
2. Implement feature (follow guidelines)
3. Test locally
4. Submit for review

### Code Review

- TypeScript errors = blocker
- Linting errors = blocker
- File size > 200 lines = refactor required
- Missing tests = review required

---

## 📄 License

[To be defined per contract]

---

## 📞 Contact

[Contact information]

---

## 🎯 Next Steps

1. **Backend Integration:** Integrate với real backend API
2. **Real Authentication:** Implement real OAuth providers
3. **Database:** Connect to database
4. **Cloud Storage:** Integrate cloud storage cho file uploads
5. **Production Deployment:** Setup production environment
6. **CI/CD:** Setup continuous integration/deployment

Xem `NEXT_STEPS.md` để biết chi tiết.

---

**Last Updated:** 2024-12-19  
**Version:** 1.0  
**Phase:** Phase 6 Completed ✅
