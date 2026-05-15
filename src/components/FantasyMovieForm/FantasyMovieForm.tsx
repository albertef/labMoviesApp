import { Controller, useFieldArray, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import ImageUpload from "../ImageUpload";
import CastFieldArray from "../CastFieldArray";
import { genreOptions, castNameOptions } from "../../data/lookupData";

export type FantasyMovieFormValues = {
  title: string;
  overview: string;
  genres: string[];
  releaseDate: string;
  runtime: number;
  productionCompany: string;
  poster: File | null;
  posterDataUrl?: string;
  cast: {
    name: string;
    role: string;
  }[];
};

interface FantasyMovieFormProps {
  onSubmit: (values: FantasyMovieFormValues) => void | Promise<void>;
}

const FantasyMovieForm = ({ onSubmit }: FantasyMovieFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FantasyMovieFormValues>({
    defaultValues: {
      title: "",
      overview: "",
      genres: [],
      releaseDate: "",
      runtime: 90,
      productionCompany: "",
      poster: null,
      cast: [{ name: "", role: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cast",
  });

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });

  const handleGenreToggle = (genre: string, currentGenres: string[]) => {
    const nextGenres = currentGenres.includes(genre)
      ? currentGenres.filter((item) => item !== genre)
      : [...currentGenres, genre];

    setValue("genres", nextGenres, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleFormSubmit = async (values: FantasyMovieFormValues) => {
    const posterDataUrl = values.poster
      ? await fileToDataUrl(values.poster)
      : undefined;

    await onSubmit({ ...values, posterDataUrl });
    reset({
      title: "",
      overview: "",
      genres: [],
      releaseDate: "",
      runtime: 90,
      productionCompany: "",
      poster: null,
      cast: [{ name: "", role: "" }],
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 3, p: 2 }}
    >
      <Typography variant="h5">Create Fantasy Movie</Typography>
      <Typography variant="body2" color="text.secondary">
        Build a new fantasy movie with details, production information, a cast
        list, and a poster upload.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                fullWidth
                error={Boolean(errors.title)}
                helperText={errors.title?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Controller
            name="releaseDate"
            control={control}
            rules={{ required: "Release date is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Release Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                error={Boolean(errors.releaseDate)}
                helperText={errors.releaseDate?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="overview"
            control={control}
            rules={{
              required: "Overview is required",
              minLength: {
                value: 20,
                message: "Overview must be at least 20 characters",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Overview"
                multiline
                rows={5}
                fullWidth
                error={Boolean(errors.overview)}
                helperText={errors.overview?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            name="productionCompany"
            control={control}
            rules={{ required: "Production company is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Production Company"
                fullWidth
                error={Boolean(errors.productionCompany)}
                helperText={errors.productionCompany?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Controller
            name="runtime"
            control={control}
            rules={{
              required: "Runtime is required",
              min: { value: 1, message: "Runtime must be at least 1 minute" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Runtime (minutes)"
                type="number"
                fullWidth
                inputProps={{ min: 1 }}
                error={Boolean(errors.runtime)}
                helperText={errors.runtime?.message}
              />
            )}
          />
        </Grid>
      </Grid>

      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Genres
        </Typography>
        <FormControl
          error={Boolean(errors.genres?.message)}
          component="fieldset"
        >
          <FormGroup row>
            <Controller
              name="genres"
              control={control}
              rules={{
                validate: (value) =>
                  value?.length > 0 || "Select at least one genre",
              }}
              render={({ field }) => (
                <>
                  {genreOptions.map((genre) => (
                    <FormControlLabel
                      key={genre}
                      control={
                        <Checkbox
                          checked={field.value.includes(genre)}
                          onChange={() => handleGenreToggle(genre, field.value)}
                        />
                      }
                      label={genre}
                    />
                  ))}
                </>
              )}
            />
          </FormGroup>
          <Typography color="error" variant="caption">
            {errors.genres?.message ?? " "}
          </Typography>
        </FormControl>
      </Box>

      <Controller
        name="poster"
        control={control}
        render={({ field }) => (
          <ImageUpload file={field.value} onFileSelect={field.onChange} />
        )}
      />

      <CastFieldArray
        control={control}
        fields={fields}
        remove={remove}
        append={(value) => append(value)}
        errors={errors}
        castNameOptions={castNameOptions}
      />

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Button variant="contained" type="submit">
          Save Fantasy Movie
        </Button>
        <Button
          variant="outlined"
          onClick={() =>
            reset({
              title: "",
              overview: "",
              genres: [],
              releaseDate: "",
              runtime: 90,
              productionCompany: "",
              poster: null,
              cast: [{ name: "", role: "" }],
            })
          }
        >
          Reset Form
        </Button>
      </Box>
    </Box>
  );
};

export default FantasyMovieForm;
