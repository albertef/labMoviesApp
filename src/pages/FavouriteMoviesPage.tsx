import PageTemplate from "../components/TemplateMovieListPage";
import { useMoviesContext } from "../contexts/MoviesContext";

const FavouriteMoviesPage = () => {
  const { favourites, removeFavourite } = useMoviesContext();

  return (
    <PageTemplate
      title="Favourite Movies"
      movies={favourites}
      selectFavourite={removeFavourite}
    />
  );
};

export default FavouriteMoviesPage;
