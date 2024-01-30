import { StyleSheet } from "react-native";

import MovieCard from "@/components/MovieCard";
import { View } from "react-native-ui-lib";
import MovieCards from "@/components/MovieCard";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <MovieCards />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#202324",
  },
});
