'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export function UserDisplay() {
  const { data } = useSession();
  if (!data?.user) return <Link href={`/api/auth/signin`}>Bejelentkezés</Link>;
  return (
    <div className='flex items-center gap-5'>
      <Link href={`/api/auth/signout`}>Kijelentkezés</Link>
      <p>{data.user.name}</p>
      {data.user.image && (
        <img src={data.user.image} alt='' referrerPolicy='no-referrer' className='rounded-full h-10 w-10 shadow-md' />
      )}
    </div>
  );
}
