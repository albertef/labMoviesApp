import { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { TvDetailsProps, CastMember } from "../types/movieAppTypes";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
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

const TvDetails = (tv: TvDetailsProps & { cast?: CastMember[] }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {tv.overview}
      </Typography>

      {tv.cast && tv.cast.length > 0 && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" component="h4" sx={{ mb: 1 }}>
            Cast
          </Typography>
          <Grid container spacing={2}>
            {tv.cast.slice(0, 10).map((actor: CastMember) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={actor.id}>
                <Card>
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
                      component={Link}
                      to={`/actor/${actor.id}`}
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

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="primary" />
        </li>
        {tv.genres?.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={styles.chipSet}>
        <Chip label={`Seasons: ${tv.number_of_seasons}`} />
        <Chip label={`Episodes: ${tv.number_of_episodes}`} />
        <Chip
          icon={<StarRate />}
          label={`${tv.vote_average} (${tv.vote_count})`}
        />
        <Chip label={`First Air Date: ${tv.first_air_date}`} />
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
        {/* Placeholder for TV reviews if needed */}
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Reviews</Typography>
          <Typography>No reviews available for TV series yet.</Typography>
        </Box>
      </Drawer>
    </>
  );
};

export default TvDetails;
