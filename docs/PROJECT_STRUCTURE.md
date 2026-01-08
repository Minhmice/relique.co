# Project Structure

## 📋 Tổng quan

Relique.co là một monorepo sử dụng pnpm workspaces, bao gồm 2 applications và 2 shared packages.

## 🏗️ Monorepo Structure

```
relique.co/
├── apps/
│   ├── web/              # Public web application (port 3000)
│   └── admin/            # Admin dashboard (port 3001)
├── packages/
│   ├── shared/           # Shared domain logic (schemas, types, storage)
│   └── ui/               # Shared UI components (shadcn/ui)
├── docs/                 # Project documentation
├── package.json          # Root package.json với workspace config
├── pnpm-workspace.yaml    # pnpm workspace configuration
├── turbo.json            # Turborepo configuration
└── tsconfig.json         # Root TypeScript config với project references
```

## 📦 Applications

### 1. Web App (`apps/web`)

**Mục đích:** Public-facing web application cho end users.

**Routes:**
- `/` - Home page
- `/verify` - Product verification
- `/marketplace` - Marketplace listings
- `/marketplace/[slug]` - Marketplace item detail
- `/consign` - Consignment form
- `/about` - About page
- `/contact` - Contact form
- `/posts` - Blog posts list
- `/posts/[slug]` - Blog post detail
- `/events` - Events list
- `/events/[slug]` - Event detail
- `/policies/privacy` - Privacy policy
- `/policies/terms` - Terms of service

**Key Features:**
- Product verification với QR scan và paste link
- Marketplace với filters, search, favorites
- Consignment form với autosave và file upload
- Content hub (posts, events)
- Dark-only theme

