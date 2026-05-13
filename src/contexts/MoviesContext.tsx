import { useEffect, useState } from "react";
import { DiscoverMovieOverviewProps } from "../types/movieAppTypes";
import { MoviesContext } from "./MovieContextImpl";

export const MoviesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favourites, setFavourites] = useState<DiscoverMovieOverviewProps[]>(
    () => {
      const stored = localStorage.getItem("favourites");
      return stored ? (JSON.parse(stored) as DiscoverMovieOverviewProps[]) : [];
    },
  );

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (movie: DiscoverMovieOverviewProps) => {
    setFavourites((current) =>
      current.some((item) => item.id === movie.id)
        ? current
        : [...current, { ...movie, favourite: true }],
    );
  };

  const removeFavourite = (movieId: number) => {
    setFavourites((current) => current.filter((item) => item.id !== movieId));
  };

  const isFavourite = (movieId: number) =>
    favourites.some((item) => item.id === movieId);

  const value = { favourites, addFavourite, removeFavourite, isFavourite };

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
};
