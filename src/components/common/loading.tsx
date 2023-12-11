import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import { TbLoader } from 'react-icons/tb';

export function Loading({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={clsx('animate-spin text-gray-500 text-xl w-fit h-fit', className)} {...props}>
      <TbLoader />
    </span>
  );
}
