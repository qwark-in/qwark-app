import type { ComponentType } from "react";
import { FipId } from "./types";
import * as BankIcons from "ui/assets/bank-logos";

type LogoProps = { size?: number };

export const BANK_LOGO_MAP: Partial<Record<FipId, ComponentType<LogoProps>>> = {
  "ICICI-FIP": BankIcons.IciciBankLogo,
  "AUBank-FIP": BankIcons.AuSmallFinanceBankLtdLogo,
  "IDFCFirstBank-FIP": BankIcons.IdfcBankLogo,
  "KotakMahindraBank-FIP": BankIcons.KotakMahindraLogo,
  "idbibank-fip": BankIcons.IdbiBankLogo,
  "UCOB-FIP": BankIcons.UcoBankLogo,
  CUBFIP: BankIcons.CityUnionBankLogo,
  "KBL-FIP": BankIcons.KarnatakaBankLogo,
  "IOB-FIP": BankIcons.IndianOverseasBankLogo,
  "fiplive@canarabank": BankIcons.CanaraBankLogo,
  IBFIP: BankIcons.IndianBankLogo,
  BARBFIP: BankIcons.BobBankLogo,
  PSFIP: BankIcons.PunjabAndSindBankLogo,
  "YESB-FIP": BankIcons.YesBankLogo,
  "HDFC-FIP": BankIcons.HdfcBankLogo,
  CENTRALFIP: BankIcons.CentralBankOfIndiaLogo,
  "sbi-fip": BankIcons.SbiBankLogo,
  AXIS001: BankIcons.AxisBankLogo,
  BOM_FIP: BankIcons.BankOfMaharashtraLogo,
  FDRLFIPPROD: BankIcons.FederalBankLogo,
  "PNB-FIP": BankIcons.PunjabNationalBankLogo,
  "KarurVysyaBank-FIP": BankIcons.KarurVysyaBankLogo,
  "BOI-FIP": BankIcons.BankOfIndiaLogo,
  "fiplive@indusind": BankIcons.IndusIndBankLogo,
  "UBI-FIP": BankIcons.UnionBankLogo,
};
