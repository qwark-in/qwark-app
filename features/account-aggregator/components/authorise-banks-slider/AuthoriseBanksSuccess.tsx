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

type AuthoriseBanksSuccessProps = {
  numberOfAccounts: number;
};

export const AuthoriseBanksSuccess: React.FC<AuthoriseBanksSuccessProps> = ({
  numberOfAccounts,
}) => {
  const router = useRouter();
  const phone = useUserStore((store) => store.phone);
  const consentHandles = useAAStore((store) => store.consent_handles);
  const sessionId = useAAStore((store) => store.session_id);
  const discoveredAccounts = useAAStore((store) => store.discoveredAccounts);
  const selectedAccounts = useAAStore((store) => store.selectedAccounts);
  const accountLinkRefs = useAAStore((store) => store.accountLinkRefs);
  const { acceptConsent } = useAcceptConsent();
  const resetStore = useAAStore((store) => store.resetStore);
  const addConsent = useFinancialProfileStore((store) => store.addConsent);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const toast = useToastController();

  const handleAcceptAllConsents = async () => {
    setIsSubmitting(true);

    try {
      const responses = await Promise.allSettled(
        consentHandles
          .filter((handle) =>
            selectedAccounts.some((acc) => acc.asset_class_id === handle.asset_class_id)
          )
          .map((consentHandle) => {
            const fip_list = selectedAccounts
              .filter((item) => item.asset_class_id === consentHandle.asset_class_id)
              .map((account) => ({
                fip_account_link_ref:
                  discoveredAccounts
                    .find((item) =>
                      item.accounts.some(
                        (acc) => acc.account_ref_number === account.account_ref_number
                      )
                    )
                    ?.accounts.find(
                      (acc) => acc.account_ref_number === account.account_ref_number
                    )?.account_link_ref! ||
                  accountLinkRefs.find(
                    (acc) => acc.fip_account_ref_number === account.account_ref_number
                  )?.fip_account_link_ref!,
                fip_account_ref_number: account.account_ref_number,
              }));

            return acceptConsent({
              consent_handle: consentHandle.consent_handle,
              session_id: sessionId!,
              mobile_number: phone,
              fip_details_list: fip_list.map((item) => {
                const fip = discoveredAccounts
                  .filter((acc) => acc.asset_class_id === consentHandle.asset_class_id)
                  .find((acc) =>
                    acc.accounts.some(
                      (accInfo) =>
                        accInfo.account_ref_number === item.fip_account_ref_number
                    )
                  );
                const fipAccount = fip?.accounts.find(
                  (accInfo) => accInfo.account_ref_number === item.fip_account_ref_number
                );

                return {
                  fip_id: fip?.fip_id || "",
                  fip_name: fip?.fip_name || "",
                  fip_type: fipAccount?.fip_type || "",
                  fip_account_type: fipAccount?.account_type || "",
                  fip_account_number: fipAccount?.account_number || "",
                  fip_account_link_ref: item.fip_account_link_ref,
                  fip_account_ref_number: item.fip_account_ref_number,
                };
              }),
            });
          })
      );

      let allSuccessful = true;

      responses.forEach((res) => {
        if (res.status === "fulfilled") {
          console.log("Accepted consent:", res.value);

          addConsent({ consent_id: res.value.data.consent_id });
        } else {
          console.log("Failed to accept consent:", res.reason);
          allSuccessful = false;
          toast.show("Something went wrong!", {
            duration: 4000,
            message: "Please try again later",
          });
          router.back();
        }
      });

      if (allSuccessful) {
        router.replace("/(app)/account-aggregator/success");
        resetStore();
      }
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
        onPress={handleAcceptAllConsents}
      >
        Continue
      </FilledButton>
    </View>
  );
};
