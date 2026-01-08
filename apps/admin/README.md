# Admin Dashboard

## 📋 Tổng quan

Admin Dashboard là ứng dụng quản lý cho Relique, cung cấp các tính năng quản lý verifications, consignments, và submissions với power-user features và enhanced UX.

### Tính năng chính

- ✅ Command palette (⌘K) cho navigation và actions nhanh
- ✅ Table personalization: column visibility, saved views, saved filters
- ✅ Notification center với alert rules và activity log
- ✅ Multi-tab sync với storage events
- ✅ Advanced search với recent searches và saved filters

---

## 🎯 Features Implemented

### 1. Command Palette (⌘K / Ctrl+K)

**Mục tiêu:** Tăng tốc navigation và actions với keyboard-driven interface.

**Implementation:**
- **Component:** [`src/components/command/CommandPalette.tsx`](src/components/command/CommandPalette.tsx)
- **Action Registry:** [`src/lib/actions/actionRegistry.ts`](src/lib/actions/actionRegistry.ts)
- **Action Groups:**
  - **Navigate:** Dashboard, Submissions, Saved, Profile
  - **Create:** New Consignment Draft, New Collection
  - **Utilities:** Export Data, Reset Data
  - **Verify:** Search History, Open Recent Verifications
  - **Marketplace:** Browse Marketplace, View Saved Items

**Technical Details:**
- Sử dụng `cmdk` library cho command palette UI
- Hotkey: `Cmd+K` (Mac) / `Ctrl+K` (Windows/Linux)
- Dynamic action loading dựa trên current pathname
- Context-aware actions (prioritize khi match route)

**Files:**
- `src/lib/actions/types.ts` - Action type definitions
- `src/lib/actions/navigationActions.ts` - Navigation actions
- `src/lib/actions/createActions.ts` - Create actions
- `src/lib/actions/utilityActions.ts` - Utility actions + preset actions
- `src/lib/actions/verifyActions.ts` - Verify-related actions
- `src/lib/actions/marketplaceActions.ts` - Marketplace actions
- `src/components/ui/command.tsx` - shadcn/ui Command component

---

### 2. Table Personalization v1

**Mục tiêu:** Cho phép users customize table columns và save views để tối ưu workflow.

**Features:**
- **Column Visibility:** Toggle hiển thị/ẩn columns
- **Saved Views:** Save và apply column visibility configurations
- **Persistence:** Lưu preferences vào localStorage

**Implementation:**
- **Component:** [`src/components/submissions/TablePersonalization.tsx`](src/components/submissions/TablePersonalization.tsx)
- **Hook:** [`src/hooks/useTableViews.ts`](src/hooks/useTableViews.ts)
- **Table Wrapper:** [`src/components/submissions/SubmissionsTableWithColumns.tsx`](src/components/submissions/SubmissionsTableWithColumns.tsx)

**Technical Details:**
- Wrapper component `SubmissionsTableWithColumns` để expose `columnVisibility` state từ `@tanstack/react-table`
- Column visibility persisted trong `relique.v1.portal.views.submissions.columns`
- Saved views persisted trong `relique.v1.portal.views.submissions.saved` (max 10 views)
- UI: Dropdown menu cho column toggles + saved views management

**Storage Keys:**
- `relique.v1.admin.views.submissions.columns` - Column visibility state
- `relique.v1.admin.views.submissions.saved` - Saved views array

---

### 3. Advanced Search/Filters

**Mục tiêu:** Enhanced search experience với recent searches và saved filters foundation.

**Features:**
- **Recent Searches:** Lưu và quick access đến recent search terms
- **Saved Filters:** Foundation cho saved filter functionality (placeholder)
- **Debounced Search:** Optimize performance với debounce

**Implementation:**
- **Component:** [`src/components/submissions/AdvancedSearch.tsx`](src/components/submissions/AdvancedSearch.tsx)
- **Hooks:**
  - [`src/hooks/useSearchHistory.ts`](src/hooks/useSearchHistory.ts) - Recent searches management
  - [`src/hooks/useDebounce.ts`](src/hooks/useDebounce.ts) - Debounce utility

**Technical Details:**
- Recent searches stored trong `relique.v1.portal.recentSearches.submissions` (max 20)
- Debounce delay: 500ms
- UI: Search input với history dropdown + save filter button (placeholder)

**Storage Keys:**
- `relique.v1.admin.recentSearches.submissions` - Recent searches array
- `relique.v1.admin.savedFilters.submissions` - Saved filters array (foundation)

---

### 4. Notification Center + Alert Rules

**Mục tiêu:** Tạo "operational-ready" feel với notification system và automated alerts.

**Features:**
- **Notification Center:** Sheet drawer với notifications list
- **Alert Rules:** Automated rule checking (disqualified verifications, stale drafts, saved items count)
- **Alert Scheduler:** Periodic checking (every 5 minutes)
- **Notification Types:** verify_flagged, draft_reminder, suggestion, system

