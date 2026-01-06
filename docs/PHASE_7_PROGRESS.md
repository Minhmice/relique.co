# Phase 7: "Impress + Extend" Feature Pack - Progress Tracking

## ✅ Đã hoàn thành

### 0) Pre-flight
- ✅ Phase 6 DONE: demo script + contract pack + quality gates
- ✅ Phase 5 DONE: lint/typecheck/e2e/build chạy được
- ✅ Phase 4 DONE: UI chỉ gọi services qua registry/context
- ✅ Fixed ESLint config cho `packages/shared`

### 1) Monorepo "Final Conventions"
- ✅ `transpilePackages` đã có `@relique/shared` + `@relique/ui` trong cả 2 apps
- ✅ TypeScript project references: `composite: true` cho packages, references cho apps
- ✅ Root `tsconfig.json` với references graph
- ✅ `components.json` đã có cho cả 2 apps
- ✅ Created `docs/MONOREPO_CONVENTIONS.md` - documentation
- ✅ Route groups structure đã ổn (không cần refactor)

### 2) Web - Verify "Pro Demo" Pack (Partial)
- ✅ **Verify Input Modes**: 
  - Tab 1: Enter Product Code (đã có)
  - Tab 2: QR Scan (đã có mock camera modal)
  - Tab 3: Paste Verification Link (✅ mới thêm - extract code từ URL)
- ✅ **Result Experience Upgrade**:
  - ✅ Created `VerifyResultEnhanced.tsx` với:
    - Confidence meter (Progress component)
    - Status pill
    - "Explain this result" accordion với breakdown (pattern/stroke/velocity/pressure/consistency)
    - Actions: Copy link, Share, Download, Print, Save to Vault, Pin
  - ✅ Updated verify page để dùng `VerifyResultEnhanced`
  - ✅ Added Progress component vào `@relique/ui`
- ✅ **Edge States**:
  - ✅ Created `VerifyEmptyState.tsx`
  - ✅ Created `VerifyErrorState.tsx`
  - ⏳ `InconclusiveUpsell.tsx` - bị timeout, cần tạo lại

## ⏳ Đang làm / Còn lại

### 2) Web - Verify "Pro Demo" Pack (Còn lại)
- [ ] **InconclusiveUpsell component** - tạo lại file (bị timeout)
- [ ] **History view nâng cấp**:
  - [ ] Timeline view cho verify history
  - [ ] Filters (status/date)
  - [ ] Pin/unpin items trong history
  - [ ] Update submissions page để dùng enhanced history view
- [ ] **Integration**: 
  - [ ] Thêm InconclusiveUpsell vào verify page khi status = "inconclusive"
  - [ ] Thêm empty state vào history khi chưa có verify
  - [ ] Thêm error state khi verify fail

### 3) Web - Marketplace "Investor-grade" Pack
- [ ] **Listing Explore Upgrade**:
  - [ ] Filters: athlete/team/category/issuer/year/price range (mock)
  - [ ] Sort: newest, highest value, "trust score" (mock), featured
  - [ ] View modes: grid / list / compact
  - [ ] Saved Search: save current query, quick apply chips
- [ ] **Detail Page Upgrade**:
  - [ ] Gallery nâng cấp: zoom/lightbox
  - [ ] Trust Panel nâng cấp: verification badge + ID, "traceability" mock timeline
  - [ ] Compare Drawer: compare 2-3 items (key fields)
  - [ ] Watchlist: add to watchlist + "mock alerts" (đẩy vào portal notifications)
- [ ] **Marketplace-to-Portal Sync**:
  - [ ] Favorite/watchlist/saved searches đọc được ở portal ngay (storage v1)

### 4) Web - Consign "Goldin-style" Long Form 2.0
- [ ] **Draft UX**:
  - [ ] Draft status bar (Saved / Saving / Error)
  - [ ] Autosave debounce + manual "Save now"
  - [ ] Draft versions (lightweight): keep last 3 snapshots per draft (local)
- [ ] **Upload Manager nâng cấp**:
  - [ ] Drag/drop zone + file list
  - [ ] File rules: max files / max total size / allowed types
  - [ ] Client-side validation: thiếu ảnh full-item / close-up → warn
  - [ ] Organize: tag "Full item / Signature close-up / Supporting doc"
- [ ] **Submission Preview (mock)**:
  - [ ] Preview page: render "what we received" (read-only)
  - [ ] "Submit" button chỉ đổi trạng thái draft -> Submitted (local)

### 5) Portal (app-portal) - "Operations Console" Pack
- [ ] **Dashboard nâng cấp**:
  - [ ] Hero centered: tổng quan "Vault"
  - [ ] Feature modules (trước quick actions):
    - Verify activity (last 7)
    - Watchlist alerts (mock)
    - Drafts needing attention
  - [ ] Quick actions dưới cùng
