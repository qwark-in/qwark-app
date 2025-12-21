import { SectionList } from "react-native";
import { Separator, View, XStack } from "tamagui";
import { format } from "date-fns";
import { CashflowTransactionType, convertToSectionListFormat } from "../helpers";
import { BodyText, TitleText } from "ui/display/typography";
import { Icon } from "ui/assets/icons/adaptive";
import { CashFlow } from "data/models/dashboard";

export const TransactionList = ({ cashflow }: { cashflow: CashFlow[] }) => {
  const activeTransactionList = cashflow.flatMap((item) => item.transactions);

  const sectionedTransactions = convertToSectionListFormat(activeTransactionList).slice(
    0,
    10
  );

  return (
    <View px="$5">
      <TitleText>Transactions</TitleText>

      <SectionList
        scrollEnabled={false}
        sections={sectionedTransactions}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => <CashflowTransactionsListItem {...item} />}
        renderSectionHeader={({ section: { title } }) => (
          <View mb="$3" mt="$4" pl="$1">
            <TitleText size="$small">{title}</TitleText>
            <Separator mt="$3" borderColor="$stroke/disabled" />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
        renderSectionFooter={() => <View style={{ height: 36 }} />}
      />
    </View>
  );
};

type CashflowTransactionsListItemProps = CashflowTransactionType;

const CashflowTransactionsListItem: React.FC<CashflowTransactionsListItemProps> = ({
  amount,
  date,
  narration,
  type,
}) => {
  const formattedAmount = Intl.NumberFormat("en-IN").format(amount);

  return (
    <View>
      <BodyText fow="$emphasized">{narration}</BodyText>
      <XStack mt="$1_5" ai="center" jc="space-between">
        <TitleText numberOfLines={1} ellipsizeMode="tail">
          {type === "DEBIT" ? "-" : "+"} ₹{formattedAmount}
        </TitleText>
        <XStack gap="$1" ai="center">
          <Icon name="bank-logo-placeholder" />
          <BodyText size="$small">•</BodyText>
          <BodyText size="$small">{format(new Date(date), "h:mmaaa")}</BodyText>
        </XStack>
      </XStack>
    </View>
  );
};
