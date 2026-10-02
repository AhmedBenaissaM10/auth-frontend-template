# Auth Frontend Template: Summary

## Stack
- React 19 + TypeScript, Vite, React Router, Tailwind CSS v4
- TanStack Query (server state), React Hook Form + Zod (forms)
- Env: `VITE_API_URL` (backend base URL including `/api`)
- Backend: cookie-based auth (httpOnly `accesstoken` / `refreshtoken`), contract in `docs/openapi.yaml`

## Folder structure
```
src/
  app/            router, paths, AppLayout (navbar), NotFoundPage, App
    guards/       ProtectedRoute (roles prop), PublicOnlyRoute
  features/
    auth/         DO NOT MODIFY: login, signup, forgot/reset, Google button, session hooks
    profile/      DO NOT MODIFY: edit profile, change password
    home/         home page (replace with the project's main screen)
    example/      reference pattern for new features (not registered)
  shared/
    api/          API client, errors, types (mirror openapi), queryClient
    components/   Alert, Button, Card, FullPageError, FullPageSpinner, Spinner, TextField
  theme/          theme.css (colors, radius, fonts, light/dark), brand.ts (app name, tagline)
```

## Where things live
- Theme: `src/theme/theme.css` (the only place for design changes); app name and tagline in `src/theme/brand.ts`
- API client: `src/shared/api/client.ts` (`api` returns data, `request` returns envelope with `meta`); sends cookies, refreshes once on 401
- Errors: `src/shared/api/errors.ts` (`ApiError`, `getErrorMessage`)
- Session: `src/features/auth/session.ts` (`useSession`, `useLogin`, `useSignup`, `useLogout`, `setSessionUser`, `clearSession`); status is `loading | authenticated | unauthenticated | error`
- Guards: `src/app/guards/`; layout and navbar links: `src/app/AppLayout.tsx` (`navItems`)
- Paths: `src/app/paths.ts`; routes: `src/app/router.tsx`

## Routes
| Path | Page | Access |
|---|---|---|
| / | Welcome | logged-out only |
| /login | Login | logged-out only |
| /signup | Sign up | logged-out only |
| /forgot-password | Forgot + reset password (2 steps) | logged-out only |
| /home | Home | logged in |
| /profile | Profile (edit, change password) | logged in |

Logged-out users hitting a protected page go to /login and return afterwards. Logged-in users hitting a logged-out-only page go to /home.

## How to add a new feature
1. Copy `src/features/example/` to `src/features/<name>/`; adapt `types.ts`, `api.ts`, `schemas.ts` to the real endpoints
2. Add a path to `paths.ts`
3. Add a route to the inner `children` of the protected group in `router.tsx`
4. Add a link to `navItems` in `AppLayout.tsx`
5. Call the backend only through `api` / `request`; reuse the shared components

## Conventions
- Alias `@/` = `src/`; named exports; features imported via their `index.ts`
- Colors and radius only via theme tokens (`bg-primary`, `text-muted-foreground`, ...)
- Forms: react-hook-form + zodResolver, schema in the feature's `schemas.ts`; errors via `getErrorMessage`
- Query keys start with the feature name
- Google login is a full-page redirect to `{API_URL}/auth/google` (a link, never fetch)

## Known limitations
- No admin UI (the backend has `/admin/users`; build only when needed)
- No email verification flow, no i18n, no theme toggle (dark mode follows the system; `data-theme` on `<html>` overrides it)
- No client-side password-strength rules; the backend's message is shown
- No automated tests
