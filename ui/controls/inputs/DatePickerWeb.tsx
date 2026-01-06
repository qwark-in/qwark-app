type Props = {
  value: Date;
  onChange: (date: Date) => void;
  minimumDate: Date;
  maximumDate: Date;
};

export const DatePickerWeb = ({
  value,
  maximumDate,
  minimumDate,
  onChange,
}: Props) => {
  return (
    <input
      type="date"
      min={minimumDate.toISOString().split("T")[0]}
      max={maximumDate.toISOString().split("T")[0]}
      value={value.toISOString().split("T")[0]}
      onChange={(e) => onChange(new Date(e.target.value))}
      style={{
        height: 40,
        padding: "0 12px",
        borderRadius: 4,
        border: "1px solid #ccc",
        fontSize: 16,
      }}
    />
  );
};
