import { redirect } from "@remix-run/cloudflare";
import type { LoaderFunction } from "@remix-run/cloudflare";
import Search from "~/components/Search";
import postService from "~/services/postService";
import { useLoaderData } from "@remix-run/react";
import Post from "~/components/Post";
import type { postType } from "~/utils/model";
import { motion } from "framer-motion";
import { slideDown } from "~/utils/animations";

export const loader: LoaderFunction = async ({ request }) => {
  let searchTxt = new URL(request.url).searchParams.get("search") || "";
  if (!searchTxt && request.url.includes("?")) return redirect("/");
  return await postService.getPostsData(searchTxt);
};
export default function Index() {
  const data = useLoaderData() as postType[];
  return (
    <div className="pt-2 pb-4 w-full flex items-center flex-col">
      <div className="w-11/12 max-w-5xl flex flex-col">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2 py-3">
          <span className="text-lg font-semibold text-gray-700 flex-1">
            User Posts from Cloudflare Worker
          </span>
          <div className="bg-white w-full lg:w-72">
            <Search action="/"></Search>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          {data.map((dt) => (
            <motion.div
              key={dt.id}
              variants={slideDown}
              initial="initial"
              animate="animate"
            >
              <Post key={dt.id} data={dt}></Post>
            </motion.div>
          ))}
          {data.length == 0 && (
            <motion.p
              className="text-center py-2 px-4 w-full text-orange-600 col-span-1 lg:col-span-2 font-semibold"
              variants={slideDown}
              initial="initial"
              animate="animate"
            >
              No data found...
            </motion.p>
          )}
        </div>
        {data.length > 0 && (
          <div
            className="bg-white w-full lg:w-72 self-end mt-4 hidden lg:block"
            v-if="data.length > 0"
          >
            <Search action="/"></Search>
          </div>
        )}
      </div>
    </div>
  );
}
