import { motion } from "framer-motion";

interface PaginationArrowsProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  className?: string;
}

export function PaginationArrows({
  currentPage,
  totalPages,
  onNext,
  onPrev,
  className,
}: PaginationArrowsProps) {
  return (
    <div className={`flex justify-between ${className}`}>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.3 }}
        className={`rounded-full mx-1 p-5 ${
          currentPage === 0 ? "invisible" : "visible"
        }`}
        onClick={onPrev}
        disabled={currentPage === 0}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </motion.button>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.3 }}
        className={`rounded-full mx-1 p-5 ${
          currentPage === totalPages - 1 ? "invisible" : "v"
        }`}
        onClick={onNext}
        disabled={currentPage === totalPages - 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </motion.button>
    </div>
  );
}
