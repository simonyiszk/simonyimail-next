import clsx from 'clsx';
import { HTMLAttributes, useState } from 'react';

interface HorizontalSplitPaneProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  leftChild: React.ReactNode;
  rightChild: React.ReactNode;
}

export function HorizontalSplitPane({ rightChild, leftChild, className, ...props }: HorizontalSplitPaneProps) {
  const [leftWidth, setLeftWidth] = useState('calc(50% - 10px)');
  const [rightWidth, setRightWidth] = useState('calc(50% - 10px)');

  const handleDrag = () => {
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
  };

  const handleDragMove = (e: MouseEvent) => {
    const newLeftWidth = `calc(${(e.clientX / window.innerWidth) * 100}% - 10px)`;
    const newRightWidth = `calc(${100 - (e.clientX / window.innerWidth) * 100}% - 10px)`;
    setLeftWidth(newLeftWidth);
    setRightWidth(newRightWidth);
  };

  const handleDragEnd = () => {
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
  };

  return (
    <div className={clsx('flex', className)} {...props}>
      <div style={{ width: leftWidth }}>{leftChild}</div>
      <div
        onMouseDown={handleDrag}
        className='flex items-center justify-center cursor-pointer bg-black w-[20px] h-full'
      >
        <div className='rounded-full bg-white w-1 h-10' />
      </div>
      <div style={{ width: rightWidth }}>{rightChild}</div>
    </div>
  );
}
