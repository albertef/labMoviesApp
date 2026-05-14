import { useLocation, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import MovieDetails from "../components/MovieDetails";
import useMovie from "../hooks/useMovie";
import { useMovieCredits } from "../hooks/useMovie";
import PageTemplate from "../components/TemplateMoviePage";

const MovieDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state as { reviewSubmitted?: boolean } | null;
  const { data: movie, isLoading, isError, error } = useMovie(id ?? "");
  const { data: credits } = useMovieCredits(id ?? "");

  if (isLoading) {
    return <p>Loading movie details...</p>;
  }

  if (isError) {
    return <p>Error loading movie: {error?.message ?? "Unknown error"}</p>;
  }

  const cast =
    credits?.cast?.map((actor) => ({
      id: actor.id,
      name: actor.name ?? "Unknown",
      character: actor.character ?? "",
      profile_path: actor.profile_path ?? null,
    })) || [];

  return (
    <>
      {movie ? (
        <PageTemplate movie={movie}>
          {state?.reviewSubmitted && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Review submitted successfully.
            </Alert>
          )}
          <MovieDetails {...movie} cast={cast} />
        </PageTemplate>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MovieDetailsPage;
