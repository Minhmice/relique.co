# Structure Map & Architecture Overview

Tài liệu này mô tả architecture overview và file organization của ứng dụng Relique.

## Architecture Overview

Relique là Next.js App Router application với TypeScript, Tailwind CSS, và shadcn/ui components. Application được tổ chức theo route groups và component-based architecture.

### Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui (Radix UI + Tailwind)
- **Forms:** React Hook Form + Zod
- **State:** React hooks + localStorage
- **Theme:** next-themes
- **Icons:** lucide-react

## File Organization

```
apps/web/
├── app/                          # Next.js App Router
│   ├── (public)/                # Public routes
│   │   ├── page.tsx             # Home page
│   │   ├── verify/              # Verify page
│   │   ├── marketplace/         # Marketplace pages
│   │   ├── consign/             # Consign page
│   │   ├── about/                # About page
│   │   ├── posts/                # Blog posts
│   │   ├── events/               # Events
│   │   ├── contact/              # Contact page
│   │   └── login/                # Login page
│   ├── (app)/                    # App portal routes
│   │   └── app/                  # App dashboard
│   ├── (admin)/                  # Admin routes
│   │   └── admin/                # Admin dashboard
│   ├── (legal)/                  # Legal pages
│   │   ├── policies/             # Policies page
│   │   └── terms/                # Terms page
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   ├── robots.ts                 # robots.txt
│   └── sitemap.ts                # sitemap.xml
├── src/
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components (DO NOT EDIT)
│   │   ├── shell/                # Shell components (Header, Footer, etc.)
│   │   ├── shared/               # Shared components
│   │   ├── sections/             # Section components (Bento, etc.)
│   │   ├── verify/               # Verify components
│   │   ├── marketplace/          # Marketplace components
│   │   ├── consign/              # Consign components
│   │   ├── content/              # Content components (Posts, Events)
│   │   ├── contact/              # Contact components
│   │   ├── home/                 # Home page components
│   │   ├── admin/                # Admin components
│   │   └── providers/            # Context providers
│   ├── lib/
│   │   ├── assets/               # Asset manifest
│   │   ├── og/                   # OG image utilities
│   │   ├── services/             # Service layer (mock data)
│   │   ├── types/                # TypeScript types
│   │   ├── utils.ts              # Utility functions
│   │   ├── storage.ts            # localStorage helpers
│   │   ├── constants.ts          # Constants
│   │   ├── auth.ts               # Auth helpers
│   │   └── validation.ts        # Validation utilities
│   ├── mocks/                    # Mock JSON data
│   └── hooks/                    # Custom React hooks
├── public/
│   └── brand/                    # Brand assets (logos)
├── docs/                         # Documentation
└── tests/                         # Test files
```

## Route Groups

### (public)
Public marketing và service pages. Không cần authentication.

**Routes:**
- `/` - Home page
- `/verify` - Verify product
- `/marketplace` - Browse items
- `/marketplace/[slug]` - Item detail
- `/consign` - Consign form
- `/about` - About page
- `/posts` - Blog posts
- `/posts/[slug]` - Post detail
- `/events` - Events
- `/events/[slug]` - Event detail
- `/contact` - Contact form
- `/login` - Login page

### (app)
App portal routes. Yêu cầu authentication (mock).

**Routes:**
- `/app` - Dashboard
- `/app/saved` - Saved items
- `/app/submissions` - User submissions
- `/app/profile` - User profile

### (admin)
Admin routes. Yêu cầu authentication (mock).

**Routes:**
- `/admin` - Admin dashboard
- `/admin/marketplace` - Manage listings
- `/admin/content` - Manage posts/events

### (legal)
Legal pages. Long-form content.

**Routes:**
- `/policies` - Privacy policy
- `/terms` - Terms of service

## Component Architecture

### Shell Components
Components được sử dụng trong layouts (Header, Footer, Sidebar, Topbar).

### Shared Components
Reusable components được sử dụng across multiple pages.

### Section Components
Marketing/section components (Bento grids, heroes, etc.).

### Feature Components
Components specific cho features (Verify, Marketplace, Consign).

## Service Layer

Service layer abstraction để dễ swap từ mock data sang real API:

- `marketplaceService` - Marketplace operations
- `contentService` - Posts và Events operations
- `consignService` - Consignment operations
- `adminService` - Admin CRUD operations

## Data Flow

1. **Pages** → Call service layer
2. **Service Layer** → Read/write mock data (localStorage hoặc in-memory)
3. **Components** → Receive data và render
4. **User Actions** → Update state → Service layer → localStorage

## State Management

- **Client State:** React hooks (useState, useEffect)
- **Persistent State:** localStorage (session, theme, favorites, drafts)
- **Form State:** React Hook Form
- **Theme State:** next-themes

## Styling System

- **CSS Variables:** Theme colors, spacing, typography
- **Tailwind Utilities:** Component styling
- **Design Tokens:** Centralized trong `globals.css`
- **Component Variants:** Tailwind classes với cn() helper

## Build & Deployment

- **Build:** `pnpm build`
- **Dev:** `pnpm dev`
- **Type Check:** `pnpm check-types`
- **Output:** Static + Server components (Next.js)

## Future Architecture Considerations

- **API Routes:** Next.js API routes cho backend integration
- **Database:** Prisma/TypeORM cho data persistence
- **Auth:** NextAuth.js hoặc Clerk cho real authentication
- **File Upload:** Cloud storage (S3, Cloudinary) cho media
- **Real-time:** WebSockets hoặc Server-Sent Events cho updates

