import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";

import { Button } from "~/components/button";

function validateName(name: string) {
  if (name.length < 1) {
    return "El nombre es requerido";
  }
}

function validateAgeRange(ageRange: string) {
  if (ageRange.length < 1) {
    return "El rango de edad es requerido";
  }
}

function generateNameSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const name = form.get("name");
  const ageRange = form.get("ageRange");

  if (typeof name !== "string" || typeof ageRange !== "string") {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Invalid form submission",
    });
  }

  const existingGenre = await db.genre.findFirst({
    where: {
      nameSlug: generateNameSlug(name),
    },
  });

  if (existingGenre) {
    return badRequest({
      fieldErrors: {
        name: "Ya existe un género con este nombre",
      },
      fields: {
        name,
        ageRange,
      },
      formError: "Invalid form submission",
    });
  }

  const fieldErrors = {
    name: validateName(name),
    ageRange: validateAgeRange(ageRange),
  };
  const fields = {
    name,
    ageRange,
    nameSlug: generateNameSlug(name),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: "Invalid form submission",
    });
  }

  const genre = await db.genre.create({
    data: fields,
  });

  return redirect(`/admin/genres/`);
};

export default function AdminGenerosNewRoute() {
  const data = useActionData();

  return (
    <div>
      <h2>Crear género</h2>
      <Form action="/admin/genres/new" method="post">
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={data?.fields.name}
          />
          {data?.fieldErrors?.name ? <div>{data.fieldErrors.name}</div> : null}
        </div>
        <div>
          <label htmlFor="ageRange">Rango de edad</label>
          <input
            type="text"
            id="ageRange"
            name="ageRange"
            defaultValue={data?.fields.ageRange}
          />
          {data?.fieldErrors?.ageRange ? (
            <div>{data.fieldErrors.ageRange}</div>
          ) : null}
        </div>
        <Button type="submit">Crear</Button>
      </Form>
    </div>
  );
}
