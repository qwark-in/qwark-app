import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { CustomHeader } from "./CustomHeader";

export const screenOptions: NativeStackNavigationOptions = {
  statusBarStyle: "dark",
  statusBarBackgroundColor: "#fff",
  header: (props) => <CustomHeader {...props} />,
};
