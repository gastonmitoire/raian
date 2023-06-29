import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";

import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";

import { Button } from "~/components/button";

function validateUsername(username: string) {
  if (username.length < 3) {
    return "El nombre de usuario debe tener al menos 3 caracteres";
  }
}

function validatePasswordHash(passwordHash: string) {
  if (passwordHash.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres";
  }
}

function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "El email debe ser válido";
  }
}

export const action = async ({ request, params }: ActionArgs) => {
  const form = await request.formData();
  const username = form.get("username");
  const passwordHash = form.get("passwordHash");
  const email = form.get("email");
  const role = form.get("role");

  if (
    typeof username !== "string" ||
    typeof passwordHash !== "string" ||
    typeof email !== "string" ||
    typeof role !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Invalid form submission",
    });
  }

  const fieldErrors = {
    username: validateUsername(username),
    passwordHash: validatePasswordHash(passwordHash),
    email: validateEmail(email),
  };
  const fields = {
    username,
    passwordHash,
    email,
    role,
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: "Invalid form submission",
    });
  }

  const user = await db.user.update({
    where: { id: params.userId },
    data: {
      username,
      passwordHash,
      email,
      role,
    },
  });

  console.log("RES ", user);

  return redirect(`/admin/users/${user.id}`);
};

export const loader = async ({ params }: LoaderArgs) => {
  const userId = params.userId;

  if (!!params.userId) {
    const editUser = await db.user.findUnique({
      where: {
        id: params.userId,
      },
    });
    return json({ editUser });
  }

  return json({ editUser: null });
};

export default function AdminUserByIdRoute() {
  let [searchParams, setSearchParams] = useSearchParams();
  const { editUser } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const handleSubmit = async (data: FormData) => {
    // Implementa aquí la lógica para enviar los datos al servidor o realizar otras acciones necesarias

    console.log("Datos enviados:", data);
  };

  const handleEditUser = (userId: string) => {
    setSearchParams({ userId: userId });
  };

  return (
    <div className="grid grid-cols-5 text-neutral-900">
      <div className="col-span-3 col-start-2 flex flex-col">
        <h3 className="col-span-2 text-3xl text-neutral-500 py-5">
          Editar Usuario
        </h3>
        <Form method="POST">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label htmlFor="username">Nombre de usuario</label>
              <input
                type="text"
                name="username"
                id="username"
                defaultValue={editUser?.username}
                className="w-full p-3 border border-neutral-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                defaultValue={editUser?.email || ""}
                className="w-full p-3 border border-neutral-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="passwordHash">Contraseña</label>
              <input
                type="password"
                name="passwordHash"
                id="passwordHash"
                defaultValue={editUser?.passwordHash}
                className="w-full p-3 border border-neutral-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="role">Rol</label>
              <select
                name="role"
                id="role"
                defaultValue={editUser?.role}
                className="w-full p-3 border border-neutral-300 rounded-md"
              >
                <option value="ADMIN">Administrador</option>
                <option value="USER">Usuario</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-5">
            <Button type="submit">Guardar</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
