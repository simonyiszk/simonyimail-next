import { Menu } from '@headlessui/react';

interface DropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
}

export function Dropdown({ button, children }: DropdownProps) {
  return (
    <div className='relative'>
      <Menu>
        <Menu.Button>{button}</Menu.Button>
        <Menu.Items>
          <div className='absolute top-full right-0 rounded-md border-2 border-gray-100 bg-gray-100 overflow-hidden gap-y-0.5 flex flex-col'>
            {children}
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}
