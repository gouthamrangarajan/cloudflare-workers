import { addToCache, getFromCache } from "../utils/helper";
import type { cacheKVType, postType, userType } from "../utils/model";
import userService from "./userService";

const cache: cacheKVType<postType[]> = {};

async function getPostsData(srchTxt: string) {
  let data: postType[] = [];
  if (!srchTxt) {
    data = await getAllPosts();
  } else {
    data = await getFilteredPosts(srchTxt.toLowerCase());
  }
  return data;
}
const postService = { getPostsData };
export default postService;

const getAllPosts = async (): Promise<postType[]> => {
  let cachedResults = getFromCache<postType[]>(cache, "post_all") as postType[];
  if (cachedResults) return cachedResults;
  let results: postType[] = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  ).then((resp) => resp.json());
  await enrichPosts(results);
  addToCache<postType[]>(cache, "post_all", results);
  return results;
};
async function enrichPosts(results: postType[]) {
  const users = await userService.getAllUsers();
  results.forEach((el) => {
    el.date = new Date();
    el.user = users.find((userEl) => userEl.id == el.userId) as userType;
  });
}
async function getFilteredPosts(srchTxt: string): Promise<postType[]> {
  let cachedResults = getFromCache<postType[]>(
    cache,
    `post_${srchTxt}`
  ) as postType[];
  if (cachedResults) return cachedResults;
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
