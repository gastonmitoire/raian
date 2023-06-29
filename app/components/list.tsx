import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ListProps {
  items: string[];
  height?: number;
  className?: string;
  clickHandler?: (item: string) => void;
  deleteHandler?: (item: string) => void;
}

export function List({
  items,
  height,
  className,
  clickHandler,
  deleteHandler,
}: ListProps) {
  return (
    <AnimatePresence>
      <motion.ul
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`flex flex-col gap-2 overflow-auto custom-scrollbar ${className}`}
        style={{ height }}
      >
        {items.map((item) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex items-center justify-between`}
          >
            <span
              className={`text-xl text-neutral-500 p-3 bg-neutral-700 bg-opacity-10 ${
                clickHandler &&
                "cursor-pointer select-none border border-transparent hover:border-primary hover:bg-opacity-20"
              }`}
              onClick={() => clickHandler && clickHandler(item)}
            >
              {item}
            </span>
            {deleteHandler && (
              <button
                className="text-neutral-500 hover:text-red-600"
                onClick={() => deleteHandler(item)}
              >
                Eliminar
              </button>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </AnimatePresence>
  );
}
