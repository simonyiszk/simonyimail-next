import { Menu } from '@headlessui/react';
import Link from 'next/link';
import { MouseEventHandler, useState } from 'react';
import { IconType } from 'react-icons';
import { TbExclamationCircle } from 'react-icons/tb';

import { Button } from '@/components/common/button';

type DropdownItemProps = {
  children: React.ReactNode;
  icon?: IconType;
};

export function DropdownLinkItem({ children, icon: Icon, href }: DropdownItemProps & { href: string }) {
  return (
    <Menu.Item>
      <Link href={href} className='flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-800'>
        {Icon && <Icon className='w-5 h-5 text-gray-400' />}
        {children}
      </Link>
    </Menu.Item>
  );
}

interface DropdownButtonItemProps extends DropdownItemProps {
  onClick: () => void;
  confirmNeeded?: boolean;
  isLoading?: boolean;
}

export function DropdownButtonItem({
  children,
  icon: Icon,
  onClick,
  confirmNeeded,
  isLoading,
}: DropdownButtonItemProps) {
  const [isConfirming, setIsConfirming] = useState(false);
  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    if (isConfirming || !confirmNeeded) {
      onClick();
      if (isConfirming) {
        setIsConfirming(false);
      }
    } else {
      setIsConfirming(true);
    }
  };
  return (
    <Menu.Item>
      <Button
        isLoading={isLoading}
        disabled={isLoading}
        onClick={handleClick}
        className='px-4 py-2 bg-white hover:bg-gray-50 border-0 rounded-none justify-start text-gray-800'
      >
        {Icon && !isConfirming && <Icon className='w-5 h-5 text-gray-400' />}
        {isConfirming && <TbExclamationCircle className='text-red-500' />}
        {isConfirming ? 'Biztos?' : children}
      </Button>
    </Menu.Item>
  );
}
