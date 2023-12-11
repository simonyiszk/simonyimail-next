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
  if ('href' in props) {
    return (
      <Link
        className={clsx(
          'button',
          {
            primary: variant === 'primary',
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
        {
          primary: variant === 'primary',
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
