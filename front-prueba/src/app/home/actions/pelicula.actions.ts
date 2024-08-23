import { createAction, props } from "@ngrx/store";
import { Peliculas } from "../interfaces/peliculas";

export const init = createAction('[Home Component] Init')
export const update = createAction('[Home Component] Update movie',
  props<{pelicula:Peliculas}>()
)
