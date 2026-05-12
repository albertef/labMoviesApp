import { useParams } from "react-router-dom";
import MovieDetails from "../components/MovieDetails";
import useMovie from "../hooks/useMovie";
import PageTemplate from "../components/TemplateMoviePage";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const { data: movie, isLoading, isError, error } = useMovie(id ?? "");

  if (isLoading) {
    return <p>Loading movie details...</p>;
  }

  if (isError) {
    return <p>Error loading movie: {error?.message ?? "Unknown error"}</p>;
  }

  return (
    <>
      {movie ? (
        <PageTemplate movie={movie}>
          <MovieDetails {...movie} />
        </PageTemplate>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MovieDetailsPage;
