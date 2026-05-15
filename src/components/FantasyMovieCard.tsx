import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import img from "../images/film-poster-placeholder.png";
import { FantasyMovie } from "../types/movieAppTypes";

interface FantasyMovieCardProps {
  movie: FantasyMovie;
}

const styles = {
  card: { maxWidth: 345 },
  media: { height: 320 },
  castList: { mt: 1 },
};

const FantasyMovieCard = ({ movie }: FantasyMovieCardProps) => (
  <Card sx={styles.card}>
    <CardMedia
      component="img"
      sx={styles.media}
      image={movie.posterUrl ?? img}
      alt={movie.title}
    />
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {movie.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        {movie.overview}
      </Typography>
      <Typography variant="subtitle2">Release: {movie.releaseDate}</Typography>
      <Typography variant="subtitle2">Runtime: {movie.runtime} min</Typography>
      <Typography variant="subtitle2">
        Production: {movie.productionCompany}
      </Typography>
      <Typography variant="subtitle2" sx={{ mt: 1 }}>
        Genres: {movie.genres.join(", ")}
      </Typography>
      <Typography variant="subtitle2" sx={styles.castList}>
        Cast
      </Typography>
      {movie.cast.map((member) => (
        <Typography key={member.id} variant="body2">
          {member.name} as {member.role}
        </Typography>
      ))}
    </CardContent>
    <CardActions>
      <Button size="small" color="primary" disabled>
        View Details
      </Button>
    </CardActions>
  </Card>
);

export default FantasyMovieCard;
