import { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Dimensions,
  ViewToken,
} from "react-native";

const { width } = Dimensions.get("window");

/**
 * A custom hook that provides utility logic for implementing a horizontal slider using FlatList.
 *
 * @param numberOfPages - The total number of items/pages in the slider.
 * @returns Slider control utilities including current index, scroll position, and imperative navigation.
 */
export const useSlider = ({ numberOfPages }: { numberOfPages: number }) => {
  /**
   * The current index of the visible page.
   */
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  /**
   * Animated value representing the horizontal scroll position.
   * Can be used for animated indicators (e.g., dots).
   */
  const scrollX = useRef(new Animated.Value(0)).current;

  /**
   * Ref to the FlatList instance for programmatic control (scrolling).
   */
  const slidesRef = useRef<FlatList>(null);

  /**
   * Callback triggered when the viewable items in the FlatList change.
   * Used to update `currentIndex`.
   */

  const viewableItemsChanged = undefined;

  /**
   * Configuration for viewability detection in FlatList.
   * Only items that cover at least 50% of the screen are considered viewable.
   */
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  /**
   * Scroll handler to bind the scroll event to `scrollX` Animated.Value.
   * Should be passed to FlatList's `onScroll` prop.
   *
   * @param event - The native scroll event from FlatList.
   */
  const handleOnScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = event.nativeEvent.contentOffset.x;

    scrollX.setValue(x);

    console.log(x);

    const index = Math.round(x / width);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const SLIDER_PADDING = 20 * 2;
  const ITEM_WIDTH = width - SLIDER_PADDING;

  const scrollToNext = () => {
    if (currentIndex < numberOfPages - 1) {
      slidesRef.current?.scrollToOffset({
        offset: (currentIndex + 1) * ITEM_WIDTH,
        animated: true,
      });
    }
  };

  const scrollToPrevious = () => {
    if (currentIndex > 0) {
      slidesRef.current?.scrollToOffset({
        offset: (currentIndex - 1) * ITEM_WIDTH,
        animated: true,
      });
    }
  };

  /**
   * Scrolls the FlatList to a start the slider.
   *
   * @param index - The target index to scroll to.
   */
  const scrollToStart = () => {
    slidesRef.current?.scrollToOffset({
      offset: 0,
      animated: false,
    });
  };

  useEffect(() => {
    scrollToStart();
  }, []);

  console.log("Current Index", currentIndex);

  return {
    currentIndex,
    scrollX,
    slidesRef,
    viewConfig,
    viewableItemsChanged,
    handleOnScroll,
    scrollToNext,
    scrollToPrevious,
  };
};
