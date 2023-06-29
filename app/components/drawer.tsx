import React, { useState } from "react";
import { motion } from "framer-motion";

interface DrawerProps {
  children: React.ReactNode;
  button?: React.ReactNode;
  buttonClassName?: string;
}

export const Drawer = ({ children, button, buttonClassName }: DrawerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("overflow-y-hidden");
  };

  return (
    <>
      {button ? (
        React.cloneElement(button as React.ReactElement, {
          onClick: toggleDrawer,
        })
      ) : (
        <button
          type="button"
          onClick={toggleDrawer}
          className={`p-1 rounded-xl border dark:border-neutral-700 ${buttonClassName} ${
            isOpen && "absolute top-2.5 z-50 dark:border-neutral-900"
          }`}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 dark:text-neutral-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      )}
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.2 }}
          className="fixed py-20 px-10 z-40 top-0 right-0 w-full h-screen bg-white dark:bg-neutral-900"
        >
          {children}
        </motion.div>
      ) : null}
    </>
  );
};
