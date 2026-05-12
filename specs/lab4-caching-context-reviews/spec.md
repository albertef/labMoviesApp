# 01-spec-lab4-caching-context-reviews.md

## Introduction/Overview

This specification describes Lab 4 enhancements to the existing movie app, building upon the completed Lab 3 solution. The feature introduces server-state caching with react-query, migrates favourites state to React Context for persistence across navigation, adds configurable movie card actions, and implements a review form system for favourite movies. These changes aim to improve performance, state management, and user interaction without disrupting existing Lab 3 functionality.

## Starting Point

The feature starts from the completed Lab 3 solution in this repository, which includes Vite + React + TypeScript setup, TMDB API integration, movie list and details pages, routing, filtering, favourites support, reusable components, critic reviews, and custom hooks.

## Relevant Skills

- skills/server-state-caching/SKILL.md
- skills/context-for-shared-state/SKILL.md
- skills/render-props-configurable-actions/SKILL.md
- skills/review-forms-with-react-hook-form/SKILL.md
- skills/api-fetching/SKILL.md
- skills/component-composition/SKILL.md
- skills/component-hierarchy-and-page-assembly/SKILL.md

## Goals

- Implement efficient server-state caching to reduce unnecessary API calls on repeated page visits.
- Establish shared favourites state using React Context for consistent persistence across the app.
- Enable configurable movie card actions to support different behaviors on various pages.
- Add a review form page with validation and submission handling for user-generated movie reviews.
- Maintain backward compatibility with existing Lab 3 features and behaviors.

## User Stories

**As a user**, I want movie data to load quickly on repeated visits so that I don't experience unnecessary delays from API calls.

**As a user**, I want my favourite movie selections to persist across page navigation so that I can browse the app without losing my favourites list.

**As a user**, I want different action buttons on movie cards depending on the page (add to favourites on home, remove on favourites, write review on favourites) so that the interface adapts to my current context.

**As a user**, I want to write and submit reviews for my favourite movies so that I can share my opinions and feedback.

## In Scope

- Server-state caching with react-query for TMDB API calls.
- Migration of favourites state to React Context.
- Configurable movie card actions using render-prop composition.
- Review form page with react-hook-form and validation.
- Storage of user reviews in app state.

## Out of Scope

- Full app rewrite or major architectural changes.
- Advanced caching features like prefetching or complex invalidation.
- Persistent storage of reviews beyond app state.
- Fixes for upcoming movies page if broken by refactor.

## Expected Functional Behaviour

### Server-State Caching

Movie data from TMDB API is cached using react-query, preventing redundant requests on page revisits and improving load times.

### Favourites Context

Favourites are managed via React Context, persisting across navigation and syncing with localStorage.

### Favourites Page

Loads favourite movie details using shared context and cached data-fetching patterns.

### Configurable Movie Card Actions

Movie cards support different actions: add to favourites on home, remove and write review on favourites page.

### Review Form Page

Allows writing reviews for favourite movies with form validation and submission feedback.

### Review Submission Flow

Submitted reviews are stored in state and displayed on movie details pages.

## Demoable Units of Work

### Unit 1: Server-State Caching with React Query

**Purpose:** Implement caching for TMDB API calls to improve performance and reduce redundant requests.

**Functional Requirements:**

- The system shall use react-query to cache movie discovery, details, images, and genres API responses.
- The system shall serve cached data for repeated requests within a configurable stale time.
- The system shall handle loading and error states appropriately during API fetches.

**Proof Artifacts:**

- Screenshot: Network tab showing reduced API calls on page reload demonstrates caching effectiveness.
- Test: Unit test for react-query integration passes demonstrates proper setup.

### Unit 2: Favourites Context Migration

**Purpose:** Move favourites state to React Context for app-wide persistence.

**Functional Requirements:**

- The system shall provide a FavouritesContext that manages the list of favourite movie IDs.
- The system shall update the context when users add or remove favourites.
- The system shall persist favourites to localStorage and restore on app load.

**Proof Artifacts:**

- CLI: Console log showing context state persists across navigation demonstrates shared state.
- Screenshot: Favourites page loads with previously selected movies demonstrates persistence.

### Unit 3: Configurable Movie Card Actions

**Purpose:** Allow movie cards to render different actions based on page context.

**Functional Requirements:**

- The system shall support render-prop style composition for movie card actions.
- The system shall include actions for add to favourites, remove from favourites, and write review.
- The system shall conditionally render actions based on the current page and movie state.

**Proof Artifacts:**

- Screenshot: Home page shows add to favourites button, favourites page shows remove and write review buttons demonstrates configurability.
- Test: Component test for action rendering passes demonstrates correct composition.

### Unit 4: Review Form and Submission

**Purpose:** Enable users to write and submit reviews for favourite movies.

**Functional Requirements:**

- The system shall provide a review form page with fields for rating and text review.
- The system shall use react-hook-form for form handling and validation.
- The system shall store submitted reviews in app state and display them on the movie details page.

**Proof Artifacts:**

- Screenshot: Review form page with validation errors demonstrates form functionality.
- Screenshot: Movie details page showing submitted review demonstrates submission flow.

## Non-Functional Requirements

- Performance: Caching should reduce API calls by at least 50% on repeated visits.
- Usability: Actions and forms should provide clear feedback and handle errors gracefully.
- Maintainability: Code should follow existing patterns and be extensible.

## Likely Files To Add

- src/contexts/MoviesContext.tsx
- src/components/CardIcons/AddToFavourites.tsx
- src/components/CardIcons/RemoveFromFavourites.tsx
- src/components/CardIcons/WriteReview.tsx
- src/components/ReviewForm/...
- src/pages/AddMovieReviewPage.tsx

## Likely Files To Modify

- src/index.tsx
- src/pages/HomePage.tsx
- src/pages/FavouriteMoviesPage.tsx
- src/pages/MovieDetailsPage.tsx
- src/components/MovieCard/...
- src/components/MovieList/...
- src/components/TemplateMovieListPage/...
- src/components/FilterMoviesCard/...
- src/api/tmdb-api.ts
- src/types/movieAppTypes.ts
- src/hooks/useMovie.ts

## Acceptance Criteria

- Server-state caching reduces unnecessary API requests.
- Favourites persist across page navigation.
- Movie cards show appropriate actions per page.
- Review form validates and submits successfully.
- Existing Lab 3 features remain functional.

## Evidence Required

- Network logs showing cached requests.
- Screenshots of UI with different actions.
- Form validation and submission demos.
- Tests passing for new functionality.

## Design Considerations

No specific design requirements identified beyond maintaining existing UI patterns. Movie card actions should integrate seamlessly with current card layout.

## Repository Standards

Follow established repository patterns including:

- TypeScript for type safety
- Component composition and reusability
- Custom hooks for data fetching
- Consistent file naming and structure
- Existing API layer patterns

## Technical Considerations

- Use react-query (TanStack Query v4) for server-state caching, following current best practices for query keys and stale time configuration.
- Implement React Context for favourites state, ensuring proper provider setup in the app root.
- Apply render-prop pattern for configurable actions to maintain component flexibility.
- Integrate react-hook-form with validation schema (e.g., yup) for review form handling.
- Extend existing API layer and types without breaking changes.

## Security Considerations

No specific security considerations identified. API keys are handled as in Lab 3.

## Success Metrics

1. **Performance**: Reduced API calls by 50% on repeated page visits.
2. **Functionality**: All existing Lab 3 features continue to work.
3. **User Experience**: Favourites persist across navigation, configurable actions work as expected.

## Open Questions

No open questions at this time.
