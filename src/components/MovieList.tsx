import Movie from "./MovieCard";
import Grid from "@mui/material/Grid";
import {
  BaseMovieListProps,
  DiscoverMovieOverviewProps,
} from "../types/movieAppTypes";

const MovieList = ({
  movies,
  selectFavourite,
  renderActions,
  linkPath,
}: BaseMovieListProps & {
  linkPath?: (movie: DiscoverMovieOverviewProps) => string;
}) => {
  const movieCards = movies.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Movie
        key={m.id}
        movie={m}
        selectFavourite={selectFavourite}
        renderActions={renderActions}
        linkPath={linkPath}
      />
    </Grid>
  ));
  return movieCards;
};

export default MovieList;
