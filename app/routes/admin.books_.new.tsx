import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";

import { Button } from "~/components/button";

function validateTitle(title: string) {
  if (title.length < 1) {
    return "El título es requerido";
  }
}

function validateDescription(description: string) {
  if (description.length < 1) {
    return "La descripción es requerida";
  }
}

function validateType(type: string) {
  if (type.length < 1) {
    return "El tipo es requerido";
  }
}

function validatePublicationDate(publicationDate: string) {
  if (publicationDate.length < 1) {
    return "La fecha de publicación es requerida";
  }
}

function validateCover(cover: string) {
  if (cover.length < 1) {
    return "La portada es requerida";
  }
}

function validateSeciondaryImage(secondaryImage: string) {
  if (secondaryImage.length < 1) {
    return "La imagen secundaria es requerida";
  }
}

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const title = form.get("title");
  const description = form.get("description");
  const type = form.get("type");
  const publicationDate = form.get("publicationDate");
  const cover = form.get("cover");
  const secondaryImage = form.get("secondaryImage");
  const genreId = form.get("genreId");
  const illustratorId = form.get("illustratorId");
  const publisherId = form.get("publisherId");

  console.log("FORM", {
    title,
    description,
    type,
    publicationDate,
    cover,
    secondaryImage,
    genreId,
    illustratorId,
    publisherId,
  });

  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof type !== "string" ||
    typeof publicationDate !== "string" ||
    typeof cover !== "string" ||
    typeof secondaryImage !== "string" ||
    typeof genreId !== "string" ||
    typeof illustratorId !== "string" ||
    typeof publisherId !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form not submitted correctly.",
    });
  }

  const fieldErrors = {
    title: validateTitle(title),
    description: validateDescription(description),
    type: validateType(type),
    publicationDate: validatePublicationDate(publicationDate),
    cover: validateCover(cover),
    secondaryImage: validateSeciondaryImage(secondaryImage),
  };

  const hasErrors = Object.values(fieldErrors).some((error) => !!error);
  const fields = {
    title,
    description,
    type,
    publicationDate,
    cover,
    secondaryImage,
    genreId,
    illustratorId,
    publisherId,
  };

  if (hasErrors) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  const existingBook = await db.book.findFirst({
    where: {
      title,
    },
  });

  if (existingBook) {
    return badRequest({
      fieldErrors: {
        title: "Ya existe un libro con este título",
      },
      fields,
      formError: "Invalid form submission",
    });
  }

  await db.book.create({
    data: fields,
  });

  return redirect("/admin/books");
};

export const loader = async ({ params }: LoaderArgs) => {
  const books = await db.book.findMany({});
  const genres = await db.genre.findMany({});
  const chapters = await db.chapter.findMany({});
  const images = await db.image.findMany({});
  const users = await db.user.findMany({});

  return {
    books,
    genres,
    chapters,
    images,
    users,
  };
};

export default function AdminBooksNewRoute() {
  const { books, genres, chapters, images, users } =
    useLoaderData<typeof loader>();
  const actionData = useActionData();

  return (
    <div>
      <h3 className="text-3xl text-neutral-950 py-5">Nuevo Libro</h3>
      <Form action="/admin/books/new" method="post">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label htmlFor="title">Título</label>
              <input
                className="w-full border border-gray-300 rounded-md p-2"
                type="text"
                name="title"
                id="title"
                defaultValue={actionData?.fields?.title}
              />
              {actionData?.fieldErrors?.title && (
                <p className="text-red-500">{actionData.fieldErrors.title}</p>
              )}
            </div>
            <div className="col-span-2">
              <label htmlFor="description">Descripción</label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2"
                name="description"
                id="description"
                defaultValue={actionData?.fields?.description}
              />
              {actionData?.fieldErrors?.description && (
                <p className="text-red-500">
                  {actionData.fieldErrors.description}
                </p>
              )}
            </div>
            <div className="col-span-1">
              <label htmlFor="type">Tipo</label>
              <input
                className="w-full border border-gray-300 rounded-md p-2"
                type="text"
                name="type"
                id="type"
                defaultValue={actionData?.fields?.type}
              />
              {actionData?.fieldErrors?.type && (
                <p className="text-red-500">{actionData.fieldErrors.type}</p>
              )}
            </div>
            <div className="col-span-1">
              <label htmlFor="genre">Género</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2"
                name="genreId"
                id="genre"
                defaultValue={actionData?.fields?.genre}
              >
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label htmlFor="publicationDate">Fecha de publicación</label>
              <input
                className="w-full border border-gray-300 rounded-md p-2"
                type="text"
                name="publicationDate"
                id="publicationDate"
                defaultValue={actionData?.fields?.publicationDate}
              />
              {actionData?.fieldErrors?.publicationDate && (
                <p className="text-red-500">
                  {actionData.fieldErrors.publicationDate}
                </p>
              )}
            </div>
            <div className="col-span-1">
              <label htmlFor="illustrator">Ilustrador</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2"
                name="illustratorId"
                id="illustrator"
                defaultValue={actionData?.fields?.illustrator}
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>

              {actionData?.fieldErrors?.illustrator && (
                <p className="text-red-500">
                  {actionData.fieldErrors.illustrator}
                </p>
              )}
            </div>
            <div className="col-span-1">
              <label htmlFor="publisher">Editorial</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2"
                name="publisherId"
                id="publisher"
                defaultValue={actionData?.fields?.publisher}
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>
              {actionData?.fieldErrors?.publisher && (
                <p className="text-red-500">
                  {actionData.fieldErrors.publisher}
                </p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="cover">Portada</label>
            <fieldset className="grid grid-cols-4 gap-3">
              {images.map((image) => (
                <div key={image.id} className="flex">
                  <input
                    className="mr-2"
                    type="radio"
                    name="cover"
                    id={`cover-${image.id}`}
                    value={image.url}
                    defaultChecked={actionData?.fields?.cover === image.url}
                  />
                  <label htmlFor={`cover-${image.id}`}>
                    <img
                      className="w-20 h-20 object-cover"
                      src={image.url}
                      alt=""
                    />
                  </label>
                </div>
              ))}
            </fieldset>
            <fieldset>
              <label htmlFor="secondaryImage">Imagen secundaria</label>
              <div className="grid grid-cols-4 gap-3">
                {images.map((image) => (
                  <div key={image.id} className="flex">
                    <input
                      className="mr-2"
                      type="radio"
                      name="secondaryImage"
                      id={`secondaryImage-${image.id}`}
                      value={image.url}
                      defaultChecked={
                        actionData?.fields?.secondaryImage === image.url
                      }
                    />
                    <label htmlFor={`secondaryImage-${image.id}`}>
                      <img
                        className="w-20 h-20 object-cover"
                        src={image.url}
                        alt=""
                      />
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
          <div className="col-span-2">
            {actionData?.formError ? (
              <p className="form-validation-error" role="alert">
                {actionData.formError}
              </p>
            ) : null}
            <button
              className="bg-primary-500 text-neutral-950 rounded-md p-2 bg-primary hover:bg-primary-dark"
              type="submit"
            >
              Crear
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}
