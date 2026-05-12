import { useQuery, UseQueryResult } from "react-query";
import { getMovie } from "../api/tmdb-api";
import { MovieDetailsProps } from "../types/movieAppTypes";

const useMovie = (id: string): UseQueryResult<MovieDetailsProps, Error> => {
  return useQuery<MovieDetailsProps, Error>(["movie", id], () => getMovie(id), {
    enabled: Boolean(id),
  });
};

export default useMovie;
