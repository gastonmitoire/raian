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
import { List } from "~/components/list";

export const loader = async ({ params }: LoaderArgs) => {
  const genres = await db.genre.findMany({});

  return json({ genres });
};

export default function AdminGenresIndexRoute() {
  const { genres } = useLoaderData<typeof loader>();
  return (
    <div>
      <h3 className="text-3xl text-neutral-500 py-5">Lista de Géneros</h3>
      <List items={genres.map((genre: any) => genre.name)} />
    </div>
  );
}
