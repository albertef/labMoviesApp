import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { DiscoverMovieOverviewProps } from "../../types/movieAppTypes";

interface AddToFavouritesProps {
  movie: DiscoverMovieOverviewProps;
  onAdd: (movieId: number) => void;
}

const AddToFavourites = ({ movie, onAdd }: AddToFavouritesProps) => {
  return (
    <IconButton
      aria-label="add to favourites"
      onClick={(event) => {
        event.preventDefault();
        onAdd(movie.id);
      }}
    >
      <FavoriteIcon
        color={movie.favourite ? "error" : "primary"}
        fontSize="medium"
      />
    </IconButton>
  );
};

export default AddToFavourites;
