# 01-tasks-movie-app-expansion.md

## Relevant Files

| File                                                         | Why It Is Relevant                                                                                 |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `src/api/tmdb-api.ts`                                        | Extend with TV series and actor fetchers for T1; add pagination parameters for T2                  |
| `src/hooks/useMovie.ts`                                      | Add hooks for TV series list, actor details, and paginated searches for T1 & T2                    |
| `src/pages/TvListPage.tsx`                                   | New page for displaying TV series list using TMDB API for T1                                       |
| `src/pages/TvListPage.test.tsx`                              | Unit tests for TV list rendering and data fetching for T1                                          |
| `src/pages/ActorDetailsPage.tsx`                             | New page for displaying actor bio and filmography for T1                                           |
| `src/pages/ActorDetailsPage.test.tsx`                        | Unit tests for actor details page for T1                                                           |
| `src/components/ActorCard.tsx`                               | Reusable actor card component for displaying actor information for T1                              |
| `src/components/SearchForm/MultiCriteriaSearchForm.tsx`      | Multi-criteria search form with genre, year, and rating filters for T2                             |
| `src/components/SearchForm/MultiCriteriaSearchForm.test.tsx` | Unit tests for search form validation and submission for T2                                        |
| `src/contexts/AuthContext.tsx`                               | Context for managing JWT tokens and user authentication state for T3                               |
| `src/contexts/useAuthContext.ts`                             | Hook for consuming AuthContext in components for T3                                                |
| `src/api/backend-api.ts`                                     | Assignment 1 API integration layer for auth, favorites, reviews, and fantasy movies for T3, T4, T5 |
| `src/pages/LoginPage.tsx`                                    | Login form page for signing in via Assignment 1 backend for T3                                     |
| `src/pages/LoginPage.test.tsx`                               | Unit tests for login page form and authentication flow for T3                                      |
| `src/components/ProtectedRoute.tsx`                          | Route wrapper that redirects unauthenticated users to login for T3                                 |
| `src/pages/FantasyMoviePage.tsx`                             | Page hosting the fantasy movie creation form for T4                                                |
| `src/pages/FantasyMoviePage.test.tsx`                        | Unit tests for fantasy movie page navigation and form display for T4                               |
| `src/components/FantasyMovieForm/FantasyMovieForm.tsx`       | Multi-section form for creating fantasy movies with cast and poster upload for T4                  |
| `src/components/FantasyMovieForm/FantasyMovieForm.test.tsx`  | Unit tests for form validation, field arrays, and submission for T4                                |
| `src/components/CastFieldArray.tsx`                          | Reusable component for dynamic cast member entry using useFieldArray for T4                        |
| `src/components/ImageUpload.tsx`                             | Component for selecting and uploading poster images for T4                                         |
| `src/types/movieAppTypes.ts`                                 | Extend types to include FantasyMovie, AuthUser, and backend API response types for T3, T4, T5      |
| `src/pages/MyFantasyMoviesPage.tsx`                          | Page displaying user-created fantasy movies fetched from backend for T5                            |
| `src/pages/FavouriteMoviesPage.tsx`                          | Modify existing page to fetch favorites from backend API instead of local state for T5             |
| `src/hooks/useFavorites.ts`                                  | Hook for managing favorite movies with backend sync for T5                                         |
| `src/hooks/useReviews.ts`                                    | Hook for managing reviews with backend persistence for T5                                          |
| `src/index.tsx`                                              | Modify to add new routes, AuthContext provider, and ProtectedRoute wrapping for T1, T3, T5         |

### Notes

- Follow existing repository conventions: components in `src/components/`, pages in `src/pages/`, hooks in `src/hooks/`, API layer in `src/api/`.
- Unit tests placed alongside source files (e.g., `Component.tsx` and `Component.test.tsx`).
- Use `npm run lint` and `npm run build` to verify quality after each parent task.
- All new API calls should use the backend-api.ts layer and include error handling.
- Components should follow Material-UI patterns established in Lab 4.

