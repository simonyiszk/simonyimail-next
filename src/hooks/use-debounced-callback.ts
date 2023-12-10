import { useEffect } from 'react';

export function useDebouncedCallback<T>(value: T, delay: number, callback: (arg: T) => void): void {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
}
