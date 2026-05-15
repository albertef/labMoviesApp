type TmdbMovieRecord = Record<string, unknown>;

import {
  MovieDetailsProps,
  DiscoverMoviesProps,
  DiscoverTvProps,
  TvDetailsProps,
  ActorDetailsProps,
  ActorCreditsProps,
  MovieCreditsProps,
  TvCreditsProps,
} from "../types/movieAppTypes";

export const getMovies = ({
  page = 1,
  genre,
  year,
  minRating,
  sortBy,
  originalLanguage,
}: {
  page?: number;
  genre?: number;
  year?: number;
  minRating?: number;
  sortBy?: string;
  originalLanguage?: string;
} = {}): Promise<DiscoverMoviesProps> => {
  const params = new URLSearchParams({
    api_key: import.meta.env.VITE_TMDB_KEY,
    language: "en-US",
    include_adult: "false",
    page: String(page),
  });

  if (genre) params.append("with_genres", String(genre));
  if (year) params.append("primary_release_year", String(year));
  if (minRating) params.append("vote_average.gte", String(minRating));
  if (sortBy) params.append("sort_by", sortBy);
  if (originalLanguage)
    params.append("with_original_language", originalLanguage);

  return fetch(
    `https://api.themoviedb.org/3/discover/movie?${params.toString()}`,
  )
    .then((res) => res.json())
    .then((json) => json as DiscoverMoviesProps);
};

export const getUpcomingMovies = ({
  page = 1,
}: {
  page?: number;
} = {}): Promise<DiscoverMoviesProps> => {
  const params = new URLSearchParams({
    api_key: import.meta.env.VITE_TMDB_KEY,
    language: "en-US",
    include_adult: "false",
    page: String(page),
  });

  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?${params.toString()}`,
  )
    .then((res) => res.json())
    .then((json) => json as DiscoverMoviesProps);
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

export const getTvSeries = ({
  page = 1,
  genre,
  year,
  minRating,
  sortBy,
  originalLanguage,
}: {
  page?: number;
  genre?: number;
  year?: number;
  minRating?: number;
  sortBy?: string;
  originalLanguage?: string;
} = {}): Promise<DiscoverTvProps> => {
  const params = new URLSearchParams({
    api_key: import.meta.env.VITE_TMDB_KEY,
    language: "en-US",
    include_adult: "false",
    page: String(page),
  });

  if (genre) params.append("with_genres", String(genre));
  if (year) params.append("first_air_date_year", String(year));
  if (minRating) params.append("vote_average.gte", String(minRating));
  if (sortBy) params.append("sort_by", sortBy);
  if (originalLanguage)
    params.append("with_original_language", originalLanguage);

  return fetch(`https://api.themoviedb.org/3/discover/tv?${params.toString()}`)
    .then((res) => res.json())
    .then((json) => json as DiscoverTvProps);
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
