# Component Catalog

Tài liệu này mô tả tất cả components trong ứng dụng Relique, bao gồm props, variants, và nơi được sử dụng.

## Shell Components

### Header
**Location:** `src/components/shell/Header.tsx`

**Props:** None (uses pathname for active states)

**Usage:** Root layout, public layout

**Features:**
- Logo và branding
- Navigation links với active states
- Theme toggle
- User menu (khi logged in)
- Login button (khi chưa login)

### Footer
**Location:** `src/components/shell/Footer.tsx`

**Props:** None

**Usage:** Root layout, public layout

**Features:**
- Multi-column layout
- Quick links, Legal links
- Brand lockup
- Social icons

### ThemeToggle
**Location:** `src/components/shell/ThemeToggle.tsx`

**Props:** None

**Usage:** Header, AppTopbar

**Features:**
- Light/Dark/System options
- Persists preference to localStorage

### AppSidebar
**Location:** `src/components/shell/AppSidebar.tsx`

**Props:** None

**Usage:** App layout

**Features:**
- Navigation cho app routes
- Active state highlighting

### AppTopbar
**Location:** `src/components/shell/AppTopbar.tsx`

**Props:** None

**Usage:** App layout, Admin layout

**Features:**
- Welcome message với user name
- Theme toggle
- User menu

## Shared Components

### Media
**Location:** `src/components/shared/Media.tsx`

**Props:**
- `src: string` - Image URL
- `alt: string` - Alt text
- `variant?: "hero" | "card" | "banner" | "avatar" | "logo-strip"`
- `priority?: boolean` - Priority loading
- `fill?: boolean` - Fill container
- `aspectRatio?: string` - Aspect ratio

**Usage:** Hero sections, cards, banners

**Features:**
- Unified image rendering
- Automatic optimization
- Variant-based sizing

### LazyImage
**Location:** `src/components/shared/LazyImage.tsx`

**Props:** Same as Media (priority defaults to false)

**Usage:** Card images, list items

**Features:**
- Lazy loading wrapper
- Performance optimization

### EmptyState
**Location:** `src/components/shared/EmptyState.tsx`

**Props:**
- `title: string`
- `description?: string`
- `action?: { label: string; href: string }`

**Usage:** Marketplace, Favorites, Submissions

### LoadingState
**Location:** `src/components/shared/LoadingState.tsx`

**Props:**
- `variant?: "spinner" | "skeleton"`
- `message?: string`

**Usage:** Loading states across app

## Section Components

### SplitHero
**Location:** `src/components/sections/SplitHero.tsx`

**Props:**
- `title: string`
- `description?: string`
- `image: string`
- `imageAlt?: string`
- `cta?: { label: string; href: string }`
- `reverse?: boolean`

**Usage:** Home hero, page heroes

### BentoCard
**Location:** `src/components/sections/BentoCard.tsx`

**Props:**
- `image?: string`
- `imageAlt?: string`
- `title: string`
- `description?: string`
- `cta?: { label: string; href: string }`

**Usage:** Quick Actions, feature grids

### BentoFeatureGrid
**Location:** `src/components/sections/BentoFeatureGrid.tsx`

**Props:**
- `items: Array<{ image: string; title: string; description: string; cta: { label: string; href: string } }>`

**Usage:** Home Quick Actions

### TeamGrid
**Location:** `src/components/sections/TeamGrid.tsx`

**Props:**
- `people: Array<{ id: string; name: string; role: string; bio: string; image: string }>`

**Usage:** About page

### SectionHeader
**Location:** `src/components/sections/SectionHeader.tsx`

**Props:**
- `title: string`
- `description?: string`

**Usage:** Section headers

## Verify Components

### QRScanInput
**Location:** `src/components/verify/QRScanInput.tsx`

**Props:**
- `onCodeScanned: (code: string) => void`
- `disabled?: boolean`

**Usage:** Verify page

### VerifyLoading
**Location:** `src/components/verify/VerifyLoading.tsx`

**Props:**
- `duration?: number` - Duration in ms (default: 5000)
- `onComplete: () => void`

