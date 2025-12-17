import { View } from "tamagui";
import { useSafeAreaPadding } from "hooks/use-safearea-padding";
import { TitleText } from "ui/display/typography";
import { useLogout } from "features/auth/hooks";

export default function ProfieTabScreen() {
  const { safeAreaPadding } = useSafeAreaPadding();
  const { logout } = useLogout();

  return (
    <View flex={1} jc="center" ai="center" {...safeAreaPadding}>
      <TitleText size="$large">Profile Tab</TitleText>
      <TitleText mt="$4" onPress={logout}>
        Logout
      </TitleText>
    </View>
  );
}
