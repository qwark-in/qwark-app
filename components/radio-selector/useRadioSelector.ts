import { useState } from 'react';

type ExtractTitles<T extends readonly { value: string }[]> = T[number]['value'];

export function useRadioSelector<const RadioItems extends readonly { value: string }[]>(
  initialTitle: ExtractTitles<RadioItems>
) {
  const [value, setValue] = useState<ExtractTitles<RadioItems>>(initialTitle);

  const onValueChange = (title: ExtractTitles<RadioItems>) => {
    setValue(title);
  };

  return {
    value,
    onValueChange,
  };
}
