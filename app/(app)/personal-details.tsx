import { useEffect, useState } from "react";
import { ActivityIndicator, BackHandler } from "react-native";
import { Separator, View, XStack, YStack } from "tamagui";
import { useForm } from "react-hook-form";
import { useRouter } from "expo-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSafeAreaPadding } from "hooks/use-safearea-padding";
import { useAuthStore } from "data/stores/auth-store";
import { useGlobalStore } from "data/stores/global-store";
import { useLogout } from "features/auth/hooks";
import { useUserStore } from "data/stores/user-store";
import { FilledButton, IconButton } from "ui/controls/buttons";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { ScrollView } from "react-native-gesture-handler";
import { Checkbox, FormTextInput, MobileNumberInput } from "ui/controls/inputs";
import { BodyText, TitleText } from "ui/display/typography";
import { Icon } from "ui/assets/icons/adaptive";
import { createUser } from "data/api";
import { useToastController } from "@tamagui/toast";
import { getKYCStatus } from "data/api/kyc/kyc-service";
import { KYCBottomSheet } from "features/kyc/KYCBottomSheet";
import useCustomBottomSheetModal from "hooks/use-custom-bottom-sheet-modal";

const PAN_REGEX = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;

const schema = z.object({
  firstname: z.string().trim().min(1, "First Name is required"),
  lastname: z.string().trim().min(1, "Last Name is required"),
  mobileNumber: z
    .string()
    .trim()
    .min(10, "Enter a valid mobile number")
    .regex(/^\d{10}$/, "Enter a valid mobile number"),
  pan: z
    .string()
    .min(1, "PAN number is required")
    .regex(PAN_REGEX, "Please enter a valid PAN")
    .max(10, "Please enter a valid PAN"),
});

type SchemaType = z.infer<typeof schema>;

const PersonalDetailsScreen = () => {
  const [checked, setChecked] = useState<boolean>(true);
  const { safeAreaPadding } = useSafeAreaPadding();
  const router = useRouter();
  const toast = useToastController();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const authData = useAuthStore((store) => store.authData)!;
  const { bottomSheetModalRef, presentBottomSheetModal } = useCustomBottomSheetModal();
  const setIsOnboardingCompleted = useGlobalStore(
    (store) => store.setIsOnboardingCompleted
  );
  const { logout } = useLogout();
  const setUser = useUserStore((store) => store.setState);
  const defaultValues: SchemaType = {
    firstname: "",
    lastname: "",
    mobileNumber: "",
    pan: "",
  };

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<SchemaType>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const handleConfirm = async (data: SchemaType) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // TODO: Call KYC API before creating user

      const kycResponse = await getKYCStatus(data.pan);

      if (!kycResponse.verified) {
        presentBottomSheetModal();
        return;
      }

      const response = await createUser(
        {
          user_id: authData.uuid,
          dob: "1996-09-09T08:30:00Z",
          email: "placeholder@abc.com",
          gender: "SomeGender",
          marital_status: "PreferNotToSay",
          pan: data.pan,
          joining_time: new Date().toISOString(),
          name: {
            first: data.firstname,
            last: data.lastname,
            middle: "",
          },
          phone: data.mobileNumber,
        },
        authData
      );

      setUser(response.data);
      setIsOnboardingCompleted(true);
      router.replace("/account-aggregator/select-banks");
    } catch (error) {
      toast.show(error.message, {
        type: "error",
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      logout();
      return true; // Prevent default behavior (exit app)
    });

    return () => subscription.remove();
  }, []);

  return (
    <View f={1} {...safeAreaPadding}>
      <View f={1} jc="space-between">
        <View f={1}>
          <View ai="flex-start" px="$2" py="$2">
            <View p="$2">
              <IconButton name="arrow-left" onPress={logout} />
            </View>
          </View>
          <View gap="$1" pb="$3" px="$5">
            <TitleText size="$large" fow="$emphasized">
              Enter your personal details
            </TitleText>
            <BodyText color="$text/secondary">
              Enter the mobile number linked to your bank account.
            </BodyText>
          </View>
          <Separator mt="$3" mb="$5" boc="$stroke/disabled" />
          <KeyboardAwareScrollView ScrollViewComponent={ScrollView}>
            <YStack gap="$10" p="$5">
              <FormTextInput
                label="First Name"
                name="firstname"
                placeholder="Enter your first name"
                // @ts-ignore
                control={control}
                testID="first-name-input"
              />
              <FormTextInput
                label="Last Name"
                name="lastname"
                placeholder="Enter your last name"
                //@ts-ignore
                control={control}
                testID="last-name-input"
              />
              <MobileNumberInput
                //@ts-ignore
                control={control}
                showDeleteButton
                name="mobileNumber"
              />
              <FormTextInput
                label="PAN Number"
                name="pan"
                maxLength={10}
                autoCapitalize="characters"
                //@ts-ignore
                control={control}
                placeholder="eg. ABCDE1234F"
              />
            </YStack>
          </KeyboardAwareScrollView>
        </View>

        <View p="$5" boxShadow="0 -2px 16px 0 rgba(22, 22, 22, 0.12)">
          <XStack onPress={() => setChecked(!checked)} gap="$2_5" alignItems="center">
            <Checkbox checked={checked} />
            <BodyText size="$small" color="$text/secondary" fs={1}>
              I authorize Qwark to fetch my financial data from RBI regulated Account
              Aggregator ecosystem and manage my KYC details.
            </BodyText>
          </XStack>
          <FilledButton
            mt="$5"
            disabled={!isDirty || !checked || isSubmitting}
            onPress={handleSubmit(handleConfirm)}
            iconAfter={isSubmitting ? <ActivityIndicator color="#6F6F6F" /> : null}
          >
            Confirm
          </FilledButton>
          <XStack gap="$1" jc="center" ai="center" mt="$3">
            <Icon name="shield" size="sm" color="$icon/primary" />
            <BodyText size="$xsmall" ta="center" color="$text/secondary">
              Your PAN details are 100% safe & secure with us{" "}
            </BodyText>
          </XStack>
        </View>
      </View>
      <KYCBottomSheet bottomSheetModalRef={bottomSheetModalRef} />
    </View>
  );
};

export default PersonalDetailsScreen;
