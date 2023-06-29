import { Form, useNavigation } from "@remix-run/react";

import { Book } from "@prisma/client";
import { useEffect, useRef } from "react";

interface ChapterFormProps {
  bookId: Book["id"];
}

export function ChapterForm({ bookId }: ChapterFormProps) {
  let navigation = useNavigation();
  let isLoading =
    navigation.state === "submitting" && navigation.formMethod === "post";

  let formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (navigation.state === "idle") {
      formRef.current?.reset();
    }
  }, [navigation.state]);

  return (
    <Form
      ref={formRef}
      action="/admin/chapters/new"
      method="post"
      className="flex flex-col gap-1.5 p-3"
    >
      <input
        name="order"
        type="number"
        placeholder="Orden"
        className="w-full p-3 bg-neutral-700 bg-opacity-10"
      />
      <input
        name="title"
        type="text"
        placeholder="Título"
        className="w-full p-3 bg-neutral-700 bg-opacity-10"
      />
      <input name="bookId" type="hidden" value={bookId} />
      <button
        disabled={isLoading}
        className="w-full py-3 bg-neutral-700 bg-opacity-10 hover:bg-opacity-20"
      >
        {isLoading ? "Creando..." : "Crear capítulo"}
      </button>
    </Form>
  );
}
