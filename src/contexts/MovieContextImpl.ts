import { createContext } from "react";
import { MoviesContextValue } from "../types/movieAppTypes";

export const MoviesContext = createContext<MoviesContextValue | undefined>(
  undefined,
);
