import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { DiscoverMovieOverviewProps } from "../../types/movieAppTypes";

interface RemoveFromFavouritesProps {
  movie: DiscoverMovieOverviewProps;
  onRemove: (movieId: number) => void;
}

const RemoveFromFavourites = ({
  movie,
  onRemove,
}: RemoveFromFavouritesProps) => {
  return (
    <IconButton
      aria-label="remove from favourites"
      onClick={(event) => {
        event.preventDefault();
        onRemove(movie.id);
      }}
    >
      <DeleteIcon color="error" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavourites;
