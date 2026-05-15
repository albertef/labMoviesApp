import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FantasyMovieCard from "../components/FantasyMovieCard";
import { FantasyMovie } from "../types/movieAppTypes";

const STORAGE_KEY = "fantasyMovies";

const FantasyMoviePage = () => {
  const [fantasyMovies, setFantasyMovies] = useState<FantasyMovie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedMovies = localStorage.getItem(STORAGE_KEY);
    if (storedMovies) {
      setFantasyMovies(JSON.parse(storedMovies) as FantasyMovie[]);
    }
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4">Fantasy Movies</Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Browse your fantasy movies and create new ones using the form.
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/fantasy-movie/create")}
        >
          Create Fantasy Movie
        </Button>
      </Box>

      {fantasyMovies.length === 0 ? (
        <Typography>
          No fantasy movies created yet. Click the button above to create one.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {fantasyMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <FantasyMovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FantasyMoviePage;
