import axios from "axios";
import React, { useEffect, useState } from "react";
import { Colors, GridView } from "react-native-ui-lib";

interface IMDBMovie {
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

interface IMDBApiResponse {
  page: number;
  results: IMDBMovie[];
  total_pages: number;
  total_results: number;
}

class GetMoviesToDiscoverFromImdb {
  async execute(): Promise<IMDBApiResponse> {
    const url = "https://api.themoviedb.org/3/discover/movie";
    const apiKey =
    const params = {
      language: "en-US",
      sort_by: "popularity.desc",
      include_adult: false,
      include_video: false,
      page: 1,
      region: "FR",
    };
    const headers = {
      Authorization: `Bearer ${apiKey}`,
    };

    try {
      console.log("url", url);
      console.log("params", params);
      console.log("headers", headers);
      console.log("apiKey", apiKey);
      const response = await axios.get<IMDBApiResponse>(url, {
        params,
        headers,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

async function getMoviesToDiscover(): Promise<IMDBMovie[] | []> {
  const getMoviesToDiscoverFromImdb = new GetMoviesToDiscoverFromImdb();
  try {
    const response = await getMoviesToDiscoverFromImdb.execute();
    return response.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const MovieCards: React.FC = () => {
  const [movies, setMovies] = useState<IMDBMovie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await getMoviesToDiscover();
      setMovies(movies);
    };

    fetchMovies();
  }, []);

  return (
    <GridView
      itemSpacing={20}
      items={movies.map((movie) => ({
        titleColor: Colors.grey40,
        title: movie.title,
        imageProps: {
          source: {
            uri: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
          },
        },
        onPress: () => console.log(`${movie.title} pressed`),
      }))}
      numColumns={5}
      lastItemLabel={"+"}
    />
  );
};

export default MovieCards;
