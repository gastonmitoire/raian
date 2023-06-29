import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";

export const loader = async () => {
  return json({
    contacts: await db.contact.findMany(),
  });
};

export default function ContactoRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <Outlet />
    </div>
  );
}
