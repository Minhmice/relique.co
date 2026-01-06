# Acceptance Criteria

Testable acceptance criteria for each route/feature. Format: **Given [condition], when [action], then [expected result]**

## Verify Flow

### AC-VERIFY-001: Verify by Code
**Given** user is on `/verify` page  
**When** user enters product code `RLQ-QUAL-001` and clicks "Verify"  
**Then** loading state appears for ~5 seconds, then result table displays with status, signatures, and explanation

### AC-VERIFY-002: Save Result to History
**Given** user has completed a verification  
**When** user clicks "Save Result"  
**Then** success message appears, and result is saved to verify history

### AC-VERIFY-003: View Verify History
**Given** user has saved verify results  
**When** user navigates to `/app/submissions` and clicks "Verifications" tab  
**Then** history list displays all saved verifications with timestamps

## Marketplace

### AC-MARKET-001: Browse Listings
**Given** user is on `/marketplace`  
**When** page loads  
**Then** marketplace listings are displayed in grid/list view

### AC-MARKET-002: Filter Listings
**Given** user is on `/marketplace`  
**When** user applies filter (category, price range, status)  
**Then** listings are filtered according to criteria

### AC-MARKET-003: View Listing Detail
**Given** user is on `/marketplace`  
**When** user clicks on a listing card  
**Then** detail page displays with gallery, trust panel, and item details

### AC-MARKET-004: Toggle Favorite
**Given** user is on listing detail page  
**When** user clicks favorite button  
**Then** item is added/removed from favorites, and favorite count updates

### AC-MARKET-005: Saved Searches
**Given** user has saved searches  
**When** user applies a saved search  
**Then** marketplace filters are applied automatically

## Consign Flow

### AC-CONSIGN-001: Fill Consign Form
**Given** user is on `/consign`  
**When** user fills form fields (name, email, description)  
**Then** form accepts input and validates required fields

### AC-CONSIGN-002: Autosave Draft
**Given** user is filling consign form  
**When** user stops typing for 2 seconds  
**Then** draft is autosaved to localStorage

### AC-CONSIGN-003: Restore Draft
**Given** user has an autosaved draft  
**When** user reloads `/consign` page  
**Then** form fields are pre-filled with draft data

### AC-CONSIGN-004: Upload Files
**Given** user is on `/consign` form  
**When** user uploads files via drag-and-drop or file picker  
**Then** files are added to draft metadata

### AC-CONSIGN-005: Submit Draft
**Given** user has completed consign form  
**When** user clicks "Submit"  
**Then** submission is created and draft is cleared

## Portal App

### AC-PORTAL-001: Dashboard Display
**Given** user opens portal app (`http://localhost:3001/app`)  
**When** page loads  
**Then** dashboard displays with welcome message and quick stats

### AC-PORTAL-002: Submissions Center
**Given** user is on portal dashboard  
**When** user navigates to `/app/submissions`  
**Then** submissions list displays verify history and consign submissions

### AC-PORTAL-003: Cross-App Sync
**Given** user performs action in web app (verify or favorite)  
**When** user opens portal app  
**Then** data appears in portal (shared storage keys)

## Presets & Demo Mode

### AC-PRESET-001: Apply Preset
**Given** user opens demo tools  
**When** user selects preset (Collector/Investor/Dealer) and clicks "Apply"  
**Then** storage is populated with preset data, and UI reflects changes

### AC-PRESET-002: Demo Mode Toggle
**Given** user opens demo tools  
**When** user enables "Demo Mode"  
**Then** latency is fixed at 5s, error rate is 0%

### AC-PRESET-003: Reset Storage
**Given** user has applied preset  
**When** user clicks "Reset All"  
**Then** all storage keys are cleared, and UI shows empty states

## Content Hub

### AC-CONTENT-001: Browse Posts
**Given** user is on `/posts`  
**When** page loads  
**Then** posts list displays with featured posts highlighted

### AC-CONTENT-002: View Post Detail
**Given** user is on `/posts`  
**When** user clicks on a post  
**Then** post detail page displays with full content and related posts

### AC-CONTENT-003: Browse Events
**Given** user is on `/events`  
**When** page loads  
**Then** events list displays, optionally filtered to upcoming events

### AC-CONTENT-004: Bookmark Content
**Given** user is viewing a post or event  
**When** user bookmarks the content  
**Then** bookmark is saved and appears in bookmarks list

## Technical Acceptance

### AC-TECH-001: Build Success
**Given** codebase is in clean state  
**When** `pnpm check` is run  
**Then** lint, typecheck, tests, and build all pass

### AC-TECH-002: Boundary Enforcement
**Given** developer attempts to import from restricted path  
**When** ESLint runs  
**Then** error is raised preventing the import

### AC-TECH-003: Type Safety
**Given** TypeScript project references are configured  
**When** `tsc --build` runs  
**Then** type errors are reported with correct scope

### AC-TECH-004: E2E Tests Pass
**Given** both apps are running  
**When** `pnpm test:e2e` runs  
**Then** all smoke tests pass and HTML report is generated

## Performance Acceptance

### AC-PERF-001: Lighthouse Scores
**Given** key pages are audited  
**When** Lighthouse runs on Home/Verify/Marketplace/Consign  
**Then** Performance >= 80, Accessibility >= 90, Best Practices >= 90, SEO >= 90

### AC-PERF-002: Image Optimization
**Given** page contains images  
**When** page loads  
**Then** images use Next.js Image component with proper alt text and lazy loading

### AC-PERF-003: Layout Stability
**Given** page contains dynamic content  
**When** content loads  
**Then** no layout shift occurs (CLS < 0.1)

## Accessibility Acceptance

### AC-A11Y-001: Keyboard Navigation
**Given** user navigates with keyboard only  
**When** user tabs through page  
**Then** all interactive elements are accessible and focus rings are visible

### AC-A11Y-002: Screen Reader
**Given** user uses screen reader  
**When** user navigates page  
**Then** all content is announced correctly with proper ARIA labels

### AC-A11Y-003: Form Labels
**Given** form contains inputs  
**When** user views form  
**Then** all inputs have associated labels or aria-label attributes

### AC-A11Y-004: Heading Hierarchy
**Given** page contains headings  
**When** page is rendered  
**Then** single H1 exists, and headings nest properly (H1 → H2 → H3)

