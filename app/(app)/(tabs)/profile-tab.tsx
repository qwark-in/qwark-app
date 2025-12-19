import { Pressable } from "react-native";
import { Route, useRouter } from "expo-router";
import { Avatar, View, XStack, YStack } from "tamagui";
import { Name } from "data/models/user";
import { useUserStore } from "data/stores/user-store";
import { computeUserFullName } from "helpers/computeUserFullName";
import { Icon } from "ui/assets/icons/adaptive";
import { IconName } from "ui/assets/icons/adaptive/registry";
import { QwarkLogoWithTextSm } from "ui/assets/logos";
import { BodyText, TitleText } from "ui/display/typography";
import { useSafeAreaPadding } from "hooks/use-safearea-padding";

export default function Profile() {
  const name = useUserStore((state) => state.name);
  const router = useRouter();
  const { safeAreaPadding } = useSafeAreaPadding();

  return (
    <View flex={1} {...safeAreaPadding} bg="#FAFAFC">
      <YStack gap="$4" mt="$8" alignItems="center">
        <ProfileAvatar name={name} />
        <View gap="$_5">
          <TitleText size="$large" fow="$emphasized" color="$text/accent">
            {computeUserFullName(name)}
          </TitleText>
        </View>
      </YStack>

      <View mt="$2" bg="#FFF">
        {userProfileOptions.map((option, i, arr) => {
          return (
            <Pressable
              key={option.id}
              android_ripple={{
                borderless: false,
                foreground: true,
                color: "rgba(0,0,0,0.2)",
              }}
              style={{
                paddingHorizontal: 28,
              }}
              onPress={() => {
                if (option.navigateTo) {
                  router.navigate({
                    pathname: option.navigateTo as any,
                  });
                }
              }}
            >
              <XStack
                py="$6"
                ai="center"
                bbw={1}
                bbc={i === arr.length - 1 ? "#FFF" : "#E7E7E7"}
                gap="$4"
              >
                <Icon name={option.icon} />
                <TitleText mt="$1" fg={1}>
                  {option.title}
                </TitleText>
                <Icon name="chevron-right" />
              </XStack>
            </Pressable>
          );
        })}
      </View>

      <View p="$6" pt={0} gap="$5" f={1} jc="flex-end">
        <View alignItems="center" gap="$6">
          <QwarkLogoWithTextSm />
        </View>
        <XStack justifyContent="space-between">
          <BodyText size="$xsmall" fow="$emphasized">{`T&C  |  Privay Policy`}</BodyText>
          <BodyText size="$xsmall" fow="$emphasized">
            App version 0.1.0
          </BodyText>
        </XStack>
      </View>
    </View>
  );
}

type UserProfileOptionsType = {
  id: number;
  title: string;
  icon: IconName;
  navigateTo: Route;
}[];

export const userProfileOptions: UserProfileOptionsType = [
  {
    id: 1,
    title: "Profile Details",
    icon: "profile",
    navigateTo: "/profile/profile-details",
  },

  {
    id: 2,
    title: "Connected Accounts",
    icon: "connected-accounts",
    navigateTo: "/profile/connected-accounts/banks",
  },
  {
    id: 3,
    title: "Settings",
    icon: "settings",
    navigateTo: "/profile/settings",
  },
];

const ProfileAvatar = ({ name }: { name: Name }) => {
  const initials = name.first[0];

  return (
    <Avatar circular size="$24">
      <Avatar.Fallback ai="center" jc="center" bg="$qwark/primary">
        <TitleText size="$medium" ff="$display" color="$qwark/white">
          {initials}
        </TitleText>
      </Avatar.Fallback>
    </Avatar>
  );
};
