import { useParams } from "react-router-dom";
import { useActorDetails, useActorCredits } from "../hooks/useMovie";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

const ActorDetailsPage = () => {
  const { id } = useParams();
  const {
    data: actor,
    isLoading: actorLoading,
    isError: actorError,
    error: actorErr,
  } = useActorDetails(id ?? "");
  const {
    data: credits,
    isLoading: creditsLoading,
    isError: creditsError,
    error: creditsErr,
  } = useActorCredits(id ?? "");

  if (actorLoading || creditsLoading) {
    return <p>Loading actor details...</p>;
  }

  if (actorError || creditsError) {
    return (
      <p>Error loading actor: {actorErr?.message || creditsErr?.message}</p>
    );
  }

  if (!actor) {
    return <p>Actor not found</p>;
  }

  const profileImageUrl = actor.profile_path
    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
    : "/film-poster-placeholder.png";

  const filmography = credits?.cast?.slice(0, 10) || []; // Show top 10 movies

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardMedia
            component="img"
            height="400"
            image={profileImageUrl}
            alt={actor.name}
          />
          <CardContent>
            <Typography variant="h5">{actor.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              Born: {actor.birthday || "Unknown"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Place of Birth: {actor.place_of_birth || "Unknown"}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography variant="h6" gutterBottom>
          Biography
        </Typography>
        <Typography variant="body1" paragraph>
          {actor.biography || "No biography available."}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Filmography
        </Typography>
        <Grid container spacing={2}>
          {filmography.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : "/film-poster-placeholder.png"
                  }
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="subtitle1">{movie.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {movie.character}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ActorDetailsPage;
