import { Menu } from '@headlessui/react';
import Link from 'next/link';
import { HTMLAttributes } from 'react';
import { IconType } from 'react-icons';

type DropdownItemProps = {
  children: React.ReactNode;
  icon?: IconType;
};

export function DropdownLinkItem({ children, icon: Icon, href }: DropdownItemProps & { href: string }) {
  return (
    <Menu.Item>
      <Link href={href} className='flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50'>
        {Icon && <Icon className='w-5 h-5 text-gray-400' />}
        {children}
      </Link>
    </Menu.Item>
  );
}

export function DropdownButtonItem({ children, icon: Icon, onClick }: DropdownItemProps & { onClick: () => void }) {
  return (
    <Menu.Item>
      <button
        onClick={onClick}
        className='flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 border-0 rounded-none'
      >
        {Icon && <Icon className='w-5 h-5 text-gray-400' />}
        {children}
      </button>
    </Menu.Item>
  );
}
