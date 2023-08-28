const API_KEY = "c23c91c13dc4e7ca6810442b44bbdcf2";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovieTv {
  //공통
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  //Tvshow
  name?: string;
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

export interface IGetTvResult {
  page: number;
  results: IMovieTv[];
  total_pages: number;
  total_results: number;
}

export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}
export function getTv() {
  return fetch(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}
