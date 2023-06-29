import type { V2_MetaFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Book } from ".prisma/client";
import { db } from "~/utils/db.server";
import { BookCard } from "../components/book_card";
import { BookHero } from "~/components/book_hero";
import { Button } from "~/components/button";
import { Header } from "~/components/header";
import { Slider } from "~/components/slider";
import { SliderGallery } from "~/components/slider_gallery";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export const loader = async ({ request }: LoaderArgs) => {
  console.log("request", request);
  const books = await db.book.findMany({});

  return json({ books });
};

export default function Index() {
  const { books } = useLoaderData<typeof loader>();

  function handleChange(index: number) {
    console.log("Current index:", index);
  }

  function renderHero(book: Book) {
    return (
      <BookHero
        key={book.id}
        book={book}
        className="h-[80vh]"
        actions={
          <div className="flex space-x-4">
            <Button isLink to={`libros/${book.title.replace(/ /g, "_")}`}>
              Leer
            </Button>
          </div>
        }
      />
    );
  }

  return (
    <div className="flex flex-col h-auto">
      <div className="h-[90vh]">
        {books.length > 0 ? (
          <Slider
            items={books}
            onChange={handleChange}
            renderItem={renderHero}
            autoPlay
            hideProgressBar
          />
        ) : (
          "No books found"
        )}
      </div>

      <Header title="Libros" transparent colorClass="text-neutral-300" />
      <div className="container flex flex-col gap-y-3 py-3">
        <section>
          <h5 className="pb-3 font-bold tracking-widest">Destacados</h5>
          <SliderGallery
            items={[books.map((book) => book.cover)]}
            imageWidth={"auto"}
            imageHeight={458.25}
            hidePagination
          />
        </section>
      </div>
    </div>
  );
}
