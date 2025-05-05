"use client"
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages,
  totalItems,
  itemsPerPage = 10,
  onPageChange,
}) => {
  // Safe fallback if values are invalid (0 or undefined)
  const safeCurrentPage = currentPage > 0 ? currentPage : 1;
  const safeItemsPerPage = itemsPerPage > 0 ? itemsPerPage : 10;
  const startIndex = (safeCurrentPage - 1) * safeItemsPerPage;

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, safeCurrentPage - 1);
    const endPage = Math.min(startPage + 2, totalPages);

    if (endPage === totalPages) {
      startPage = Math.max(1, endPage - 2);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(startIndex + safeItemsPerPage, totalItems)}
            </span>{' '}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              onClick={() => onPageChange(safeCurrentPage - 1)}
              disabled={safeCurrentPage === 1}
              className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              Previous
            </button>

            {pageNumbers[0] > 1 && (
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
            )}

            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => onPageChange(number)}
                className={`relative inline-flex items-center px-4 py-2 border ${
                  safeCurrentPage === number
                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                    : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                } text-sm font-medium`}
                aria-label={`Page ${number}`}
                aria-current={safeCurrentPage === number ? 'page' : undefined}
              >
                {number}
              </button>
            ))}

            {pageNumbers[pageNumbers.length - 1] < totalPages && (
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
            )}

            <button
              onClick={() => onPageChange(safeCurrentPage + 1)}
              disabled={safeCurrentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </nav>
  );
};
