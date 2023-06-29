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

export const loader = async ({ request }: { request: Request }) => {
  const images = await db.image.findMany({
    orderBy: { createdAt: "desc" },
  });
  return json({ images });
};

export default function AdminImagesRoute() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [deleteImage, setDeleteImage] = useState("");
  const data = useLoaderData();

  const handleListClick = (item: string) => {
    navigate(`/admin/images/${item}`);
  };

  const handleDelete = async (item: string) => {
    console.log(item);
    setDeleteImage(item);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>Imágenes</h1>
      <Form
        method="post"
        encType="multipart/form-data"
        action="/admin/images/new"
      >
        <label>
          <span>Archivo:</span>
          <input type="file" name="file" />
        </label>
        <button type="submit">Subir</button>
      </Form>
      <ul className="flex gap-3">
        {data.images.map((image: any) => (
          <li key={image.id}>
            <img src={image.url} alt={image.filename} className="h-20 w-20" />
            <button onClick={() => handleDelete(image.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      <Modal open={showModal} onClose={handleModalClose}>
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold">¿Estás seguro?</h2>
          <Form method="delete" action={`/admin/images/${deleteImage}`}>
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
