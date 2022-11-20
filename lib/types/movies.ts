import {
  BelongsToCollection,
  Genre,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
} from "./common";

export type MovieDetails = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection | null;
  budget: number;
  genres: Genre[] | null;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[] | null;
  production_countries: ProductionCountry[] | null;
  release_date: string;
  revenue: number | null;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