- [ ] **Submissions Center 2.0**:
  - [ ] Unified inbox: Verify history + consign drafts + submitted items
  - [ ] Table views: filters, sort, saved views
  - [ ] Bulk actions (pin/archive/delete local)
  - [ ] Detail drawer: show submission/verify detail + timeline
- [ ] **Notifications Center (mock)**:
  - [ ] Notification list + mark read/unread
  - [ ] Trigger sources:
    - new verify result saved
    - watchlist "price changed" (mock generator)
    - draft missing required files (rules engine local)
- [ ] **Command Palette (demo accelerator)**:
  - [ ] Global command (⌘K):
    - jump to route
    - apply preset
    - create new draft
    - simulate alert burst

### 6) Admin-lite (dev flag)
- [ ] **Marketplace Admin**:
  - [ ] CRUD listing (local)
  - [ ] drag-drop reorder featured items
  - [ ] import/export JSON fixtures snapshot
- [ ] **Content Admin**:
  - [ ] CRUD posts/events (local)
  - [ ] preview OG + slug validation
- [ ] **Preset Editor**:
  - [ ] UI chỉnh preset collector/investor/dealer (local) → apply ngay

### 7) Docs & Handoff Upgrade
- [ ] **"Scope for Phase Next"**:
  - [ ] Tạo `docs/NEXT_PHASE_SCOPE.md`:
    - API contracts needed
    - auth options (defer)
    - storage migration (local -> DB)
    - file storage (S3/GCS) (defer)
- [ ] **Acceptance Criteria bổ sung**:
  - [ ] Update `ACCEPTANCE_CRITERIA.md`:
    - verify scan mock
    - compare drawer
    - upload manager rules
    - portal notifications/command palette
    - admin import/export snapshots
- [ ] **Demo Script v2 (role-based)**:
  - [ ] Update `DEMO_SCRIPT.md` thành 3 track:
    - Collector track
    - Investor track
    - Dealer track

### 8) QA & Exit Criteria
- [ ] **E2E suite mở rộng**:
  - [ ] Verify scan mock path
  - [ ] Marketplace compare + watchlist -> portal alerts
  - [ ] Consign upload rules + preview + submitted
  - [ ] Portal command palette actions
  - [ ] Admin import/export snapshots (dev flag)
- [ ] **Performance & Accessibility spot check**:
  - [ ] Home / Verify / Marketplace / Consign / Portal Dashboard:
    - đảm bảo không regress so với targets Phase 6

## 📝 Notes

### Files Created
- `docs/MONOREPO_CONVENTIONS.md` - Monorepo conventions documentation
- `packages/ui/src/shadcn/ui/progress.tsx` - Progress component
- `apps/web/src/components/verify/VerifyResultEnhanced.tsx` - Enhanced result component
- `apps/web/src/components/verify/VerifyEmptyState.tsx` - Empty state
- `apps/web/src/components/verify/VerifyErrorState.tsx` - Error state
- `apps/web/src/components/verify/InconclusiveUpsell.tsx` - ⚠️ Cần tạo lại (bị timeout)

### Files Modified
- `packages/shared/eslint.config.js` - Added ESLint config
- `packages/shared/src/domain/fixtures/seed.ts` - Removed unused import
- `packages/ui/src/shadcn/ui/index.ts` - Added Progress export
- `packages/ui/package.json` - Added @radix-ui/react-progress dependency
- `apps/web/src/components/verify/QRScanInput.tsx` - Added "Paste Link" tab
- `apps/web/app/(public)/verify/page.tsx` - Updated to use VerifyResultEnhanced

### Dependencies Added
- `@radix-ui/react-progress` (packages/ui)

### Next Steps (Khi quay lại)
1. Tạo lại `InconclusiveUpsell.tsx`
2. Implement history view enhancements (timeline, filters, pin)
3. Marketplace investor-grade features (filters, compare, watchlist)
4. Consign form 2.0 (draft UX, upload manager, preview)
5. Portal operations console (dashboard, submissions, notifications, command palette)
6. Admin-lite features
7. Docs updates
8. E2E tests expansion

## 🎯 Exit Criteria Status

- [ ] Web + Portal có feature pack nâng cấp (scan/compare/watchlist/alerts/upload manager/command palette)
- [x] Monorepo conventions đã "lock" (transpilePackages, TS references, shadcn monorepo hygiene)
- [ ] Docs/acceptance/demo script cập nhật đầy đủ

**Current Progress**: ~20% Phase 7 complete

