import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Colors, GridView, Modal } from "react-native-ui-lib";

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

interface IMDBMovieInfos {
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

class GetMoviesToDiscoverFromImdb {
  async execute(): Promise<IMDBApiResponse> {
    const url = "https://api.themoviedb.org/3/discover/movie";
    const apiKey =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTg5NWQ3YTcxZjMwMDk4MzIxMGEzYTFhYmI3YWIzMSIsInN1YiI6IjY1YjkxM2M1ZTlkYTY5MDE0OGYyZTdjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EToHBts-jaaRs7_na4jqylQs-h0DeqwbvxTbRBY26U8";
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

async function getMovieInfos(movieId: number): Promise<IMDBMovieInfos> {
  const apiKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTg5NWQ3YTcxZjMwMDk4MzIxMGEzYTFhYmI3YWIzMSIsInN1YiI6IjY1YjkxM2M1ZTlkYTY5MDE0OGYyZTdjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EToHBts-jaaRs7_na4jqylQs-h0DeqwbvxTbRBY26U8";

  const url = `https://api.themoviedb.org/3/movie/${movieId}`;
  const params = {
    language: "fr-FR",
  };
  const headers = {
    Authorization: `Bearer ${apiKey}`,
  };

  const response = await axios.get(url, {
    params,
    headers,
  });

  return response.data as IMDBMovieInfos;
}

const MovieCards: React.FC = () => {
  const [movies, setMovies] = useState<IMDBMovie[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await getMoviesToDiscover();
      setMovies(movies);
    };

    fetchMovies();
  }, []);

  const displayMovieInfos = (movieId: number) => {
    setSelectedMovieId(movieId);
  };

  const closeModal = () => {
    setSelectedMovieId(null);
  };

  return (
    <>
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
          onPress: () => displayMovieInfos(movie.id),
        }))}
        numColumns={5}
        lastItemLabel={"+"}
      />
      {selectedMovieId !== null && (
        <Modal
          visible={true}
          onRequestClose={closeModal}
          animationType="fade"
          onBackgroundPress={closeModal}
        >
          {movies.map((movie) =>
            movie.id === selectedMovieId ? (
              <React.Fragment key={movie.id}>
                <p>{movie.title}</p>
                <p>{movie.overview}</p>
                <p>{movie.release_date}</p>
                <p>{movie.vote_average}</p>
                <p>{movie.vote_count}</p>
              </React.Fragment>
            ) : null
          )}
          <Button label="Close" onPress={closeModal} />
        </Modal>
      )}
    </>
  );
};

export default MovieCards;
