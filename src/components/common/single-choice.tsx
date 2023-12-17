import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { IconType } from 'react-icons';

type SingleChoiceOption<T> = {
  label: string;
  value: T;
  icon?: IconType;
  color?: string;
};

interface SingleChoiceProps<T extends string> {
  options: SingleChoiceOption<T>[];
  onOptionSelected: (value: T) => void;
}

export function SingleChoice<T extends string>({ options, onOptionSelected }: SingleChoiceProps<T>) {
  const [selected, setSelected] = useState<T>(options[0].value);
  useEffect(() => {
    onOptionSelected(selected);
  }, [selected]);
  return (
    <div className='flex bg-gray-50 shadow-md border-2 border-gray-50 rounded-full justify-evenly gap-1'>
      {options.map(({ icon: Icon, color, label, value }) => (
        <button
          key={value}
          className={clsx('flex flex-1 items-center justify-center px-4 py-2 rounded-full border-none', {
            'bg-white shadow-sm': selected === value,
          })}
          style={{ color: selected === value ? color : undefined }}
          onClick={() => setSelected(value)}
        >
          {Icon && <Icon size={20} />}
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
