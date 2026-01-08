import { FlatList, useWindowDimensions } from "react-native";
import { View } from "tamagui";
import { AuthoriseBanksSliderHeader } from "./AuthoriseBanksSliderHeader";
import { AuthoriseBanksSliderItem } from "./AuthoriseBanksSliderItem";
import { useUserStore } from "data/stores/user-store";
import { useSlider } from "ui/display/slider/useSlider";
import { TitleText } from "ui/display/typography";
import { SliderPaginationWithSuccess } from "ui/display/slider/SliderPaginationWithSuccess";
import { DiscoveryAccountsInfo } from "data/api/aa/types";

type AuthoriseBanksSliderProps = {
  accountsToLink: {
    fip_id: string;
    fip_name: string;
    accounts: DiscoveryAccountsInfo[];
    isAuthorised: boolean;
  }[];
  handleAuthorise: (fip_id: string) => void;
};

type RenderItemProps = {
  item: AuthoriseBanksSliderProps["accountsToLink"][number];
};

export const AuthoriseBanksSlider: React.FC<AuthoriseBanksSliderProps> = ({
  accountsToLink,
  handleAuthorise,
}) => {
  const { phone } = useUserStore();
  const {
    currentIndex,
    scrollX,
    slidesRef,
    viewConfig,
    scrollToNext,
    scrollToPrevious,
    handleOnScroll,
    viewableItemsChanged,
  } = useSlider({
    numberOfPages: accountsToLink.length,
  });

  const renderItem = ({ item }: RenderItemProps) => (
    <AuthoriseBanksSliderItem
      fip_id={item.fip_id}
      fip_name={item.fip_name}
      accounts={item.accounts}
      mobileNumber={phone}
      handleAuthorise={handleAuthorise}
    />
  );

  console.log(accountsToLink);
  return (
    <View pb="$10" pt="$5">
      {accountsToLink.length > 1 && (
        <AuthoriseBanksSliderHeader
          accountsToLink={accountsToLink}
          {...{ currentIndex, scrollToNext, scrollToPrevious }}
        />
      )}

      <View px="$5">
        <TitleText mt="$5" size="$large" fow="$emphasized">
          Securely authorize your account
        </TitleText>

        <FlatList
          ref={slidesRef}
          data={accountsToLink}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          disableIntervalMomentum
          snapToAlignment="center"
          snapToInterval={useWindowDimensions().width - 20 * 2}
          decelerationRate={"fast"}
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          onScroll={handleOnScroll}
        />

        <SliderPaginationWithSuccess
          mt="$6"
          ai="center"
          accountsToLink={accountsToLink}
          scrollX={scrollX}
        />
      </View>
    </View>
  );
};
