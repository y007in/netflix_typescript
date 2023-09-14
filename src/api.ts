const API_KEY = "c23c91c13dc4e7ca6810442b44bbdcf2";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovieTv {
  //공통
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  //TopRate & popular
  adult: string;
  release_date?: string;
  genre_ids?: number[];
  // original_name?: string;
}
export interface ICharacter {
  id: number;
  original_name: string;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovieTv[];
  total_pages: number;
  total_results: number;
}

export interface IGetGenre {
  genres: IGenre[];
}
export interface IGetCharacter {
  id: number;
  cast: IMovieTv[];
}
export interface IGetTrailer {
  id: number;
  results: string[];
}
export interface IGetTvResult {
  page: number;
  results: IMovieTv[];
  total_pages?: number;
  total_results?: number;
}

// movie
export function getPopularMovies() {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}
export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}
export function getRateMovies() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function getGenreMovies() {
  return fetch(
    `${BASE_PATH}/genre/movie/list?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function getCharacterMovies() {
  return fetch(
    `${BASE_PATH}//movie/{movie_id}/credits?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}
export function getTrailerMovies() {
  return fetch(
    `${BASE_PATH}//movie/{movie_id}//videos?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}
