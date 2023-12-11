import clsx from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';
import { TbCircleCheck } from 'react-icons/tb';

type SuccessDisplayProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  (
    | {
        text: string;
      }
    | {
        children: ReactNode;
      }
  );

export function SuccessDisplay({ className, ...props }: SuccessDisplayProps) {
  return (
    <div className={clsx('flex gap-3 items-center', className)} {...props}>
      <span className='text-green-500 text-xl'>
        <TbCircleCheck />
      </span>
      {'text' in props && <p className='truncate'>{props.text}</p>}
      {'children' in props && props.children}
    </div>
  );
}
