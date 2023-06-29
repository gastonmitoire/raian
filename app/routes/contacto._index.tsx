import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";

import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";

import { Button } from "~/components/button";

function validateMessage(message: string) {
  if (message.length < 10) {
    return "El mensaje debe tener al menos 10 caracteres";
  }
}

function validateName(name: string) {
  if (name.length < 1) {
    return "El nombre es requerido";
  }
}

function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "El email debe ser válido";
  }
}

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const message = form.get("message");
  const name = form.get("name");
  const email = form.get("email");
  const subject = form.get("subject");

  if (
    typeof message !== "string" ||
    typeof name !== "string" ||
    typeof email !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Invalid form submission",
    });
  }

  const fieldErrors = {
    message: validateMessage(message),
    name: validateName(name),
    email: validateEmail(email),
  };
  const fields = {
    message,
    name,
    email,
    subject: subject === "eventos-prensa" ? "eventos-prensa" : "general",
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: "null",
    });
  }

  const contact = await db.contact.create({ data: fields });
  return redirect(`/contacto/${contact.id}`);
};

export default function ContactoIndexRoute() {
  const actionData = useActionData<typeof action>();
  return (
    <div className="grid place-items-center h-[90vh]">
      <Form
        method="post"
        className="grid grid-cols-1 md:grid-cols-5 pt-16 shadow-lg dark:bg-neutral-800 dark:shadow-neutral-950"
      >
        <div className="col-span-2 flex flex-col gap-3 pb-20 px-10">
          <h3 className="text-3xl">Contacto</h3>
          <div className="h-0.5 w-2/5 mt-4 mb-2 bg-primary" />
          <span>
            <label className="flex flex-col">
              <p className="pb-1 font-cinzel lowercase text-xs text-neutral-500">
                Nombre
              </p>
              <input
                defaultValue={actionData?.fields?.name}
                name="name"
                type="text"
                placeholder="Tu nombre"
                className="text-lg font-sans bg-transparent border-b dark:border-b-neutral-500"
                aria-invalid={Boolean(actionData?.fieldErrors?.name)}
                aria-errormessage={
                  actionData?.fieldErrors?.name ? "name-error" : undefined
                }
              />
            </label>
            {actionData?.fieldErrors?.name ? (
              <p id="name-error" className="p-1 text-xs font-body text-red-500">
                {actionData.fieldErrors.name}
              </p>
            ) : null}
          </span>
          <span>
            <label className="flex flex-col">
              <p className="pb-1 font-cinzel lowercase text-xs text-neutral-500">
                Email
              </p>
              <input
                defaultValue={actionData?.fields?.email}
                name="email"
                type="email"
                placeholder="Tu email"
                className="text-lg font-sans bg-transparent border-b dark:border-b-neutral-500"
                aria-invalid={Boolean(actionData?.fieldErrors?.email)}
                aria-errormessage={
                  actionData?.fieldErrors?.email ? "email-error" : undefined
                }
              />
            </label>
            {actionData?.fieldErrors?.email ? (
              <p
                id="email-error"
                className="p-1 text-xs font-body text-red-500"
              >
                {actionData.fieldErrors.email}
              </p>
            ) : null}
          </span>
          <label>
            <p className="pb-1 font-cinzel lowercase text-xs text-neutral-500">
              Motivo
            </p>
            <fieldset className="flex flex-col justify-evenly">
              <legend className="sr-only">Login or Register?</legend>
              <label
                htmlFor="general-input"
                className="flex items-center gap-1 lowercase cursor-pointer"
              >
                <input
                  id="general-input"
                  type="radio"
                  name="subject"
                  value="general"
                  defaultChecked={
                    !actionData?.fields?.subject ||
                    actionData?.fields?.subject === "general"
                  }
                />
                General
              </label>
              <label
                htmlFor="eventos-prensa-input"
                className="flex items-center gap-1 lowercase cursor-pointer"
              >
                <input
                  id="eventos-prensa-input"
                  type="radio"
                  name="subject"
                  value="eventos-prensa"
                  defaultChecked={
                    actionData?.fields?.subject === "eventos-prensa"
                  }
                />
                Eventos/Prensa
              </label>
            </fieldset>
          </label>
        </div>
        <div className="col-span-3 flex flex-col">
          <label className="flex flex-col h-full pt-3 px-5 border-l dark:border-l-neutral-500">
            <p className="pb-1.5 font-cinzel lowercase text-xs text-neutral-500">
              Mensaje
            </p>
            <textarea
              name="message"
              className="h-full min-h-[75px] bg-transparent resize-none"
              placeholder="Escribe un mensaje"
            />
            {actionData?.fieldErrors?.message ? (
              <p
                id="message-error"
                className="p-1 text-xs font-body text-red-500"
              >
                {actionData.fieldErrors.message}
              </p>
            ) : null}
          </label>
          <Button type="submit" disableAnimation>
            Enviar
          </Button>
        </div>
      </Form>
    </div>
  );
}
