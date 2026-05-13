# 01-tasks-lab4-caching-context-reviews.md

# 01-tasks-lab4-caching-context-reviews.md

## Feature Reference

- Spec: `specs/lab4-caching-context-reviews/spec.md`
- Feature: Lab 4 caching, shared favourites context, configurable card actions, review form flow

## Planning Assumptions

- The current repo already includes a completed Lab 3 baseline with Vite, React, TypeScript, TMDB integration, and route structure.
- `src/index.tsx` already provides a `QueryClientProvider`; Task 1 will verify and stabilize this setup rather than add it from scratch.
- `UpcomingMoviesPage` exists and is not a core Lab 4 target unless incidental refactor impacts it.
- The existing `TemplateMovieListPage` and `MovieCard` components are the correct extension points for action configuration.

## Relevant Files

| File                                       | Why It Is Relevant                                                       |
| ------------------------------------------ | ------------------------------------------------------------------------ |
| `src/index.tsx`                            | Application entrypoint and existing react-query provider configuration   |
| `src/pages/HomePage.tsx`                   | Source of current movie discovery fetch and favourites local-state logic |
| `src/pages/FavouriteMoviesPage.tsx`        | Current favourites page implementation to migrate to shared context      |
| `src/hooks/useMovie.ts`                    | Existing movie details data fetching hook to refactor to react-query     |
| `src/components/MovieCard.tsx`             | Current movie card actions and UI that must become configurable          |
| `src/components/MovieList.tsx`             | Renders movie cards and passes action handlers                           |
| `src/components/TemplateMovieListPage.tsx` | List page template used by discover and favourites pages                 |
| `src/api/tmdb-api.ts`                      | Existing API layer for TMDB calls that should be reused                  |
| `src/types/movieAppTypes.ts`               | Shared type definitions for movies, favourites, reviews, and page props  |
| `src/pages/MovieReviewPage.tsx`            | Existing review page to preserve and reuse as part of spec continuity    |

## Parent Tasks

### [x] 1.0 Stabilize React Query Provider and Cache Configuration

**Goal:** Confirm the app has a central react-query provider and define cache behavior for Lab 4 data fetching.

**Spec sections covered:** Server-State Caching, Technical Considerations

**Demoable outcome:** App loads with react-query available, and query defaults are configured to reuse cached movie responses.

**Likely files affected:** `src/index.tsx`, `package.json`

#### 1.0 Proof Artifact(s)

- Screenshot: `src/index.tsx` showing `QueryClientProvider` configuration demonstrates query provider setup.
- Screenshot: Network tab after two visits to HomePage shows no duplicate discovery request within stale time demonstrates caching.
- Test: `QueryClient` config unit test or component smoke test passes demonstrates configuration is validated.

### [x] 2.0 Refactor API Data Fetching to React Query

**Goal:** Replace manual `useEffect/useState` TMDB fetching with react-query hooks for discovery, movie details, and images.

**Spec sections covered:** Server-State Caching, Expected Functional Behaviour, Repository Standards

**Demoable outcome:** Home, movie details, and favourites page flows display data from react-query hooks and show loading/error states.

**Likely files affected:** `src/pages/HomePage.tsx`, `src/hooks/useMovie.ts`, `src/pages/MovieDetailsPage.tsx`, `src/api/tmdb-api.ts`

#### 2.0 Proof Artifact(s)

- Screenshot: HomePage showing loading skeleton or spinner before movie data loads demonstrates async handling.
- Screenshot: Movie details page still renders after refactor demonstrates data flow continuity.
- Test: `useMovie` refactor unit test passes demonstrates hook behavior.

### [x] 3.0 Add Shared Favourites Context and Migrate State

**Goal:** Replace page-local favourites logic with an app-wide React Context that persists favourites across navigation and syncs to localStorage.

**Spec sections covered:** Favourites Context, Favourites Page, Expected Functional Behaviour

**Demoable outcome:** Home page and favourites page both reflect the same favourites state, and favourites survive navigation.

**Likely files affected:** `src/contexts/MoviesContext.tsx`, `src/index.tsx`, `src/pages/HomePage.tsx`, `src/pages/FavouriteMoviesPage.tsx`, `src/components/TemplateMovieListPage.tsx`, `src/types/movieAppTypes.ts`

#### 3.0 Proof Artifact(s)

- Screenshot: HomePage favourite button state persists after navigating to favourites page demonstrates shared state.
- Screenshot: Favourites page loads with movies selected earlier demonstrates localStorage restore.
- Test: `MoviesContext` provider unit test passes demonstrates add/remove and persistence.

### [ ] 4.0 Refactor Movie Card Actions to Be Configurable

**Goal:** Convert `MovieCard` to accept configurable action renderers so pages can render different buttons without duplicating the card component.

**Spec sections covered:** Configurable Movie Card Actions, Movie card action buttons

**Demoable outcome:** Home page renders add-to-favourites; favourites page renders remove-from-favourites and write-review actions.

