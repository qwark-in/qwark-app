import { SizableText, styled } from "tamagui";

/**
 * @name BodyText
 *
 * @description
 * A base text component styled using Tamagui's `SizableText`, intended for rendering
 * body content across the app. It uses unstyled base settings and applies
 * standard body font from font tokens in tamagui config and primary text color.
 */

export const BodyText = styled(SizableText, {
  unstyled: true,
  color: "$text/primary",
  ff: "$body",
  size: "$medium",
  fow: "$primary",
});
