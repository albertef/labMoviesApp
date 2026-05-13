import { useEffect, useState } from "react";
import {
  DiscoverMovieOverviewProps,
  LocalReview,
} from "../types/movieAppTypes";
import { MoviesContext } from "./MovieContextImpl";

export const MoviesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favourites, setFavourites] = useState<DiscoverMovieOverviewProps[]>(
    () => {
      const stored = localStorage.getItem("favourites");
      return stored ? (JSON.parse(stored) as DiscoverMovieOverviewProps[]) : [];
    },
  );

  const [reviews, setReviews] = useState<LocalReview[]>(() => {
    const stored = localStorage.getItem("reviews");
    return stored ? (JSON.parse(stored) as LocalReview[]) : [];
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

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

  const addReview = (review: LocalReview) => {
    setReviews((current) => [...current, review]);
  };

  const getReviewsForMovie = (movieId: number) =>
    reviews.filter((review) => review.movieId === movieId);

  const value = {
    favourites,
    addFavourite,
    removeFavourite,
    isFavourite,
    reviews,
    addReview,
    getReviewsForMovie,
  };

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
};
