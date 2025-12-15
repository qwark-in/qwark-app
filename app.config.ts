import { ConfigContext, ExpoConfig } from "expo/config";

type DynamicConfig = {
  name: string;
  iOSBundleIdentifier?: string;
  androidPackageName?: string;
  scheme?: string;
  icon?: string;
  adaptiveIcon?: string;
  googleServiceFile?: string;
};

const EAS_PROJECT_ID = "45be6eeb-3cdd-48e9-8275-c1e05271b107";
const PROJECT_SLUG = "qwark";
const EAS_OWNER = "qwark-in";

/*
 * App's production config
 *
 * This will be modified dynamically according to what you are
 * building the app for (either development / preview / production)
 */
const APP_NAME = "Qwark";
// const BUNDLE_ID = "com.qwark.app"      // For iOS / AppStore
const PACKAGE_NAME = "com.qwark.app";
const ICON = "./assets/images/icon";
const ADAPTIVE_ICON = "./assets/images/adaptive-icon";
const SCHEME = "qwark";

module.exports = ({ config }: ConfigContext): ExpoConfig => {
  console.log("⦿ Building app for environment: ", process.env.APP_VARIANT);
  // console.debug('config =', config);

  const { name, androidPackageName, icon, adaptiveIcon, scheme } =
    getDynamicAppConfig(
      (process.env.APP_VARIANT as
        | "development"
        | "preview"
        | "production"
        | "storybook") || "development"
    );

  return {
    ...config,
    name: name,
    slug: PROJECT_SLUG,
    icon: icon,
    scheme: scheme,
    android: {
      ...config.android,
      permissions: [
        ...(config.android?.permissions ?? []),
        "READ_SMS",
        "RECEIVE_SMS",
      ],
      package: androidPackageName,
      intentFilters: [
        {
          action: "VIEW",
          autoVerify: true,
          data: [
            {
              scheme: "http",
              host: "qwark.eu.auth0.com",
              pathPrefix: "",
            },
          ],
          category: ["BROWSABLE", "DEFAULT"],
        },
        {
          action: "VIEW",
          autoVerify: true,
          data: [
            {
              scheme: scheme,
              host: "qwark.eu.auth0.com",
            },
          ],
          category: ["BROWSABLE", "DEFAULT"],
        },
      ],
      adaptiveIcon: {
        ...config.android?.adaptiveIcon,
        foregroundImage: adaptiveIcon,
      },
      googleServicesFile: "./google-services.json",
    },
    plugins: [
      "expo-router",
      "expo-font", // Asked by expo install while updated to SDK 53
      "expo-secure-store", // Asked by expo install while updated to SDK 53
      "expo-web-browser", // Asked by expo install while updated to SDK 53
      "expo-audio",
      "@react-native-firebase/app",
      [
        "@react-native-community/datetimepicker", // Line - 56,137 Refer -> https://github.com/react-native-datetimepicker/datetimepicker/issues/975
      ],
      [
        "expo-splash-screen",
        {
          backgroundColor: "#ffffff",
          image: icon,
          // resizeMode: 'contain',
          dark: {
            image: icon,
            backgroundColor: "#000000",
          },
          imageWidth: 200,
        },
      ],
      [
        "expo-build-properties",
        {
          android: {
            usesCleartextTraffic: process.env.APP_VARIANT === "preview",
            newArchEnabled: true,
          },
        },
      ],
    ],
    extra: {
      ...config.extra,
      eas: {
        projectId: EAS_PROJECT_ID,
      },
      appVariant: process.env.APP_VARIANT,
    },
    owner: EAS_OWNER,
  };
};

const getDynamicAppConfig = (
  environment: "development" | "preview" | "production" | "storybook"
): DynamicConfig => {
  if (environment === "production") {
    return {
      name: APP_NAME,
      androidPackageName: PACKAGE_NAME,
      icon: `${ICON}.png`,
      adaptiveIcon: `${ADAPTIVE_ICON}.png`,
      scheme: SCHEME,
    };
  }

  if (environment === "preview") {
    return {
      name: `${APP_NAME} (Prev)`,
      androidPackageName: `${PACKAGE_NAME}.prev`,
      icon: `${ICON}__prev.png`,
      adaptiveIcon: `${ADAPTIVE_ICON}__prev.png`,
      scheme: `${SCHEME}-prev`,
    };
  }

  if (environment === "storybook") {
    return {
      name: `${APP_NAME} (Storybook)`,
      androidPackageName: `${PACKAGE_NAME}.storybook`,
      icon: `${ICON}__storybook.png`,
      adaptiveIcon: `${ADAPTIVE_ICON}__storybook.png`,
      scheme: `${SCHEME}-storybook`,
    };
  }

  // if (environment === 'development')
  // also, by default
  return {
    name: `${APP_NAME} (Dev)`,
    androidPackageName: `${PACKAGE_NAME}.dev`,
    icon: `${ICON}__dev.png`,
    adaptiveIcon: `${ADAPTIVE_ICON}__dev.png`,
    scheme: `${SCHEME}-dev`,
  };
};