**Usage:** Verify page

### VerifyResult
**Location:** `src/components/verify/VerifyResult.tsx`

**Props:**
- `productId: string`
- `itemName: string`
- `signatures: number`
- `status: "qualified" | "inconclusive" | "disqualified"`
- `date: string`

**Usage:** Verify page

## Marketplace Components

### ItemGallery
**Location:** `src/components/marketplace/ItemGallery.tsx`

**Props:**
- `images: string[]`
- `alt: string`

**Usage:** Marketplace detail page

### FavoriteButton
**Location:** `src/components/marketplace/FavoriteButton.tsx`

**Props:**
- `itemId: string`

**Usage:** Marketplace cards, detail page

### MarketplaceSort
**Location:** `src/components/marketplace/MarketplaceSort.tsx`

**Props:**
- `value: SortOption`
- `onValueChange: (value: SortOption) => void`

**Usage:** Marketplace list page

### MarketplaceFilters
**Location:** `src/components/marketplace/MarketplaceFilters.tsx`

**Props:**
- `filters: MarketplaceFilters`
- `onFiltersChange: (filters: MarketplaceFilters) => void`

**Usage:** Marketplace list page

### TrustPanel
**Location:** `src/components/marketplace/TrustPanel.tsx`

**Props:**
- `authenticated?: boolean`
- `certificate?: string`
- `coaIssuer?: string`
- `signedBy?: string`
- `condition?: string`
- `provenance?: string`

**Usage:** Marketplace detail page

## Consign Components

### ConsignForm
**Location:** `src/components/consign/ConsignForm.tsx`

**Props:** None

**Usage:** Consign page

**Features:**
- Long form với validation
- File upload
- Autosave draft
- Form progress indicator

### FileUpload
**Location:** `src/components/consign/FileUpload.tsx`

**Props:**
- `files: File[]`
- `onFilesChange: (files: File[]) => void`
- `maxFiles?: number`
- `maxSize?: number`

**Usage:** Consign form

### DraftManager
**Location:** `src/components/consign/DraftManager.tsx`

**Props:**
- `onRestore: (draft: ConsignDraft) => void`
- `onDiscard: () => void`

**Usage:** Consign form

## Content Components

### PostCard
**Location:** `src/components/content/PostCard.tsx`

**Props:**
- `post: Post`
- `variant?: "default" | "featured"`

**Usage:** Posts list, featured posts

### FeaturedPost
**Location:** `src/components/content/FeaturedPost.tsx`

**Props:**
- `post: Post`

**Usage:** Posts page, home page

### EventCard
**Location:** `src/components/content/EventCard.tsx`

**Props:**
- `event: Event`

**Usage:** Events list

### EventTimeline
**Location:** `src/components/content/EventTimeline.tsx`

**Props:**
- `events: Event[]`

**Usage:** Events page

### AnchorNav
**Location:** `src/components/content/AnchorNav.tsx`

**Props:**
- `items: Array<{ id: string; label: string }>`

**Usage:** About page, long-form pages

### AutoTOC
**Location:** `src/components/content/AutoTOC.tsx`

**Props:**
- `containerId: string`
- `className?: string`

**Usage:** Policies, Terms pages

## Form Components

### ContactForm
**Location:** `src/components/contact/ContactForm.tsx`

**Props:** None

**Usage:** Contact page

**Features:**
- React Hook Form + Zod validation
- Inline error messages

## UI Components (shadcn/ui)

All UI components from shadcn/ui are located in `src/components/ui/`:

- **button** - Button component với variants
- **card** - Card component
- **input** - Input component
- **label** - Label component
- **textarea** - Textarea component
- **select** - Select component
- **dropdown-menu** - Dropdown menu
- **dialog** - Dialog/Modal
- **tabs** - Tabs component
- **table** - Table component
- **skeleton** - Loading skeleton
- **badge** - Badge component
- **alert** - Alert component
- **form** - Form components (react-hook-form integration)
- **sonner** - Toast notifications

**⚠️ IMPORTANT:** Do NOT edit files in `src/components/ui/`. These are managed by shadcn CLI.

