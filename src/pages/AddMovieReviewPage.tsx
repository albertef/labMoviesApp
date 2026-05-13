import { useNavigate, useParams } from "react-router-dom";
import PageTemplate from "../components/TemplateMoviePage";
import ReviewForm, {
  ReviewFormValues,
} from "../components/ReviewForm/ReviewForm";
import useMovie from "../hooks/useMovie";
import { useMoviesContext } from "../contexts/useMoviesContext";
import { LocalReview } from "../types/movieAppTypes";
import Alert from "@mui/material/Alert";

const AddMovieReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addReview } = useMoviesContext();
  const { data: movie, isLoading, isError, error } = useMovie(id ?? "");

  if (isLoading) {
    return <p>Loading review form...</p>;
  }

  if (isError) {
    return <p>Error loading movie: {error?.message ?? "Unknown error"}</p>;
  }

  if (!movie) {
    return <p>No movie found for review.</p>;
  }

  const handleSubmit = (values: ReviewFormValues) => {
    const review: LocalReview = {
      id: `${Date.now()}`,
      movieId: movie.id,
      author: values.author,
      content: values.content,
      created_at: new Date().toISOString(),
      author_details: {
        rating: values.rating,
      },
      rating: values.rating,
      url: "",
    };

    addReview(review);
    navigate(`/movies/${movie.id}`, {
      state: { reviewSubmitted: true },
    });
  };

  return (
    <PageTemplate movie={movie}>
      <Alert severity="info" sx={{ mb: 2 }}>
        Submit a review for <strong>{movie.title}</strong>.
      </Alert>
      <ReviewForm onSubmit={handleSubmit} />
    </PageTemplate>
  );
};

export default AddMovieReviewPage;