**Likely files affected:** `src/components/MovieCard.tsx`, `src/components/MovieList.tsx`, `src/components/TemplateMovieListPage.tsx`, `src/components/CardIcons/AddToFavourites.tsx`, `src/components/CardIcons/RemoveFromFavourites.tsx`, `src/components/CardIcons/WriteReview.tsx`

#### 4.0 Proof Artifact(s)

- Screenshot: HomePage movie card has add favourite button and no write-review button demonstrates page-specific actions.
- Screenshot: FavouriteMoviesPage movie card has remove and write-review buttons demonstrates configurable actions.
- Test: `MovieCard` action-rendering unit test passes demonstrates render-prop composition.

### [ ] 5.0 Add Review Form Page, Validation, and Review Storage

**Goal:** Add a review form page for favourite movies using react-hook-form, validate input, submit reviews into app state, and display reviews appropriately.

**Spec sections covered:** Review Form Page, Review Submission Flow, Non-Functional Requirements

**Demoable outcome:** User can open a review page, submit a validated review, and see it persist in page state or UI review section.

**Likely files affected:** `src/pages/AddMovieReviewPage.tsx`, `src/components/ReviewForm/ReviewForm.tsx`, `src/contexts/MoviesContext.tsx`, `src/types/movieAppTypes.ts`, `src/pages/MovieDetailsPage.tsx`, `src/pages/MovieReviewPage.tsx`

#### 5.0 Proof Artifact(s)

- Screenshot: Review form page showing validation error message after invalid submit demonstrates feedback.
- Screenshot: Submitted review visible on movie details or review page demonstrates state flow.
- Test: `ReviewForm` validation unit test passes demonstrates form handling.

## Detailed Subtasks

### 1.0 Server-State Caching with React Query

- [x] 1.1 Review `src/index.tsx` and confirm `QueryClientProvider` exists and is wrapped around the router.
  - Files: `src/index.tsx`
  - Done when `QueryClientProvider` is present and `QueryClient` is configured.
- [x] 1.2 Verify existing react-query config values match Lab 4 cache expectations (staleTime, refetchOnWindowFocus).
  - Files: `src/index.tsx`
  - Done when values are documented and set to reuse cached results.
- [x] 1.3 Add or update a small smoke test or comment documenting the query defaults for reviewers.
  - Files: `src/index.tsx`, optionally test file near app bootstrap
  - Done when a test or code comment clearly documents the provider configuration.

### 2.0 Refactor API Data Fetching to React Query

- [x] 2.1 Add react-query hooks for TMDB discovery and movie details using `useQuery`.
  - Files: `src/hooks/useMovie.ts`, `src/pages/HomePage.tsx`
  - Done when discovery and details useQuery returns are wired into pages.
- [x] 2.2 Preserve the existing API layer by reusing `src/api/tmdb-api.ts` helper functions in query functions.
  - Files: `src/api/tmdb-api.ts`, `src/hooks/useMovie.ts`, `src/pages/HomePage.tsx`
  - Done when query functions call existing API helpers instead of new fetch logic.
- [x] 2.3 Add loading and error handling to HomePage and MovieDetailsPage while query data loads.
  - Files: `src/pages/HomePage.tsx`, `src/pages/MovieDetailsPage.tsx`
  - Done when pages render fallback UI on loading and an error message on failure.
- [x] 2.4 Confirm `MovieDetailsPage` continues to render movie details and review components after refactor.
  - Files: `src/pages/MovieDetailsPage.tsx`
  - Done when movie details page is functional and no runtime fetch logic remains in `useEffect`.

### 3.0 Add Shared Favourites Context and Migrate State

- [x] 3.1 Create `src/contexts/MoviesContext.tsx` with favourites state, add/remove methods, and localStorage sync.
  - Files: `src/contexts/MoviesContext.tsx`, `src/types/movieAppTypes.ts`
  - Done when provider exposes favourites state and actions.
- [x] 3.2 Wrap the app in `MoviesContext.Provider` in `src/index.tsx` alongside `QueryClientProvider`.
  - Files: `src/index.tsx`
  - Done when the provider surrounds routes and app components.
- [x] 3.3 Refactor `HomePage.tsx` to use favourites context actions instead of local state `addToFavourites` and localStorage writes.
  - Files: `src/pages/HomePage.tsx`, `src/components/TemplateMovieListPage.tsx`
  - Done when home page renders favourite state from context and updates via context handlers.
- [x] 3.4 Refactor `FavouriteMoviesPage.tsx` to load favourites from context instead of localStorage formatting.
  - Files: `src/pages/FavouriteMoviesPage.tsx`
  - Done when favourites page uses context state and stays in sync with the home page.
- [x] 3.5 Add context-driven behaviour to `TemplateMovieListPage` or `MovieList` if needed to pass favourite action handlers cleanly.
  - Files: `src/components/TemplateMovieListPage.tsx`, `src/components/MovieList.tsx`
  - Done when page components pass context actions through to cards.

