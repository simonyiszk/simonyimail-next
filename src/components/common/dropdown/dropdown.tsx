import { Menu } from '@headlessui/react';

interface DropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
}

export function Dropdown({ button, children }: DropdownProps) {
  return (
    <div className='relative'>
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button as='div' className='cursor-pointer'>
              {button}
            </Menu.Button>
            <Menu.Items
              className='absolute shadow-md mt-1 top-full right-0 rounded-md border-2 border-gray-100 bg-gray-100 overflow-hidden gap-y-0.5 flex flex-col z-10 outline-none'
              static={open}
            >
              {children}
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  );
}
