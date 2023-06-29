import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { db } from "~/utils/db.server";

export const loader = async ({ params }: LoaderArgs) => {
  const contact = await db.contact.findUnique({
    where: { id: params.contactId },
  });
  if (!contact) {
    throw new Error("Contact not found");
  }
  return json({ contact });
};

export default function ContactoByIdRoute() {
  const data = useLoaderData<typeof loader>();
  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{data.contact.message}</p>
      <p>{data.contact.subject}</p>
      <Link to=".">"{data.contact.name}" Permalink</Link>
    </div>
  );
}
