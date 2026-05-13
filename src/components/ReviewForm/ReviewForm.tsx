import { Controller, useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export type ReviewFormValues = {
  author: string;
  rating: number;
  content: string;
};

interface ReviewFormProps {
  onSubmit: (values: ReviewFormValues) => void;
}

const ratingOptions = Array.from({ length: 10 }, (_, index) => index + 1);

const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    defaultValues: {
      author: "",
      rating: 5,
      content: "",
    },
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}
    >
      <Typography variant="h5" component="h2">
        Write a Review
      </Typography>

      <Controller
        name="author"
        control={control}
        rules={{ required: "Author name is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Author"
            error={Boolean(errors.author)}
            helperText={errors.author?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="rating"
        control={control}
        rules={{ required: "Rating is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Rating"
            fullWidth
            error={Boolean(errors.rating)}
            helperText={errors.rating ? String(errors.rating.message) : ""}
          >
            {ratingOptions.map((rating) => (
              <MenuItem key={rating} value={rating}>
                {rating}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        name="content"
        control={control}
        rules={{
          required: "Review content is required",
          minLength: {
            value: 20,
            message: "Review must be at least 20 characters",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Review"
            multiline
            rows={6}
            error={Boolean(errors.content)}
            helperText={errors.content?.message}
            fullWidth
          />
        )}
      />

      <Button type="submit" variant="contained" color="primary">
        Submit Review
      </Button>
    </Box>
  );
};

export default ReviewForm;
