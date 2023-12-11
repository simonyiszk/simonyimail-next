'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { Button } from '@/components/common/button';

export function UserDisplay() {
  const { data, update } = useSession();
  useEffect(() => {
    update();
  }, []);
  if (!data?.user) return <Button onClick={() => signIn('google')}>Bejelentkezés</Button>;
  return (
    <div className='flex items-center gap-5'>
      <Button onClick={() => signOut()}>Kijelentkezés</Button>
      <p>{data.user.name}</p>
      {data.user.image && (
        <img src={data.user.image} alt='' referrerPolicy='no-referrer' className='rounded-full h-10 w-10 shadow-md' />
      )}
    </div>
  );
}
