import clsx from 'clsx';
import { HTMLAttributes } from 'react';

export function Chip({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <p className={clsx('bg-slate-200 rounded-full px-2 py-0.5 text-sm w-fit h-fit truncate', className)} {...props} />
  );
}
