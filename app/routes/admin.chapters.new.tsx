import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";

import { Button } from "~/components/button";

function validateTitle(title: string) {
  if (!title) {
    return "El título es requerido";
  }
  return null;
}

function validateOrder(order: number) {
  if (!order) {
    return "El orden es requerido";
  }
  return null;
}

function validateBookId(bookId: string) {
  if (!bookId) {
    return "El libro es requerido";
  }
  return null;
}

export const action = async ({ request }: ActionArgs) => {
  const referer = request.headers.get("Referer");
  const form = await request.formData();
  const title = form.get("title");
  const order = form.get("order");
  const bookId = form.get("bookId");

  if (
    typeof title !== "string" ||
    typeof order !== "string" ||
    typeof bookId !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form not submitted correctly.",
    });
  }

  const fieldErrors = {
    title: validateTitle(title),
    order: validateOrder(parseInt(order)),
    bookId: validateBookId(bookId),
  };
  const fields = {
    title,
    order,
    bookId,
  };

  if (Object.values(fieldErrors).some((x) => x !== null)) {
    return badRequest({ fieldErrors, fields });
  }

  const chapter = await db.chapter.create({
    data: {
      title,
      order: parseInt(order),
      bookId,
    },
  });

  return redirect(referer ?? "/admin");
};
