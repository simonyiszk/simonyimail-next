import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { Card } from '@/components/common/card';

interface SenderNameInputProps {
  onChange: (senderName: string) => void;
}

export function SenderNameInput({ onChange }: SenderNameInputProps) {
  const { data: session } = useSession();
  const [value, setValue] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (session?.user?.name && session?.user?.email && !isInitialized) {
      const defaultValue = `${session.user.name} <${session.user.email}>`;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(defaultValue);
      onChange(defaultValue);
      setIsInitialized(true);
    }
  }, [session, isInitialized]);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <Card>
      <h2>Feladó neve és e-mail címe</h2>
      <input
        type='text'
        className='w-full'
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder='Név <email@example.com>'
        required
      />
    </Card>
  );
}
