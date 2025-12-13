import { useFonts } from "expo-font";

export const useQwarkFonts = () => {
  const [fontsLoaded, fontsError] = useFonts({
    // Tamagui built-ins
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),

    // Custom
    BarlowRegular: require("../assets/fonts/barlow/Barlow-Regular.ttf"),
    BarlowMedium: require("../assets/fonts/barlow/Barlow-Medium.ttf"),
    BarlowSemibold: require("../assets/fonts/barlow/Barlow-SemiBold.ttf"),

    RobotoSerifRegular: require("../assets/fonts/roboto-serif/RobotoSerif-Regular.ttf"),
    RobotoSerifMedium: require("../assets/fonts/roboto-serif/RobotoSerif-Medium.ttf"),
    RobotoSerifSemibold: require("../assets/fonts/roboto-serif/RobotoSerif-SemiBold.ttf"),
  });

  return { fontsLoaded, fontsError };
};
