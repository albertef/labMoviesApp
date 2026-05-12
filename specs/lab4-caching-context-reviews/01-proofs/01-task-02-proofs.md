# Task 02 Proofs - Refactor API Data Fetching to React Query

## Task Summary

This task refactors the Lab 4 movie app to use react-query for discovery and movie detail data fetching instead of manual `useEffect` and `useState` logic.

## What This Task Proves

- `HomePage` now uses `useQuery` to fetch TMDB discover movies.
- `MovieDetailsPage` now uses a react-query-backed `useMovie` hook to fetch movie details.
- The existing API layer in `src/api/tmdb-api.ts` is reused for all query functions.
- Loading and error states are handled on both pages.

## Evidence Summary

- Build succeeds after the refactor.
- ESLint passes cleanly.
- `src/api/tmdb-api.ts` still provides TMDB helper functions.
- `src/hooks/useMovie.ts` now returns a react-query result object.

## Artifact: Build result

**What it proves:** The react-query refactor compiles successfully with TypeScript and Vite.

**Command:**

```bash
npm run build
```

**Result summary:** Build completed successfully with no errors.

## Artifact: Lint result

**What it proves:** The refactor meets repository lint rules.

**Command:**

```bash
npm run lint
```

**Result summary:** ESLint completed with no errors.

## Artifact: Code locations

- `src/pages/HomePage.tsx`
- `src/pages/MovieDetailsPage.tsx`
- `src/hooks/useMovie.ts`
- `src/api/tmdb-api.ts`

**What it proves:** These files contain the core react-query refactor and preserved API layer integration.
