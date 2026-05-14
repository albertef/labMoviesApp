# Task T1.0 Proofs - Entity Expansion

## Task Summary

This task expands the movie app to support TV series and actors by adding new entity types, API functions, hooks, pages, and routes.

## What This Task Proves

- New types for TV and actors added to `movieAppTypes.ts`
- New API functions for TV and actors in `tmdb-api.ts`
- New hooks for TV and actors in `useMovie.ts`
- New pages `TvListPage.tsx` and `ActorDetailsPage.tsx`
- New routes added to `index.tsx`
- New component `ActorCard.tsx`
- Build and lint pass

## Evidence Summary

- Types extended with TV and actor interfaces
- API layer expanded with getTvSeries, getTv, getActor, getActorCredits
- Hooks added: useTvList, useTvDetails, useActorDetails, useActorCredits
- Pages created for TV list and actor details
- Routes configured for /tv and /actor/:id
- ActorCard component for actor display
- Build succeeds, lint passes

## Artifact: Updated types

**What it proves:** New TypeScript types for TV series and actors.

**File:** `src/types/movieAppTypes.ts`

**Snippet:**

```typescript
export type DiscoverTvOverviewProps = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  vote_average: number;
};

export type TvDetailsProps = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  number_of_seasons: number;
  number_of_episodes: number;
};

export type ActorDetailsProps = {
  id: number;
  name: string;
  biography: string;
  profile_path: string | null;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  known_for_department: string;
};

export type ActorCreditsProps = {
  id: number;
  cast: {
    id: number;
    title: string;
    character: string;
    release_date: string;
    poster_path: string | null;
  }[];
};
```

## Artifact: New API functions

**What it proves:** API layer expanded with functions for TV and actors.

**File:** `src/api/tmdb-api.ts`

**Snippet:**

```typescript
export const getTvSeries = (): Promise<DiscoverTvOverviewProps[]> => {
  return fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}`,
  )
    .then((response) => {
      if (!response.ok)
        throw new Error(`Unable to fetch TV series. ${response.statusText}`);
      return response.json();
    })
    .then((json) => json.results);
};

export const getTv = (id: string | number): Promise<TvDetailsProps> => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`,
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Failed to fetch TV details. ${response.statusText}`);
    return response.json();
  });
};

export const getActor = (id: string | number): Promise<ActorDetailsProps> => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`,
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Failed to fetch actor details. ${response.statusText}`);
    return response.json();
  });
};

export const getActorCredits = (
  id: string | number,
): Promise<ActorCreditsProps> => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}`,
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Failed to fetch actor credits. ${response.statusText}`);
    return response.json();
  });
};
```

## Artifact: New hooks

**What it proves:** React Query hooks for TV and actors.

**File:** `src/hooks/useMovie.ts`

**Snippet:**

```typescript
export const useTvList = (): UseQueryResult<
  DiscoverTvOverviewProps[],
  Error
> => {
  return useQuery<DiscoverTvOverviewProps[], Error>("tvSeries", getTvSeries);
};

export const useTvDetails = (
  id: string,
): UseQueryResult<TvDetailsProps, Error> => {
  return useQuery<TvDetailsProps, Error>(["tv", id], () => getTv(id));
};

export const useActorDetails = (
  id: string,
): UseQueryResult<ActorDetailsProps, Error> => {
  return useQuery<ActorDetailsProps, Error>(["actor", id], () => getActor(id));
};

export const useActorCredits = (
  id: string,
): UseQueryResult<ActorCreditsProps, Error> => {
  return useQuery<ActorCreditsProps, Error>(["actorCredits", id], () =>
    getActorCredits(id),
  );
};
```

## Artifact: New pages

**What it proves:** Pages for TV list and actor details.

**File:** `src/pages/TvListPage.tsx`

**Snippet:**

```typescript
import React from "react";
import { useTvList } from "../hooks/useMovie";
import MovieList from "../components/MovieList";

const TvListPage: React.FC = () => {
  const { data: tvSeries, error, isLoading, isError } = useTvList();

  if (isLoading) {
    return <div>Loading TV series...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  const adaptedTvSeries = tvSeries?.map((tv) => ({
    id: tv.id,
    title: tv.name,
    overview: tv.overview,
    poster_path: tv.poster_path,
    release_date: tv.first_air_date,
    vote_average: tv.vote_average,
  }));

  return (
    <div>
      <h1>TV Series</h1>
      <MovieList
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        movies={adaptedTvSeries as any || []}
      />
    </div>
  );
};

export default TvListPage;
```

**File:** `src/pages/ActorDetailsPage.tsx`

**Snippet:**

```typescript
import React from "react";
import { useParams } from "react-router-dom";
import { useActorDetails, useActorCredits } from "../hooks/useMovie";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";

const ActorDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: actor, error: actorError, isLoading: actorLoading } = useActorDetails(id!);
  const { data: credits, error: creditsError, isLoading: creditsLoading } = useActorCredits(id!);

  if (actorLoading || creditsLoading) return <div>Loading...</div>;
  if (actorError || creditsError) return <div>Error loading actor details</div>;

  const filmography = credits?.cast || [];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardMedia
            component="img"
            height="400"
            image={actor?.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : "/film-poster-placeholder.png"}
            alt={actor?.name}
          />
          <CardContent>
            <Typography variant="h5">{actor?.name}</Typography>
            <Typography variant="body2">{actor?.biography}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography variant="h6">Filmography</Typography>
        <Grid container spacing={2}>
          {filmography.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/film-poster-placeholder.png"}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="subtitle1">{movie.title}</Typography>
                  <Typography variant="body2">as {movie.character}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ActorDetailsPage;
```

## Artifact: Updated routes

**What it proves:** New routes for TV and actors.

**File:** `src/index.tsx`

**Snippet:**

```typescript
import TvListPage from "./pages/TvListPage";
import ActorDetailsPage from "./pages/ActorDetailsPage";

// ...

<Route path="/tv" element={<TvListPage />} />
<Route path="/actor/:id" element={<ActorDetailsPage />} />
```

## Artifact: New component

**What it proves:** ActorCard component for displaying actors.

**File:** `src/components/ActorCard.tsx`

**Snippet:**

```typescript
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from "@mui/material";
import { ActorDetailsProps } from "../types/movieAppTypes";

interface ActorCardProps {
  actor: ActorDetailsProps;
}

const ActorCard: React.FC<ActorCardProps> = ({ actor }) => {
  const profileImageUrl = actor.profile_path
    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
    : "/film-poster-placeholder.png";

  return (
    <Card>
      <CardMedia
        component="img"
        height="300"
        image={profileImageUrl}
        alt={actor.name}
      />
      <CardContent>
        <Typography variant="h6">{actor.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {actor.known_for_department}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/actor/${actor.id}`}>
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default ActorCard;
```

## Artifact: Build result

**What it proves:** The entity expansion compiles successfully.

**Command:**

```bash
npm run build
```

**Result summary:** Build completed successfully with no errors.

## Artifact: Lint result

**What it proves:** The expansion meets lint rules.

**Command:**

```bash
npm run lint
```

**Result summary:** ESLint completed with no errors.
