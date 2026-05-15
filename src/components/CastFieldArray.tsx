import { Controller, Control, FieldArrayWithId } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

export type FantasyCastMemberFormValues = {
  name: string;
  role: string;
};

interface CastFieldArrayProps {
  control: Control<any>;
  fields: FieldArrayWithId<any, "cast", "id">[];
  remove: (index: number) => void;
  append: (value: FantasyCastMemberFormValues) => void;
  errors?: any;
  castNameOptions: string[];
}

const CastFieldArray = ({
  control,
  fields,
  remove,
  append,
  errors,
  castNameOptions,
}: CastFieldArrayProps) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Cast Members
      </Typography>
      {fields.map((field, index) => (
        <Grid
          container
          spacing={2}
          alignItems="flex-end"
          key={field.id}
          sx={{ mb: 2 }}
        >
          <Grid item xs={12} sm={5}>
            <Controller
              name={`cast.${index}.name`}
              control={control}
              rules={{ required: "Cast member name is required" }}
              render={({ field }) => (
                <Autocomplete
                  freeSolo
                  options={castNameOptions}
                  value={field.value ?? ""}
                  onChange={(_, value) => field.onChange(value ?? "")}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Actor Name"
                      fullWidth
                      error={Boolean(errors?.cast?.[index]?.name)}
                      helperText={errors?.cast?.[index]?.name?.message}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <Controller
              name={`cast.${index}.role`}
              control={control}
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Role"
                  fullWidth
                  error={Boolean(errors?.cast?.[index]?.role)}
                  helperText={errors?.cast?.[index]?.role?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => remove(index)}
              startIcon={<DeleteIcon />}
              fullWidth
            >
              Remove
            </Button>
          </Grid>
        </Grid>
      ))}
      <Button
        variant="contained"
        onClick={() => append({ name: "", role: "" })}
        startIcon={<AddIcon />}
      >
        Add Cast Member
      </Button>
      {errors?.cast?.message ? (
        <Typography color="error" sx={{ mt: 1 }}>
          {errors.cast.message}
        </Typography>
      ) : null}
    </Box>
  );
};

export default CastFieldArray;
