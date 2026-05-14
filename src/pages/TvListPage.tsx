import { useTvList } from "../hooks/useMovie";
import { DiscoverTvOverviewProps } from "../types/movieAppTypes";
import Header from "../components/HeaderMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../components/MovieList";

const TvListPage = () => {
  const { data: tvSeries, error, isLoading, isError } = useTvList();

  if (isLoading) {
    return <div>Loading TV series...</div>;
  }

  if (isError) {
    return <div>Error loading TV series: {error?.message}</div>;
  }

  // Adapt TV series to movie-like structure for MovieList
  const adaptedTvSeries = tvSeries?.map((tv) => ({
    ...tv,
    title: tv.name, // TV has 'name' instead of 'title'
    favourite: false,
  })) as DiscoverTvOverviewProps[];

  return (
    <Grid container>
      <Grid item xs={12}>
        <Header title="TV Series" />
      </Grid>
      <Grid item container spacing={5}>
        <MovieList
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          movies={(adaptedTvSeries as any) || []}
          linkPath={(movie) => `/tv/${movie.id}`}
        />
      </Grid>
    </Grid>
  );
};

export default TvListPage;
