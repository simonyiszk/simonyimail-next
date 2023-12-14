import Image from 'next/image';
import Link from 'next/link';

import { UserDisplay } from '@/components/flow/sender-preview/user-display';

export function Navbar() {
  return (
    <nav className='flex justify-between h-20 px-5 z-10 items-center shadow-sm sticky top-0 bg-white'>
      <div className='flex items-center gap-3'>
        <Image src='/img/icon.png' alt='Simonyimail' width={100} height={100} className='h-10 w-10' />
        <h1 className='hidden md:block'>Simonyimail</h1>
      </div>
      <div className='flex gap-3'>
        <Link className='link' href='/'>
          Főoldal
        </Link>
        <Link className='link' href='/templates'>
          Sablonok
        </Link>
      </div>
      <UserDisplay />
    </nav>
  );
}
