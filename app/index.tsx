import MovieCards from "@/components/MovieCard";

import { StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";

export default function TabOneScreen() {
  return (
    <View
      flex
      bg-dark80
      style={StyleSheet.absoluteFill}
      paddingH-10
      paddingT-10
    >
      <MovieCards />
    </View>
  );
}
