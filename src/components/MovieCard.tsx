import { MouseEvent, ReactNode } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import img from "../images/film-poster-placeholder.png";
import { DiscoverMovieOverviewProps } from "../types/movieAppTypes";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

interface MovieCardProps {
  movie: DiscoverMovieOverviewProps;
  selectFavourite?: (movieId: number) => void;
  renderActions?: (movie: DiscoverMovieOverviewProps) => ReactNode;
  linkPath?: (movie: DiscoverMovieOverviewProps) => string;
}

const styles = {
  card: { maxWidth: 345 },
  media: { height: 350 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
    width: 21,
    height: 20,
  },
  cardHeader: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
  },
  movieTitle: {
    maxHeight: 50,
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    fontSize: "1.1rem",
  },
  cardActions: { display: "flex", justifyContent: "space-between" },
};

const MovieCard = ({
  movie,
  selectFavourite,
  renderActions,
  linkPath,
}: MovieCardProps) => {
  const handleAddToFavourite = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    selectFavourite?.(movie.id);
  };
  return (
    <Card sx={styles.card}>
      <CardHeader
        sx={styles.cardHeader}
        avatar={
          movie.favourite ? (
            <Avatar sx={styles.avatar}>
              <FavoriteIcon sx={{ fontSize: 15 }} />
            </Avatar>
          ) : null
        }
        title={
          <Typography
            variant="h5"
            component="p"
            sx={styles.movieTitle}
            title={movie.title}
          >
            {movie.title}{" "}
          </Typography>
        }
      />
      <CardMedia
        sx={styles.media}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography
              variant="body1"
              component="p"
              sx={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <CalendarIcon fontSize="small" /> &nbsp;
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="body1"
              component="p"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing sx={styles.cardActions}>
        {renderActions ? (
          renderActions(movie)
        ) : (
          <IconButton
            aria-label="add to favourites"
            onClick={handleAddToFavourite}
          >
            <FavoriteIcon color="primary" fontSize="medium" />
          </IconButton>
        )}
        <Link to={linkPath ? linkPath(movie) : `/movies/${movie.id}`}>
          <Button variant="contained" size="small" color="success">
            More Info
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
