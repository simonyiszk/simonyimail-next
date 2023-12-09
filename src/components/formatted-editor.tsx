import CodeEditor from '@uiw/react-textarea-code-editor';
import prettify from 'html-prettify';
import { useEffect, useState } from 'react';

interface CodeEditorProps {
  onChange: (e: string) => void;
}

export function FormattedEditor({ onChange }: CodeEditorProps) {
  const [codeValue, setCodeValue] = useState('');

  const format = () => {
    const html = prettify(codeValue);
    if (html !== codeValue) {
      setCodeValue(html);
    }
  };

  useEffect(() => {
    onChange(codeValue);
  }, [codeValue, onChange]);

  return (
    <div className='relative h-full overflow-hidden bg-slate-900'>
      <div className='h-full overflow-auto'>
        <CodeEditor
          value={codeValue}
          language='html'
          placeholder='MJML kód ide'
          onChange={(e) => setCodeValue(e.target.value)}
          padding={15}
          data-color-mode='dark'
          style={{
            background: '#0f172a',
            fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />
      </div>
      <button className='absolute top-5 right-5 bg-white' onClick={format}>
        Format
      </button>
    </div>
  );
}
