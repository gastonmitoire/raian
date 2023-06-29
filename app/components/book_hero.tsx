import React from "react";
import { motion } from "framer-motion";

import { Book as BookProps, Genre as GenreProps } from "@prisma/client";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -100 },
  show: { opacity: 1, x: 0 },
};

interface BookHeroProps {
  book: BookProps;
  genre?: GenreProps;
  actions?: React.ReactNode;
  className?: string;
}

export function BookHero({ book, genre, actions, className }: BookHeroProps) {
  const { title, type, secondaryImage } = book;

  return (
    <div className={`h-[90vh] w-full ${className}`}>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{ duration: 0.7 }}
        className="w-full h-4/5 mb-16"
        style={{
          background: `url(${secondaryImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="w-full h-full"
          style={{
            background: `linear-gradient(3deg, rgba(10, 10, 10, 1) 5rem, rgba(10,10,10, 0.7), rgba(10,10,10, 0.3), rgba(10, 10, 10, 0.2), rgba(10, 10, 10, 0))`,
          }}
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="container flex flex-col items-start justify-end w-full h-full space-y-4"
          >
            <motion.div variants={item}>
              <h1 className="text-5xl font-bold">{title}</h1>
            </motion.div>
            <motion.div
              variants={item}
              className="flex items-start lg:items-center gap-5 font-body text-sm text-neutral-400 uppercase tracking-wide"
            >
              <p>{type}</p>
              <p>{genre?.name}</p>
              <p>{genre?.ageRange}</p>
            </motion.div>
            {actions && actions}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
