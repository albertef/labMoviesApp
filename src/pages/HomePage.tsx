import { useQuery } from "react-query";
import PageTemplate from "../components/TemplateMovieListPage";
import { DiscoverMovieOverviewProps } from "../types/movieAppTypes";
import { getMovies } from "../api/tmdb-api";
import { useMoviesContext } from "../contexts/useMoviesContext";
import AddToFavourites from "../components/CardIcons/AddToFavourites";

const HomePage = () => {
  const { addFavourite, isFavourite } = useMoviesContext();

  const {
    data: fetchedMovies = [],
    isLoading,
    isError,
    error,
  } = useQuery<DiscoverMovieOverviewProps[], Error>(
    "discover-movies",
    getMovies,
  );

  const movies = fetchedMovies.map((movie) => ({
    ...movie,
    favourite: isFavourite(movie.id),
  }));

  const addToFavourites = (movieId: number) => {
    const movie = fetchedMovies.find((m) => m.id === movieId);
    if (movie) {
      addFavourite(movie);
    }
  };

  if (isLoading) {
    return <p>Loading movies...</p>;
  }

  if (isError) {
    return <p>Error loading movies: {error?.message ?? "Unknown error"}</p>;
  }

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      renderActions={(movie) => (
        <AddToFavourites movie={movie} onAdd={addToFavourites} />
      )}
    />
  );
};
export default HomePage;
