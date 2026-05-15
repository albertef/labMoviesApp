import { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { useMoviesContext } from "../contexts/useMoviesContext";
import {
  LocalReview,
  MovieDetailsProps,
  CastMember,
} from "../types/movieAppTypes";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "./MovieReviews";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: {
    margin: 0.5,
  },
  fab: {
    position: "fixed",
    top: 50,
    right: 2,
  },
};

const MovieDetails = (movie: MovieDetailsProps & { cast?: CastMember[] }) => {
  const [drawerOpen, setDrawerOpen] = useState(false); // New
  const { getReviewsForMovie } = useMoviesContext();
  const localReviews = getReviewsForMovie(movie.id);

  return (
    <>
      <Typography variant="h6" component="h3" gutterBottom color="primary">
        Overview
      </Typography>

      <Typography variant="body2" component="p" marginBottom={4}>
        {movie.overview}
      </Typography>

      {movie.cast && movie.cast.length > 0 && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" component="h4" sx={{ mb: 1 }}>
            Cast
          </Typography>
          <Grid container spacing={2}>
            {movie.cast.slice(0, 10).map((actor: CastMember) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={actor.id}>
                <Card
                  to={`/actor/${actor.id}`}
                  component={Link}
                  sx={{ textDecoration: "none" }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : "/film-poster-placeholder.png"
                    }
                    alt={actor.name}
                  />
                  <CardContent>
                    <Typography
                      variant="subtitle1"
                      sx={{ textDecoration: "none", color: "inherit" }}
                    >
                      {actor.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      as {actor.character}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}

      {localReviews.length > 0 && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" component="h4" sx={{ mb: 1 }}>
            Your Reviews
          </Typography>
          {localReviews.map((review: LocalReview) => (
            <Box key={review.id} sx={{ mb: 2 }}>
              <Typography variant="subtitle1" component="p">
                {review.author} — Rating:{" "}
                {`${review.author_details?.rating ?? review.rating}`}
              </Typography>
              <Typography variant="body2" component="p">
                {review.content}
              </Typography>
            </Box>
          ))}
        </Paper>
      )}

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="primary" />
        </li>
        {movie.genres?.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={styles.chipSet}>
        <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
        <Chip
          icon={<MonetizationIcon />}
          label={`${movie.revenue.toLocaleString()}`}
        />
        <Chip
          icon={<StarRate />}
          label={`${movie.vote_average} (${movie.vote_count}`}
        />
        <Chip label={`Released: ${movie.release_date}`} />
      </Paper>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <MovieReviews {...movie} />
      </Drawer>
    </>
  );
};
export default MovieDetails;
