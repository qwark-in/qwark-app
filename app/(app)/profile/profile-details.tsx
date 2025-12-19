import { Avatar, ScrollView, View } from "tamagui";
import { formatDate } from "date-fns";
import { computeUserFullName } from "helpers/computeUserFullName";
import { TitleText } from "ui/display/typography";
import {
  ProfileDetails,
  ProfileDetailsProps,
} from "features/profile/profile-details/components/ProfileDetails";
import { useUserStore } from "data/stores/user-store";
import { UserState } from "data/models/user";

export default function ProfileDetailsScreen() {
  const user: UserState = useUserStore((state) => state);

  const initials = user.name.first[0];

  const profile: Omit<ProfileDetailsProps, "user_id"> = {
    name: computeUserFullName(user.name),
    dob: formatDate(user.dob, "dd/MM/yyyy"),
    pan: user.pan,
    primaryPhone: "+91 - " + user.phone,
    gender: user.gender,
    email: user.email,
    marital_status: user.marital_status,
  };

  return (
    <ScrollView
      f={1}
      contentContainerStyle={{ pb: "$5", bg: "#FAFAFC", pt: "$5" }}
      showsVerticalScrollIndicator={false}
    >
      <View ai="center">
        <Avatar circular size="$24">
          <Avatar.Fallback ai="center" jc="center" bg="$qwark/primary">
            <TitleText size="$medium" ff="$display" color="$qwark/white">
              {initials}
            </TitleText>
          </Avatar.Fallback>
        </Avatar>
      </View>
      <ProfileDetails {...profile} />
    </ScrollView>
  );
}
