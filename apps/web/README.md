# Relique Frontend - Phase 5 Complete

Frontend foundation for Relique, a probabilistic authentication platform for collectibles and memorabilia. Phase 5 - Final Polish, Asset Pack, Demo Readiness, and Packaging/Handoff complete.

## Quick Start

### Prerequisites

- Node.js 18+ and pnpm installed
- Environment variables (see `.env.example`)

### Development

```bash
# From workspace root
pnpm dev

# Or specifically for web app
cd apps/web
pnpm dev

# Or for admin app
pnpm dev:admin
```

The app will be available at `http://localhost:3000`

### Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Build

```bash
# From workspace root
pnpm build

# Or specifically for web app
cd apps/web
pnpm build
```

### Type Checking

```bash
pnpm check-types
```

## Project Structure

```
apps/web/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public routes (marketing/service pages)
│   ├── (app)/             # App portal routes (after login)
│   ├── (admin)/           # Admin routes (placeholder)
│   └── layout.tsx          # Root layout
├── src/
│   ├── components/
│   │   ├── ui/            # shadcn/ui components (DO NOT EDIT)
│   │   ├── shell/         # Header, Footer, ThemeToggle
│   │   └── sections/      # Placeholder for bento modules
│   ├── lib/               # Utilities and helpers
│   │   ├── utils.ts       # cn() helper
│   │   ├── storage.ts     # localStorage helpers
│   │   └── constants.ts   # Stock image registry
│   └── mocks/             # Mock JSON data
└── public/
    └── brand/             # Logos and brand assets
```

## Route Map

### Public Routes (`(public)`)

- `/` - Home page
- `/authenticate` - Submit items for authentication
- `/verify` - Verify product ID/certificate
- `/marketplace` - Browse authenticated items
- `/marketplace/[slug]` - Item detail page
- `/consign` - Consignment information
- `/about` - About page (sections: 4.1, 4.2, 4.3, 4.3.2)
- `/policies` - Privacy policy
- `/terms` - Terms of service
- `/contact` - Contact information

### App Routes (`(app)`)

- `/login` - Login page (3 tabs: Email, Magic Link, Social)
- `/app` - Dashboard
- `/app/submissions` - User submissions
- `/app/listings` - User listings

### Admin Routes (`(admin)`)

- `/admin` - Admin placeholder

## Component Map

### Shell Components (`src/components/shell/`)

- **Header.tsx** - Main navigation header with logo, nav items, theme toggle, login/account button
- **Footer.tsx** - Multi-column footer with links, brand lockup, social icons
- **ThemeToggle.tsx** - Dark/light theme toggle with localStorage persistence

### UI Components (`src/components/ui/`)

All shadcn/ui components installed via CLI:
- button, card, input, label, tabs, dropdown-menu, dialog, select, table, skeleton

**⚠️ IMPORTANT:** Do NOT edit files in `src/components/ui/`. These are managed by shadcn CLI. Create wrappers in `src/components/app/` or `src/components/shared/` if customization is needed.

### Sections (`src/components/sections/`)

Placeholder directory for future bento modules.

## Design Tokens

### Theme System

The app uses CSS variables for theming with light and dark modes.

#### Light Theme (`:root`)

```css
--radius: 0px;                    /* No border radius */
--primary: 214 50% 25%;           /* Navy blue */
--primary-foreground: 0 0% 100%;  /* White */
--accent: 43 74% 49%;             /* Gold */
--accent-foreground: 222.2 84% 4.9%;
--background: 0 0% 100%;
--foreground: 222.2 84% 4.9%;
```

#### Dark Theme (`.dark`)

```css
--primary: 214 50% 30%;           /* Lighter navy */
--accent: 43 74% 49%;             /* Gold (same) */
--background: 222.2 84% 4.9%;
--foreground: 210 40% 98%;
```

### Typography

- **Font:** Geist (variable font, already installed)
- **Display:** `--font-geist-sans` for headings and body
- **Mono:** `--font-geist-mono` for code

### Spacing & Layout

- **Container:** Max-width 1280-1440px with gutters
- **Section Padding:** Large editorial spacing
- **Border Radius:** 0px system-wide

## Mock Contract

### LocalStorage Keys

All localStorage operations use the `storage` helper from `@/lib/storage`:

