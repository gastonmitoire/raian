import type { ActionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import path from "path";
import fs from "fs/promises";
import sharp from "sharp";
import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";

import { Button } from "~/components/button";

function formatImageName(imageName: string) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();

  return `${year}-${month}-${dayOfMonth}-${imageName}`;
}

export const action = async ({ request, params }: ActionArgs) => {
  const form = await request.formData();
  const file = form.get("file");
  if (!file) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "No se ha proporcionado ningún archivo",
    });
  }

  const uploadedFile = file as File;
  const fileName = uploadedFile.name;
  const fileExtension = path.extname(fileName); // Obtener la extensión del archivo original
  const fileNameWithoutExtension = path.basename(fileName, fileExtension);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}${month}${day}`;

  const newFileName = `${formattedDate}_${fileNameWithoutExtension
    .replace(/[^\w]+/g, "-")
    .toLocaleLowerCase()}`;
  const webpFileName = `${newFileName}.webp`; // Nombre del archivo con extensión WebP
  const filePath = path.join("public", "images", webpFileName); // Ruta del archivo WebP
  const fileUrl = `/images/${webpFileName}`; // URL del archivo WebP

  try {
    // Obtener los datos binarios del archivo
    const arrayBuffer = await uploadedFile.arrayBuffer();
    const fileContent = new Uint8Array(arrayBuffer);

    // Utilizar sharp para convertir la imagen a WebP y guardarla
    await sharp(fileContent).webp().toFile(filePath);

    // Guardar la referencia de la URL de la imagen en la base de datos utilizando Prisma
    const image = await db.image.create({
      data: {
        filename: webpFileName, // Guardar el nombre del archivo con extensión WebP
        url: fileUrl,
      },
    });

    return redirect("/admin/images");
  } catch (error) {
    console.error("Error al guardar el archivo:", error);
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Error al guardar el archivo",
    });
  }
};
