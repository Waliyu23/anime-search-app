import React from 'react';
import { FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handleChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showPages = 5;
    
    if (totalPages <= showPages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= showPages; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - showPages + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-12 mb-8">
      {/* First Page */}
      <button
        onClick={() => handleChange(1)}
        disabled={currentPage === 1}
        className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-white hover:bg-purple-600 hover:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        <FiChevronsLeft />
      </button>

      {/* Previous Page */}
      <button
        onClick={() => handleChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-white hover:bg-purple-600 hover:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        <FiChevronLeft />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && handleChange(page)}
          disabled={page === '...'}
          className={`min-w-[44px] px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
            page === currentPage
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
              : page === '...'
              ? 'bg-transparent text-gray-500 cursor-default'
              : 'bg-slate-800 border border-slate-700 text-white hover:bg-purple-600 hover:border-purple-500'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Page */}
      <button
        onClick={() => handleChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-white hover:bg-purple-600 hover:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        <FiChevronRight />
      </button>

      {/* Last Page */}
      <button
        onClick={() => handleChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-white hover:bg-purple-600 hover:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
      >
        <FiChevronsRight />
      </button>
    </div>
  );
};

export default Pagination;