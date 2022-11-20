export interface Genre {
  id: number;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}
export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

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

export interface ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface LastEpisodeToAir {
  air_date: Date;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Network {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
}

export interface Season {
  air_date: Date;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}
