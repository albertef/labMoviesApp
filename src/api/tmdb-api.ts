type TmdbMovieRecord = Record<string, unknown>;

import {
  DiscoverMovieOverviewProps,
  MovieDetailsProps,
  DiscoverTvOverviewProps,
  TvDetailsProps,
  ActorDetailsProps,
  ActorCreditsProps,
  MovieCreditsProps,
  TvCreditsProps,
} from "../types/movieAppTypes";

export const getMovies = (): Promise<DiscoverMovieOverviewProps[]> => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`,
  )
    .then((res) => res.json())
    .then(
      (json) =>
        (json as { results: TmdbMovieRecord[] }).results.map((movie) => ({
          ...(movie as TmdbMovieRecord),
          favourite: false,
        })) as DiscoverMovieOverviewProps[],
    );
};

export const getUpcomingMovies = (): Promise<DiscoverMovieOverviewProps[]> => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`,
  )
    .then((res) => res.json())
    .then(
      (json) =>
        (json as { results: TmdbMovieRecord[] }).results.map((movie) => ({
          ...(movie as TmdbMovieRecord),
          favourite: false,
        })) as DiscoverMovieOverviewProps[],
    );
};

export const getMovie = (id: string): Promise<MovieDetailsProps> => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`,
  )
    .then((res) => res.json())
    .then(
      (movie) =>
        ({
          ...(movie as TmdbMovieRecord),
          favourite: false,
        }) as MovieDetailsProps,
    );
};

export const getGenres = () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
      import.meta.env.VITE_TMDB_KEY +
      "&language=en-US",
  )
    .then((res) => res.json())
    .then((json) => json.genres);
};

export const getMovieImages = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`,
  )
    .then((res) => res.json())
    .then((json) => json.posters);
};

export const getMovieReviews = (id: string | number) => {
  //movie id can be string or number
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`,
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json.results);
      return json.results;
    });
};

export const getMovieCredits = (
  id: string | number,
): Promise<MovieCreditsProps> => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`,
  )
    .then((res) => res.json())
    .then((credits) => credits as MovieCreditsProps);
};

export const getTvSeries = (): Promise<DiscoverTvOverviewProps[]> => {
  return fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`,
  )
    .then((res) => res.json())
    .then(
      (json) =>
        (json as { results: TmdbMovieRecord[] })
          .results as DiscoverTvOverviewProps[],
    );
};

export const getTv = (id: string): Promise<TvDetailsProps> => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`,
  )
    .then((res) => res.json())
    .then((tv) => tv as TvDetailsProps);
};

export const getTvCredits = (id: string | number): Promise<TvCreditsProps> => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}`,
  )
    .then((res) => res.json())
    .then((credits) => credits as TvCreditsProps);
};

export const getActor = (id: string): Promise<ActorDetailsProps> => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`,
  )
    .then((res) => res.json())
    .then((actor) => actor as ActorDetailsProps);
};

export const getActorCredits = (id: string): Promise<ActorCreditsProps> => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${import.meta.env.VITE_TMDB_KEY}`,
  )
    .then((res) => res.json())
    .then((credits) => credits as ActorCreditsProps);
};
