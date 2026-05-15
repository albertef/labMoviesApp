import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { getGenres } from "../../api/tmdb-api";

export type SearchFormValues = {
  searchType: "movie" | "tv";
  genre: number;
  year: number | null;
  rating: number;
  sortBy: string;
  originalLanguage: string;
};

interface MultiCriteriaSearchFormProps {
  initialValues: SearchFormValues;
  onSearch: (values: SearchFormValues) => void;
}

const defaultGenres = [{ id: 0, name: "All" }];

const MultiCriteriaSearchForm = ({
  initialValues,
  onSearch,
}: MultiCriteriaSearchFormProps) => {
  const [genres, setGenres] = useState(defaultGenres);
  const { handleSubmit, control, reset } = useForm<SearchFormValues>({
    defaultValues: initialValues,
  });

  useEffect(() => {
    getGenres().then((data) => {
      setGenres((current) => [...current, ...data]);
    });
  }, []);

  const handleFormSubmit = (values: SearchFormValues) => {
    onSearch(values);
  };

  const handleReset = () => {
    reset(initialValues);
    onSearch(initialValues);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{ mb: 3 }}
    >
      <Typography variant="h5" gutterBottom>
        Search & Filters
      </Typography>
      <Controller
        name="searchType"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="search-type-select-label">Search Type</InputLabel>
            <Select
              labelId="search-type-select-label"
              label="Search Type"
              {...field}
            >
              <MenuItem value="movie">Movie</MenuItem>
              <MenuItem value="tv">TV</MenuItem>
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="genre"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="genre-select-label">Genre</InputLabel>
            <Select labelId="genre-select-label" label="Genre" {...field}>
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="sortBy"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="sort-by-select-label">Sort By</InputLabel>
            <Select labelId="sort-by-select-label" label="Sort By" {...field}>
              <MenuItem value="popularity.desc">Popularity Desc</MenuItem>
              <MenuItem value="popularity.asc">Popularity Asc</MenuItem>
              <MenuItem value="release_date.desc">Release Date Desc</MenuItem>
              <MenuItem value="release_date.asc">Release Date Asc</MenuItem>
              <MenuItem value="vote_average.desc">Rating Desc</MenuItem>
              <MenuItem value="vote_average.asc">Rating Asc</MenuItem>
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="originalLanguage"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="language-select-label">Language</InputLabel>
            <Select labelId="language-select-label" label="Language" {...field}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
              <MenuItem value="fr">French</MenuItem>
              <MenuItem value="de">German</MenuItem>
              <MenuItem value="ja">Japanese</MenuItem>
              <MenuItem value="ko">Korean</MenuItem>
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="year"
        control={control}
        render={({ field }) => (
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            label="Year"
            type="number"
            inputProps={{ min: 1900, max: new Date().getFullYear() }}
            value={field.value ?? ""}
            onChange={(event) =>
              field.onChange(
                event.target.value ? Number(event.target.value) : null,
              )
            }
          />
        )}
      />
      <Box sx={{ mb: 2 }}>
        <Typography gutterBottom>Minimum Rating</Typography>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <Slider
              value={field.value}
              onChange={(_, value) => field.onChange(value as number)}
              valueLabelDisplay="auto"
              step={1}
              min={0}
              max={10}
            />
          )}
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button type="submit" variant="contained">
          Apply
        </Button>
        <Button variant="outlined" onClick={handleReset}>
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default MultiCriteriaSearchForm;
