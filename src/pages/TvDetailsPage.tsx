import { useParams } from "react-router-dom";
import TvDetails from "../components/TvDetails";
import { useTvDetails, useTvCredits } from "../hooks/useMovie";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

const TvDetailsPage = () => {
  const { id } = useParams();
  const { data: tv, isLoading, isError, error } = useTvDetails(id ?? "");
  const { data: credits } = useTvCredits(id ?? "");

  if (isLoading) {
    return <p>Loading TV details...</p>;
  }

  if (isError) {
    return <p>Error loading TV: {error?.message ?? "Unknown error"}</p>;
  }

  const cast =
    credits?.cast?.map((actor) => ({
      id: actor.id,
      name: actor.name ?? "Unknown",
      character: actor.character ?? "",
      profile_path: actor.profile_path ?? null,
    })) || [];

  return (
    <>
      {tv ? (
        <Grid container spacing={5} style={{ padding: "15px" }}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="h3" component="h1" gutterBottom>
                {tv.name}
              </Typography>
              {tv.tagline ? (
                <Typography variant="subtitle1">{tv.tagline}</Typography>
              ) : null}
            </Paper>
          </Grid>

          <Grid item xs={12} md={3}>
            <CardMedia
              component="img"
              image={
                tv.poster_path
                  ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
                  : "/film-poster-placeholder.png"
              }
              alt={tv.name}
              sx={{ width: "100%", borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12} md={9}>
            <TvDetails {...tv} cast={cast} />
          </Grid>
        </Grid>
      ) : (
        <p>Waiting for TV details</p>
      )}
    </>
  );
};

export default TvDetailsPage;
