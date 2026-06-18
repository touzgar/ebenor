'use client';

import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center items-center gap-2 mt-12"
    >
      {/* Previous Button - Shadcn Style */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="group relative h-10 w-10 inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-900 shadow-sm transition-all hover:bg-neutral-50 hover:border-amber-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white disabled:hover:border-neutral-200"
        aria-label="Page précédente"
      >
        <ChevronLeftIcon className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
        
        {/* Hover effect */}
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 opacity-0 transition-opacity group-hover:opacity-10" />
      </motion.button>

      {/* Page Numbers - Shadcn Style */}
      <div className="flex gap-2">
        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span 
                key={`ellipsis-${index}`} 
                className="h-10 px-2 inline-flex items-center justify-center text-neutral-400 font-medium"
              >
                •••
              </span>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <motion.button
              key={pageNumber}
              layout
              whileHover={{ scale: isActive ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(pageNumber)}
              className={`relative h-10 min-w-[40px] px-4 inline-flex items-center justify-center rounded-xl font-semibold text-sm transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30 border-2 border-amber-400'
                  : 'bg-white text-neutral-700 border border-neutral-200 shadow-sm hover:bg-neutral-50 hover:border-amber-300 hover:shadow-md hover:text-amber-600'
              }`}
              aria-label={`Page ${pageNumber}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Active page glow effect */}
              {isActive && (
                <motion.span
                  layoutId="activePageGlow"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 opacity-20 blur-sm"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <span className="relative z-10">{pageNumber}</span>
              
              {/* Shimmer effect on active */}
              {isActive && (
                <motion.span
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: 'linear'
                  }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Next Button - Shadcn Style */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="group relative h-10 w-10 inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-900 shadow-sm transition-all hover:bg-neutral-50 hover:border-amber-300 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white disabled:hover:border-neutral-200"
        aria-label="Page suivante"
      >
        <ChevronRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
        
        {/* Hover effect */}
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/0 opacity-0 transition-opacity group-hover:opacity-10" />
      </motion.button>

      {/* Page Info Badge */}
      <div className="ml-4 px-4 py-2 rounded-xl bg-neutral-50 border border-neutral-200">
        <span className="text-sm font-medium text-neutral-600">
          Page <span className="text-amber-600 font-bold">{currentPage}</span> sur <span className="font-bold">{totalPages}</span>
        </span>
      </div>
    </motion.div>
  );
}
