import { useState } from "react";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useSearchParams,
  useNavigate,
} from "@remix-run/react";

import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";

import { Button } from "~/components/button";
import { List } from "~/components/list";
import { Modal } from "~/components/modal";

export const loader = async ({ request, params }: LoaderArgs) => {
  const books = await db.book.findMany();
  return json({ books });
};

export default function AdminBooksRoute() {
  const [showModal, setShowModal] = useState(false);
  const [deleteBook, setDeleteBook] = useState("");
  const navigate = useNavigate();
  const { books } = useLoaderData();

  const handleListClick = (item: string) => {
    navigate(`/admin/books/${item.replace(/ /g, "_")}`);
  };

  const handleDelete = async (item: string) => {
    setDeleteBook(item);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="grid grid-cols-1">
      <div className="col-span-1">
        <h1 className="text-2xl font-bold">Libros</h1>

        <List
          items={books.map((book: any) => book.title)}
          height={370}
          className="overflow-y-auto py-3"
          clickHandler={handleListClick}
          deleteHandler={handleDelete}
        />
      </div>
      <Modal open={showModal} onClose={handleModalClose}>
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold">¿Estás seguro?</h2>
          <Form method="delete" action={`/admin/books/${deleteBook}`}>
            <Button
              type="button"
              className="bg-neutral-900 hover:bg-neutral-800"
              onClick={handleModalClose}
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              Eliminar
            </Button>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
