'use client';

import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { TbChevronDown, TbLogout, TbUserCircle } from 'react-icons/tb';

import { Button } from '@/components/common/button';
import { Dropdown } from '@/components/common/dropdown/dropdown';
import { DropdownButtonItem } from '@/components/common/dropdown/dropdown-item';

export function UserDisplay() {
  const { data, update } = useSession();
  useEffect(() => {
    update();
  }, []);
  if (!data?.user) return <Button onClick={() => signIn('google')}>Bejelentkezés</Button>;
  return (
    <Dropdown
      button={
        <div className='flex items-center gap-3'>
          <p className='hidden lg:block'>{data.user.name}</p>
          {data.user.image ? (
            <Image
              width={100}
              height={100}
              src={data.user.image}
              alt=''
              referrerPolicy='no-referrer'
              className='rounded-full h-10 w-10 shadow-md'
            />
          ) : (
            <TbUserCircle size={40} />
          )}
          <TbChevronDown />
        </div>
      }
    >
      <DropdownButtonItem icon={TbLogout} onClick={() => signOut()}>
        Kijelentkezés
      </DropdownButtonItem>
    </Dropdown>
  );
}
