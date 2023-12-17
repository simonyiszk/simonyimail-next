import { Select } from '@/components/common/select';

interface EmailFieldSelectorProps {
  headers: string[];
  onSelectedEmailField: (emailField: string) => void;
}

export function EmailFieldSelector({ headers, onSelectedEmailField }: EmailFieldSelectorProps) {
  const options = headers.map((header) => ({ value: header, label: header }));
  const defaultOption = options.find((option) => option.value.match(/.*e-?mail.*/i));
  return (
    <>
      <h3>E-mail címet tartalmazó mező</h3>
      <Select defaultValue={defaultOption} options={options} onChange={onSelectedEmailField} />
    </>
  );
}
