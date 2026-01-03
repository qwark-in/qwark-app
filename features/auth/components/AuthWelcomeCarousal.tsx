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

  return (
    <View f={1}>
      <FlatList
        ref={slidesRef}
        data={authCarousalData}
        renderItem={({ item }) => <AuthCarousalItem item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        disableIntervalMomentum={true}
        snapToAlignment="center"
        decelerationRate="normal"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        // This is an escape hatch to make the container of the Flatlist item grow.
        // By default it doesn't.
        CellRendererComponent={({ children, style, ...handlers }) => {
          const { cellKey, ...handlersWithoutCellKey } = handlers;

          // This is done to mitigate cellKey error on DOM for web
          const finalHandlers = Platform.OS === "web" ? handlersWithoutCellKey : handlers;

          return (
            <View style={style} flexGrow={1} {...finalHandlers}>
              {children}
            </View>
          );
        }}
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
    <View f={1} w={width}>
      <View f={1} ai="center" jc="center" mt="$8">
        <QwarkLogoWithTextMd />
        <View f={1} ai="center" jc="center">
          <AuthCarouselImage image={item.image} />
        </View>
      </View>

      <YStack gap="$2" pt="$6" px="$5" pb={item.id === "1" ? "$10" : "$6"}>
        <TitleText size="$large" fow="$emphasized" color="$gray/100">
          {item.heading}
        </TitleText>
        <BodyText color="$text/secondary">{item.description}</BodyText>
      </YStack>
    </View>
  );
};

type AuthCarouselImageProps = {
  image: any;
};

const AuthCarouselImage = ({ image }: AuthCarouselImageProps) => {
  const { width } = useWindowDimensions();

  return (
    <View f={1} width={width}>
      <Image
        source={image}
        style={{ width: "100%", height: "100%" }}
        resizeMode="contain"
        aspectRatio={1.75}
      />
    </View>
  );
};
