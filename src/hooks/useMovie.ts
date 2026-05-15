import { useQuery, UseQueryResult, UseQueryOptions } from "react-query";
import {
  getMovie,
  getTvSeries,
  getTv,
  getActor,
  getActorCredits,
  getMovieCredits,
  getTvCredits,
  getMovies,
  getUpcomingMovies,
} from "../api/tmdb-api";
import {
  MovieDetailsProps,
  DiscoverTvProps,
  TvDetailsProps,
  ActorDetailsProps,
  ActorCreditsProps,
  MovieCreditsProps,
  TvCreditsProps,
  DiscoverMoviesProps,
  SearchFilters,
} from "../types/movieAppTypes";

const useMovie = (id: string): UseQueryResult<MovieDetailsProps, Error> => {
  return useQuery<MovieDetailsProps, Error>(["movie", id], () => getMovie(id), {
    enabled: Boolean(id),
  });
};

export const useMovieList = (
  page: number,
  filters: SearchFilters = {},
  options?: UseQueryOptions<DiscoverMoviesProps, Error>,
): UseQueryResult<DiscoverMoviesProps, Error> => {
  return useQuery<DiscoverMoviesProps, Error>(
    ["movies", page, filters],
    () =>
      getMovies({
        page,
        genre: filters.genre,
        year: filters.year,
        minRating: filters.rating,
        sortBy: filters.sortBy,
        originalLanguage: filters.originalLanguage,
      }),
    {
      keepPreviousData: true,
      ...options,
    },
  );
};

export const useUpcomingMovies = (
  page = 1,
  options?: UseQueryOptions<DiscoverMoviesProps, Error>,
): UseQueryResult<DiscoverMoviesProps, Error> => {
  return useQuery<DiscoverMoviesProps, Error>(
    ["upcoming-movies", page],
    () => getUpcomingMovies({ page }),
    {
      keepPreviousData: true,
      ...options,
    },
  );
};

export const useTvList = (
  page = 1,
  filters: SearchFilters = {},
  options?: UseQueryOptions<DiscoverTvProps, Error>,
): UseQueryResult<DiscoverTvProps, Error> => {
  return useQuery<DiscoverTvProps, Error>(
    ["tv-series", page, filters],
    () =>
      getTvSeries({
        page,
        genre: filters.genre,
        year: filters.year,
        minRating: filters.rating,
        sortBy: filters.sortBy,
        originalLanguage: filters.originalLanguage,
      }),
    {
      keepPreviousData: true,
      ...options,
    },
  );
};

export const useTvDetails = (
  id: string,
): UseQueryResult<TvDetailsProps, Error> => {
  return useQuery<TvDetailsProps, Error>(["tv", id], () => getTv(id), {
    enabled: Boolean(id),
  });
};

export const useActorDetails = (
  id: string,
): UseQueryResult<ActorDetailsProps, Error> => {
  return useQuery<ActorDetailsProps, Error>(["actor", id], () => getActor(id), {
    enabled: Boolean(id),
  });
};

export const useActorCredits = (
  id: string,
): UseQueryResult<ActorCreditsProps, Error> => {
  return useQuery<ActorCreditsProps, Error>(
    ["actor-credits", id],
    () => getActorCredits(id),
    {
      enabled: Boolean(id),
    },
  );
};

export const useMovieCredits = (
  id: string,
): UseQueryResult<MovieCreditsProps, Error> => {
  return useQuery<MovieCreditsProps, Error>(
    ["movie-credits", id],
    () => getMovieCredits(id),
    {
      enabled: Boolean(id),
    },
  );
};

export const useTvCredits = (
  id: string,
): UseQueryResult<TvCreditsProps, Error> => {
  return useQuery<TvCreditsProps, Error>(
    ["tv-credits", id],
    () => getTvCredits(id),
    {
      enabled: Boolean(id),
    },
  );
};

export default useMovie;