**Implementation:**
- **Components:**
  - [`src/components/notifications/NotificationCenter.tsx`](src/components/notifications/NotificationCenter.tsx)
  - [`src/components/notifications/NotificationItem.tsx`](src/components/notifications/NotificationItem.tsx)
  - [`src/components/notifications/AlertScheduler.tsx`](src/components/notifications/AlertScheduler.tsx)
- **Service:** [`src/lib/services/alertService.ts`](src/lib/services/alertService.ts)

**Technical Details:**
- Notifications stored trong `relique.v1.admin.notifications` (max 100)
- Alert rules stored trong `relique.v1.admin.alertRules`
- Alert scheduler runs every 5 minutes
- Notification types: `verify_flagged`, `draft_reminder`, `suggestion`, `system`, `preset_applied`, `data_reset`
- Unread count badge trên notification bell icon

**Storage Keys:**
- `relique.v1.admin.notifications` - Notifications array
- `relique.v1.admin.alertRules` - Alert rules array

**Alert Rules:**
1. **Disqualified Verifications:** Check for disqualified verification results
2. **Stale Drafts:** Check for drafts older than 7 days
3. **Saved Items Count:** Suggest creating collection when threshold reached

---

### 5. Activity Log

**Mục tiêu:** Audit trail và activity tracking để enhance "demo credibility".

**Features:**
- **Activity Logging:** Log các actions (verify saved, draft autosaved, notification created, etc.)
- **Activity Display:** Recent activity trên Dashboard
- **Auto-logging:** Tự động log khi có actions quan trọng

**Implementation:**
- **Service:** [`src/lib/services/activityService.ts`](src/lib/services/activityService.ts)
- **Component:** [`src/components/dashboard/RecentActivity.tsx`](src/components/dashboard/RecentActivity.tsx) (updated)

**Technical Details:**
- Activity log stored trong `relique.v1.admin.activityLog` (max 500 entries)
- Activity types: `verify_saved`, `consign_draft_autosaved`, `consign_submitted`, `favorite_added`, `notification_created`, `verify_history_cleared`, `consign_draft_removed`
- Auto-logging integrated vào:
  - `verifyService.history.add()` - Log verify saved
  - `verifyService.history.clear()` - Log history cleared
  - `consignService.drafts.remove()` - Log draft removed
  - `alertService` - Log notification created

**Storage Keys:**
- `relique.v1.admin.activityLog` - Activity log array

---

### 6. Multi-tab Sync

**Mục tiêu:** Đồng bộ data giữa multiple browser tabs để tạo "real-time-ish" experience.

**Features:**
- **Storage Events:** Dispatch và listen cho storage changes
- **Auto-sync:** Tự động update UI khi storage changes từ tab khác
- **Debounced Updates:** Optimize performance với debounce

**Implementation:**
- **Hook:** [`src/hooks/useStorageSync.ts`](src/hooks/useStorageSync.ts)
- **Storage:** [`src/lib/storage.ts`](src/lib/storage.ts) - `setItem()` dispatches StorageEvent

**Technical Details:**
- `setItem()` trong storage.ts tự động dispatch `StorageEvent` khi save
- `useStorageSync` hook listens cho storage events và trigger callbacks
- Debounce delay: 300ms (configurable)
- Integrated vào:
  - `app/(portal)/admin/page.tsx` - Overview/Home page
  - `app/(portal)/admin/dashboard/page.tsx` - Dashboard
  - `app/(portal)/admin/submissions/page.tsx` - Submissions

**Usage:**
```typescript
useStorageSync(
  [storage.verifyHistory.key, storage.consign.drafts.key],
  () => {
    // Reload data when storage changes
    loadData();
  }
);
```

---

## 📦 Dependencies Added

```json
{
  "cmdk": "^1.0.0"  // Command palette UI library
}
```

**Existing Dependencies Used:**
- `@tanstack/react-table` - Table functionality
- `sonner` - Toast notifications
- `lucide-react` - Icons
- `@radix-ui/react-*` - UI primitives (Dialog, Dropdown, Sheet, Tabs)

---

## 🗂️ File Structure

### New Files Created

**Components:**
- `src/components/command/CommandPalette.tsx`
- `src/components/notifications/NotificationCenter.tsx`
- `src/components/notifications/NotificationItem.tsx`
- `src/components/notifications/AlertScheduler.tsx`
- `src/components/submissions/TablePersonalization.tsx`
- `src/components/submissions/SubmissionsTableWithColumns.tsx`
- `src/components/submissions/AdvancedSearch.tsx`
- `src/components/submissions/useSubmissionsColumns.ts`

**Hooks:**
- `src/hooks/useTableViews.ts`
- `src/hooks/useSearchHistory.ts`
- `src/hooks/useDebounce.ts`
- `src/hooks/useStorageSync.ts`

**Actions:**
- `src/lib/actions/types.ts`
- `src/lib/actions/actionRegistry.ts`
- `src/lib/actions/navigationActions.ts`
- `src/lib/actions/createActions.ts`
- `src/lib/actions/utilityActions.ts`
- `src/lib/actions/verifyActions.ts`
- `src/lib/actions/marketplaceActions.ts`

**Services:**
- `src/lib/services/activityService.ts`
- `src/lib/services/alertService.ts`