---

## Tasks

### [ ] 1.0 Entity Expansion: TV Series & Actors Views

Add list and detail pages for TV Series and Actors, with hyperlinking from movie cast lists.

#### 1.0 Proof Artifact(s)

- Screenshot: `/tv` page displays paginated TV series list from TMDB demonstrates new entity view
- Screenshot: `/actor/:id` page displays actor bio, filmography, and profile image demonstrates actor detail page
- Screenshot: Movie detail page with clickable actor name linking to `/actor/:id` demonstrates hyperlinking
- CLI: `npm run build` succeeds demonstrates no breaking changes
- CLI: `npm run lint` succeeds demonstrates code quality

#### 1.0 Tasks

- [ ] 1.1 Extend `src/api/tmdb-api.ts` with fetcher functions for TV series list, TV series details, actor details, and actor credits/filmography
- [ ] 1.2 Add custom hooks `useTvList()`, `useTvDetails()`, and `useActorDetails()` to `src/hooks/useMovie.ts` using react-query
- [ ] 1.3 Create `src/pages/TvListPage.tsx` using existing `TemplateMovieListPage` pattern with TV series data
- [ ] 1.4 Create `src/pages/ActorDetailsPage.tsx` displaying actor bio (name, birthday, biography, profile image) and filmography list
- [ ] 1.5 Create `src/components/ActorCard.tsx` for displaying actor information in lists
- [ ] 1.6 Add clickable actor links in `src/components/MovieDetails.tsx` that navigate to `/actor/:id` using React Router
- [ ] 1.7 Add routes `/tv` and `/actor/:id` to `src/index.tsx` pointing to new pages
- [ ] 1.8 Create unit tests in `TvListPage.test.tsx` and `ActorDetailsPage.test.tsx` verifying data fetch and render
- [ ] 1.9 Run `npm run build` and `npm run lint` to confirm no breaking changes

### [ ] 2.0 Advanced Browsing: Multi-Criteria Search & Pagination

Implement server-side pagination and multi-criteria search form with URL state synchronization across movie, TV, and actor lists.

#### 2.0 Proof Artifact(s)

- Screenshot: Search form with genre dropdown, year input, and rating slider on `/movies` page demonstrates multi-criteria UI
- Screenshot: Paginated results with "Previous/Next" buttons and page indicator demonstrates pagination controls
- Screenshot: URL containing `?page=2&genre=28&year=2023` with matching list results demonstrates URL synchronization
- Test: `useSearchParams` integration test passes demonstrating URL state persistence
- CLI: `npm run build` succeeds and lint passes

#### 2.0 Tasks

