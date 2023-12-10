import Link from 'next/link';

import { UserDisplay } from '@/components/user-display';

export function Navbar() {
  return (
    <nav className='flex justify-between h-20 px-10 z-10 items-center shadow-sm sticky top-0 bg-white'>
      <h1>Simonyimail</h1>
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
