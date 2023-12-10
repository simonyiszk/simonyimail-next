import clsx from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';
import { TbAlertTriangle } from 'react-icons/tb';

type WarningDisplayProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  (
    | {
        text: string;
      }
    | {
        children: ReactNode;
      }
  );

export function WarningDisplay({ className, ...props }: WarningDisplayProps) {
  return (
    <div className={clsx('flex gap-3', className)} {...props}>
      <span className='text-orange-500 text-xl'>
        <TbAlertTriangle />
      </span>
      {'text' in props && <p>{props.text}</p>}
      {'children' in props && props.children}
    </div>
  );
}
