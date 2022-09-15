import { Link, useLocation } from "@remix-run/react";
import { motion } from "framer-motion";

export default function Nav() {
  const location = useLocation();
  return (
    <nav className="py-2 px-4 sticky top-0 shadow w-full bg-white z-10">
      <div className="flex w-full items-center justify-between max-w-5xl mx-auto">
        <div className="flex-1 flex items-center space-x-6">
          <span className="text-xl text-sky-700 font-semibold">Remix</span>
          <span className="text-lg text-orange-500 font-semibold pt-1">
            Cloudflare Worker
          </span>
        </div>
        <ul className="list-none flex items-center space-x-3 text-indigo-600">
          <li
            className="
            relative transition duration-300 font-semibold"
          >
            <Link
              to="/"
              className="apperance-none outline-none hover:opacity-90 transition duration-300 focus:ring-1 focus:ring-indigo-500 p-1 rounded"
            >
              Posts
            </Link>
            {location.pathname == "/" && (
              <motion.span
                className="h-0.5 rounded absolute top-6 left-0 w-full bg-indigo-500"
                layoutId="indicator"
              ></motion.span>
            )}
          </li>
          <li
            className="
          relative transition duration-300 font-semibold"
          >
            <Link
              to="/user"
              className="apperance-none outline-none hover:opacity-90 transition duration-300 focus:ring-1 focus:ring-indigo-500 p-1 rounded"
            >
              Users
            </Link>
            {location.pathname.includes("user") && (
              <motion.span
                className="h-0.5 rounded absolute top-6 left-0 w-full bg-indigo-500"
                layoutId="indicator"
              ></motion.span>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
