// components/HorizontalPagination.tsx
import React from 'react';
import {cn} from "@/lib/utils";

interface HorizontalPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    textColor: string;
}

const HorizontalPagination: React.FC<HorizontalPaginationProps> = ({ currentPage, totalPages, onPageChange, textColor }) => {
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
                    className={cn("mr-2", textColor)}
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
                            className={`mx-1 ${pageNumber === currentPage ? 'text-blue-500' : textColor}`}
                        >
                            {pageNumber}
                        </a>
                    );
                } else if (pageNumber === currentPage + showPagesBeforeAndAfter + 1) {
                    // Display ellipsis
                    return <span key="ellipsis" className={textColor}>...</span>;
                }
                return null;
            })}
            {currentPage < totalPages && (
                <a
                    onClick={() => onPageChange(currentPage + 1)}
                    href="#"
                    className={cn("ml-2", textColor)}
                >
                    Next &gt;
                </a>
            )}
        </div>
    );
};

export default HorizontalPagination;