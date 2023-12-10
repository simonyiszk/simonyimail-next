import clsx from 'clsx';
import { HTMLAttributes, useRef, useState } from 'react';

interface VerticalSplitPaneProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  topChild: React.ReactNode;
  bottomChild: React.ReactNode;
}

export function VerticalSplitPane({ bottomChild, topChild, className, ...props }: VerticalSplitPaneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [topHeight, setTopHeight] = useState('calc(50% - 10px)');
  const [bottomHeight, setBottomHeight] = useState('calc(50% - 10px)');

  const handleDrag = () => {
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
  };

  const handleDragMove = (e: MouseEvent) => {
    const containerHeight = containerRef.current?.clientHeight ?? 1;
    const newTopHeight = `calc(${(e.clientY / containerHeight) * 100}% - 10px)`;
    const newBottomHeight = `calc(${100 - (e.clientY / containerHeight) * 100}% - 10px)`;
    setTopHeight(newTopHeight);
    setBottomHeight(newBottomHeight);
  };

  const handleDragEnd = () => {
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
  };

  return (
    <div ref={containerRef} className={clsx('flex flex-col h-full', className)} {...props}>
      <div style={{ height: topHeight }}>{topChild}</div>
      <div
        onMouseDown={handleDrag}
        className='flex items-center justify-center w-full h-[20px] bg-black cursor-pointer'
      >
        <div className='w-10 h-1 bg-white rounded-full' />
      </div>
      <div style={{ height: bottomHeight }}>{bottomChild}</div>
    </div>
  );
}
