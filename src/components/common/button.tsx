import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import { ButtonHTMLAttributes } from 'react';

import { Loading } from '@/components/common/loading';

type ButtonProps = (
  | LinkProps
  | ({
      isLoading?: boolean;
    } & ButtonHTMLAttributes<HTMLButtonElement>)
) & {
  variant?: 'primary' | 'secondary';
  className?: string;
};

export function Button({ variant, className, ...props }: ButtonProps) {
  const baseClassName =
    'text-gray-700 py-2 px-4 rounded-md border-2 border-gray-100 hover:bg-gray-100 flex justify-center gap-1 items-center disabled:cursor-not-allowed disabled:opacity-50';
  const primaryClassName = 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700 border-green-100';

  if ('href' in props) {
    return (
      <Link
        className={clsx(
          baseClassName,
          {
            [primaryClassName]: variant === 'primary',
          },
          className
        )}
        {...props}
      />
    );
  }
  return (
    <button
      className={clsx(
        baseClassName,
        {
          [primaryClassName]: variant === 'primary',
        },
        className
      )}
      disabled={props.isLoading || props.disabled}
      {...props}
    >
      {props.isLoading && (
        <Loading
          className={clsx({
            'text-white': variant === 'primary',
          })}
        />
      )}
      {props.children}
    </button>
  );
}
