import { useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewToken,
} from 'react-native';

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
  const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]?.index !== null) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

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
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false, // use true if scrollX is used with native animations
      }
    )(event);
  };

  /**
   * Scrolls the FlatList to the next item, if not at the end.
   */
  const scrollToNext = () => {
    if (currentIndex < numberOfPages - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  /**
   * Scrolls the FlatList to the previous item, if not at the beginning.
   */
  const scrollToPrevious = () => {
    if (currentIndex > 0) {
      slidesRef.current?.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  /**
   * Scrolls the FlatList to a specific index if within range.
   *
   * @param index - The target index to scroll to.
   */
  const scrollToIndex = (index: number) => {
    if (index >= 0 && index < numberOfPages) {
      slidesRef.current?.scrollToIndex({ index });
    }
  };

  return {
    currentIndex,
    scrollX,
    slidesRef,
    viewConfig,
    viewableItemsChanged,
    handleOnScroll,
    scrollToIndex,
    scrollToNext,
    scrollToPrevious,
  };
};
