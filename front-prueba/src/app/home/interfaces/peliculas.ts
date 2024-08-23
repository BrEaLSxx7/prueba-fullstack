export interface PeticionPeliculas {
  count?: number;
  peliculas?: Peliculas[];
}
export interface Peliculas {
  awards?: Awards;
  cast?: string[];
  countries?: string[];
  directors?: string[];
  fullplot?: string;
  genres?: string[];
  imdb?: Imdb;
  languages?: string[];
  lastupdated?: string;
  num_mflix_comments?: number;
  plot?: string;
  poster?: string;
  rated?: string;
  runtime?: number;
  title?: string;
  tomatoes?: Tomatoes;
  type?: string;
  writers?: string[];
  year?: number;
  _id?: string;
}

export interface Awards {
  wins?: number;
  nominations?: number;
  text?: string;
}

export interface Imdb {
  rating?: number;
  votes?: number;
  id?: string;
}

export interface Tomatoes {
  critic?: Critic;
  dvd?: string;
  fresh?: number;
  lastUpdated?: string;
  production?: string;
  rotten?: number;
  viewer?: Viewer;
  website?: string;
}

export interface Critic {
  rating?: number;
  numReviews?: number;
  meter?: number;
}
export interface Viewer {
  rating?: number;
  numReviews?: number;
  meter?: number;
}
