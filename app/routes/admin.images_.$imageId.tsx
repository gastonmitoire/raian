import { useState, useEffect, useRef } from "react";
import type { LoaderArgs, ActionArgs } from "@remix-run/node";
import fs from "fs";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";

import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";

import { BookDetails } from "~/components/book_details";
import { BookHero } from "~/components/book_hero";
import { ChapterList } from "~/components/chapter_list";
import { Header } from "~/components/header";
import { List } from "~/components/list";

export const action = async ({ request, params }: ActionArgs) => {
  if (request.method === "DELETE") {
    const { imageId } = params;
    const image = await db.image.findUnique({
      where: { id: imageId },
    });
    if (!image) {
      return json(
        { message: `No image found with the id ${imageId}` },
        { status: 404 }
      );
    }

    // Eliminar la imagen de la base de datos
    await db.image.delete({ where: { id: image.id } });

    // Eliminar la imagen del sistema de archivos
    fs.unlink(image.url, (err) => {
      if (err) {
        console.error(err);
      }
    });

    return redirect(`/admin/images`);
  }
};
