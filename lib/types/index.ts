import { MEDIA_TYPE } from "../constants/enums";
import { TrendingTV, TrendingMovie } from "./common";
import { MovieDetails } from "./movies";
import { TVDetails } from "./tv";

export type TrendingResult<T extends keyof typeof MEDIA_TYPE> = T extends "tv"
  ? TrendingTV
  : T extends "movie"
  ? TrendingMovie
  : TrendingMovie & TrendingTV;

export type TrendingQueryResult<T extends keyof typeof MEDIA_TYPE> = {
  page: number;
  results: TrendingResult<T>[];
  total_pages: number;
  total_results: number;
};

export type Intersect<T extends "tv" | "movie"> = T extends "tv"
  ? TVDetails
  : T extends "movie"
  ? MovieDetails
  : never;
