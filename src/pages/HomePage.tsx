import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import PageTemplate from "../components/TemplateMovieListPage";
import { DiscoverMovieOverviewProps } from "../types/movieAppTypes";
import { getMovies } from "../api/tmdb-api";

const HomePage = () => {
  const {
    data: fetchedMovies = [],
    isLoading,
    isError,
    error,
  } = useQuery<DiscoverMovieOverviewProps[], Error>(
    "discover-movies",
    getMovies,
  );

  const [movies, setMovies] = useState<DiscoverMovieOverviewProps[]>([]);

  useEffect(() => {
    setMovies(fetchedMovies);
  }, [fetchedMovies]);

  const favourites = movies.filter((m) => m.favourite);
  localStorage.setItem("favourites", JSON.stringify(favourites));

  const addToFavourites = (movieId: number) => {
    const updatedMovies = movies.map((m: DiscoverMovieOverviewProps) =>
      m.id === movieId ? { ...m, favourite: true } : m,
    );
    setMovies(updatedMovies);
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
      selectFavourite={addToFavourites}
    />
  );
};
export default HomePage;
