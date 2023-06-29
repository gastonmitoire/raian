import { motion } from "framer-motion";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";

import { Button } from "./button";

type CardProps = {
  title: string;
  cover: string;
  secondaryImage: string;
  description: string;
  type: string;
  genre: { name: string };
};

export function BookCard({
  title,
  cover,
  secondaryImage,
  description,
  type,
  genre,
}: CardProps) {
  return (
    <div
      className="w-full h-full flex justify-center items-center p-5 md:p-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('${secondaryImage}')`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="md:w-4/5 h-full md:h-4/5 grid md:grid-flow-col md:px-10 bg-white dark:bg-neutral-900 dark:bg-opacity-95 rounded-xl shadow-lg"
      >
        <div className="md:h-4/5 my-auto py-5 md:p-0">
          <img
            src={cover}
            alt={title}
            className="w-full h-full max-w-md max-h-96 object-contain mx-auto"
          />
        </div>

        <div className="flex flex-col gap-1 justify-center md:w-2/3 p-3">
          <h2 className="text-5xl font-bold mb-2">{title}</h2>
          <span className="flex flex-col md:flex-row md:items-center gap-1 font-cinzel dark:text-neutral-400">
            <h5 className="italic uppercase">{type}</h5>
            <span className="hidden md:block">|</span>
            <strong className="lowercase">{genre.name}</strong>
          </span>
          <p className="font-bellefair text-2xl p-3 text-gray-700 dark:text-neutral-200">
            {description}
          </p>
          <Button
            isLink
            to={"libros/" + title.replace(/ /g, "_")}
            color="primary"
            size="large"
            className="self-end"
          >
            Ver Libro
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
