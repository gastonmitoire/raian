import type {
  ActionArgs,
  LinksFunction,
  V2_MetaFunction,
} from "@remix-run/node";
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";

import { db } from "~/utils/db.server";
import { badRequest } from "~/utils/request.server";
import { createUserSession, login, register } from "~/utils/session.server";
import { Button } from "~/components/button";

export const meta: V2_MetaFunction = () => {
  const description = "Login to submit your own jokes to Remix Jokes!";

  return [
    { name: "description", content: description },
    { name: "twitter:description", content: description },
    { title: "Hugo Mitoire | Ingreso" },
  ];
};

function validateUsername(username: string) {
  if (username.length < 3) {
    return "El nombre de usuario debe tener al menos 3 caracteres";
  }
}

function validatePassword(password: string) {
  if (password.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres";
  }
}

function validateUrl(url: string) {
  const urls = ["/books", "/", "https://remix.run"];
  if (urls.includes(url)) {
    return url;
  }
  return "/books";
}

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const loginType = form.get("loginType");
  const password = form.get("password");
  const username = form.get("username");
  const email = form.get("email");
  const redirectTo = validateUrl((form.get("redirectTo") as string) || "/");
  if (
    typeof loginType !== "string" ||
    typeof password !== "string" ||
    typeof username !== "string"
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: "Form not submitted correctly.",
    });
  }

  const fields = { loginType, password, username };
  const fieldErrors = {
    password: validatePassword(password),
    username: validateUsername(username),
  };
  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  switch (loginType) {
    case "login": {
      const user = await login({ username, password });
      console.log({ user });
      if (!user) {
        return badRequest({
          fieldErrors: null,
          fields,
          formError: "Username/Password combination is incorrect",
        });
      }
      return createUserSession(user.id, redirectTo);
    }
    case "register": {
      const userExists = await db.user.findFirst({
        where: { username },
      });
      if (userExists) {
        return badRequest({
          fieldErrors: null,
          fields,
          formError: `User with username ${username} already exists`,
        });
      }
      const user = await register({ username, password });
      if (!user) {
        return badRequest({
          fieldErrors: null,
          fields,
          formError: "Something went wrong trying to create a new user.",
        });
      }
      return createUserSession(user.id, redirectTo);
    }
    default: {
      return badRequest({
        fieldErrors: null,
        fields,
        formError: "Login type invalid",
      });
    }
  }
};

export default function Login() {
  const actionData = useActionData<typeof action>();
  const [searchParams] = useSearchParams();
  return (
    <div className="container mx-auto flex flex-col justify-center items-center gap-5 mt-52">
      <Form
        method="post"
        className="grid gap-3 w-1/4 bg-neutral-200 bg-opacity-90 dark:bg-neutral-800 dark:bg-opacity-90 dark:text-white p-5 rounded-md shadow-md"
      >
        <input
          type="hidden"
          name="redirectTo"
          value={searchParams.get("redirectTo") ?? undefined}
        />
        <fieldset className="flex justify-evenly">
          <legend className="sr-only">Login or Register?</legend>
          <label
            htmlFor="login-input"
            className="flex items-center gap-1 lowercase cursor-pointer"
          >
            <input
              id="login-input"
              type="radio"
              name="loginType"
              value="login"
              defaultChecked={
                !actionData?.fields?.loginType ||
                actionData?.fields?.loginType === "login"
              }
            />
            Login
          </label>
          <label
            htmlFor="register-input"
            className="flex items-center gap-1 lowercase cursor-pointer"
          >
            <input
              id="register-input"
              type="radio"
              name="loginType"
              value="register"
              defaultChecked={actionData?.fields?.loginType === "register"}
            />
            Register
          </label>
        </fieldset>
        <div className="flex flex-col">
          <label
            htmlFor="username-input"
            className="px-1.5 py-1 uppercase font-thin tracking-wide text-sm dark:bg-neutral-800"
          >
            User
          </label>
          {actionData?.fieldErrors?.username ? (
            <p
              className="bg-red-800 p-1 font-bold uppercase trailing-wide text-sm"
              role="alert"
              id="username-error"
            >
              {actionData.fieldErrors.username}
            </p>
          ) : null}
          <input
            type="text"
            id="username-input"
            name="username"
            defaultValue={actionData?.fields?.username}
            aria-invalid={Boolean(actionData?.fieldErrors?.username)}
            aria-errormessage={
              actionData?.fieldErrors?.username ? "username-error" : undefined
            }
            className="px-2 py-1.5 rounded-b-md shadow-sm border border-gray-300 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="password-input"
            className="px-1.5 py-1 uppercase font-thin tracking-wide text-sm dark:bg-neutral-800"
          >
            Password
          </label>
          {actionData?.fieldErrors?.password ? (
            <p
              className="bg-red-800 p-1 font-bold uppercase trailing-wide text-sm"
              role="alert"
              id="password-error"
            >
              {actionData.fieldErrors.password}
            </p>
          ) : null}
          <input
            id="password-input"
            name="password"
            type="password"
            defaultValue={actionData?.fields?.password}
            aria-invalid={Boolean(actionData?.fieldErrors?.password)}
            aria-errormessage={
              actionData?.fieldErrors?.password ? "password-error" : undefined
            }
            className="px-2 py-1.5 rounded-b-md shadow-sm border border-gray-300 dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div id="form-error-message">
          {actionData?.formError ? (
            <p
              className="bg-red-800 p-1 font-bold uppercase trailing-wide text-sm"
              role="alert"
            >
              {actionData.formError}
            </p>
          ) : null}
        </div>
        <Button>Submit</Button>
      </Form>
    </div>
  );
}
