import { useEffect, useState } from 'react';

import { Param } from '@/types/param.type';

interface ParamEditorProps {
  keys: string[];
  onChange: (params: Param[]) => void;
}

export function ParamEditor({ keys, onChange }: ParamEditorProps) {
  const [params, setParams] = useState<Param[]>(keys.map((key) => ({ key, value: '' })));
  const setParam = (key: string, value: string) => {
    const newParams = params.map((param) => {
      if (param.key === key) {
        return { ...param, value };
      }
      return param;
    });
    setParams(newParams);
    onChange(newParams);
  };
  useEffect(() => {
    const existingParams = params.filter((param) => keys.includes(param.key));
    const newParams = keys
      .filter((key) => !params.map((param) => param.key).includes(key))
      .map((key) => ({ key, value: '' }));
    setParams([...existingParams, ...newParams]);
  }, [keys]);
  return (
    <div className='h-full overflow-y-auto p-2'>
      {params.length === 0 && (
        <p className='text-opacity-50'>Adj a kódhoz paramétereket dupla kapcsos zárójelekkel: {'{{parameter}}'}</p>
      )}
      {params.map((param) => (
        <div className='gap-3 columns-2' key={param.key}>
          <label htmlFor={param.key + '-input'}>{param.key}</label>
          <input
            id={param.key + '-input'}
            type='text'
            value={param.value}
            className='w-full'
            onChange={(e) => setParam(param.key, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
