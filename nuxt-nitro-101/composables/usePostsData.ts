import { addToCache, getFromCache } from "~~/utils/helper";
import { cacheKVType, postType, userType } from "../utils/model";
import { getAllUsers } from "./useUsersData";

const cache: cacheKVType<postType[]> = {};

async function usePostsData(srchTxt: string) {
  let data: postType[] = [];
  if (!srchTxt) {
    data = await getAllPosts();
  } else {
    data = await getFilteredPosts(srchTxt.toLowerCase());
  }
  return data;
}
export default usePostsData;

const getAllPosts = async (): Promise<postType[]> => {
  let cachedResults = getFromCache<postType[]>(cache, "post_all") as postType[];
  if (!!cachedResults) return cachedResults;
  let results: postType[] = await $fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );
  await enrichPosts(results);
  addToCache<postType[]>(cache, "post_all", results);
  return results;
};
async function enrichPosts(results: postType[]) {
  const users = await getAllUsers();
  results.forEach((el, idx) => {
    el.date = new Date();
    el.user = users.find((userEl) => userEl.id == el.userId) as userType;
  });
}
async function getFilteredPosts(srchTxt: string): Promise<postType[]> {
  let cachedResults = getFromCache<postType[]>(
    cache,
    `post_${srchTxt}`
  ) as postType[];
  if (!!cachedResults) return cachedResults;
  let res = await getAllPosts();
  let filteredRes = res.filter(
    (el) =>
      el.body.toLowerCase().includes(srchTxt) ||
      el.title.toLowerCase().includes(srchTxt) ||
      (el.user && el.user.username.toLowerCase().includes(srchTxt))
  );
  addToCache<postType[]>(cache, `post_${srchTxt}`, filteredRes);
  return filteredRes;
}
