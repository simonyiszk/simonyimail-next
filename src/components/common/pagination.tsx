import { useState } from 'react';
import { TbChevronLeft, TbChevronRight } from 'react-icons/tb';

import { Button } from '@/components/common/button';

interface PaginationProps {
  startPage?: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ startPage, onPageChange, totalPages }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(startPage ?? 0);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) handlePageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) handlePageChange(currentPage + 1);
  };
  return (
    <div className='flex items-center justify-between gap-3 w-full'>
      <Button onClick={handlePreviousPage}>
        <TbChevronLeft />
      </Button>
      <div className='flex items-center gap-3'>
        <span>{currentPage + 1}</span>
        <span>/</span>
        <span>{totalPages}</span>
      </div>
      <Button onClick={handleNextPage}>
        <TbChevronRight />
      </Button>
    </div>
  );
}
