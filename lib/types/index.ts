import { MEDIA_TYPE } from "../constants/enums";

export type TrendingMovie = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type?: "tv" | "movie";
  genre_ids: number[];
  popularity: number;
  release_date: Date;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TrendingTV = {
  backdrop_path: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: "tv" | "movie";
  genre_ids: number[];
  popularity: number;
  first_air_date: Date;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
};

export type TrendingResult<T extends keyof typeof MEDIA_TYPE> = T extends "tv"
  ? TrendingTV
  : T extends "movie"
  ? TrendingMovie
  : TrendingMovie & TrendingTV;

export type TResult<T extends keyof typeof MEDIA_TYPE> = {
  page: number;
  results: TrendingResult<T>[];
  total_pages: number;
  total_results: number;
};
