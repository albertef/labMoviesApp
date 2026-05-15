import { useMemo, useState } from "react";
import PageTemplate from "../components/TemplateMovieListPage";
import { DiscoverMovieOverviewProps } from "../types/movieAppTypes";
import { useMoviesContext } from "../contexts/useMoviesContext";
import { useUpcomingMovies } from "../hooks/useMovie";
import AddToFavourites from "../components/CardIcons/AddToFavourites";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const UpcomingMoviesPage = () => {
  const [page, setPage] = useState(1);
  const { addFavourite, isFavourite } = useMoviesContext();
  const {
    data: moviePage,
    isLoading,
    isError,
    error,
  } = useUpcomingMovies(page);

  const movies = useMemo(
    () =>
      (moviePage?.results ?? []).map((movie) => ({
        ...movie,
        favourite: isFavourite(movie.id),
      })),
    [moviePage?.results, isFavourite],
  );

  const addToFavourites = (movieId: number) => {
    const movie = movies.find((m) => m.id === movieId);
    if (movie) {
      addFavourite({
        ...movie,
        favourite: true,
      });
    }
  };

  const totalPages = moviePage?.total_pages ?? 1;
  const pageNumbers = useMemo(() => {
    const pageCount = Math.min(5, totalPages);
    const start =
      totalPages <= 5 ? 1 : Math.max(1, Math.min(page - 2, totalPages - 4));
    return Array.from({ length: pageCount }, (_, idx) => start + idx);
  }, [page, totalPages]);

  if (isLoading) {
    return <p>Loading upcoming movies...</p>;
  }

  if (isError) {
    return (
      <p>Error loading upcoming movies: {error?.message ?? "Unknown error"}</p>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <PageTemplate
        title="Upcoming Movies"
        movies={movies as DiscoverMovieOverviewProps[]}
        renderActions={(movie) => (
          <AddToFavourites movie={movie} onAdd={addToFavourites} />
        )}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          mt: 3,
          flexWrap: "wrap",
        }}
      >
        <Button
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(1, prev - 1))}
        >
          Previous
        </Button>
        {pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            variant={pageNumber === page ? "contained" : "outlined"}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}
        <Button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};
export default UpcomingMoviesPage;
