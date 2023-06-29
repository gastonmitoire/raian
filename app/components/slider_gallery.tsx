import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

import { PaginationArrows } from "./pagination_arrows";
import { PaginationDots } from "./pagination_dots";

interface SliderGalleryProps<T extends string | undefined> {
  items: T[][];
  imageWidth: number | string;
  imageHeight: number | string;
  imageStyles?: React.CSSProperties;
  hidePagination?: boolean;
  hideArrows?: boolean;
}

export function SliderGallery<T extends string | undefined>({
  items,
  imageWidth,
  imageHeight,
  imageStyles,
  hidePagination,
  hideArrows,
}: SliderGalleryProps<T>) {
  const [currentPage, setCurrentPage] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: sliderRef.current.offsetWidth * page,
        behavior: "smooth",
      });
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage === items.length - 1 ? 0 : prevPage + 1
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) =>
      prevPage === 0 ? items.length - 1 : prevPage - 1
    );
  };

  return (
    <div className="relative">
      <div ref={sliderRef} className="flex overflow-x-auto w-full">
        {items.map((page, pageIndex) => (
          <div key={pageIndex} className="flex gap-3 w-full">
            {page.map((item, index) => (
              <span
                key={index}
                className="p-0.5 rounded-sm border border-transparent contrast-100 cursor-pointer hover:border-primary hover:transition-colors hover:contrast-125 duration-300"
              >
                <img
                  src={item}
                  className="block object-contain"
                  style={{
                    width: imageWidth,
                    height: imageHeight,
                    ...imageStyles,
                  }}
                />
              </span>
            ))}
          </div>
        ))}
      </div>

      {!hideArrows && (
        <PaginationArrows
          currentPage={currentPage}
          totalPages={items.length}
          onNext={handleNextPage}
          onPrev={handlePrevPage}
          className="absolute top-1/2 -translate-y-1/2 left-0 right-0"
        />
      )}

      {!hidePagination && (
        <PaginationDots
          currentPage={currentPage}
          totalPages={items.length}
          onClick={handlePageChange}
          className="absolute bottom-4 left-0 right-0"
        />
      )}
    </div>
  );
}
