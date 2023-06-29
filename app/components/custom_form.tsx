import { useEffect, useState } from "react";
import {
  Form,
  useActionData,
  useLoaderData,
  useSearchParams,
} from "@remix-run/react";
import { motion } from "framer-motion";

export interface FormField {
  label: string;
  name: string;
  type: string;
  defaultValue?: string;
  options?: {
    label: string;
    value: string;
  }[];
}

export interface FormFieldSelect extends FormField {
  options?: {
    label: string;
    value: string;
  }[];
}

export interface FormData {
  [key: string]: string;
}

interface FormProps {
  fields: FormField[] | FormFieldSelect[];
  onSubmit: (data: FormData) => Promise<void>;
  className?: string;
  submitLabel?: string;
}

const FormInput: React.FC<FormField> = ({
  label,
  name,
  type,
  defaultValue,
}) => {
  const [value, setValue] = useState(defaultValue || "");

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border-gray-300 rounded-md shadow-sm p-2 w-full"
        autoComplete="off"
      />
    </div>
  );
};

const FormSelect: React.FC<FormFieldSelect> = ({
  label,
  name,
  type,
  defaultValue,
  options,
}) => {
  const [value, setValue] = useState(defaultValue || "");

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border-gray-300 rounded-md shadow-sm p-2 w-full"
        autoComplete="off"
      >
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const CustomForm: React.FC<FormProps> = ({
  fields,
  onSubmit,
  className,
  submitLabel,
}) => {
  const loaderData = useLoaderData();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("CURRENTARGE", e.currentTarget);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      action={loaderData.action}
      method={loaderData.method}
      className={`${className}`}
    >
      {fields.map((field) => {
        if (field.type === "select") {
          return <FormSelect key={field.name} {...field} />;
        } else {
          return <FormInput key={field.name} {...field} />;
        }
      })}

      <div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          {submitLabel || "Enviar"}
        </button>
      </div>
    </Form>
  );
};

export default CustomForm;
