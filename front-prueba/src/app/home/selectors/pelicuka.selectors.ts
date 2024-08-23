import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Peliculas } from "../interfaces/peliculas";
import { peliculaFeatureKey } from "../reducers/pelicula.reducers";

const peliculaState = createFeatureSelector<Peliculas>(peliculaFeatureKey)
export const peliculaSelector = createSelector(peliculaState,
  (peliculaState)=>peliculaState
)
