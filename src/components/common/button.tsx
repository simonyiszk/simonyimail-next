import clsx from 'clsx';
import Link, { LinkProps } from 'next/link';
import { ButtonHTMLAttributes, forwardRef } from 'react';

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

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, className, ...props }: ButtonProps, ref) => {
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
    const { isLoading, ...restProps } = props;
    return (
      <button
        className={clsx(
          {
            primary: variant === 'primary',
          },
          className
        )}
        disabled={props.isLoading || props.disabled}
        ref={ref}
        {...restProps}
      >
        {isLoading && (
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
);
