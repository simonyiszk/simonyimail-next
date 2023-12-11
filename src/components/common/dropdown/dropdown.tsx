import { Menu } from '@headlessui/react';

import { Button } from '@/components/common/button';

interface DropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
}

export function Dropdown({ button, children }: DropdownProps) {
  return (
    <div className='relative'>
      <Menu>
        <Menu.Button as={Button} className='px-2'>
          {button}
        </Menu.Button>
        <Menu.Items>
          <div className='absolute shadow-md mt-1 top-full right-0 rounded-md border-2 border-gray-100 bg-gray-100 overflow-hidden gap-y-0.5 flex flex-col'>
            {children}
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}