**Tech Stack:**
- Next.js 16+ (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- React Hook Form + Zod
- localStorage persistence

### 2. Admin Dashboard (`apps/admin`)

**Mục đích:** Admin dashboard cho quản lý verifications, consignments, và submissions.

**Routes:**
- `/admin` - Overview/Home page
- `/admin/dashboard` - Dashboard với stats và activity
- `/admin/submissions` - Submissions management (verify + consign)
- `/admin/profile` - User profile và settings

**Key Features:**
- Command palette (⌘K) cho quick navigation
- Table personalization (column visibility, saved views)
- Advanced search với recent searches
- Notification center với alert rules
- Activity log
- Multi-tab sync

**Tech Stack:**
- Next.js 16+ (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- cmdk (command palette)
- @tanstack/react-table
- localStorage persistence

## 📚 Packages

### 1. Shared Package (`packages/shared`)

**Mục đích:** Shared domain logic, schemas, types, và storage utilities.

**Structure:**
```
packages/shared/
├── src/
│   ├── domain/
│   │   ├── schemas/       # Zod schemas
│   │   ├── types/         # TypeScript types
│   │   ├── storage/       # Storage keys và helpers
│   │   └── fixtures/      # Mock data/fixtures
│   └── config/            # Shared configs (URLs, etc.)
└── package.json
```

**Exports:**
- Zod schemas cho validation
- TypeScript types (inferred từ schemas)
- Storage keys và helpers
- Mock data/fixtures
- Config utilities

**Usage:**
```typescript
import { VerifyResultSchema } from "@relique/shared/domain/schemas";
import type { VerifyResult } from "@relique/shared/domain/types";
import { STORAGE_KEYS } from "@relique/shared/domain/storage/keys";
```

### 2. UI Package (`packages/ui`)

**Mục đích:** Shared UI components (shadcn/ui và custom components).

**Structure:**
```
packages/ui/
├── src/
│   ├── shadcn/
│   │   └── ui/            # shadcn/ui components
│   ├── form/              # Form components
│   ├── table/              # Table components
│   └── index.ts            # Public exports
└── package.json
```

**Exports:**
- shadcn/ui components (Button, Card, Dialog, etc.)
- Form components (Form, FormField, UploadManager)
- Table components (DataTable)

**Usage:**
```typescript
import { Button } from "@relique/ui";
import { DataTable } from "@relique/ui/table";
```

**Important Rules:**
- **Never edit** files in `packages/ui/src/shadcn/ui/**` directly
- Use wrapper/compose pattern in app-specific components
- Each component file must be ≤ 300 lines

## 🔗 Dependencies & Imports

### Import Rules

1. **Apps → Packages:**
   - Apps import từ `@relique/shared` và `@relique/ui`
   - Apps không import trực tiếp từ app khác

2. **Packages → Packages:**
   - `@relique/ui` có thể import từ `@relique/shared` nếu cần
   - `@relique/shared` không import từ `@relique/ui` (no circular deps)

3. **Internal Imports:**
   - Use `@/` alias cho app-specific imports
   - Use package names cho cross-package imports

### TypeScript Project References

Root `tsconfig.json` defines project references:
```json
{
  "references": [
    { "path": "./packages/shared" },
    { "path": "./packages/ui" },
    { "path": "./apps/web" },
    { "path": "./apps/admin" }
  ]
}
```

Each package/app has `composite: true` in its `tsconfig.json` to enable project references.

## 🗂️ Storage Structure

### Storage Keys

All storage keys follow pattern: `relique.v1.{domain}.{entity}`

**Shared Keys:**
- `relique.v1.session.mock` - Mock session data
- `relique.v1.marketplace.listings` - Marketplace listings
- `relique.v1.marketplace.favorites` - Favorite items
- `relique.v1.verify.history` - Verification history
- `relique.v1.consign.drafts` - Consignment drafts
- `relique.v1.consign.submissions` - Consignment submissions
- `relique.v1.content.posts` - Blog posts
- `relique.v1.content.events` - Events

**Admin-Specific Keys:**
- `relique.v1.admin.views.submissions.columns` - Column visibility
- `relique.v1.admin.views.submissions.saved` - Saved views
- `relique.v1.admin.recentSearches.submissions` - Recent searches
- `relique.v1.admin.savedFilters.submissions` - Saved filters
- `relique.v1.admin.notifications` - Notifications
- `relique.v1.admin.alertRules` - Alert rules
- `relique.v1.admin.activityLog` - Activity log

### Storage Helpers

Storage helpers are defined in:
- `packages/shared/src/domain/storage/` - Shared storage utilities
- `apps/*/src/lib/storage.ts` - App-specific storage wrappers

## 🎨 Design System

### Theme

- **Mode:** Dark-only (forced dark mode)
- **Border Radius:** `rounded-0` (no border radius)
- **Primary Colors:** Navy/Blue
- **Accent Colors:** Gold
- **Typography:** Geist Sans (variable font)

### Component Rules

1. **File Size Limit:** Each component file ≤ 200 lines (apps) or ≤ 300 lines (packages)
2. **shadcn Guard:** Never edit `packages/ui/src/shadcn/ui/**` directly
3. **Wrapper Pattern:** Create wrapper components in app-specific folders
4. **Composition:** Prefer composition over inheritance

## 🚀 Development Workflow

### Setup

```bash
# Install dependencies
pnpm install

# Run development servers
pnpm dev              # Run all apps
pnpm dev:web          # Run web app only
pnpm dev:admin        # Run admin dashboard only
pnpm dev:all          # Run both apps
```

### Build

```bash
# Build all packages and apps
pnpm build

# Build specific app
pnpm build --filter=web
pnpm build --filter=admin
```

### Quality Checks

```bash
# Lint all packages and apps
pnpm lint

# Type check all packages and apps
pnpm typecheck

# Run all checks (lint + typecheck + build)
pnpm check
```

## 📝 Key Conventions

### Naming

- **Components:** PascalCase (e.g., `VerifyResult.tsx`)
- **Files:** kebab-case (e.g., `verify-result.tsx`)
- **Hooks:** camelCase với `use` prefix (e.g., `useStorageSync.ts`)
- **Services:** camelCase với `Service` suffix (e.g., `verifyService.ts`)

### File Organization

- **Components:** `src/components/{domain}/{ComponentName}.tsx`
- **Services:** `src/lib/services/{domain}Service.ts`
- **Hooks:** `src/hooks/{hookName}.ts`
- **Types:** `packages/shared/src/domain/types/`
- **Schemas:** `packages/shared/src/domain/schemas/`

### Route Groups

Next.js route groups (folders with parentheses) are used for organization:
- `(public)` - Public routes (web app)
- `(portal)` - Admin routes (admin app)
- `(legal)` - Legal pages (web app)

Route groups do not affect URL paths.

## 🔧 Configuration Files

### Root Level

- `package.json` - Workspace configuration, scripts
- `pnpm-workspace.yaml` - pnpm workspace definition
- `turbo.json` - Turborepo task configuration
- `tsconfig.json` - Root TypeScript config với project references

### App Level

- `apps/*/package.json` - App-specific dependencies
- `apps/*/next.config.js` - Next.js configuration
- `apps/*/tsconfig.json` - App-specific TypeScript config
- `apps/*/tailwind.config.ts` - Tailwind configuration
- `apps/*/components.json` - shadcn/ui configuration

### Package Level

- `packages/*/package.json` - Package dependencies và exports
- `packages/*/tsconfig.json` - Package TypeScript config với `composite: true`

## 📚 Documentation

### Project Documentation

- `README.md` - Root project overview
- `docs/PROJECT_STRUCTURE.md` - This file
- `docs/MONOREPO_CONVENTIONS.md` - Monorepo conventions và best practices
- `docs/ACCEPTANCE_CRITERIA.md` - Acceptance criteria cho routes
- `docs/DEFINITION_OF_DONE.md` - Definition of Done checklist

### App-Specific Documentation

- `apps/web/README.md` - Web app documentation
- `apps/admin/README.md` - Admin dashboard documentation

## 🎯 Next Steps

1. **Backend Integration:** Replace mock services với real API calls
2. **Authentication:** Implement real OAuth providers
3. **Database:** Connect to database và migrate từ localStorage
4. **Cloud Storage:** Integrate cloud storage cho file uploads
5. **Production Deployment:** Setup production environment

---

**Last Updated:** 2024-12-19  
**Version:** 1.0  
**Status:** Production-Ready

