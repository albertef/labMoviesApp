import { useLocation, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import MovieDetails from "../components/MovieDetails";
import useMovie from "../hooks/useMovie";
import PageTemplate from "../components/TemplateMoviePage";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state as { reviewSubmitted?: boolean } | null;
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
          {state?.reviewSubmitted && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Review submitted successfully.
            </Alert>
          )}
          <MovieDetails {...movie} />
        </PageTemplate>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MovieDetailsPage;
