import { Form } from "@remix-run/react";
import { useRef } from "react";

export default function Search({ action }: SearchPropsType) {
  return (
    <Form
      method="get"
      action={action}
      className="py-1 px-3 flex space-x-2 w-full border border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600/90 focus-within:ring-offset-2 focus-within:ring-offset-indigo-50 transition duration-300 rounded"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 text-slate-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>

      <input
        type="text"
        className="flex-1 appearance-none outline-none placeholder:text-slate-600"
        placeholder="Type &amp; press enter to search..."
        name="search"
        aria-label="Enter text to search"
      />
    </Form>
  );
}
type SearchPropsType = {
  action: string;
};
