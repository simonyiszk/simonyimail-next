import clsx from 'clsx';
import { HTMLAttributes } from 'react';

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx('bg-white shadow-md rounded-md p-4 flex flex-col gap-5', className)} {...props} />;
}
