import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import {
  Link,
  useActionData,
  useLoaderData,
  useSearchParams,
  Outlet,
} from "@remix-run/react";

import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";

import { Button } from "~/components/button";

export const loader = async ({ params }: LoaderArgs) => {
  const editUserId = params.editUserId;
  const users = await db.user.findMany({});

  console.log("param", editUserId);

  if (!!params.editUserId) {
    const editUser = await db.user.findUnique({
      where: {
        id: params.editUserId,
      },
    });
    return json({ users, editUser });
  }

  return json({ users, editUser: null });
};

export default function AdminUsersRoute() {
  let [searchParams, setSearchParams] = useSearchParams();
  const { users, editUser } = useLoaderData<typeof loader>();

  return (
    <div className="grid grid-cols-2 gap-5">
      <div>
        <h3 className="text-3xl text-neutral-500 py-5">Lista de Usuarios</h3>
        <ul className="grid gap-1.5">
          {users.map((user: any) => (
            <li
              key={user.id}
              className="bg-neutral-700 bg-opacity-10 cursor-pointer hover:bg-opacity-20"
            >
              <Link to={user.id} className="p-3 block">
                {user.username} - {user.email}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
