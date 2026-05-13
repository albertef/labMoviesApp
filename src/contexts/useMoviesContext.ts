import { useContext } from "react";
import { MoviesContext } from "./MoviesContext";

export const useMoviesContext = () => {
  const context = useContext(MoviesContext);
  if (!context) {
    throw new Error("useMoviesContext must be used within MoviesProvider");
  }
  return context;
};
