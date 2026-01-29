import { IconButton } from "ui/controls/buttons";
import { useDashboardScreenStore } from "../store/dashboardScreenStore";

export const HideAmountButton = () => {
  const isVisible = useDashboardScreenStore((store) => store.isVisible);
  const toggleIsVisible = useDashboardScreenStore(
    (store) => store.toggleIsVisible,
  );

  const handlePress = () => {
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
