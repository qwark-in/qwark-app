import {
  ListItemFrame,
  ListItemText,
  ListItemTitle,
  styled,
  useListItem,
  ListItemProps,
} from "tamagui";

const CustomListItemFrame = styled(ListItemFrame, {
  py: "$1",
  bbw: 1,
  bbc: "#262626",
  bg: "#FAFAFC",
});

const CustomListItemTitle = styled(ListItemTitle, {
  ff: "$title",
  fos: "$medium",
  color: "$text/primary",
});

const CustomListItemSubtitle = styled(ListItemText, {
  ff: "$body",
  fos: "$medium",
  fow: "$emphasized",
  color: "$text/primary",
  mt: "$2",
});

export const ProfileDetailsListItem = CustomListItemFrame.styleable<ListItemProps>(
  (propsIn, ref) => {
    const { props } = useListItem(propsIn, {
      Title: CustomListItemTitle,
      Subtitle: CustomListItemSubtitle,
    });

    return <CustomListItemFrame {...props} ref={ref} />;
  }
);
