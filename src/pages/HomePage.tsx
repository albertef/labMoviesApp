import { useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import PageTemplate from "../components/TemplateMovieListPage";
import {
  DiscoverMovieOverviewProps,
  SearchFilters,
} from "../types/movieAppTypes";
import { useMovieList, useTvList } from "../hooks/useMovie";
import { useMoviesContext } from "../contexts/useMoviesContext";
import AddToFavourites from "../components/CardIcons/AddToFavourites";
import MultiCriteriaSearchForm, {
  SearchFormValues,
} from "../components/SearchForm/MultiCriteriaSearchForm";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const parseNumber = (value: string | null, fallback: number) => {
  const parsed = Number(value);
  if (Number.isNaN(parsed) || parsed < 1) {
    return fallback;
  }
  return parsed;
};

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { addFavourite, isFavourite } = useMoviesContext();

  const searchOpen = location.pathname === "/search";

  const page = parseNumber(searchParams.get("page"), 1);
  const genre = parseNumber(searchParams.get("genre"), 0);
  const year = parseNumber(searchParams.get("year"), 0);
  const rating = parseNumber(searchParams.get("rating"), 0);
  const searchType = searchParams.get("type") === "tv" ? "tv" : "movie";

  const sortBy = searchParams.get("sortBy") ?? "popularity.desc";
  const originalLanguage = searchParams.get("originalLanguage") ?? "";

  const filters: SearchFilters = useMemo(
    () => ({
      genre: genre > 0 ? genre : undefined,
      year: year > 0 ? year : undefined,
      rating: rating > 0 ? rating : undefined,
      sortBy,
      originalLanguage: originalLanguage || undefined,
    }),
    [genre, year, rating, sortBy, originalLanguage],
  );

  const movieQuery = useMovieList(page, filters, {
    enabled: searchType === "movie",
  });
  const tvQuery = useTvList(page, filters, {
    enabled: searchType === "tv",
  });

  const moviePage = movieQuery.data;
  const tvPage = tvQuery.data;
  const isLoading =
    searchType === "tv" ? tvQuery.isLoading : movieQuery.isLoading;
  const isError = searchType === "tv" ? tvQuery.isError : movieQuery.isError;
  const error = searchType === "tv" ? tvQuery.error : movieQuery.error;

  const movies = useMemo(() => {
    if (searchType === "tv") {
      return (tvPage?.results ?? []).map((tv) => ({
        id: tv.id,
        title: tv.name,
        overview: tv.overview,
        poster_path: tv.poster_path,
        release_date: tv.first_air_date ?? "",
        vote_average: tv.vote_average,
        popularity: tv.popularity ?? 0,
        vote_count: tv.vote_count ?? 0,
        favourite: isFavourite(tv.id),
        adult: false,
        video: false,
        original_title: tv.name,
        original_language: tv.original_language ?? "en",
      }));
    }
    return (moviePage?.results ?? []).map((movie) => ({
      ...movie,
      favourite: isFavourite(movie.id),
    }));
  }, [searchType, moviePage?.results, tvPage?.results, isFavourite]);

  const addToFavourites = (movieId: number) => {
    const movie = movies.find((m) => m.id === movieId);
    if (movie) {
      addFavourite({
        ...movie,
        favourite: true,
      });
    }
  };

  const handleSearch = (values: SearchFormValues) => {
    const params = new URLSearchParams();
    params.set("type", values.searchType);
    if (values.genre > 0) params.set("genre", String(values.genre));
    if (values.year) params.set("year", String(values.year));
    if (values.rating > 0) params.set("rating", String(values.rating));
    if (values.sortBy) params.set("sortBy", values.sortBy);
    if (values.originalLanguage)
      params.set("originalLanguage", values.originalLanguage);
    params.set("page", "1");

    setSearchParams(params);
    navigate({ pathname: "/", search: params.toString() }, { replace: true });
  };

  const handlePreviousPage = () => {
    setSearchParams((current) => {
      const nextPage = Math.max(1, page - 1);
      const nextParams = new URLSearchParams(current);
      nextParams.set("page", String(nextPage));
      return nextParams;
    });
  };

  const handleNextPage = () => {
    const totalPages =
      searchType === "tv"
        ? (tvPage?.total_pages ?? 1)
        : (moviePage?.total_pages ?? 1);
    setSearchParams((current) => {
      const nextPage = Math.min(totalPages, page + 1);
      const nextParams = new URLSearchParams(current);
      nextParams.set("page", String(nextPage));
      return nextParams;
    });
  };

  const totalPages =
    searchType === "tv"
      ? (tvPage?.total_pages ?? 1)
      : (moviePage?.total_pages ?? 1);
  const pageNumbers = useMemo(() => {
    const pageCount = Math.min(5, totalPages);
    const start =
      totalPages <= 5 ? 1 : Math.max(1, Math.min(page - 2, totalPages - 4));
    return Array.from({ length: pageCount }, (_, idx) => start + idx);
  }, [page, totalPages]);

  if (isLoading) {
    return <p>Loading movies...</p>;
  }

  if (isError) {
    return <p>Error loading movies: {error?.message ?? "Unknown error"}</p>;
  }

  const formValues: SearchFormValues = {
    searchType,
    genre,
    year: year || null,
    rating,
    sortBy,
    originalLanguage,
  };

  return (
    <Box sx={{ p: 2 }}>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={searchOpen}
        onClose={() =>
          navigate(
            { pathname: "/", search: searchParams.toString() },
            { replace: true },
          )
        }
      >
        <DialogTitle>Search Movies / TV</DialogTitle>
        <DialogContent>
          <MultiCriteriaSearchForm
            initialValues={formValues}
            onSearch={handleSearch}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              navigate(
                { pathname: "/", search: searchParams.toString() },
                {
                  replace: true,
                },
              )
            }
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <PageTemplate
        title={searchType === "tv" ? "TV Series" : "Discover Movies"}
        movies={movies as DiscoverMovieOverviewProps[]}
        renderActions={(movie) => (
          <AddToFavourites movie={movie} onAdd={addToFavourites} />
        )}
        linkPath={(movie) =>
          searchType === "tv" ? `/tv/${movie.id}` : `/movies/${movie.id}`
        }
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          mt: 3,
          flexWrap: "wrap",
        }}
      >
        <Button disabled={page <= 1} onClick={handlePreviousPage}>
          Previous
        </Button>
        {pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            variant={pageNumber === page ? "contained" : "outlined"}
            onClick={() =>
              setSearchParams((current) => {
                const nextParams = new URLSearchParams(current);
                nextParams.set("page", String(pageNumber));
                return nextParams;
              })
            }
          >
            {pageNumber}
          </Button>
        ))}
        <Button disabled={page >= totalPages} onClick={handleNextPage}>
          Next
        </Button>
      </Box>
    </Box>
  );
};
export default HomePage;
