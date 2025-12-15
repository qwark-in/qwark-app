import { useAudioPlayer } from "expo-audio";
import { EyeHidden, EyeVisible } from "@/assets";
import { IconButton } from "components/ui/buttons";
import { useDashboardScreenStore } from "@mobile/features/dashboard/store/dashboardScreenStore";

export const HideAmountButton = () => {
  const isVisible = useDashboardScreenStore((store) => store.isVisible);
  const toggleIsVisible = useDashboardScreenStore(
    (store) => store.toggleIsVisible
  );
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
      icon={isVisible ? EyeHidden : EyeVisible}
      size={20}
    />
  );
};
