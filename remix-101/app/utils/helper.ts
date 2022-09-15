import type { cacheKVType } from "./model";

function getFromCache<T>(cache: cacheKVType<T>, key: string): T | null {
  if (cache[key] && cache[key].expiry > new Date()) return cache[key].results;
  return null;
}

function addToCache<T>(cache: cacheKVType<T>, key: string, data: T) {
  cache[key] = {
    results: data,
    expiry: new Date(new Date().setMinutes(new Date().getMinutes() + 3)),
  };
}

export { getFromCache, addToCache };
