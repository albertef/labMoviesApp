import React from "react";
import { useLocation, useParams } from "react-router-dom";
import PageTemplate from "../components/TemplateMoviePage";
import MovieReview from "../components/MovieReview";
import useMovie from "../hooks/useMovie";
import { Review } from "../types/movieAppTypes";

interface MovieReviewLocationState {
  movie?: unknown;
  review?: Review;
}

const MovieReviewPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state as MovieReviewLocationState;
  const { data: movie, isLoading, isError, error } = useMovie(id ?? "");

  if (isLoading) {
    return <p>Loading movie for review...</p>;
  }

  if (isError) {
    return <p>Error loading movie: {error?.message ?? "Unknown error"}</p>;
  }

  const review = state?.review;
  const reviewMovie = movie;

  if (!reviewMovie) {
    return <p>Movie not found for review.</p>;
  }

  return (
    <PageTemplate movie={reviewMovie}>
      {review ? (
        <MovieReview {...review} />
      ) : (
        <p>
          Write your review for this movie using the form that will be added
          here.
        </p>
      )}
    </PageTemplate>
  );
};

export default MovieReviewPage;
