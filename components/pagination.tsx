// components/HorizontalPagination.tsx
import React from 'react';

interface HorizontalPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const HorizontalPagination: React.FC<HorizontalPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    // Determine the number of pages to show before and after the current page
    const showPagesBeforeAndAfter = 2;
    const visiblePages = 2 * showPagesBeforeAndAfter + 1;

    return (
        <div className="flex items-center pt-10">
            {currentPage > 1 && (
                <a
                    onClick={() => onPageChange(currentPage - 1)}
                    href="#"
                    className="mr-2 text-white"
                >
                    &lt; Previous
                </a>
            )}
            {pageNumbers.map((pageNumber) => {
                if (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - showPagesBeforeAndAfter &&
                        pageNumber <= currentPage + showPagesBeforeAndAfter)
                ) {
                    return (
                        <a
                            key={pageNumber}
                            onClick={() => onPageChange(pageNumber)}
                            href="#"
                            className={`mx-1 ${pageNumber === currentPage ? 'text-blue-500' : 'text-white'}`}
                        >
                            {pageNumber}
                        </a>
                    );
                } else if (pageNumber === currentPage + showPagesBeforeAndAfter + 1) {
                    // Display ellipsis
                    return <span key="ellipsis" className="text-white">...</span>;
                }
                return null;
            })}
            {currentPage < totalPages && (
                <a
                    onClick={() => onPageChange(currentPage + 1)}
                    href="#"
                    className="ml-2 text-white"
                >
                    Next &gt;
                </a>
            )}
        </div>
    );
};

export default HorizontalPagination;