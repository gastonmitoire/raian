import React from "react";
import { Form } from "@remix-run/react";

import { Book, Image, Genre, User } from "@prisma/client";

import { Button } from "./button";
import { ImagePicker } from "./image_picker";

interface BookFieldsProps {
  users?: User[];
  book?: Book;
  images?: Image[];
  genres?: Genre[];
}

export function BookFields({ book, images, genres, users }: BookFieldsProps) {
  const handleSelectCover = (image: Image) => {
    console.log(image);
  };

  const handleSelectSecondaryImage = (image: Image) => {
    console.log(image);
  };

  return (
    <div className="grid grid-cols-5 gap-5">
      <div className="col-span-2 grid grid-cols-1 gap-3">
        <label>
          <span className="block mb-2 text-sm font-medium text-neutral-300">
            Portada{" "}
            {book?.cover && (
              <span
                className={
                  images?.find((image) => image.url === book.cover)?.filename
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {book.cover +
                  (images?.find((image) => image.url === book.cover)?.filename
                    ? "✓"
                    : "✗")}
              </span>
            )}
          </span>
          <ImagePicker
            name="cover"
            images={images!}
            selectedImage={book?.cover}
            onSelectImage={handleSelectCover}
          />
        </label>

        <label>
          <span className="block mb-2 text-sm font-medium text-neutral-300">
            Imagen secundaria{" "}
            {book?.secondaryImage && (
              <span
                className={
                  images?.find((image) => image.url === book.secondaryImage)
                    ?.filename
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {book.secondaryImage +
                  (images?.find((image) => image.url === book.secondaryImage)
                    ?.filename
                    ? "✓"
                    : "✗")}
              </span>
            )}
          </span>
          <ImagePicker
            name="secondaryImage"
            images={images!}
            selectedImage={book?.secondaryImage}
            onSelectImage={handleSelectSecondaryImage}
          />
        </label>
      </div>

      <div className="col-span-3 grid grid-cols-2 gap-3">
        <label className="col-span-2">
          <span className="block mb-2 text-sm font-medium text-neutral-300">
            Título
          </span>
          <input
            name="title"
            type="text"
            placeholder="Título"
            className="w-full p-3 bg-neutral-700 bg-opacity-10"
            defaultValue={book?.title || ""}
          />
        </label>

        <label className="col-span-2">
          <span className="block mb-2 text-sm font-medium text-neutral-300">
            Descripción
          </span>
          <textarea
            name="description"
            placeholder="Descripción"
            className="w-full p-3 bg-neutral-700 bg-opacity-10"
            defaultValue={book?.description || ""}
          />
        </label>

        <label className="col-span-2">
          <span className="block mb-2 text-sm font-medium text-neutral-300">
            Fecha de publicación
          </span>
          <input
            name="publicationDate"
            type="text"
            placeholder="Fecha de publicación"
            className="w-full p-3 bg-neutral-700 bg-opacity-10"
            defaultValue={book?.publicationDate || ""}
          />
        </label>

        <label>
          <span className="block mb-2 text-sm font-medium text-neutral-300">
            Tipo
          </span>
          <input
            name="type"
            type="text"
            placeholder="Tipo"
            className="w-full p-3 bg-neutral-700 bg-opacity-10"
            defaultValue={book?.type || ""}
          />
        </label>

        <label>
          <span className="block mb-2 text-sm font-medium text-neutral-300">
            Género
          </span>
          <select
            name="genre"
            className="w-full p-3 bg-neutral-700 bg-opacity-10"
            defaultValue={book?.genreId || ""}
          >
            {genres?.map((genre) => (
              <option
                key={genre.id}
                value={genre.id}
                className="w-full p-3 bg-neutral-700"
              >
                {genre.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="block mb-2 text-sm font-medium text-neutral-300">
            Ilustrador
          </span>
          <select
            name="illustratorId"
            className="w-full p-3 bg-neutral-700 bg-opacity-10"
            defaultValue={book?.illustratorId || ""}
          >
            {users?.map((user) => (
              <option
                key={user.id}
                value={user.id}
                className="w-full p-3 bg-neutral-700"
              >
                {user.username}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="block mb-2 text-sm font-medium text-neutral-300">
            Editorial
          </span>
          <select
            name="publisherId"
            className="w-full p-3 bg-neutral-700 bg-opacity-10"
            defaultValue={book?.publisherId || ""}
          >
            {users?.map((user) => (
              <option
                key={user.id}
                value={user.id}
                className="w-full p-3 bg-neutral-700"
              >
                {user.username}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
