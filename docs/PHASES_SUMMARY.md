# Tóm tắt 3 Phase và Split Task

Tài liệu này tóm tắt các phase đã hoàn thành và split task đã xử lý trong dự án Relique.co.

---

## 📋 Phase 2: Mock Service Layer (Adapters) + Mock Presets

### Mục tiêu
Chuẩn hóa data pipeline, enable demo scenarios, simulate production behavior (latency, pagination, filtering, errors), và chuẩn bị cho real API integration.

### Các thành phần đã implement

#### 1. Service Layer Architecture
- **Service Interfaces** (`apps/web/src/lib/services/contracts.ts`):
  - `IMarketplaceService`: list, getBySlug, toggleFavorite, getFavorites
  - `IVerifyService`: run, history (list, add, clear)
  - `IConsignService`: drafts (list, save, remove, get), submitMock, list, get
  - `IContentService`: posts (list, get), events (list, get)
  - `IAdminMarketplaceService`: list, get, create, update, delete, bulkUpdate, getStats
  - `IAdminContentService`: posts (list, get, create, update, delete), events (list, get, create, update, delete)

- **Zod Schemas** (`apps/web/src/lib/schemas/*.ts`):
  - `MarketplaceListingSchema`, `MarketplaceFiltersSchema`, `SortOptionSchema`
  - `VerifyResultSchema`, `VerifyHistoryEntrySchema`, `VerifyRunInputSchema`, `VerifyMappingEntrySchema`
  - `ConsignSubmissionSchema`, `ConsignDraftSchema`, `SubmissionStatusSchema`
  - `PostSchema`, `EventSchema`, `ContentListParamsSchema`

- **Service Implementations**:
  - `marketplaceService.ts`: Implement `IMarketplaceService` với query pipeline, pagination, filtering
  - `verifyService.ts`: Deterministic mapping với fixed 5s delay
  - `consignService.ts`: Draft management với localStorage persistence
  - `contentService.ts`: Posts và events management
  - `adminService.ts`: CRUD operations cho admin panel

#### 2. Storage Layer
- **Refactored Storage** (`apps/web/src/lib/storage.ts`):
  - Sử dụng `relique.v1.*` storage keys
  - Migration helper để migrate từ old keys
  - Type-safe storage access

#### 3. Network Simulation
- **Latency Simulation** (`apps/web/src/lib/simulation/latency.ts`):
  - Profiles: `fast` (100ms), `normal` (500ms), `slow` (2000ms)
  - Configurable latency injection

- **Error Injection** (`apps/web/src/lib/simulation/errors.ts`):
  - Modes: `off`, `low` (2%), `medium` (6%), `force` (100%)
  - Error types: SERVICE_ERROR, NETWORK_ERROR, VALIDATION_ERROR, NOT_FOUND, UNAUTHORIZED, RATE_LIMIT
  - Retryable error detection

#### 4. Demo Presets
- **Preset Files** (`apps/web/src/presets/*.json`):
  - `collector.json`: Collector-focused dataset
  - `investor.json`: Investor-focused dataset
  - `dealer.json`: Dealer-focused dataset
  - `empty.json`: Empty state dataset
  - `error-heavy.json`: Error simulation dataset

- **Preset Loader** (`apps/web/src/lib/presets/loader.ts`):
  - `applyPreset()`: Apply preset data to storage
  - `resetAllStorage()`: Clear all storage
  - `exportStorageData()`: Export current state
  - `importStorageData()`: Import state from JSON
  - `getCurrentPreset()`: Get currently active preset

#### 5. Dev-only UI
- **DemoTools Component** (`apps/web/src/components/dev/*.tsx`):
  - `DemoTools.tsx`: Main component với conditional rendering
  - `DemoToolsButton.tsx`: Floating button để mở drawer
  - `DemoToolsDrawer.tsx`: Drawer với controls cho:
    - Preset selection và application
    - Latency profile configuration
    - Error mode configuration
    - Storage export/import
    - Reset all storage

### Files đã tạo/sửa đổi

**Schemas:**
- `apps/web/src/lib/schemas/marketplace.ts`
- `apps/web/src/lib/schemas/verify.ts`
- `apps/web/src/lib/schemas/consign.ts`
- `apps/web/src/lib/schemas/content.ts`
- `apps/web/src/lib/schemas/index.ts`

