import { addToCache, getFromCache } from "~~/utils/helper";
import { cacheKVType, jsonPlaceholderUserType } from "../utils/model";

const cache: cacheKVType<jsonPlaceholderUserType[]> = {};

async function useUsersData(srchTxt: string) {
  let data: jsonPlaceholderUserType[] = [];
  if (!srchTxt) {
    data = await getAllUsers();
  } else {
    data = await getFilteredUsers(srchTxt.toLowerCase());
  }
  return data;
}
export default useUsersData;

export const getAllUsers = async (): Promise<jsonPlaceholderUserType[]> => {
  let cachedResults = getFromCache<jsonPlaceholderUserType[]>(
    cache,
    "user_all"
  ) as jsonPlaceholderUserType[];
  if (!!cachedResults) return cachedResults;
  let results: jsonPlaceholderUserType[] = await $fetch(
    "https://jsonplaceholder.typicode.com/users"
  );
  results.forEach((el) => (el.date = new Date()));
  addToCache<jsonPlaceholderUserType[]>(cache, "user_all", results);
  return results;
};

async function getFilteredUsers(
  srchTxt: string
): Promise<jsonPlaceholderUserType[]> {
  let cachedResults = getFromCache<jsonPlaceholderUserType[]>(
    cache,
    `user_${srchTxt}`
  ) as jsonPlaceholderUserType[];
  if (!!cachedResults) return cachedResults;
  let res = await getAllUsers();
  let filteredRes = res.filter(
    (el) =>
      el.name.toLowerCase().includes(srchTxt) ||
      el.username.toLowerCase().includes(srchTxt) ||
      el.email.toLowerCase().includes(srchTxt) ||
      el.website.toLowerCase().includes(srchTxt)
  );
  addToCache<jsonPlaceholderUserType[]>(cache, `user_${srchTxt}`, filteredRes);
  return filteredRes;
}
