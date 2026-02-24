# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Relique.co is a collectibles authentication and marketplace platform. It is a **pnpm + Turborepo** monorepo with two Next.js 16 apps and shared packages:

| App / Package | Port | Purpose |
|---|---|---|
| `apps/web` | 1300 | Customer-facing site (marketplace, verify, consign) |
| `apps/admin` | 3600 | Admin dashboard (CRM, marketplace management, auth) |
| `packages/shared` | — | Domain types, schemas, config (`@relique/shared`) |
| `packages/ui` | — | Shared component library (`@relique/ui`) |
| `packages/eslint-config` | — | ESLint configs (`@repo/eslint-config`) |
| `packages/typescript-config` | — | TS configs (`@repo/typescript-config`) |

### Running services

Standard commands are in the root `package.json` — see `scripts` section. Key ones:

- **Dev (both apps):** `pnpm dev:all`
- **Dev (web only):** `pnpm dev:web` → port 1300
- **Dev (admin only):** `pnpm dev:admin` → port 3600
- **Build:** `pnpm build`
- **Lint:** `pnpm lint`
- **Type check:** `pnpm typecheck`

### Non-obvious caveats

1. **Supabase dependency:** The admin app requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` env vars to render its login page (the client-side `createClient()` throws without them). Placeholder `.env.local` files are created during setup — replace with real credentials for actual auth/data flows.

2. **Web app works without Supabase:** The web app's pages (home, marketplace, verify, consign, about, contact) use mock/localStorage data. Only the API routes (`/api/marketplace/*`) need real Supabase credentials.

3. **sharp build scripts:** pnpm 10 blocks build scripts by default. The root `package.json` has `pnpm.onlyBuiltDependencies` allowing `sharp`, `@resvg/resvg-js`, and `esbuild` to build. If you see "Ignored build scripts: sharp" after install, run `pnpm install` again — the config should handle it.

4. **Lint warnings with --max-warnings 0:** Both apps have pre-existing lint warnings (110+ in web, 130+ in admin). The `--max-warnings 0` flag causes non-zero exit. This is expected. There are zero actual errors.

5. **`@relique/shared` lint:** The shared package's lint script fails because `eslint` is not a direct devDependency. Run lint on individual apps (`pnpm --filter web lint`, `pnpm --filter admin lint`) for useful results.

6. **Admin auth guard:** The admin middleware redirects unauthenticated users from `/admin/*` to `/login`. Without real Supabase credentials, you cannot access admin pages beyond the login screen.

7. **All chat responses to the user MUST be in Vietnamese** per workspace rules (`.cursor/rules/shadcn-guard.mdc`).