- `relique_session` - User session data
  ```typescript
  {
    userEmail: string;
    userName: string;
    loginMethod: "email" | "magic-link" | "social";
    createdAt: string;
  }
  ```

- `relique_theme` - Theme preference (`"light" | "dark"`)

- `relique_verifyHistory` - Array of verification results

- `relique_uploadsDraft` - Draft upload data (placeholder)

### Mock Data Files

Located in `src/mocks/`:

- `marketplace_listings.json` - Array of marketplace items
- `marketplace_detail.json` - Single item detail
- `policies_terms.json` - Policy and terms content
- `team.json` - Team member information

### Stock Image Registry

Defined in `src/lib/constants.ts`:

- `memorabilia` - Collectibles and sports items
- `autographs` - Signatures and handwriting
- `sportsStadium` - Stadium and crowd images
- `premiumTextures` - Dark luxury textures
- `packaging` - Box and shipping images
- `deskDocuments` - Office and finance vibes

All use Unsplash source URLs for placeholder images.

## Conventions

### Component Rules

1. **File Size Limit:** Each `.tsx` file MUST be under 200 lines
2. **shadcn Protection:** Never edit `src/components/ui/**` directly
3. **Wrapper Pattern:** Create wrappers in `src/components/app/` or `src/components/shared/` for customization
4. **Client Components:** Use `"use client"` only when necessary (interactivity, hooks, browser APIs)

### File Naming

- Components: PascalCase (`Header.tsx`)
- Utilities: camelCase (`utils.ts`, `storage.ts`)
- Routes: lowercase with dashes (Next.js convention)

### Import Paths

Use `@/` alias for imports:
- `@/components/ui/button`
- `@/lib/storage`
- `@/mocks/marketplace_listings.json`

## Development Guidelines

### Adding New Routes

1. Create page file in appropriate route group: `(public)`, `(app)`, or `(admin)`
2. Add route to this README's Route Map
3. Update navigation in `Header.tsx` if it's a public route

### Adding New Components

1. If it's a UI primitive, check if shadcn has it first: `npx shadcn@latest add [component]`
2. If custom, create in `src/components/shared/` or `src/components/app/`
3. Keep components under 200 lines - extract logic to hooks if needed

### Theme Customization

1. Edit CSS variables in `app/globals.css`
2. Test in both light and dark modes
3. Ensure contrast ratios meet accessibility standards

## Definition of Done - Phase 1

- [x] Build runs without errors
- [x] All routes accessible and render correctly
- [x] Header/Footer consistent across pages
- [x] Dark/light toggle works and persists
- [x] Radius=0 applied to buttons/inputs/cards
- [x] Verify page shows fake loading and mock result
- [x] Marketplace list and detail routes work
- [x] Login mock saves session and redirects
- [x] App routes protected (redirect if no session)
- [x] Session persists on page refresh
- [x] All components under 200 lines
- [x] shadcn components installed via CLI
- [x] Documentation complete

## Documentation

See `docs/` directory for detailed documentation:

- **ASSET_USAGE.md** - Asset manifest and usage guide
- **OG_SPEC.md** - Open Graph images specification
- **PERFORMANCE.md** - Performance optimization notes
- **QA_CHECKLIST.md** - QA checklist and audit results
- **ACCESSIBILITY.md** - Accessibility audit results
- **SMOKE_TESTS.md** - Smoke tests documentation
- **DEMO_SCRIPT.md** - Demo script for client presentation
- **COMPONENT_CATALOG.md** - Component catalog with props and usage
- **STRUCTURE.md** - Architecture overview and file organization
- **SCOPE_BOUNDARIES.md** - Scope boundaries for contract
- **NEXT_STEPS.md** - Next steps checklist after contract signing

## Phase 5 Deliverables

- ✅ Asset Manifest + mapping
- ✅ OG/metadata spec + robots + sitemap
- ✅ QA checklist pass (light/dark, rounded-0, states)
- ✅ Smoke tests checklist
- ✅ Demo script + talking points
- ✅ Handoff docs (README + component catalog + structure map + scope boundaries)

## Next Steps (Future Phases)

See `docs/NEXT_STEPS.md` for detailed next steps checklist:

- Backend/API integration
- Real authentication flow
- Payment processing
- Real marketplace inventory
- Moderation + audit logs + RBAC
