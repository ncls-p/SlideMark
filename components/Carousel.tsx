import React from "react";
import { Image, Dimensions } from "react-native";
import { Carousel as ReactCarousel, View } from "react-native-ui-lib";

const { width: viewportWidth } = Dimensions.get("window");

const Carousel: React.FC<{ data: any[] }> = ({ data }) => {
  const renderItem = ({ item }: { item: any }) => {
    return (
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={{ width: viewportWidth, height: 200 }}
      />
    );
  };

  return (
    <ReactCarousel
      loop
      autoplay={true}
      autoplayInterval={3000}
      pageWidth={viewportWidth}
      containerStyle={{ height: 200 }}
      pageControlPosition={"under"}
    >
      {data.map((item, index) => (
        <View key={index} center>
          {renderItem({ item })}
        </View>
      ))}
    </ReactCarousel>
  );
};

export default Carousel;
