import { createReducer, on } from "@ngrx/store";
import { init, update } from "../actions/pelicula.actions";
import { Peliculas } from "../interfaces/peliculas";

const initialState: Peliculas = {};
export const peliculaFeatureKey = 'peliculaState'
export const peliculaReducer = createReducer(
  initialState,
  on(init,()=> ({})),
  on(update,(currentState,action)=>{
    currentState = action.pelicula;
    return currentState;
  })
)
