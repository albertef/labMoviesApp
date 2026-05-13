import PageTemplate from "../components/TemplateMovieListPage";
import { useMoviesContext } from "../contexts/useMoviesContext";
import RemoveFromFavourites from "../components/CardIcons/RemoveFromFavourites";
import WriteReview from "../components/CardIcons/WriteReview";

const FavouriteMoviesPage = () => {
  const { favourites, removeFavourite } = useMoviesContext();

  return (
    <PageTemplate
      title="Favourite Movies"
      movies={favourites}
      renderActions={(movie) => (
        <>
          <RemoveFromFavourites movie={movie} onRemove={removeFavourite} />
          <WriteReview movie={movie} />
        </>
      )}
    />
  );
};

export default FavouriteMoviesPage;
