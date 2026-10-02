# Auth frontend template

React + TypeScript + Vite frontend with a complete auth system for a cookie-based Express backend.
Backend contract: `docs/openapi.yaml`. Map of the code: `TEMPLATE-SUMMARY.md`.

## Commands
- `npm run dev` starts the app, `npm run typecheck` checks types, `npm run build` builds.
- Copy `.env.example` to `.env`. `VITE_API_URL` is the backend base URL (includes `/api`).

## Rules
- Do NOT modify `src/features/auth/`, `src/features/profile/`, `src/app/guards/`, or `src/shared/api/`. They work. Ask first if a change seems needed.
- Restyle only through `src/theme/theme.css` and `src/theme/brand.ts`. Use token classes (`bg-primary`, `text-muted-foreground`, `rounded-md`); never hardcode colors or edit page logic to change the look.
- Auth is cookie-based (httpOnly). Never store tokens in the browser. All requests go through `api` or `request` from `@/shared/api`, which send credentials and refresh the session once on 401.
- Never invent endpoints, fields, or password rules. If the backend does not define it in `docs/openapi.yaml`, ask.
- Route paths live in `src/app/paths.ts`; use them instead of string literals.
- Errors are shown with `getErrorMessage`. Forms use react-hook-form + a zod schema in the feature's `schemas.ts`.

## Adding a feature
Copy the pattern in `src/features/example/` (reference only, not registered). Then: add a path in `paths.ts`, a route in the protected group of `src/app/router.tsx`, and a link in `navItems` in `src/app/AppLayout.tsx`. Admin-only pages use `<ProtectedRoute roles={["admin"]} />`.

## Conventions
- Import alias `@/` = `src/`. Named exports. Other features are imported only through their `index.ts` (e.g. `@/features/auth`).
- Query keys start with the feature name; logout clears every key except `session`.
- Reuse shared components (`Button`, `TextField`, `Card`, `Alert`) before creating new ones.