**Services:**
- `apps/web/src/lib/services/contracts.ts`
- `apps/web/src/lib/services/marketplaceService.ts`
- `apps/web/src/lib/services/verifyService.ts`
- `apps/web/src/lib/services/consignService.ts`
- `apps/web/src/lib/services/contentService.ts`
- `apps/web/src/lib/services/adminService.ts`

**Simulation:**
- `apps/web/src/lib/simulation/latency.ts`
- `apps/web/src/lib/simulation/errors.ts`
- `apps/web/src/lib/simulation/index.ts`

**Presets:**
- `apps/web/src/presets/collector.json`
- `apps/web/src/presets/investor.json`
- `apps/web/src/presets/dealer.json`
- `apps/web/src/presets/empty.json`
- `apps/web/src/presets/error-heavy.json`
- `apps/web/src/lib/presets/loader.ts`

**Dev Tools:**
- `apps/web/src/components/dev/DemoTools.tsx`
- `apps/web/src/components/dev/DemoToolsButton.tsx`
- `apps/web/src/components/dev/DemoToolsDrawer.tsx`

**Storage:**
- `apps/web/src/lib/storage.ts` (refactored)

**Pages đã refactor:**
- `apps/web/app/(public)/verify/page.tsx`
- `apps/web/app/(app)/app/page.tsx`
- `apps/web/app/(app)/app/saved/page.tsx`
- `apps/web/src/components/marketplace/FavoriteButton.tsx`

---

## 🎨 Phase 3: Shared UI Kit v1 (Media + Bento Modules + Form Kit + DataTable Kit)

### Mục tiêu
Tạo reusable UI platform layer trong `packages/ui` để đảm bảo consistent design across `apps/web`, `apps/app-portal`, và `admin-lite`, và simplify future UI development.

### Các thành phần đã implement

#### 1. Core UI Primitives (`packages/ui/src/primitives/*.tsx`)
- **Container**: Responsive container với max-width
- **Section**: Section wrapper với spacing
- **Stack**: Vertical/horizontal stack layout
- **Divider**: Horizontal/vertical divider
- **Kbd**: Keyboard key display component
- **PageHeader**: Page header với title, description, actions
- **Surface**: Surface component với tone variants (default, muted, accent)

#### 2. State Components (`packages/ui/src/states/*.tsx`)
- **EmptyState**: Empty state với icon, title, description, action
- **ErrorState**: Error state với error message và retry action
- **Skeletons**: Loading skeleton components

#### 3. Media Component (`packages/ui/src/media/media.tsx`)
- Responsive images với Next.js Image optimization
- Ratio support (16:9, 4:3, 1:1, etc.)
- Fit modes (cover, contain, fill)
- Priority loading
- Overlay support
- Skeleton loading state
- Error fallback
- Caption và credit support

#### 4. Bento Modules (`packages/ui/src/modules/*.tsx`)
- **HeroCentered**: Centered hero section với title, description, actions, media
- **BentoGrid**: Flexible grid layout với responsive columns
- **FeatureTiles**: Feature tiles grid (2/3/4 columns)
- **QuickActions**: Quick action cards với icons và links
- **TrustPanel**: Trust & verification panel với status display
- **PartnerStrip**: Partner logos strip
- **TeamGrid**: Team members grid

#### 5. Form Kit (`packages/ui/src/form/*.tsx`)
- **RHF Primitives**:
  - `Form`: React Hook Form wrapper
  - `FormField`: Field wrapper với RHF integration
  - `FormItem`: Form item container
  - `FormLabel`: Form label
  - `FormControl`: Form control wrapper
  - `FormDescription`: Form description text
  - `FormMessage`: Form error message display

- **Field Components** (`packages/ui/src/form/fields/*.tsx`):
  - `TextField`: Text input field
  - `TextareaField`: Textarea field

- **Upload Manager** (`packages/ui/src/form/upload-manager/*.tsx`):
  - `UploadManager`: UI-only upload manager cho metadata management
  - File list display
  - File removal
  - File metadata editing

#### 6. DataTable Kit (`packages/ui/src/table/data-table.tsx`)
- **DataTable**: TanStack Table wrapper
- Sorting support
- Filtering support
- Pagination support
- Density variants (compact, normal, comfortable)
- Loading states
- Empty states

#### 7. Theming & Styling
- **Dark-only Theme**: Hard-locked dark mode (`<html className="dark">`)
- **Single-tone**: Consistent dark theme với no light mode
- **Rounded-0**: No border radius (`--radius: 0px`)
- **Focus Ring Gold**: Gold accent cho focus states
- **CSS Variables**: Standardized tokens trong `apps/web/app/globals.css`

