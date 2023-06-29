import { useState, useEffect } from "react";
import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";

import { db } from "~/utils/db.server";

import { BookFields } from "~/components/book_fields";
import { BookHero } from "~/components/book_hero";
import { Button } from "~/components/button";
import { ChapterForm } from "~/components/chapter_form";
import { List } from "~/components/list";

export const action = async ({ request, params }: LoaderArgs) => {
  if (request.method === "PUT") {
    const formatedTitle = params.bookTitle?.replace(/_/g, " ");
    const book = await db.book.findUnique({
      where: { title: formatedTitle },
    });
    if (!book) {
      return json(
        { message: `No book found with the title ${params.bookTitle}` },
        { status: 404 }
      );
    }

    const body = new URLSearchParams(await request.text());
    const title = body.get("title");
    const description = body.get("description");
    const publicationDate = body.get("publicationDate");
    const genre = body.get("genre");
    const cover = body.get("cover");
    const secondaryImage = body.get("secondaryImage");
    const illustratorId = body.get("illustratorId");
    const publisherId = body.get("publisherId");

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof publicationDate !== "string" ||
      typeof genre !== "string" ||
      typeof cover !== "string" ||
      typeof secondaryImage !== "string" ||
      typeof illustratorId !== "string" ||
      typeof publisherId !== "string"
    ) {
      return json({ message: "Invalid body" }, { status: 400 });
    }

    const updatedBook = await db.book.update({
      where: { title: formatedTitle },
      data: {
        title,
        description,
        publicationDate,
        genreId: genre!,
        cover,
        secondaryImage,
        illustratorId,
        publisherId,
      },
    });

    return redirect(`/admin/books/${updatedBook.title}`);
  }
  if (request.method === "DELETE") {
    const formatedTitle = params.bookTitle?.replace(/_/g, " ");
    const book = await db.book.findUnique({
      where: { title: formatedTitle },
    });
    if (!book) {
      return json(
        { message: `No book found with the title ${params.bookTitle}` },
        { status: 404 }
      );
    }

    await db.book.delete({ where: { title: book.title } });
    return json({ message: `Book ${params.bookTitle} deleted` });
  }
};

export const loader = async ({ params }: LoaderArgs) => {
  const formatedTitle = params.bookTitle?.replace(/_/g, " ");
  const users = await db.user.findMany();
  const images = await db.image.findMany();
  const genres = await db.genre.findMany();
  const book = await db.book.findUnique({
    where: { title: formatedTitle },
    include: {
      genre: true,
      comments: true,
    },
  });

  if (!book) {
    return json(
      { message: `No book found with the title ${params.bookTitle}` },
      { status: 404 }
    );
  }

  const chapters = await db.chapter.findMany({
    where: { bookId: book.id },
    orderBy: { order: "desc" },
  });

  return json({ book, chapters, images, genres, users });
};

export default function AdminBookByTitleRoute() {
  const navigation = useNavigation();
  let isLoading =
    navigation.state === "submitting" && navigation.formMethod === "PUT";
  console.log("NAVIGATION ", navigation);
  const { book, chapters, images, genres, users } = useLoaderData();
  const [createChapter, setCreateChapter] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [selectedCover, setSelectedCover] = useState("");
  const [selectedSecondaryImage, setSelectedSecondaryImage] = useState("");

  const handleChapterClick = (item: string) => {
    console.log(item);
  };

  const toggleCreateChapter = () => {
    setCreateChapter((prev) => !prev);
  };

  const toggleIsEditing = () => {
    setIsEditing((prev) => !prev);
  };

  useEffect(() => {
    if (navigation.state === "idle") {
      setIsEditing(false);
    }
  }, [navigation.state]);

  return (
    <div className="grid grid-cols-2 gap-3">
      <nav
        aria-label="Admin book menu"
        className="col-span-2 rounded-lg border-2 border-neutral-800"
      >
        <ul className="flex items-center justify-between p-1">
          <li>
            <Button
              disableAnimation
              color="secondary"
              type="button"
              className="bg-neutral-900 hover:bg-neutral-800"
              onClick={toggleIsEditing}
            >
              {isEditing ? "Cancelar" : "Editar"}
            </Button>
          </li>
        </ul>
      </nav>

      {isEditing ? (
        <Form method="PUT" className="col-span-2 grid gap-3">
          <BookFields
            book={book}
            images={images}
            genres={genres}
            users={users}
          />

          <Button
            disabled={isLoading}
            type="submit"
            size="large"
            className="place-self-end"
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </Button>
        </Form>
      ) : (
        <>
          <div className="col-span-1">
            <BookHero book={book} />
          </div>

          <div className="col-span-1 flex flex-col gap-3">
            <button
              className="w-full py-3 bg-neutral-700 bg-opacity-10 hover:bg-opacity-20"
              onClick={toggleCreateChapter}
            >
              {createChapter ? "Cancelar" : "Crear capítulo"}
            </button>
            {createChapter ? <ChapterForm bookId={book.id} /> : null}
            <List
              height={430}
              items={chapters.map(
                (chapter: any) => chapter.order + " | " + chapter.title
              )}
              clickHandler={handleChapterClick}
            />
          </div>
        </>
      )}
    </div>
  );
}
