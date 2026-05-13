import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  DiscoverMovieOverviewProps,
  MoviesContextValue,
} from "../types/movieAppTypes";

const MoviesContext = createContext<MoviesContextValue | undefined>(undefined);

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

  const value = useMemo(
    () => ({ favourites, addFavourite, removeFavourite, isFavourite }),
    [favourites],
  );

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
};

export const useMoviesContext = () => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error("useMoviesContext must be used within MoviesProvider");
  }
  return context;
};
