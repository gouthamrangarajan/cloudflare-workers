import { useLoaderData } from "@remix-run/react";
import UserTable from "~/components/UserTable";
import userService from "~/services/userService";
import type { userType } from "~/utils/model";
import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import Search from "~/components/Search";

export const loader: LoaderFunction = async ({ request }) => {
  let searchTxt = new URL(request.url).searchParams.get("search") || "";
  if (!searchTxt && request.url.includes("?")) return redirect("/user");
  let jsonPlaceholderData = await userService.getUsersData(searchTxt);
  let userData: userType[] = jsonPlaceholderData.map((el) => ({
    id: el.id,
    date: el.date,
    email: el.email,
    name: el.name,
    phone: el.phone,
    username: el.username,
    website: el.website,
  }));
  return userData;
};
export default function Index() {
  const data = useLoaderData() as userType[];
  return (
    <div className="pt-20 pb-2 w-full flex flex-col items-center">
      <div className="bg-white shadow shadow-sky-600/80 rounded-xl py-2 lg:py-4 px-4 lg:px-6 w-11/12 lg:w-8/12 flex flex-col">
        <span className="text-lg font-semibold text-gray-700 mb-6">
          User Table from Cloudflare Worker
        </span>
        <div className="w-full lg:w-72 self-end mb-1">
          <Search></Search>
        </div>
        <UserTable data={data}></UserTable>
      </div>
    </div>
  );
}
