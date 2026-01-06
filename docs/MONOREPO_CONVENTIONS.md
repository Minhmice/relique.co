# Monorepo Conventions

Final conventions locked for Phase 7 to prevent future issues.

## Next.js TranspilePackages

### Configuration
Both `apps/web` and `apps/app-portal` must include:
```javascript
transpilePackages: ["@relique/shared", "@relique/ui"]
```

**Files:**
- `apps/web/next.config.js` ✅
- `apps/app-portal/next.config.js` ✅

**Why:** Ensures Next.js properly transpiles TypeScript from internal packages.

## TypeScript Project References

### Package Configuration
- `packages/shared/tsconfig.json`: `composite: true` ✅
- `packages/ui/tsconfig.json`: `composite: true` ✅

### App Configuration
- `apps/web/tsconfig.json`: References shared & ui ✅
- `apps/app-portal/tsconfig.json`: References shared & ui ✅

### Root Build
- `tsconfig.json`: Root references config ✅

**Usage:**
```bash
pnpm typecheck  # Runs tsc --build (graph-based)
```

## shadcn/ui Monorepo Hygiene

### components.json
Each app has its own `components.json`:
- `apps/web/components.json` ✅
- `apps/app-portal/components.json` ✅

**Aliases:**
- `components`: `@/components`
- `ui`: `@/components/ui`
- `utils`: `@/lib/utils`

**Note:** When generating new shadcn components, ensure you're in the correct app directory and using the correct aliases.

## ESLint Configuration

### Package Structure
- `packages/shared/eslint.config.js` ✅
- `packages/ui/eslint.config.mjs` ✅
- `apps/web/eslint.config.js` ✅
- `apps/app-portal/eslint.config.js` ✅

### Boundary Enforcement
All apps use `@repo/eslint-config/boundaries` to enforce:
- No cross-app imports
- No deep package imports
- No direct localStorage access in UI

## Route Groups

Next.js route groups `(public)`, `(legal)`, `(admin)` do not affect URL paths.

**Current Structure:**
- `app/(public)/` - Public pages (no prefix in URL)
- `app/(legal)/` - Legal pages (no prefix in URL)
- `app/(admin)/` - Admin pages (requires `/admin` prefix)
- `app/(app)/` - App pages (requires `/app` prefix)

**Note:** Route groups can be renamed without affecting URLs, but avoid path conflicts.

## Import Rules

### Allowed Imports
- `@relique/shared/*` - From shared package exports
- `@relique/ui/*` - From UI package exports
- `@/...` - Internal app imports

### Forbidden Imports
- `@relique/shared/src/...` - Deep package imports
- `@relique/ui/src/...` - Deep package imports
- `../../apps/*` - Cross-app imports
- Direct `localStorage` in UI components

## Build Commands

```bash
pnpm lint          # Lint all packages
pnpm typecheck     # TypeScript graph build
pnpm build         # Build all apps
pnpm check         # lint + typecheck + test:e2e + build
```

## Troubleshooting

### "Module not found" errors
- Check `transpilePackages` includes package
- Verify package is in `package.json` dependencies
- Run `pnpm install`

### TypeScript errors
- Run `tsc --build` to see graph errors
- Check project references are correct
- Verify `composite: true` in packages

### shadcn component generation
- Ensure you're in correct app directory
- Check `components.json` aliases match
- Verify `@/components/ui` path exists

