// src/types/tmdb.ts

import { paths } from "./generated/tmdb";

// Type for the API response when discovering movies
export type DiscoverMoviesProps =
  paths["/3/discover/movie"]["get"]["responses"][200]["content"]["application/json"];

// Type for a single movie object from the discover movies response
export type DiscoverMovieOverviewProps = NonNullable<
  DiscoverMoviesProps["results"]
>[number] & {
  favourite: boolean;
};

// Props interface for components that display a list of movies
import { ReactNode } from "react";

export type BaseMovieListProps = {
  movies: NonNullable<DiscoverMovieOverviewProps[]>;
  selectFavourite?: (movieId: number) => void;
  renderActions?: (movie: DiscoverMovieOverviewProps) => ReactNode;
};

export type MoviesContextValue = {
  favourites: DiscoverMovieOverviewProps[];
  addFavourite: (movie: DiscoverMovieOverviewProps) => void;
  removeFavourite: (movieId: number) => void;
  isFavourite: (movieId: number) => boolean;
  reviews: LocalReview[];
  addReview: (review: LocalReview) => void;
  getReviewsForMovie: (movieId: number) => LocalReview[];
};

// Type for the API response when fetching detailed movie information
export type MovieDetailsProps =
  paths["/3/movie/{movie_id}"]["get"]["responses"][200]["content"]["application/json"] & {
    favourite: boolean;
  };

export type MovieImage = {
  file_path: string;
  aspect_ratio?: number; //some props are optional...
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
};

export type MoviePageProps = {
  movie: MovieDetailsProps;
  images: MovieImage[];
};

export type FilterOption = "title" | "genre";

export type SearchFilters = {
  genre?: number;
  year?: number;
  rating?: number;
  sortBy?: string;
  originalLanguage?: string;
};

export interface MovieListPageTemplateProps extends BaseMovieListProps {
  title: string;
  linkPath?: (movie: DiscoverMovieOverviewProps) => string;
}

export type MovieReviewsProps =
  paths["/3/movie/{movie_id}/reviews"]["get"]["responses"][200]["content"]["application/json"];

export type Review = NonNullable<MovieReviewsProps["results"]>[number];

// Type for the API response when discovering TV series
export type DiscoverTvProps =
  paths["/3/discover/tv"]["get"]["responses"][200]["content"]["application/json"];

// Type for a single TV series object from the discover TV response
export type DiscoverTvOverviewProps = NonNullable<
  DiscoverTvProps["results"]
>[number];

// Type for the API response when fetching detailed TV series information
export type TvDetailsProps =
  paths["/3/tv/{series_id}"]["get"]["responses"][200]["content"]["application/json"];

// Type for the API response when fetching actor/person details
export type ActorDetailsProps =
  paths["/3/person/{person_id}"]["get"]["responses"][200]["content"]["application/json"];

// Type for the API response when fetching actor's movie credits
export type ActorCreditsProps =
  paths["/3/person/{person_id}/movie_credits"]["get"]["responses"][200]["content"]["application/json"];

export type MovieCreditsProps =
  paths["/3/movie/{movie_id}/credits"]["get"]["responses"][200]["content"]["application/json"];

export type TvCreditsProps =
  paths["/3/tv/{series_id}/credits"]["get"]["responses"][200]["content"]["application/json"];

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export type LocalReview = Review & {
  movieId: number;
  rating: number;
};
