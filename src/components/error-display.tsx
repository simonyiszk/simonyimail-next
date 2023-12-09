import clsx from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';
import { TbCircleX } from 'react-icons/tb';

type ErrorDisplayProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  (
    | {
        text: string;
      }
    | {
        children: ReactNode;
      }
  );

export function ErrorDisplay({ className, ...props }: ErrorDisplayProps) {
  return (
    <div className={clsx('flex gap-3 items-center', className)} {...props}>
      <span className='text-red-500 text-xl'>
        <TbCircleX />
      </span>
      {'text' in props && <p className='truncate'>{props.text}</p>}
      {'children' in props && props.children}
    </div>
  );
}
