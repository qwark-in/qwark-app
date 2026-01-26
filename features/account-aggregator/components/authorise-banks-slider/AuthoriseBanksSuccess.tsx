import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { View } from "tamagui";
import { useRouter } from "expo-router";
import { useToastController } from "@tamagui/toast";
import { useUserStore } from "data/stores/user-store";
import { useAAStore } from "data/stores/aa-store";
import { useAcceptConsent } from "data/api";
import { useFinancialProfileStore } from "data/stores/financial-profile-store";
import { BodyText, TitleText } from "ui/display/typography";
import { FilledButton } from "ui/controls/buttons";
import { CheckGreen } from "ui/assets/icons/fixed-color";
import { updateFinProfile } from "data/api/user/updateFinProfile";
import { useAuthStore } from "data/stores/auth-store";

type AuthoriseBanksSuccessProps = {
  numberOfAccounts: number;
};

export const AuthoriseBanksSuccess: React.FC<AuthoriseBanksSuccessProps> = ({
  numberOfAccounts,
}) => {
  const router = useRouter();
  const toast = useToastController();

  const phone = useUserStore((s) => s.phone);
  const authData = useAuthStore((s) => s.authData)!;

  const {
    consent_handles,
    session_id,
    discoveredAccounts,
    selectedAccounts,
    accountLinkRefs,
    resetStore,
  } = useAAStore();

  const { acceptConsent } = useAcceptConsent();
  const addConsent = useFinancialProfileStore((s) => s.addConsent);
  const consents = useFinancialProfileStore((s) => s.consents);

  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Step 1: Accept all consents
   */
  const acceptAllConsents = async (): Promise<string[]> => {
    const relevantHandles = consent_handles.filter((handle) =>
      selectedAccounts.some((acc) => acc.asset_class_id === handle.asset_class_id),
    );

    const responses = await Promise.all(
      relevantHandles.map(async (consentHandle) => {
        const fipDetailsList = selectedAccounts
          .filter((acc) => acc.asset_class_id === consentHandle.asset_class_id)
          .map((account) => {
            const fip = discoveredAccounts.find((item) =>
              item.accounts.some(
                (acc) => acc.account_ref_number === account.account_ref_number,
              ),
            );

            const fipAccount = fip?.accounts.find(
              (acc) => acc.account_ref_number === account.account_ref_number,
            );

            const linkRef =
              fipAccount?.account_link_ref ??
              accountLinkRefs.find(
                (acc) => acc.fip_account_ref_number === account.account_ref_number,
              )?.fip_account_link_ref!;

            return {
              fip_id: fip?.fip_id || "",
              fip_name: fip?.fip_name || "",
              fip_type: fipAccount?.fip_type || "",
              fip_account_type: fipAccount?.account_type || "",
              fip_account_number: fipAccount?.account_number || "",
              fip_account_link_ref: linkRef,
              fip_account_ref_number: account.account_ref_number,
            };
          });

        const response = await acceptConsent({
          consent_handle: consentHandle.consent_handle,
          session_id: session_id!,
          mobile_number: phone,
          fip_details_list: fipDetailsList,
        });

        const consentId = response.data.consent_id;
        addConsent({ consent_id: consentId });

        return consentId;
      }),
    );

    return responses;
  };

  /**
   * Step 2: Update financial profile
   */
  const updateFinancialProfile = async (consents: string[]) => {
    const updateFinProfileResponse = await updateFinProfile(
      { consents: consents.map((consent) => ({ consent_id: consent })) },
      authData,
    );
    console.log("✅ Financial Profile updated:", updateFinProfileResponse.data);
  };

  /**
   * Final pipeline
   */
  const handleContinue = async () => {
    setIsSubmitting(true);

    try {
      const acceptAllConsentsResponse = await acceptAllConsents();
      console.log("✅ All consents accepted:", acceptAllConsentsResponse);
      await updateFinancialProfile(acceptAllConsentsResponse);

      resetStore();
      router.replace("/(app)/account-aggregator/success");
    } catch (error) {
      console.error(error);
      toast.show("Something went wrong", {
        message: "Please try again later",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View px="$5" pt="$6">
      <View ai="center" mt="$4" mb="$16">
        <CheckGreen size={80} />
        <TitleText size="$large" fow="$emphasized" mt="$8">
          Congratulations!
        </TitleText>
        <BodyText mt="$3" ta="center" size="$large" fow="$emphasized" color="#525252">
          You have successfully authorized {selectedAccounts.length}{" "}
          {`account${numberOfAccounts > 1 ? "s" : ""}`}
        </BodyText>
      </View>

      <FilledButton
        mb="$3"
        iconAfter={isSubmitting ? <ActivityIndicator /> : null}
        disabled={isSubmitting}
        onPress={handleContinue}
      >
        Continue
      </FilledButton>
    </View>
  );
};
