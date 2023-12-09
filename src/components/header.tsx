import { UserDisplay } from '@/components/user-display';

export function Header() {
  return (
    <div className='flex justify-between px-10 py-5 items-center shadow-sm sticky top-0 bg-white'>
      <h1>Simonyimail</h1>
      <UserDisplay />
    </div>
  );
}
