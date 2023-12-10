import { Combobox } from '@headlessui/react';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { TbCaretUpDown, TbCheck } from 'react-icons/tb';

type ComboboxOption = { value: string; label: string };

interface SelectProps {
  options: ComboboxOption[];
  onChange: (value: string) => void;
}

export function Select({ options, onChange }: SelectProps) {
  const [selected, setSelected] = useState(options[0]);
  const [query, setQuery] = useState('');

  const filteredOptions =
    query === '' ? options : options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()));

  const handleChange = (option: ComboboxOption) => {
    setSelected(option);
    onChange(option.value);
  };

  useEffect(() => {
    setSelected(options[0]);
    onChange(options[0].value);
  }, []);
  return (
    <Combobox value={selected} onChange={handleChange}>
      <div className='relative'>
        <Combobox.Button className='flex items-center w-full'>
          <Combobox.Input
            className='flex-1 border-none outline-none bg-transparent focus:outline-none'
            displayValue={(option: { label: string; value: string }) => option.label}
            onChange={(event) => setQuery(event.target.value)}
          />
          <TbCaretUpDown className='h-5 w-5 text-slate-500' />
        </Combobox.Button>
        <Combobox.Options className='absolute top-full right-0 rounded-md border-2 border-gray-100 bg-gray-100 overflow-hidden gap-y-0.5 flex flex-col w-full'>
          {filteredOptions.length === 0 && query !== '' ? (
            <div className='cursor-default select-none px-4 py-2 text-gray-700 bg-white'>Nincs találat.</div>
          ) : (
            filteredOptions.map((option) => (
              <Combobox.Option
                key={option.value}
                className={({ selected, active }) =>
                  clsx(`flex items-center gap-2 px-4 py-2 cursor-pointer`, {
                    'bg-green-500 text-white': selected && !active,
                    'bg-green-600 text-white': active && selected,
                    'bg-white': !selected && !active,
                    'bg-gray-100': !selected && active,
                  })
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <div className='h-5 w-5'>
                      {selected && <TbCheck className='h-full w-full' aria-hidden='true' />}
                    </div>
                    <span className={`block truncate`}>{option.label}</span>
                  </>
                )}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}
