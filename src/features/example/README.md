# Example feature (reference only)

This folder shows the pattern for a new feature: a paginated list with create and delete.
It is NOT registered in the router, so it never runs. It calls hypothetical `/items` endpoints.

To start a real feature from it:

1. Copy this folder to `src/features/<your-feature>/` and rename things.
2. Adapt `types.ts`, `api.ts`, and `schemas.ts` to the real backend endpoints (see `docs/openapi.yaml`).
3. Add a path to `src/app/paths.ts`.
4. Add a route to the inner `children` of the protected group in `src/app/router.tsx`.
5. Add an entry to `navItems` in `src/app/AppLayout.tsx`.
6. Delete this example folder when you no longer need it as a reference.

Pattern:

- `api.ts`: only place that calls the backend (through `api` or `request` from `@/shared/api`).
- `hooks.ts`: TanStack Query hooks. The first query-key element is the feature name.
- `schemas.ts`: zod schemas for forms; `components/` hold the forms; `pages/` compose them.
- Errors always go through `getErrorMessage`. Colors only through theme tokens.
