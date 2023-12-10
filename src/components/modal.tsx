import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { TbX } from 'react-icons/tb';

interface ModalProps {
  button: (onOpen: () => void) => React.ReactNode;
  children: React.ReactNode;
}

export function Modal({ button, children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      {button(openModal)}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex h-screen items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-h-full flex-1 max-w-4xl transform overflow-hidden flex flex-col rounded-2xl bg-white p-6 text-left align-middle shadow-xl'>
                  <div className='flex-1 overflow-auto'>{children}</div>
                  <div className='mt-5 flex justify-end'>
                    <button onClick={closeModal}>
                      <TbX /> Bezár
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