#### 8. Component Catalog
- **Catalog Route** (`apps/web/app/(public)/ui-kit/page.tsx`):
  - Demo tất cả component states
  - Audit checklist (dark-only, single-tone, rounded-0)
  - Component usage examples

### Files đã tạo/sửa đổi

**Package Structure:**
- `packages/ui/package.json` (updated exports và dependencies)
- `packages/ui/src/cn.ts` (utility function)
- `packages/ui/src/index.ts` (exports)

**Primitives:**
- `packages/ui/src/primitives/container.tsx`
- `packages/ui/src/primitives/section.tsx`
- `packages/ui/src/primitives/stack.tsx`
- `packages/ui/src/primitives/divider.tsx`
- `packages/ui/src/primitives/kbd.tsx`
- `packages/ui/src/primitives/page-header.tsx`
- `packages/ui/src/primitives/surface.tsx`

**States:**
- `packages/ui/src/states/empty-state.tsx`
- `packages/ui/src/states/error-state.tsx`
- `packages/ui/src/states/skeletons.tsx`

**Media:**
- `packages/ui/src/media/media.tsx`

**Modules:**
- `packages/ui/src/modules/hero-centered.tsx`
- `packages/ui/src/modules/bento-grid.tsx`
- `packages/ui/src/modules/feature-tiles.tsx`
- `packages/ui/src/modules/quick-actions.tsx`
- `packages/ui/src/modules/trust-panel.tsx`
- `packages/ui/src/modules/partner-strip.tsx`
- `packages/ui/src/modules/team-grid.tsx`

**Form Kit:**
- `packages/ui/src/form/form.tsx`
- `packages/ui/src/form/fields/text-field.tsx`
- `packages/ui/src/form/fields/textarea-field.tsx`
- `packages/ui/src/form/upload-manager/upload-manager.tsx`

**Table Kit:**
- `packages/ui/src/table/data-table.tsx`

**Theming:**
- `apps/web/app/globals.css` (updated tokens)
- `apps/web/app/layout.tsx` (hard-lock dark mode)
- `apps/web/src/components/shell/Header.tsx` (removed ThemeToggle)
- `apps/web/src/components/shell/AppTopbar.tsx` (removed ThemeToggle)
- `apps/web/app/(app)/app/profile/page.tsx` (removed ThemeToggle)

**Refactored Pages:**
- `apps/web/src/components/contact/ContactForm.tsx` (uses form kit)
- `apps/web/app/(app)/app/saved/page.tsx` (uses Media component)
- `apps/web/app/page.tsx` (uses Section, QuickActions, PartnerStrip, TeamGrid)
- `apps/web/app/(admin)/admin/marketplace/page.tsx` (uses DataTable)

**Catalog:**
- `apps/web/app/(public)/ui-kit/page.tsx`

**Next.js Config:**
- `apps/web/next.config.js` (added `transpilePackages` và `experimental.externalDir`)

---

## 🔧 Split Task: TypeScript Build Fixes

### Vấn đề
Sau khi implement Phase 2 và Phase 3, build TypeScript gặp nhiều lỗi do:
- Service calls chuyển từ sync sang async nhưng code chưa update
- Type conflicts giữa các schemas
- Missing exports
- Type safety issues

### Các fix đã thực hiện

#### 1. Async Service Calls
- **Marketplace Service**:
  - `apps/web/app/(public)/marketplace/[slug]/page.tsx`: `get()` → `getBySlug()` với `await`
  - `apps/web/app/(public)/marketplace/page.tsx`: Refactor từ `useMemo` sync → `useEffect` async
  - `apps/web/src/components/marketplace/RelatedItems.tsx`: Refactor từ sync → async với `useState`/`useEffect`
  - `apps/web/src/components/home/FeaturedItems.tsx`: Refactor từ sync → async

- **Content Service**:
  - `apps/web/app/(public)/posts/[slug]/page.tsx`: `get()` → `await get()`
  - `apps/web/app/(public)/posts/page.tsx`: Refactor từ sync → async
  - `apps/web/src/components/home/FeaturedPosts.tsx`: Refactor từ sync → async
  - `apps/web/src/components/home/UpcomingEvents.tsx`: Refactor từ sync → async

- **Consign Service**:
  - `apps/web/src/components/consign/ConsignForm.tsx`: 
    - `getDraft()` → `drafts.list()` với async
    - `saveDraft()` → `drafts.save()` với async
    - `submit()` → `submitMock()` với async
  - `apps/web/src/components/consign/DraftManager.tsx`: 
    - `getDraft()` → `drafts.list()` với async
    - `deleteDraft()` → `drafts.remove()` với async

