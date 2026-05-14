import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { ActorDetailsProps } from "../types/movieAppTypes";
import { Link } from "react-router-dom";

interface ActorCardProps {
  actor: ActorDetailsProps;
}

const styles = {
  card: { maxWidth: 345 },
  media: { height: 400 },
};

const ActorCard = ({ actor }: ActorCardProps) => {
  const profileImageUrl = actor.profile_path
    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
    : "/film-poster-placeholder.png";

  return (
    <Card sx={styles.card}>
      <CardMedia sx={styles.media} image={profileImageUrl} title={actor.name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {actor.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {actor.known_for_department}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Popularity: {actor.popularity}
        </Typography>
        <Link to={`/actor/${actor.id}`}>View Details</Link>
      </CardContent>
    </Card>
  );
};

export default ActorCard;
