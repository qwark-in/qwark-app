/**
 * @name BaseButton
 *
 * @description
 * Base skeleton of the Button from which variants shall be derived.
 */
import { Button, styled } from "tamagui";

export const BaseButton = styled(
  Button,
  {
    unstyled: true,
    cursor: "pointer",
    fontSize: "$medium",
    fontWeight: "$emphasized",
    fontFamily: "$body",
    color: "$buttonText/secondary",
    px: "$6",
    py: "$4",
    fd: "row",
    ai: "center",
    jc: "center",
    bw: 1,
    br: 9999,
    scaleSpace: 0.5,
    variants: {
      disabled: {
        true: {
          userSelect: "none",
          pointerEvents: "none",
          color: "#CAC5C4",
          bg: "#E7E7E7",
          boc: "#E7E7E7",
        },
      },
    },
  },
  {
    acceptsClassName: true,
  }
);
