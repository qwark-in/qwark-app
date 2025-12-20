import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { View } from "tamagui";
import { router } from "expo-router";
import { useAuthStore } from "data/stores/auth-store";
import { useFinancialProfileStore } from "data/stores/financial-profile-store";
import { useGlobalStore } from "data/stores/global-store";
import { useUserStore } from "data/stores/user-store";
import { getFinProfile, getUser } from "data/api";
import { TitleText } from "ui/display/typography";

export default function ProfileCheck() {
  const authData = useAuthStore((store) => store.authData)!;
  const setState = useUserStore((store) => store.setState);
  const setFinancialProfile = useFinancialProfileStore(
    (store) => store.setFinancialProfile
  );
  const setIsOnboardingCompleted = useGlobalStore(
    (store) => store.setIsOnboardingCompleted
  );
  const setIsAccountAggregatorCompleted = useGlobalStore(
    (store) => store.setIsAccountAggregatorCompleted
  );

  const check = async () => {
    try {
      // 1. Check if user exists
      const user = await getUser(authData);

      if (user.data.name.first === "") {
        throw new Error("User does not exist");
      }

      setState(user.data);
      setIsOnboardingCompleted(true);

      // 2. Try to get financial profile
      let finProfile;
      try {
        finProfile = await getFinProfile(authData);
      } catch (finErr) {
        console.warn("Financial profile fetch failed:", finErr);
        router.replace("/(app)/account-aggregator/select-banks");
        return;
      }

      // 3. We got financial profile → set state
      setFinancialProfile(finProfile.data);
      const hasAccounts = finProfile.data.connectedAccounts.length > 0;
      setIsAccountAggregatorCompleted(hasAccounts);

      // 4. No accounts → go to select banks flow
      if (!hasAccounts) {
        router.replace("/(app)/account-aggregator/select-banks");
        return;
      }

      // 5. All good → dashboard
      router.replace("/dashboard-tab");
    } catch (err) {
      // User does not exist → onboarding
      router.replace("/personal-details");
    }
  };

  useEffect(() => {
    check();
  }, []);

  return (
    <View f={1} jc="center" ai="center">
      <TitleText mb="$4">Loading your profile...</TitleText>
      <ActivityIndicator size="large" />
    </View>
  );
}
