import { PropsWithChildren } from "react";
import { XStack } from "tamagui";
import { ShadowWrapper } from "./ShadowWrapper";
import { BodyText } from "ui/display/typography";
import { CamsfinservLogo } from "ui/assets/logos/glyphs";

type FooterProps = PropsWithChildren;

export const FooterWithShadow: React.FC<FooterProps> = ({ children }) => {
  return (
    <ShadowWrapper size="md" px="$5" py="$4" gap="$3" bg="$background/primary">
      {children}
    </ShadowWrapper>
  );
};

export const CamsFooter: React.FC<FooterProps> = ({ children }) => {
  return (
    <FooterWithShadow>
      {children}
      <XStack gap="$1" als="center" ai="center">
        <BodyText size="$small" color="$text/secondary">
          RBI regulated Account Aggregator
        </BodyText>
        <CamsfinservLogo />
      </XStack>
    </FooterWithShadow>
  );
};
