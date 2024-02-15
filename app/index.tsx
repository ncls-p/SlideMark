import { fetchMovies } from "@/api/ImdbApi";
import { IMDBMovie } from "@/class/IMDB";
import MovieCard from "@/components/MovieCard";
import React, { useEffect, useRef, useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { Button, Text } from "react-native-ui-lib";

export default function HomeScreen() {
  const page = useRef(1);
  const [movies, setMovies] = useState<IMDBMovie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<IMDBMovie | null>(null);

  const fetchMoreMovies = async () => {
    page.current = page.current += 1;
    const fetchedMovies = await fetchMovies(page.current);
    setMovies((prevMovies) => [...prevMovies, ...fetchedMovies]);
  };

  useEffect(() => {
    const initMovies = async () => {
      const fetchedMovies = await fetchMovies(page.current);
      setMovies(fetchedMovies);
    };

    initMovies();
  }, []);

  const renderMovieCard = ({ item }: { item: IMDBMovie }) => (
    <MovieCard movie={item} />
  );

  return (
    <View style={styles.container}>
      <Text
        text10
        white
        center
        style={{
          borderRadius: 10,
          borderColor: "white",
          borderWidth: 1,
          padding: 10,
          margin: 10,
        }}
      >
        SlideMark
      </Text>
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
