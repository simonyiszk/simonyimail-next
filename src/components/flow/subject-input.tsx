import { Card } from '@/components/common/card';

interface SubjectInputProps {
  onChange: (subject: string) => void;
}

export function SubjectInput({ onChange }: SubjectInputProps) {
  return (
    <Card>
      <h2>E-mail tárgy</h2>
      <input type='text' className='w-full' onChange={(e) => onChange(e.target.value)} />
    </Card>
  );
}
