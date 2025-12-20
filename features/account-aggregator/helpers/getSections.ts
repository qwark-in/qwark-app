import { FipDataType } from "data/models/account-aggregator";

/**
 * Filters the given list of banks based on the provided text.
 *
 * - If `filterText` is empty, returns the original list.
 * - Otherwise, returns banks where `fip_name` includes the `filterText`, case-insensitively.
 *
 * @param banksData - Array of bank data objects.
 * @param filterText - Text to filter the banks by (matched against `fip_name`).
 * @returns Filtered list of banks.
 */

const getFilteredBanksData = (banksData: FipDataType[], filterText: string) => {
  return filterText.length === 0
    ? banksData
    : banksData.filter((item) =>
        item.fip_name?.toLowerCase().includes(filterText.toLowerCase())
      );
};

/**
 * Splits the filtered list of banks into two sections: "Popular Banks" and "Other Banks".
 *
 * Each section includes only non-empty data arrays. If a section has no banks, it is excluded.
 *
 * @param banks - Array of all bank data objects.
 * @param filterText - Text used to filter banks before sectioning.
 * @returns Array of sections to be displayed in a SectionList.
 *
 */

export const getSections = (banks: FipDataType[], filterText: string) => {
  const data = getFilteredBanksData(banks, filterText);

  const popularBanks = data.filter((bank) => bank.popular_bank);
  const otherBanks = data.filter((bank) => !bank.popular_bank);

  const rawSections = [
    {
      title: "Popular Banks",
      data: popularBanks,
    },
    {
      title: "Other Banks",
      data: otherBanks,
    },
  ];

  const sections = rawSections.filter((section) => section.data.length > 0);
  return sections;
};
