import { useRef } from 'react';

import { Card } from '@/components/common/card';
import { TargetWithEmail } from '@/types/target.type';

interface EmailSelectorProps {
  onTargetsSelected: (targets: TargetWithEmail[]) => void;
}

export function EmailSelector({ onTargetsSelected }: EmailSelectorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onSubmit = () => {
    const email = inputRef.current?.value;
    if (email) {
      onTargetsSelected([{ email }]);
    }
  };
  return (
    <Card>
      <h2>Közvetlen e-mail cím megadása</h2>
      <div className='flex gap-3 max-w-full overflow-hidden flex-wrap'>
        <input name='email' type='email' className='flex-1' ref={inputRef} />
        <button className='primary' onClick={onSubmit}>
          Hozzáadás
        </button>
      </div>
    </Card>
  );
}
