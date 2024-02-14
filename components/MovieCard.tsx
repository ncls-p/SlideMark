import { IMDBMovie } from "@/class/IMDB";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button, Modal } from "react-native-ui-lib";

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "100%",
    height: 280,
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
  modalDetail: {
    marginBottom: 10,
  },
});

interface MovieCardProps {
  movie: IMDBMovie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View>
      <View style={styles.card}>
        <Image
          style={styles.cardImage}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
        />
        <Text style={styles.cardTitle}>{movie.title}</Text>
        <Button
          label="View Details"
          onPress={toggleModal}
          backgroundColor="#db0000"
          color="#dedede"
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <ScrollView style={{ marginTop: 100, marginHorizontal: 20 }}>
          <View style={styles.modalContent}>
            <Text style={styles.modalDetail}>
              <Text style={{ fontWeight: "bold" }}>Title:</Text> {movie.title}
            </Text>
            <Text style={styles.modalDetail}>
              <Text style={{ fontWeight: "bold" }}>Overview:</Text>{" "}
              {movie.overview}
            </Text>
            <Button label="Close" onPress={toggleModal} />
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default MovieCard;
