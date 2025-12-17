import { createFont } from "tamagui";

export const fonts = {
  body: createFont({
    family: "Barlow",
    size: {
      xsmall: 12,
      small: 14,
      medium: 16,
      large: 22,
      4: 16,
    },
    lineHeight: {
      xsmall: 16,
      small: 20,
      medium: 20,
      large: 28,
    },
    letterSpacing: {
      xsmall: 0.4,
      small: 0.4,
      medium: 0.25,
      large: 0.5,
    },
    weight: {
      primary: 400,
      emphasized: 500,
    },
    face: {
      "400": { normal: "BarlowRegular" },
      "500": { normal: "BarlowMedium" },
    },
  }),

  label: createFont({
    family: "RobotoSerif",
    size: {
      xsmall: 11,
      small: 11,
      medium: 12,
      large: 14,
      4: 12,
    },
    lineHeight: {
      xsmall: 16,
      small: 16,
      medium: 16,
      large: 20,
    },
    letterSpacing: {
      xsmall: 0.5,
      small: 0.5,
      medium: 0.5,
      large: 0.1,
    },
    weight: {
      primary: 400,
      emphasized: 500,
    },
    face: {
      "400": { normal: "RobotoSerifMedium" },
      "500": { normal: "RobotoSerifSemibold" },
    },
  }),

  title: createFont({
    family: "RobotoSerif",
    size: {
      xsmall: 14,
      small: 14,
      medium: 16,
      large: 22,
      4: 16,
    },
    lineHeight: {
      xsmall: 20,
      small: 20,
      medium: 24,
      large: 28,
    },
    letterSpacing: {
      xsmall: 0.1,
      small: 0.1,
      medium: 0.15,
      large: 0,
    },
    weight: {
      primary: 400,
      emphasized: 500,
    },
    face: {
      "400": { normal: "RobotoSerifMedium" },
      "500": { normal: "RobotoSerifSemibold" },
    },
  }),

  headline: createFont({
    family: "RobotoSerif",
    size: {
      xsmall: 24,
      small: 24,
      medium: 28,
      large: 32,
      4: 28,
    },
    lineHeight: {
      xsmall: 32,
      small: 32,
      medium: 36,
      large: 40,
    },
    letterSpacing: {
      xsmall: 0,
      small: 0,
      medium: 0,
      large: 0,
    },
    weight: {
      primary: 400,
      emphasized: 500,
    },
    face: {
      "400": { normal: "RobotoSerifRegular" },
      "500": { normal: "RobotoSerifMedium" },
    },
  }),

  display: createFont({
    family: "RobotoSerif",
    size: {
      xsmall: 36,
      small: 36,
      medium: 45,
      large: 57,
      4: 45,
    },
    lineHeight: {
      xsmall: 44,
      small: 44,
      medium: 52,
      large: 64,
    },
    letterSpacing: {
      xsmall: 0,
      small: 0,
      medium: 0,
      large: -0.25,
    },
    weight: {
      primary: 400,
      emphasized: 500,
    },
    face: {
      "400": { normal: "RobotoSerifRegular" },
      "500": { normal: "RobotoSerifMedium" },
    },
  }),
};
