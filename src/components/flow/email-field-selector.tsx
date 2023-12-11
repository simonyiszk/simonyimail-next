import { Card } from '@/components/common/card';
import { Select } from '@/components/common/select';

interface EmailFieldSelectorProps {
  headers: string[];
  onSelectedEmailField: (emailField: string) => void;
}

export function EmailFieldSelector({ headers, onSelectedEmailField }: EmailFieldSelectorProps) {
  const options = headers.map((header) => ({ value: header, label: header }));
  const defaultOption = options.find((option) => option.value.match(/.*e-?mail.*/i));
  return (
    <Card>
      <h2>E-mail címet tartalmazó mező</h2>
      <Select defaultValue={defaultOption} options={options} onChange={onSelectedEmailField} />
    </Card>
  );
}