**Presets:**
- `src/lib/presets/loader.ts`
- `src/presets/collector.json`
- `src/presets/investor.json`
- `src/presets/dealer.json`
- `src/presets/empty.json`

**Pages:**

**UI Components:**
- `src/components/ui/command.tsx` (shadcn/ui)
- `src/components/ui/card.tsx` (shadcn/ui)
- `src/components/ui/sheet.tsx` (shadcn/ui)

### Modified Files

**Storage:**
- `src/lib/storage.ts` - Added portal-specific storage keys và accessors

**Services:**
- `src/lib/services/verifyService.ts` - Added activity logging
- `src/lib/services/consignService.ts` - Added activity logging

**Components:**
- `src/components/submissions/SubmissionsTable.tsx` - Updated để support column visibility
- `src/components/submissions/SubmissionsHeader.tsx` - Added TablePersonalization
- `src/components/dashboard/RecentActivity.tsx` - Updated để use activityService
- `src/components/shell/PortalTopbar.tsx` - Added NotificationCenter
- `src/components/shell/PortalSidebar.tsx` - DevTools link (conditional)

**Layouts:**
- `app/layout.tsx` - Added CommandPalette
- `app/(portal)/layout.tsx` - Added AlertScheduler

**Pages:**
- `app/admin/page.tsx` - Overview/Home page
- `app/admin/dashboard/page.tsx` - Dashboard with useStorageSync
- `app/admin/submissions/page.tsx` - Added column visibility, useStorageSync, AdvancedSearch

---

## 🔑 Storage Keys

### Admin-Specific Keys

```typescript
// Column visibility
"relique.v1.admin.views.submissions.columns"

// Saved views
"relique.v1.admin.views.submissions.saved"

// Recent searches
"relique.v1.admin.recentSearches.submissions"

// Saved filters (foundation)
"relique.v1.admin.savedFilters.submissions"

// Notifications
"relique.v1.admin.notifications"

// Alert rules
"relique.v1.admin.alertRules"

// Activity log
"relique.v1.admin.activityLog"
```

---

## 🚀 Usage

### Command Palette

1. Press `Cmd+K` (Mac) hoặc `Ctrl+K` (Windows/Linux)
2. Type để search actions
3. Navigate với arrow keys
4. Press `Enter` để execute action

### Table Personalization

1. Click "Columns" button trong SubmissionsHeader
2. Toggle columns on/off
3. Enter view name và click "Save" để save view
4. Click "Views" button để apply saved view

### Notification Center

1. Click bell icon trong AdminTopbar
2. View notifications trong Sheet drawer
3. Click "Mark as read" để mark individual notification
4. Click "Mark all as read" để mark all as read

---

## ✅ Acceptance Criteria

### Command Palette
- [x] Hotkey `Cmd+K` / `Ctrl+K` opens command palette
- [x] Search filters actions by label và keywords
- [x] Actions grouped by category
- [x] Context-aware actions prioritize khi match route

### Table Personalization
- [x] Column visibility toggle works
- [x] Saved views persist across sessions
- [x] Apply saved view restores column visibility
- [x] Max 10 saved views (oldest removed when limit reached)

### Advanced Search
- [x] Recent searches saved (max 20)
- [x] Debounced search (500ms delay)
- [x] Recent searches dropdown accessible

### Notification Center
- [x] Notifications display trong Sheet drawer
- [x] Unread count badge hiển thị correctly
- [x] Mark as read works
- [x] Alert scheduler runs every 5 minutes

### Activity Log
- [x] Activities logged automatically
- [x] Recent activity displays trên Dashboard
- [x] Max 500 entries (oldest removed when limit reached)

### Multi-tab Sync
- [x] Storage changes sync across tabs
- [x] UI updates automatically khi storage changes
- [x] Debounced updates (300ms delay)

---

## 📊 Statistics

- **New Components:** 8
- **New Hooks:** 4
- **New Services:** 2
- **New Actions:** 6 action groups
- **New Storage Keys:** 7 portal-specific keys
- **Lines of Code:** ~2000+ (distributed across files, each file ≤ 200 lines)

---

## 🎯 Next Steps (Future Phases)

### Potential Enhancements

1. **Saved Filters Implementation:** Complete saved filters functionality (currently foundation only)
2. **Keyboard Shortcuts:** Global keyboard shortcuts cho common actions
3. **Bulk Actions:** Bulk operations cho submissions (delete, export, etc.)
4. **Advanced Filtering:** Multi-criteria filtering với AND/OR logic
5. **Export Enhancements:** CSV/Excel export với custom columns
6. **Notification Preferences:** User preferences cho notification types
7. **Activity Log Filtering:** Filter activity log by type, date range
8. **Real-time Updates:** WebSocket integration cho real-time notifications (Phase 7+)

---

## 📚 Related Documentation

- [Project Summary](../../docs/PROJECT_SUMMARY.md) - Tổng quan project
- [Phases Summary](../../docs/PHASES_SUMMARY.md) - Tổng hợp các phases
- [README.md](../../README.md) - Root project README

---

**Last Updated:** 2024-12-19  
**Status:** Production-Ready Admin Dashboard

