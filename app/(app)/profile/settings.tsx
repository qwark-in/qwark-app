import { useToastController } from "@tamagui/toast";
import { useAuthStore } from "data/stores/auth-store";
import { useSettigsStore } from "data/stores/settings-store";
import { useUserStore } from "data/stores/user-store";
import { useLogout } from "features/auth/hooks";
import { authenticateWithBiometrics } from "features/local-auth/authenticateWithBiometrics";
import { useCheckBiometricsAvailable } from "features/local-auth/hooks/use-check-biometrics";
import {
  openAppSettings,
  requestPermissions,
} from "features/profile/profile-settings/helpers";
import { useCheckSmsPermissionsOnAppStateChange } from "features/profile/profile-settings/hooks";
import { Pressable } from "react-native";
import { ListItem, View } from "tamagui";
import { Icon } from "ui/assets/icons/adaptive";
import { CustomSwitch } from "ui/controls/inputs";
import { LabelText } from "ui/display/typography";

export default function SettingsScreen() {
  const authData = useAuthStore((store) => store.authData);
  const setToken = useAuthStore((store) => store.setToken);
  const resetUser = useUserStore((store) => store.resetUser);
  const isBiometricsEnabled = useSettigsStore((store) => store.isBiometricsEnabled);
  const setIsBiometricsEnabled = useSettigsStore((store) => store.setIsBiometricsEnabled);
  const isSmsPermissionGranted = useSettigsStore((store) => store.isSmsPermissionGranted);
  const setIsSmsPermissionGranted = useSettigsStore(
    (store) => store.setIsSmsPermissionGranted
  );
  const toast = useToastController();
  const { logout } = useLogout();

  /**
   * These two hooks below are defined at the end after the screen.
   * They are specific use cases for this screen and hence don't need
   * to be moved to separate files to reuse.
   * */

  const { isBiometricsAvailable } = useCheckBiometricsAvailable();
  useCheckSmsPermissionsOnAppStateChange();

  const handleBiometrics = async () => {
    const result = await authenticateWithBiometrics();
    if (result?.success) {
      setIsBiometricsEnabled(!isBiometricsEnabled);
    } else {
      setIsBiometricsEnabled(isBiometricsEnabled);
    }
  };

  const handleSMSPermission = async () => {
    if (
      isSmsPermissionGranted === "GRANTED" ||
      isSmsPermissionGranted === "NEVER_ASK_AGAIN"
    ) {
      openAppSettings();
    } else {
      const result = await requestPermissions();
      if (result) {
        setIsSmsPermissionGranted(result);
      }
    }
  };

  return (
    <View f={1}>
      <View mt="$6" gap="$5">
        <View gap="$3">
          <LabelText fow="$emphasized" ml="$5">
            Privacy & Security
          </LabelText>

          <View>
            {isBiometricsAvailable && (
              <ListItem
                p="$5"
                fontSize="$medium"
                fontFamily="$title"
                icon={<Icon name="biometrics" />}
                iconAfter={
                  <CustomSwitch
                    checked={isBiometricsEnabled}
                    onCheckedChange={handleBiometrics}
                  />
                }
              >
                Biometrics
              </ListItem>
            )}

            <ListItem
              p="$5"
              fontSize="$medium"
              fontFamily="$body"
              fontWeight="$emphasized"
              icon={() => <Icon name="bell" />}
              iconAfter={
                <CustomSwitch
                  checked={isSmsPermissionGranted === "GRANTED"}
                  onCheckedChange={handleSMSPermission}
                />
              }
            >
              SMS Permission
            </ListItem>

            <Pressable
              android_ripple={{
                borderless: false,
                foreground: true,
                color: "rgba(0,0,0,0.2)",
              }}
              onPress={logout}
            >
              <ListItem
                p="$5"
                fontSize="$medium"
                fontFamily="$title"
                icon={<Icon name="logout" />}
              >
                Logout
              </ListItem>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