#### 2. Type Conflicts
- **VerifyStatus Conflict**:
  - `apps/web/src/lib/schemas/index.ts`: Explicit export để resolve conflict giữa `marketplace.ts` và `verify.ts`
  - `apps/web/src/lib/schemas/marketplace.ts`: Có `VerifyStatusSchema` riêng
  - `apps/web/src/lib/schemas/verify.ts`: Có `VerifyStatusSchema` riêng

#### 3. Missing Exports
- **Contracts**:
  - `apps/web/src/lib/services/contracts.ts`: Export `VerifyResult`, `VerifyHistoryEntry`, `VerifyRunInput`
  
- **Schemas**:
  - `apps/web/src/lib/schemas/index.ts`: Export `VerifyMappingEntrySchema` và `VerifyMappingEntry`

#### 4. Service Interface Updates
- **VerifyService**:
  - `apps/web/src/lib/services/verifyService.ts`: Import types từ `@/lib/schemas/verify` thay vì `./contracts`

#### 5. Type Safety Fixes
- **AdminService**:
  - `apps/web/src/lib/services/adminService.ts`: Thêm null check cho `mutations[index]`

- **Errors**:
  - `apps/web/src/lib/simulation/errors.ts`: Fix type safety cho `errorMessages[code]` với nullish coalescing

- **VerifyService**:
  - `apps/web/src/lib/services/verifyService.ts`: Fix type assertion cho random status selection

#### 6. Missing Imports
- **DemoToolsDrawer**:
  - `apps/web/src/components/dev/DemoToolsDrawer.tsx`: Thêm `Settings` icon import từ `lucide-react`

### Kết quả
✅ Build TypeScript thành công  
✅ Tất cả type errors đã được fix  
✅ Code đã được refactor để sử dụng async/await đúng cách  
✅ Type safety đã được đảm bảo  

---

## 📝 Split Task: Admin App Separation (Planned)

### Kế hoạch
Chia admin functionality ra thành separate Next.js application (`apps/admin`) chạy trên `localhost:2009`, trong khi main web application (`apps/web`) chạy trên `localhost:2006`.

### Các bước cần thực hiện

#### 1. Tạo Admin App
- [ ] Tạo `apps/admin` với Next.js setup
- [ ] Configure port 2009
- [ ] Setup shared dependencies với `apps/web`

#### 2. Move Admin Routes
- [ ] Move `apps/web/app/(admin)/admin/*` → `apps/admin/app/*`
- [ ] Update admin service imports
- [ ] Update admin component imports

#### 3. Move Portal Routes
- [ ] Move `apps/web/app/(app)/app/*` → `apps/web/app/*` (root level)
- [ ] Update routes: `/app/profile` → `/profile`, `/app/saved` → `/saved`, etc.
- [ ] Update navigation links

#### 4. Update Configuration
- [ ] Update `turbo.json` để support multiple apps
- [ ] Update `package.json` scripts
- [ ] Update environment variables

#### 5. Testing
- [ ] Test admin app trên port 2009
- [ ] Test web app trên port 2006
- [ ] Verify routing và navigation

### Status
⏸️ **Chưa thực hiện** - User yêu cầu "làm tiếp ui form sau đó mới split"

---

## 🎯 Tổng kết

### Phase 2: ✅ Hoàn thành
- Service layer architecture đã được standardize
- Mock presets và simulation đã được implement
- Dev tools đã được tạo

### Phase 3: ✅ Hoàn thành
- UI kit đã được tạo trong `packages/ui`
- Tất cả components đã được implement
- Theming đã được standardize (dark-only, rounded-0)
- Component catalog đã được tạo

### Split Task: ✅ Hoàn thành (Build Fixes)
- Tất cả TypeScript errors đã được fix
- Build thành công
- Code đã được refactor để sử dụng async/await đúng cách

### Split Task: ⏸️ Chưa thực hiện (Admin Separation)
- Kế hoạch đã được outline
- Chờ user approval để proceed

---

## 📚 Tài liệu liên quan

- `README.md`: Tổng quan dự án
- `apps/web/docs/STRUCTURE.md`: Cấu trúc codebase
- `apps/web/docs/SCOPE_BOUNDARIES.md`: Scope boundaries
- `apps/web/docs/DEMO_SCRIPT.md`: Demo script
- `apps/web/docs/NEXT_STEPS.md`: Next steps checklist

