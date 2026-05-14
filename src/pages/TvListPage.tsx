import { useTvList } from "../hooks/useMovie";
import { DiscoverMovieOverviewProps } from "../types/movieAppTypes";
import Header from "../components/HeaderMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../components/MovieList";
import { useMoviesContext } from "../contexts/useMoviesContext";

const TvListPage = () => {
  const { data: tvSeries, error, isLoading, isError } = useTvList();
  const { addFavourite, isFavourite } = useMoviesContext();

  if (isLoading) {
    return <div>Loading TV series...</div>;
  }

  if (isError) {
    return <div>Error loading TV series: {error?.message}</div>;
  }

  // Adapt TV series to movie-like structure for MovieList
  const adaptedTvSeries = tvSeries?.map((tv) => ({
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
  })) as DiscoverMovieOverviewProps[];

  const handleAddFavourite = (movieId: number) => {
    const tv = adaptedTvSeries?.find((item) => item.id === movieId);
    if (tv) {
      addFavourite(tv);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header title="TV Series" />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          movies={(adaptedTvSeries as any) || []}
          selectFavourite={handleAddFavourite}
          linkPath={(movie) => `/tv/${movie.id}`}
        />
      </Grid>
    </Grid>
  );
};

export default TvListPage;