### 4.0 Refactor Movie Card Actions to Be Configurable

- [ ] 4.1 Update `src/components/MovieCard.tsx` to accept optional render props or action components instead of a single `selectFavourite` prop.
  - Files: `src/components/MovieCard.tsx`, `src/types/movieAppTypes.ts`
  - Done when card renders actions passed from parent pages.
- [ ] 4.2 Refactor `src/components/MovieList.tsx` to supply action renderers from page props.
  - Files: `src/components/MovieList.tsx`, `src/components/TemplateMovieListPage.tsx`
  - Done when list items call `MovieCard` with page-specific action props.
- [ ] 4.3 Add page-specific action components: AddToFavourites, RemoveFromFavourites, WriteReview.
  - Files: `src/components/CardIcons/AddToFavourites.tsx`, `src/components/CardIcons/RemoveFromFavourites.tsx`, `src/components/CardIcons/WriteReview.tsx`
  - Done when each action component renders the correct button and triggers the expected callback.
- [ ] 4.4 Wire HomePage to render `AddToFavourites` buttons, and wire FavouriteMoviesPage to render `RemoveFromFavourites` and `WriteReview` buttons.
  - Files: `src/pages/HomePage.tsx`, `src/pages/FavouriteMoviesPage.tsx`, `src/components/TemplateMovieListPage.tsx`
  - Done when page-specific buttons appear on the correct pages.
- [ ] 4.5 Add a review navigation handler from favourites card action to `MovieReviewPage` route.
  - Files: `src/components/CardIcons/WriteReview.tsx`, `src/pages/FavouriteMoviesPage.tsx`
  - Done when clicking write-review navigates to the review page for that movie.

### 5.0 Add Review Form Page, Validation, and Review Storage

- [ ] 5.1 Create `src/pages/AddMovieReviewPage.tsx` with a form route at `/reviews/:id`.
  - Files: `src/pages/AddMovieReviewPage.tsx`, `src/index.tsx`
  - Done when the route exists and the page renders a form component.
- [ ] 5.2 Add `src/components/ReviewForm/ReviewForm.tsx` using react-hook-form and model validation.
  - Files: `src/components/ReviewForm/ReviewForm.tsx`, `src/types/movieAppTypes.ts`
  - Done when the form accepts rating and text and validates required fields.
- [ ] 5.3 Store submitted reviews in app state via `MoviesContext` or a dedicated review slice.
  - Files: `src/contexts/MoviesContext.tsx`, `src/types/movieAppTypes.ts`
  - Done when submitted review objects are added to context state.
- [ ] 5.4 Show clear submit feedback and navigate user after successful review submission.
  - Files: `src/components/ReviewForm/ReviewForm.tsx`, `src/pages/AddMovieReviewPage.tsx`
  - Done when successful submission displays confirmation and optionally redirects.
- [ ] 5.5 Display reviews on the movie details page or review page if the app already uses review excerpts.
  - Files: `src/pages/MovieDetailsPage.tsx`, `src/pages/MovieReviewPage.tsx`
  - Done when the submitted review appears in the UI after submission.

## Task Dependencies

- Task 1.0 must complete before Task 2.0 because react-query must be stable before refactoring fetch logic.
- Task 2.0 and Task 3.0 are parallelizable after Task 1.0, but Task 3.0 should complete before Task 4.0 to surface favourites state in configurable actions.
- Task 4.0 must complete before Task 5.0 because review actions depend on card action wiring.
- Task 5.0 includes final validation that does not change core data fetching or favourites state.

## Planning Audit Considerations

- Confirm every parent task maps to at least one proof artifact and one spec requirement.
- Note that `src/index.tsx` already contains a react-query provider, so the audit should treat Task 1.0 as verification rather than new setup.
- Monitor regression risk on `MovieReviewPage` and `UpcomingMoviesPage` since they are not central Lab 4 targets.
- Validate that the existing `TemplateMovieListPage` filter and movie list behavior remain untouched unless action passing requires refactor.

## Validation Coverage Map

| Coverage Area                 | Parent Task   | Verification Approach                                                               |
| ----------------------------- | ------------- | ----------------------------------------------------------------------------------- |
| Discover/Home page            | 2.0, 3.0, 4.0 | Home page loads with cached data, favourites action present, no duplicate API calls |
| Movie details page            | 2.0, 5.0      | Details page still loads via react-query and displays reviews after submission      |
| Review excerpts / full review | 5.0           | Submitted review shown in review UI and on details page                             |
| Favourites page               | 3.0, 4.0      | Favourites page loads from context and shows remove/write-review buttons            |
| Review form page              | 5.0           | Review page route, validation errors, submission feedback                           |
| Caching behaviour             | 1.0, 2.0      | React-query provider set, repeated visits use cache                                 |
| Configurable card actions     | 4.0           | Page-specific card buttons render correctly                                         |
| App-wide favourites state     | 3.0           | Home and favourites page share favourite movie state                                |
