# Task 01 Proofs - React Query Provider and Cache Configuration

## Task Summary

This task verifies that the Lab 4 app has a central react-query provider configured in `src/index.tsx` and documents the cache behavior expected for Lab 4.

## What This Task Proves

- The app already includes a `QueryClientProvider` wrapped around the router.
- React Query defaults are configured for browser-side caching.
- The configuration is documented in source code for reviewer visibility.

## Evidence Summary

- `src/index.tsx` contains a `QueryClientProvider` and `QueryClient` defaults.
- Query defaults include `staleTime`, `refetchInterval`, and `refetchOnWindowFocus` settings.
- The configuration includes a reviewer-facing comment explaining the Lab 4 caching behavior.

## Artifact: React Query provider configuration

**What it proves:** The app entrypoint is already using react-query provider infrastructure.

**Why it matters:** React-query is the foundation for Lab 4 caching and data fetching.

**File:** `src/index.tsx`

**Result summary:** The app has `QueryClientProvider` around the router and query defaults set for caching.

## Artifact: Cache defaults documentation

**What it proves:** The selected react-query defaults are documented for Lab 4 review.

**Why it matters:** Reviewers can trace caching intent without guessing configuration choices.

**File:** `src/index.tsx`

**Result summary:** A comment now explains `staleTime`, `refetchInterval`, and `refetchOnWindowFocus` choices.
