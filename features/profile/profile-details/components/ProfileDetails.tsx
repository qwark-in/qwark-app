/**
 * @name ProfileDetails
 *
 * @description
 * A component to show profile details of the user
 */

import { FC } from "react";
import { YStack } from "tamagui";
import { ProfileDetailsListItem } from "./ProfileDetailsListItem";
import { UserState } from "data/models/user";

export type ProfileDetailsProps = Omit<
  UserState,
  "name" | "phone" | "joining_time" | "user_id"
> & {
  name: string;
  primaryPhone: string;
};

const profileDetailsListItemsData: {
  key: keyof ProfileDetailsProps;
  subtitle: string;
}[] = [
  { key: "name", subtitle: "Name" },
  { key: "primaryPhone", subtitle: "Phone number" },
  { key: "pan", subtitle: "Pan number" },
  { key: "dob", subtitle: "DOB" },
  { key: "email", subtitle: "Email address" },
  { key: "marital_status", subtitle: "Marital status" },
  { key: "gender", subtitle: "Gender" },
];

export const ProfileDetails: FC<ProfileDetailsProps> = (profileDetails) => {
  return (
    <YStack mt="$10" gap="$10" px="$5">
      {profileDetailsListItemsData.map((item) => (
        <ProfileDetailsListItem
          overflow="visible"
          key={item.key}
          title={item.subtitle}
          subTitle={profileDetails[item.key] ?? `Set ${item.key.replace("_", " ")}`}
        />
      ))}
    </YStack>
  );
};
