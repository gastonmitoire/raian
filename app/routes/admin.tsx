import type {
  LinksFunction,
  V2_MetaFunction,
  LoaderArgs,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useLocation } from "react-router";
import {
  isRouteErrorResponse,
  Link,
  Outlet,
  ScrollRestoration,
  useRouteError,
  LiveReload,
  useParams,
} from "@remix-run/react";
import type { PropsWithChildren } from "react";
import { User } from ".prisma/client";

import { getUser } from "~/utils/session.server";
import { Button } from "~/components/button";
import { Header } from "~/components/header";

export const meta: V2_MetaFunction = () => {
  const description = "Libros del escritor argentino Hugo Mitoire";

  return [
    { name: "description", content: description },
    { name: "twitter:description", content: description },
    { title: "Hugo Mitoire - Admin" },
  ];
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);
  if (!user) {
    throw new Response(
      "Necesitás estar logueado con permisos de administrador para ver esta página",
      {
        status: 401,
      }
    );
  }
  if (user.role !== "ADMIN") {
    throw new Response("No tenés permisos para ver esta página", {
      status: 403,
    });
  }
  return json(user);
};

export default function AdminRoute() {
  const location = useLocation();
  const user = useLoaderData() as User;

  const adminRoutes = [
    {
      path: "users",
    },
    {
      path: "books",
    },
    {
      path: "images",
    },
    {
      path: "chapters",
    },
    {
      path: "texts",
    },
    {
      path: "genres",
    },
  ];

  return (
    <div className="container min-h-[95vh] py-3 box-content">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-2">
          <nav aria-label="Admin navigation" role="navigation">
            <ul className="flex flex-col gap-3">
              {adminRoutes.map((route) => {
                const isActive = location.pathname.includes(route.path);
                return (
                  <li
                    key={route.path}
                    className={`${
                      isActive ? "font-bold" : ""
                    } uppercase text-sm font-body`}
                  >
                    <Link
                      to={`/admin/${isActive ? "" : route.path}`}
                      className="flex items-center justify-between p-3 bg-neutral-700 bg-opacity-10 hover:bg-opacity-20"
                    >
                      {route.path}
                    </Link>

                    {isActive && (
                      <ul className="border-l-8 border-neutral-700 border-opacity-10">
                        <li>
                          <Link
                            to={`/admin/${route.path}/new`}
                            className="flex items-center justify-between p-1.5 bg-neutral-800 bg-opacity-5 hover:bg-opacity-10"
                          >
                            Nuevo
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <main className="col-span-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 403 || error.status === 401) {
      return (
        <div className="grid place-items-center h-[90vh]">
          <div className="w-1/2 text-center px-5">
            <p className="font-body font-bold uppercase text-xl text-red-700">
              {error.data}
            </p>
            <nav>
              <Link
                to="/"
                className="flex justify-center gap-3 text-neutral-700 dark:text-neutral-300"
              >
                inicio
              </Link>
            </nav>
          </div>
        </div>
      );
    }
    if (error.status === 404) {
      return <div>Huh? What the heck is?</div>;
    }
  }

  return <div>There was an error loading joke by the id "$". Sorry.</div>;
}
