import React from "react";

interface PaginationDotsProps {
  currentPage: number;
  totalPages: number;
  onClick: (page: number) => void;
  className?: string;
}

export function PaginationDots({
  currentPage,
  totalPages,
  onClick,
  className,
}: PaginationDotsProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={`w-2 h-2 rounded-full mx-1 bg-neutral-100 ${
            index === currentPage ? "contrast-100" : "contrast-50 bg-opacity-50"
          }`}
          onClick={() => onClick(index)}
        />
      ))}
    </div>
  );
}
