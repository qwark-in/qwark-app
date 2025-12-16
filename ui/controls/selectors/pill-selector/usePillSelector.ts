import { useState } from "react";

type ExtractTitles<T extends readonly { title: string; icon?: string }[]> =
  T[number]["title"];

export function usePillSelector<
  const Pills extends readonly { title: string; icon?: string }[]
>(initialTitle: ExtractTitles<Pills>) {
  const [selected, setSelected] = useState<ExtractTitles<Pills>>(initialTitle);

  const onSelect = (title: ExtractTitles<Pills>) => {
    setSelected(title);
  };

  return {
    selected,
    onSelect,
  };
}
