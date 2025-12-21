import { useAudioPlayer } from "expo-audio";
import { IconButton } from "ui/controls/buttons";
import { useDashboardScreenStore } from "../store/dashboardScreenStore";

export const HideAmountButton = () => {
  const isVisible = useDashboardScreenStore((store) => store.isVisible);
  const toggleIsVisible = useDashboardScreenStore((store) => store.toggleIsVisible);
  const player = useAudioPlayer(require("assets/sounds/cha-ching.mp3"));

  player.volume = 0.8;

  const handlePress = () => {
    if (!isVisible) {
      player.seekTo(0);
      player.play();
    }
    toggleIsVisible();
  };

  return (
    <IconButton
      onPress={handlePress}
      name={isVisible ? "eye-hidden" : "eye-visible"}
      size="md"
    />
  );
};
