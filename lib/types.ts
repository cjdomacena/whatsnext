import { type } from "os";

interface IBasicImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: null | string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export enum MediaType {
  "all",
  "tv",
  "movie",
  "person",
}

export interface IImage {
  id: number;
  backdrops?: IBasicImage[];
  posters?: IBasicImage[];
}

export interface Result {
  poster_path: string | null;
  popularity: number;
  id: number;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
  genre_ids: number[];
  original_language: string;
  vote_count: number;
  adult?: boolean;
  media_type: "movie" | "tv";
}

export interface MovieInterface extends Result {
  release_date: string;
  original_title: string;
  title: string;
  video: boolean;
}

export interface TVInterface extends Result {
  first_air_date: string;
  origin_country: string[];
  name: string;
  original_name: string;
}

export interface ResultWithDates {
  maximum: string;
  minimum: string;
}

export interface MovieSchema<T> {
  page: number;
  results: ExtractedResult<T>[];
  total_results?: number;
  total_pages?: number;
}

export type ExtractedResult<T> = T extends "movie"
  ? MovieInterface
  : T extends "tv"
  ? TVInterface
  : MovieInterface & TVInterface;
