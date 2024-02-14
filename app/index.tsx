import React, { useEffect, useState } from "react";
import { FlatList, Modal, StyleSheet, View } from "react-native";
import MovieCard from "@/components/MovieCard";
import { fetchMovies } from "@/api/ImdbApi";
import Carousel from "@/components/Carousel";
import { IMDBMovie } from "@/class/IMDB";

export default function TabOneScreen() {
  const [movies, setMovies] = useState<IMDBMovie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<IMDBMovie | null>(null);

  useEffect(() => {
    const initMovies = async () => {
      const fetchedMovies = await fetchMovies();
      setMovies(fetchedMovies);
    };

    initMovies();
  }, []);

  const renderMovieCard = ({ item }: { item: IMDBMovie }) => (
    <MovieCard movie={item} />
  );

  return (
    <View style={styles.container}>
      <Carousel data={movies} />{" "}
      <FlatList
        data={movies}
        renderItem={renderMovieCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={selectedMovie !== null}
        onRequestClose={() => setSelectedMovie(null)}
      ></Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
});
