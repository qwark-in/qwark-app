import { FlatList, Platform, useWindowDimensions } from "react-native";
import { View, YStack, Image } from "tamagui";
import QwarkLogoWithTextMd from "ui/assets/logos/QwarkLogoWithTextMd";
import { SliderPagination } from "ui/display/slider/SliderPagination";
import { useSlider } from "ui/display/slider/useSlider";
import { BodyText, TitleText } from "ui/display/typography";
import { authCarousalData } from "../constants";
import { AuthCarousalDataType } from "../types";

export const AuthWelcomeCarousal = () => {
  const { scrollX, slidesRef, viewConfig, handleOnScroll, viewableItemsChanged } =
    useSlider({
      numberOfPages: authCarousalData.length,
    });

  const webScrollStyle =
    Platform.OS === "web"
      ? {
          overflowX: "auto",
          scrollSnapType: "x mandatory",
        }
      : {};

  return (
    <View f={1}>
      <FlatList
        ref={slidesRef}
        data={authCarousalData}
        renderItem={({ item }) => <AuthCarousalItem item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        disableIntervalMomentum
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        style={webScrollStyle}
      />
      <SliderPagination
        numberOfPages={authCarousalData.length}
        scrollX={scrollX}
        ai="center"
      />
    </View>
  );
};

type AuthCarousalItemProps = {
  item: AuthCarousalDataType;
};
export const AuthCarousalItem: React.FC<AuthCarousalItemProps> = ({ item }) => {
  const { width } = useWindowDimensions();

  return (
    <View w={width}>
      <View ai="center" mt="$8" f={1}>
        <QwarkLogoWithTextMd />
        <View f={1} als="stretch" ai="center">
          <Image source={item.image} f={1} objectFit="contain" />
        </View>
      </View>

      <YStack gap="$2" py="$6" px="$5">
        <TitleText size="$large" fow="$emphasized" color="$gray/100">
          {item.heading}
        </TitleText>
        <BodyText color="$text/secondary">{item.description}</BodyText>
      </YStack>
    </View>
  );
};
