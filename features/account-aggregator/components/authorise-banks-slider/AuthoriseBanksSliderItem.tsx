import { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { View, XStack } from "tamagui";
import { useToastController } from "@tamagui/toast";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { extractOtpFromMessage } from "../../helpers/extractOtpFromMessage";
import { useUserStore } from "data/stores/user-store";
import { useAAStore } from "data/stores/aa-store";
import { useLinkAccounts, useLinkAccountsVerify } from "data/api";
import { useSmsListener } from "hooks/use-sms-listener";
import { useOTP } from "ui/controls/otp/use-otp";
import { BodyText, TitleText } from "ui/display/typography";
import { OTPInput } from "ui/controls/otp/OTPInput";
import { DiscoveryAccountsInfo } from "data/api/aa/types";

type AuthoriseBanksSliderItemProps = {
  fip_id: string;
  fip_name: string;
  mobileNumber: string;
  accounts: DiscoveryAccountsInfo[];
  handleAuthorise: (fip_id: string) => void;
};

export const AuthoriseBanksSliderItem: React.FC<AuthoriseBanksSliderItemProps> = ({
  fip_id,
  fip_name,
  accounts,
  mobileNumber,
  handleAuthorise,
}) => {
  const { width } = useWindowDimensions();
  const toast = useToastController();
  const phone = useUserStore((store) => store.phone);
  const fipRefNumbers = useAAStore((store) => store.fipRefNumbers);
  const setRefNumber = useAAStore((store) => store.setRefNumber);
  const discoveredAccounts = useAAStore((store) => store.discoveredAccounts);
  const selectedAccounts = useAAStore((store) => store.selectedAccounts);
  const fips = useAAStore((store) => store.fips);
  const consentHandles = useAAStore((store) => store.consent_handles);
  const sessionId = useAAStore((store) => store.session_id);
  const addAccountLinkRefs = useAAStore((store) => store.addAccountLinkRefs);
  const { linkAccountsVerify } = useLinkAccountsVerify();
  const { linkAccounts } = useLinkAccounts();
  const { lastMessage } = useSmsListener();
  const { dismissAll } = useBottomSheetModal();

  const consentHandle = consentHandles.find(
    (handle) =>
      handle.asset_class_id === fips.find((fip) => fip.fip_id === fip_id)?.asset_class_id
  )?.consent_handle!;

  const onSuccess = () => handleAuthorise(fip_id);

  const verifyFn = async (code: string) => {
    const fipRefNumber = fipRefNumbers.find((item) => item.fip_id === fip_id);
    const accounts = discoveredAccounts.find((acc) => acc.fip_id === fip_id)?.accounts;
    const fip_name = selectedAccounts.find((item) => item.fip_id === fip_id)?.fip_name;

    if (!fipRefNumber) {
      throw Error("FIP Consent Session NOT FOUND!");
    }
    if (!accounts) {
      throw Error("Accounts NOT FOUND!");
    }
    if (!fip_name) {
      throw Error("FIP Name NOT FOUND!");
    }
    try {
      const linkAccountsVerifyResponse = await linkAccountsVerify({
        fip_id,
        consent_handle: consentHandle!,
        session_id: sessionId!,
        account_ref_number: fipRefNumber.ref_number,
        mobile_number: phone,
        otp: code,
      });
      console.log("Link Accounts Verify Response: ", linkAccountsVerifyResponse);
      addAccountLinkRefs(linkAccountsVerifyResponse.data.accounts);
    } catch (err) {
      toast.show("Something went wrong.");
      console.log("Link and Accept  Error: ", err);
      throw err; // Re-throw the error to be handled by the OTP component
    }
  };

  const otp = useOTP({
    onSuccess: onSuccess,
    verifyFn: verifyFn,
  });

  const linkAccount = async () => {
    console.log({
      fip_id,
      consent_handle: consentHandle,
      session_id: sessionId,
      accounts: accounts.map(({ account_link_ref, ...rest }) => ({ ...rest })), // remove account_link_ref
      mobile_number: phone,
    });
    try {
      const linkAccountResponse = await linkAccounts({
        fip_id,
        consent_handle: consentHandle!,
        session_id: sessionId!,
        accounts: accounts.map(({ account_link_ref, ...rest }) => ({ ...rest })),
        mobile_number: phone,
      });
      console.log("Link Account Response", linkAccountResponse);
      setRefNumber(fip_id, linkAccountResponse.data.ref_number);
    } catch (error) {
      console.log(error);

      toast.show("Something went wrong", {
        duration: 3000,
        message: "Please try again.",
      });

      setTimeout(() => {
        dismissAll();
      }, 1000);
    }
  };

  useEffect(() => {
    if (!lastMessage) return;

    const code = extractOtpFromMessage(lastMessage, fip_name);

    if (code) {
      console.log(`OTP for ${fip_name} is ${code}`);
      otp.handleCode(code);
    }
  }, [lastMessage]);

  useEffect(() => {
    linkAccount();
  }, []);

  return (
    <View width={width - 20 * 2}>
      <View mt="$6">
        <XStack gap="$2">
          <FontAwesome name="bank" size={16} color="black" />
          <TitleText fow="$emphasized">{fip_name}</TitleText>
        </XStack>
        <BodyText mt="$2" color="#6F6F6F">
          The OTP will be sent to{" "}
          <BodyText fow="$emphasized" color="#262626">
            +91-{mobileNumber}
          </BodyText>
        </BodyText>
      </View>

      <View mt="$6">
        <OTPInput variant="bottom-sheet" {...otp} onResend={linkAccount} />
      </View>
    </View>
  );
};
