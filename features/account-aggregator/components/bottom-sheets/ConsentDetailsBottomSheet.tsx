import React, { useEffect, useState } from "react";
import { SizableText, View, XStack, YStack } from "tamagui";
import { useGetConsentDetails } from "data/api";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useBottomSheetBackHandler } from "hooks/use-bottom-sheet-backhandler";
import { GetConsentDetailsResponse } from "data/api/aa/types";
import { useAAStore } from "data/stores/aa-store";
import { useUserStore } from "data/stores/user-store";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { getConsentTypeString } from "../../helpers/getConsentTypeString";
import { getPeriodString } from "../../helpers/getPeriodString";
import { BodyText, TitleText } from "ui/display/typography";

type ConsentDetailsType = GetConsentDetailsResponse["data"]["lst"];

export const ConsentDetailsBottomSheet = React.forwardRef<BottomSheetModal>(
  (props, ref: any) => {
    const { handleSheetPositionChange } = useBottomSheetBackHandler(ref);
    const phone = useUserStore((store) => store.phone);
    const consentHandles = useAAStore((store) => store.consent_handles);
    const sessionId = useAAStore((store) => store.session_id);
    const { getConsentDetails } = useGetConsentDetails();
    const [consentDetails, setConsentDetails] = useState<ConsentDetailsType>([]);

    useEffect(() => {
      (async function () {
        try {
          const response = await getConsentDetails({
            consent_handle: consentHandles[0].consent_handle!,
            session_id: sessionId!,
            mobile_number: phone,
          });
          setConsentDetails(response.data.lst);
        } catch (error) {
          console.log(error);
        }
      })();
    }, []);

    return (
      <BottomSheetModal
        ref={ref}
        onChange={handleSheetPositionChange}
        handleIndicatorStyle={{ backgroundColor: "#C6C6C6" }}
        enableDynamicSizing={true}
        enableContentPanningGesture={false}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            opacity={0.5}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
      >
        <BottomSheetView>
          <BottomSheetContent consentDetails={consentDetails} />
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

type BottomSheetContentType = {
  consentDetails: ConsentDetailsType;
};

const BottomSheetContent = ({ consentDetails }: BottomSheetContentType) => {
  const details = consentDetails[0];

  if (!details) {
    console.error("No Consent Details Found");
  }

  const consentTypeString = getConsentTypeString(details?.CONSENTTYPES);

  const accountInfoPeriod = getPeriodString(
    details?.FIDATAFROMDATE,
    details?.FIDATATODATE
  );

  const dataSharedFromString = getPeriodString(
    details?.CONSENTSTARTDATETIME,
    details?.CONSENTEXPIRYDATETIME
  );

  return (
    <View p="$5">
      <View gap="$_5">
        <TitleText size="$large" fow="$emphasized">
          Details shared with Qwark
        </TitleText>
        <BodyText color="#525252">
          RBI's CAMSfinserv enables Qwark to safely receive end-to-end encrypted data!
        </BodyText>
      </View>
      <View my="$5">
        <YStack gap="$5">
          <XStack gap="$2">
            <FontAwesome name="bank" size={24} color="black" />
          </XStack>

          <YStack gap="$2">
            <YStack gap="$1">
              <TitleText als="flex-start" color="#6F6F6F" bbw={2} bbc="#BE95FF">
                Purpose
              </TitleText>
            </YStack>
            <BodyText fow="$emphasized">{details?.PURPOSEDESC}</BodyText>
          </YStack>

          <YStack gap="$2">
            <YStack gap="$1">
              <TitleText als="flex-start" color="#6F6F6F" bbw={2} bbc="#BE95FF">
                Account information
              </TitleText>
            </YStack>
            <YStack gap="$1">
              <SizableText>
                <TitleText color="$text/secondary">Info: </TitleText>
                <BodyText fow="$emphasized">{consentTypeString}</BodyText>
              </SizableText>
              <SizableText>
                <TitleText color="$text/secondary">Period: </TitleText>
                <BodyText fow="$emphasized">{accountInfoPeriod}</BodyText>
              </SizableText>
              <SizableText>
                <TitleText color="$text/secondary">Frequency: </TitleText>
                <BodyText fow="$emphasized">Upto 4 times a day</BodyText>
              </SizableText>
            </YStack>
          </YStack>

          <YStack gap="$2">
            <YStack gap="$1">
              <TitleText als="flex-start" color="#6F6F6F" bbw={2} bbc="#BE95FF">
                Data is shared from
              </TitleText>
            </YStack>
            <BodyText fow="$emphasized">{dataSharedFromString}</BodyText>
          </YStack>
        </YStack>
      </View>
    </View>
  );
};
