interface IBasicImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: null | string;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface IImage {
  id: number;
  backdrops?: IBasicImage[];
  posters?: IBasicImage[];
}

export interface MovieResult {
  poster_path: string | null;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string | null;
  popularity: number;
  video: boolean;
  vote_average: number;
}

export interface MovieSchema {
  page: number;
  results: MovieResult[];
  total_results?: number;
  total_pages?: number;
}
