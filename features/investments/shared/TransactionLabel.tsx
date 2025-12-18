import React, { PropsWithChildren } from "react";
import { styled, View } from "tamagui";
import { BodyText } from "ui/display/typography";

// Styled View with variants
const StyledTransactionLabel = styled(View, {
  name: "TransactionLabel",
  py: "$1_5",
  px: "$3",
  als: "flex-start",
  bw: 1,
  br: 9999,

  variants: {
    variant: {
      red: {
        boc: "#FFD7D9",
        bg: "#FFF1F1",
      },
      green: {
        boc: "#A7F0BA",
        bg: "#DEFBE6",
      },
    },
  },

  defaultVariants: {
    variant: "green",
  },
});

type TransactionLabelProps = PropsWithChildren<
  React.ComponentProps<typeof StyledTransactionLabel>
>;

export const TransactionLabel: React.FC<TransactionLabelProps> = ({
  children,
  ...props
}) => {
  return (
    <StyledTransactionLabel {...props}>
      <BodyText size="$xsmall">{children}</BodyText>
    </StyledTransactionLabel>
  );
};
