import { useMemo, useState } from "react";
import { useTvList } from "../hooks/useMovie";
import { DiscoverMovieOverviewProps } from "../types/movieAppTypes";
import Header from "../components/HeaderMovieList";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MovieList from "../components/MovieList";
import { useMoviesContext } from "../contexts/useMoviesContext";

const TvListPage = () => {
  const [page, setPage] = useState(1);
  const { data: tvSeries, error, isLoading, isError } = useTvList(page);
  const { addFavourite, isFavourite } = useMoviesContext();

  const adaptedTvSeries = useMemo(
    () =>
      (tvSeries?.results ?? []).map((tv) => ({
        id: tv.id,
        title: tv.name,
        overview: tv.overview,
        poster_path: tv.poster_path,
        release_date: tv.first_air_date ?? "",
        vote_average: tv.vote_average,
        favourite: isFavourite(tv.id),
        adult: false,
        video: false,
        original_title: tv.name,
        original_language: tv.original_language ?? "en",
      })) as DiscoverMovieOverviewProps[],
    [tvSeries?.results, isFavourite],
  );

  const handleAddFavourite = (movieId: number) => {
    const tv = adaptedTvSeries.find((item) => item.id === movieId);
    if (tv) {
      addFavourite(tv);
    }
  };

  const totalPages = tvSeries?.total_pages ?? 1;
  const pageNumbers = useMemo(() => {
    const pageCount = Math.min(5, totalPages);
    const start =
      totalPages <= 5 ? 1 : Math.max(1, Math.min(page - 2, totalPages - 4));
    return Array.from({ length: pageCount }, (_, idx) => start + idx);
  }, [page, totalPages]);

  if (isLoading) {
    return <div>Loading TV series...</div>;
  }

  if (isError) {
    return <div>Error loading TV series: {error?.message}</div>;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header title="TV Series" />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList
          movies={adaptedTvSeries}
          selectFavourite={handleAddFavourite}
          linkPath={(movie) => `/tv/${movie.id}`}
        />
      </Grid>
      <Grid item xs={12}>
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
      </Grid>
    </Grid>
  );
};

export default TvListPage;
