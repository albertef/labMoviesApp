import { useQuery, UseQueryResult } from "react-query";
import {
  getMovie,
  getTvSeries,
  getTv,
  getActor,
  getActorCredits,
} from "../api/tmdb-api";
import {
  MovieDetailsProps,
  DiscoverTvOverviewProps,
  TvDetailsProps,
  ActorDetailsProps,
  ActorCreditsProps,
} from "../types/movieAppTypes";

const useMovie = (id: string): UseQueryResult<MovieDetailsProps, Error> => {
  return useQuery<MovieDetailsProps, Error>(["movie", id], () => getMovie(id), {
    enabled: Boolean(id),
  });
};

export const useTvList = (): UseQueryResult<
  DiscoverTvOverviewProps[],
  Error
> => {
  return useQuery<DiscoverTvOverviewProps[], Error>(["tv-series"], getTvSeries);
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

export default useMovie;
