import type { V2_MetaFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { motion, AnimatePresence } from "framer-motion";

import { Book } from ".prisma/client";
import { db } from "~/utils/db.server";

export const loader = async ({ request }: LoaderArgs) => {
  const bookListItems = await db.book.findMany({
    select: {
      id: true,
      title: true,
      cover: true,
    },
  });

  return json({ bookListItems });
};

export default function LibrosIndexRoute() {
  const data = useLoaderData<typeof loader>();
  const bookListItems = data.bookListItems;

  return (
    <AnimatePresence>
      <motion.div
        className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 px-1 md:px-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {bookListItems.map(({ id, cover, title }, index) => (
          <motion.div
            key={index}
            id={`book-list_cover_${id + "-" + title}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.179 }}
            className="cursor-pointer"
          >
            <Link to={title.replace(/ /g, "_")}>
              <motion.img
                key={index}
                src={cover}
                alt={title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
