export interface IMDBMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMDBApiResponse {
  page: number;
  results: IMDBMovie[];
  total_pages: number;
  total_results: number;
}

export interface IMDBMovieInfos {
  adult: false;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: [];
  homepage: string;
  id: Float64Array;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: Float64Array;
  poster_path: string;
  production_companies: [];
  production_countries: [];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: [];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: Float64Array;
  vote_count: number;
}
