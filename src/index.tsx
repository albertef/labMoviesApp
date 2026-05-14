import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MovieDetailsPage";
import FavouriteMoviesPage from "./pages/FavouriteMoviesPage";
import AddMovieReviewPage from "./pages/AddMovieReviewPage";
import TvListPage from "./pages/TvListPage";
import ActorDetailsPage from "./pages/ActorDetailsPage";
import TvDetailsPage from "./pages/TvDetailsPage";
import SiteHeader from "./components/SiteHeader";
import UpcomingMoviesPage from "./pages/UpcomingMovies";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { MoviesProvider } from "./contexts/MoviesContext";

// Query client defaults are set for Lab 4 caching behavior:
// - staleTime keeps data fresh for 6 minutes during navigation
// - refetchInterval keeps cached queries updated in the background
// - refetchOnWindowFocus is disabled to avoid unnecessary reloads
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
      <MoviesProvider>
        <BrowserRouter>
          <SiteHeader />
          <Routes>
            <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
            <Route path="/reviews/:id" element={<AddMovieReviewPage />} />
            <Route
              path="/movies/favourites"
              element={<FavouriteMoviesPage />}
            />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/tv" element={<TvListPage />} />
            <Route path="/tv/:id" element={<TvDetailsPage />} />
            <Route path="/actor/:id" element={<ActorDetailsPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </MoviesProvider>
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

export default App;
