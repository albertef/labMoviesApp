import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FantasyMovieForm, {
  FantasyMovieFormValues,
} from "../components/FantasyMovieForm/FantasyMovieForm";
import { FantasyMovie } from "../types/movieAppTypes";

const STORAGE_KEY = "fantasyMovies";

const loadFantasyMovies = (): FantasyMovie[] => {
  const storedMovies = localStorage.getItem(STORAGE_KEY);
  return storedMovies ? (JSON.parse(storedMovies) as FantasyMovie[]) : [];
};

const saveFantasyMovies = (movies: FantasyMovie[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
};

const FantasyMovieCreatePage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: FantasyMovieFormValues) => {
    const newMovie: FantasyMovie = {
      id: String(Date.now()),
      title: values.title,
      overview: values.overview,
      genres: values.genres,
      releaseDate: values.releaseDate,
      runtime: values.runtime,
      productionCompany: values.productionCompany,
      cast: values.cast.map((member, index) => ({
        ...member,
        id: String(index + 1),
      })),
      posterFileName: values.poster?.name,
      posterUrl: values.posterDataUrl,
    };

    const currentMovies = loadFantasyMovies();
    saveFantasyMovies([newMovie, ...currentMovies]);
    navigate("/fantasy-movie", { replace: true });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Create Fantasy Movie
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Add details, choose cast names from existing options, or enter new
        actors.
      </Typography>
      <FantasyMovieForm onSubmit={handleSubmit} />
    </Box>
  );
};

export default FantasyMovieCreatePage;
