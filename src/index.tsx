import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MovieDetailsPage";
import FavouriteMoviesPage from "./pages/FavouriteMoviesPage";
import MovieReviewPage from "./pages/MovieReviewPage";
import SiteHeader from "./components/SiteHeader";
import UpcomingMoviesPage from "./pages/UpcomingMovies";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/reviews/form" element={<AddMovieReviewPage />} />
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route
              path="/movies/favourites"
              element={<FavouriteMoviesPage />}
            />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
