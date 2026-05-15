import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MovieDetailsPage";
import FavouriteMoviesPage from "./pages/FavouriteMoviesPage";
import AddMovieReviewPage from "./pages/AddMovieReviewPage";
import TvListPage from "./pages/TvListPage";
import ActorDetailsPage from "./pages/ActorDetailsPage";
import TvDetailsPage from "./pages/TvDetailsPage";
import FantasyMoviePage from "./pages/FantasyMoviePage";
import FantasyMovieCreatePage from "./pages/FantasyMovieCreatePage";
import SiteHeader from "./components/SiteHeader";
import UpcomingMoviesPage from "./pages/UpcomingMovies";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { MoviesProvider } from "./contexts/MoviesContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";

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
      <AuthProvider>
        <MoviesProvider>
          <BrowserRouter>
            <SiteHeader />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
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
              <Route
                path="/fantasy-movie"
                element={
                  <ProtectedRoute>
                    <FantasyMoviePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/fantasy-movie/create"
                element={
                  <ProtectedRoute>
                    <FantasyMovieCreatePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/search" element={<HomePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </MoviesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

export default App;
