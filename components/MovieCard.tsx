import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Modal } from "react-native-ui-lib";

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: 200,
  },
  cardTitle: {
    padding: 10,
    fontWeight: "bold",
  },
  modalContent: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  movieDetail: {
    marginBottom: 10,
  },
  closeModalButton: {
    marginTop: 20,
  },
});

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

class getSeriesToDiscoverFromImdb {
  async execute(): Promise<IMDBApiResponse> {
    const url = "https://api.themoviedb.org/3/discover/tv";
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

const MovieCards: React.FC = () => {
  const [movies, setMovies] = useState<IMDBMovie[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = screenWidth / 2 - 30;

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
      <ScrollView contentContainerStyle={{ padding: 15 }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {movies.map((movie) => (
            <View key={movie.id} style={[styles.card, { width: cardWidth }]}>
              <Image
                style={styles.cardImage}
                source={{
                  uri: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
                }}
              />
              <Text style={styles.cardTitle}>{movie.title}</Text>
              <Button
                label="View Details"
                onPress={() => displayMovieInfos(movie.id)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      {selectedMovieId !== null && (
        <Modal
          visible={true}
          onRequestClose={closeModal}
          animationType="fade"
          onBackgroundPress={closeModal}
        >
          <View style={styles.modalContent}>
            {movies
              .filter((movie) => movie.id === selectedMovieId)
              .map((movie) => (
                <React.Fragment key={movie.id}>
                  <Text style={styles.movieDetail}>
                    <strong>Title:</strong> {movie.title}
                  </Text>
                  <Text style={styles.movieDetail}>
                    <strong>Overview:</strong> {movie.overview}
                  </Text>
                  <Text style={styles.movieDetail}>
                    <strong>Release date:</strong> {movie.release_date}
                  </Text>
                  <Text style={styles.movieDetail}>
                    <strong>Vote average:</strong> {movie.vote_average}
                  </Text>
                  <Text style={styles.movieDetail}>
                    <strong>Vote count:</strong> {movie.vote_count}
                  </Text>
                  <Text style={styles.movieDetail}>
                    <strong>Original language:</strong>{" "}
                    {movie.original_language}
                  </Text>
                  <Text style={styles.movieDetail}>
                    <strong>Adult:</strong> {movie.adult ? "Yes" : "No"}
                  </Text>
                  <Text style={styles.movieDetail}>
                    <strong>Original title:</strong> {movie.original_title}
                  </Text>
                  <Button
                    label="Close"
                    onPress={closeModal}
                    style={styles.closeModalButton}
                  />
                </React.Fragment>
              ))}
          </View>
        </Modal>
      )}
    </>
  );
};

export default MovieCards;
