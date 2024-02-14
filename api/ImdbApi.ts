import { IMDBApiResponse, IMDBMovie } from "@/class/IMDB";
import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "votre_clé_api";

const imdbApi = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const fetchMovies = async (): Promise<IMDBMovie[]> => {
  try {
    const response = await imdbApi.get<IMDBApiResponse>("/discover/movie", {
      params: {
        language: "en-US",
        sort_by: "popularity.desc",
        include_adult: false,
        include_video: false,
        page: 1,
        region: "FR",
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};
