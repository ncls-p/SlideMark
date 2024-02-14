import { fetchMovies } from "@/api/ImdbApi";
import { IMDBMovie } from "@/class/IMDB";
import MovieCard from "@/components/MovieCard";
import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { Button } from "react-native-ui-lib";

export default function TabOneScreen() {
  let page = 1;
  const [movies, setMovies] = useState<IMDBMovie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<IMDBMovie | null>(null);

  const fetchMoreMovies = async () => {
    page = page + 1;
    const fetchedMovies = await fetchMovies(page);
    setMovies((prevMovies) => [...prevMovies, ...fetchedMovies]);
  };

  useEffect(() => {
    const initMovies = async () => {
      const fetchedMovies = await fetchMovies(page);
      setMovies(fetchedMovies);
    };

    initMovies();
  }, []);

  const renderMovieCard = ({ item }: { item: IMDBMovie }) => (
    <MovieCard movie={item} />
  );

  return (
    <View style={styles.container}>
      <FlatGrid
        itemDimension={130}
        data={movies}
        renderItem={renderMovieCard}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={fetchMoreMovies}
        onEndReachedThreshold={0.5} // This means "50% from the end"
        {...(window.innerWidth > 1500 && {
          ListFooterComponent: () => (
            <Button
              label="Load More"
              onPress={fetchMoreMovies}
              backgroundColor="#db0000"
              style={{ margin: 10 }}
            />
          ),
        })}
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
    backgroundColor: "#000000",
    flex: 1,
    paddingTop: 10,
  },
  row: {
    flex: 1,
    justifyContent: "space-around",
  },
});