- [ ] 2.1 Update `src/api/tmdb-api.ts` functions to accept `page` and optional `filters` (genre, year, rating) parameters
- [ ] 2.2 Modify hooks in `src/hooks/useMovie.ts` to use `keepPreviousData: true` in react-query configuration for smooth pagination transitions
- [ ] 2.3 Create `src/components/SearchForm/MultiCriteriaSearchForm.tsx` using react-hook-form with inputs for genre (dropdown), year (number), and rating (slider)
- [ ] 2.4 Integrate search form into `src/pages/HomePage.tsx` above the movie list
- [ ] 2.5 Implement `useSearchParams` hook (or use React Router's built-in) to sync search/filter state to URL query parameters (e.g., `?page=2&genre=28&year=2023`)
- [ ] 2.6 Update `HomePage.tsx` to read URL params and pass them to `useMovieList()` query
- [ ] 2.7 Add pagination controls (Previous/Next buttons, page indicator) to movie list pages
- [ ] 2.8 Create unit test `MultiCriteriaSearchForm.test.tsx` verifying form validation and parameter generation
- [ ] 2.9 Test URL synchronization: change search filter, verify URL updates; navigate back via browser, verify filters restore
- [ ] 2.10 Run `npm run build` and `npm run lint`

### [ ] 3.0 Auth & Private Routes: Assignment 1 Backend Integration

Integrate sign-in functionality and protect routes requiring authentication (fantasy movie creation, favorites persistence).

#### 3.0 Proof Artifact(s)

- Screenshot: `/login` page with email and password inputs demonstrating sign-in UI
- Screenshot: Successful login redirects to `/` with JWT stored in browser context demonstrates authentication flow
- Screenshot: Attempting to access `/fantasy-movie` while logged out redirects to `/login` demonstrates protected route
- Screenshot: User profile or header shows logged-in user name demonstrates authenticated state display
- Test: `AuthContext` unit test passes demonstrating JWT token management
- CLI: `npm run build` succeeds

#### 3.0 Tasks

- [ ] 3.1 Create `src/api/backend-api.ts` with functions for login (POST `/auth/login`), signup (POST `/auth/signup`), and JWT refresh logic
- [ ] 3.2 Create `src/types/movieAppTypes.ts` updates: add `AuthUser`, `AuthResponse`, and `BackendApiError` types
- [ ] 3.3 Create `src/contexts/AuthContext.tsx` that manages JWT token, user info, and auth status; store JWT in localStorage with secure handling
- [ ] 3.4 Create `src/contexts/useAuthContext.ts` hook for consuming AuthContext in components
- [ ] 3.5 Create `src/pages/LoginPage.tsx` with email/password form using react-hook-form; call backend login endpoint and store JWT
- [ ] 3.6 Add login success redirect logic to navigate user to `/` or previous page after successful sign-in
- [ ] 3.7 Create `src/components/ProtectedRoute.tsx` wrapper component that checks AuthContext; redirects to `/login` if unauthenticated
- [ ] 3.8 Wrap `/fantasy-movie` and other protected routes with `ProtectedRoute` in `src/index.tsx`
- [ ] 3.9 Update `src/index.tsx` to wrap app with `<AuthProvider>` at root level
- [ ] 3.10 Display logged-in user name or email in site header using AuthContext
- [ ] 3.11 Create unit tests `LoginPage.test.tsx` for form submission and AuthContext updates
- [ ] 3.12 Run `npm run build` and `npm run lint`

### [ ] 4.0 Fantasy Movie Creation: Advanced Form with Cast & Poster Upload

Build a multi-section form allowing users to create fantasy movies with detailed fields, dynamic cast entry, and poster image upload.

#### 4.0 Proof Artifact(s)

- Screenshot: Fantasy movie form showing Basic Details (title, overview, release date, runtime) section demonstrates form structure
- Screenshot: Production Info and Cast List sections with "Add Cast Member" button demonstrating dynamic field arrays
- Screenshot: Submitted fantasy movie appears in a "My Fantasy Movies" list demonstrating form submission and display
- Screenshot: Form validation error (e.g., "Title is required") displays below input field demonstrates validation feedback
- Test: `FantasyMovieForm` unit test passes for required field validation demonstrates form handling
- CLI: `npm run build` succeeds and lint passes

#### 4.0 Tasks

- [ ] 4.1 Create `src/types/movieAppTypes.ts` updates: add `FantasyMovie` and `CastMember` types with required fields (title, overview, genres, releaseDate, runtime, productionCompany, cast array)
- [ ] 4.2 Create `src/components/ImageUpload.tsx` component for selecting and previewing poster image; return File object for FormData upload
- [ ] 4.3 Create `src/components/CastFieldArray.tsx` using `useFieldArray` from react-hook-form to allow adding/removing cast members with name and role inputs
- [ ] 4.4 Create `src/components/FantasyMovieForm/FantasyMovieForm.tsx` with three sections:
  - Basic Details: title, overview, genres (checkboxes), release date (date picker)
  - Production Info: runtime (number), production company (text)
  - Cast List: dynamic array using `CastFieldArray` component
- [ ] 4.5 Integrate `ImageUpload` into fantasy movie form for poster selection
- [ ] 4.6 Add form-level validation for required fields; display inline error messages below inputs
- [ ] 4.7 Implement form submission handler to construct FormData with all fields including poster file; call `backend-api.ts` POST endpoint
- [ ] 4.8 Create `src/pages/FantasyMoviePage.tsx` as protected route wrapping the form; show success message after submission and option to create another
- [ ] 4.9 Create unit tests `FantasyMovieForm.test.tsx` for field validation, cast array manipulation, and submission
- [ ] 4.10 Run `npm run build` and `npm run lint`

### [ ] 5.0 Fullstack Persistence: Reviews & Favorites to DynamoDB

Refactor local state to persist reviews, favorites, and fantasy movies to Assignment 1 backend and DynamoDB, with cross-session retrieval.

#### 5.0 Proof Artifact(s)

- Screenshot: User adds favorite movie, then logs out and back in; favorite still appears demonstrating persistence across sessions
- Screenshot: User submits a review; review appears in "Your Reviews" section on movie details page demonstrating review storage
- Screenshot: Fantasy movie created by user appears in list after page refresh demonstrating data persistence
- Test: Backend API integration test passes for POST/GET favorites and reviews demonstrating API connectivity
- CLI: `npm run build` succeeds; Network tab in DevTools shows POST requests to `/api/favorites` and `/api/reviews`

#### 5.0 Tasks

- [ ] 5.1 Extend `src/api/backend-api.ts` with endpoints for:
  - POST `/api/favorites` - add favorite movie for authenticated user
  - GET `/api/favorites` - fetch user's favorite movies
  - DELETE `/api/favorites/:movieId` - remove favorite
  - POST `/api/reviews` - submit movie review
  - GET `/api/reviews/:movieId` - fetch reviews for a movie
  - POST `/api/fantasy-movies` - save created fantasy movie (called from T4)
  - GET `/api/fantasy-movies` - fetch user's fantasy movies
- [ ] 5.2 Create `src/hooks/useFavorites.ts` hook that uses react-query to manage favorite movies with backend sync; include add/remove methods
- [ ] 5.3 Create `src/hooks/useReviews.ts` hook that uses react-query to manage reviews with backend sync
- [ ] 5.4 Refactor `src/contexts/MoviesContext.tsx` to use `useFavorites` and `useReviews` hooks instead of local state; persist JWT token from AuthContext
- [ ] 5.5 Update `src/pages/FavouriteMoviesPage.tsx` to fetch from backend using `useFavorites()` instead of local state
- [ ] 5.6 Create `src/pages/MyFantasyMoviesPage.tsx` displaying user's fantasy movies; fetch using new hook
- [ ] 5.7 Ensure all backend API calls include JWT token in Authorization header (extract from AuthContext)
- [ ] 5.8 Add error handling and loading states to all pages fetching from backend
- [ ] 5.9 Test persistence: Add favorite, log out/in, verify favorite still exists; submit review, refresh page, verify review persists
- [ ] 5.10 Update site header navigation to include link to "My Fantasy Movies" page for authenticated users
- [ ] 5.11 Run `npm run build` and `npm run lint`

---

## Dependencies & Execution Order

1. **T3 (Auth) → T5 (Persistence)**: Backend calls in T5 require authentication tokens from T3. Implement T3 first.
2. **T1 (Entities) → T2 (Search)**: T1 provides TV/Actor data endpoints that T2 will paginate. T1 can run in parallel with T2 for discovery phase.
3. **T4 (Fantasy Movie)** is independent but benefits from T3 (Auth) for protecting the form route.
4. **Recommended sequence**: T3 → T1 → T2 → T4 → T5 (or T1 parallel with T2 after T3 is partially complete).
