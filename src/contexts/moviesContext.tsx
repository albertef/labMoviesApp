import React, { useState, useCallback } from "react";
import { MovieDetailsProps, Review } from "../types/movieAppTypes";

type MovieContextInterface = {
  favourites: number[];
  playlist: number[];
  addToFavourites: (movie: MovieDetailsProps) => void;
  removeFromFavourites: (movie: MovieDetailsProps) => void;
  addReview: (movie: MovieDetailsProps, review: Review) => void; // NEW
};
const initialContextState: MovieContextInterface = {
  favourites: [],
  playlist: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  addReview: (movie, review) => {
    (movie.id, review);
  }, // NEW
};

export const MoviesContext =
  React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [favourites, setFavourites] = useState<number[]>([]);
  const [playlist, setPlaylist] = useState<number[]>([]);
  const [myReviews, setMyReviews] = useState<Review[]>([]);

  const addToFavourites = useCallback((movie: MovieDetailsProps) => {
    setFavourites((prevFavourites) => {
      if (!prevFavourites.includes(movie.id)) {
        return [...prevFavourites, movie.id];
      }
      return prevFavourites;
    });
  }, []);

  const removeFromFavourites = useCallback((movie: MovieDetailsProps) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((mId) => mId !== movie.id),
    );
  }, []);

  const addReview = (movie: MovieDetailsProps, review: Review) => {
    // NEW
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        playlist,
        addToFavourites,
        removeFromFavourites,
        addReview, // NEW
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
