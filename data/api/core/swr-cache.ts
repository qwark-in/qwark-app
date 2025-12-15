/**
 * @name swr-cache
 *
 * @description
 * Provider for data fetching APIs using SWR (stale-while-revalidate) pattern
 * (These APIs use vercel's swr library)
 */

/**
 * Imports
 */
// React and RN

// Libraries

// Local (e.g. this and other workspaces)

/**
 * Types and interfaces
 */
type SWRCacheType = {
  set: (key: string, value: any) => void;
  get: (key: string) => any;
};

/**
 * Helpers
 */
const persistCacheKeys = [`/user`];

/**
 * Method to setup the cache storage instance for SWR, using singleton pattern.
 * This is called by SWR global provider to setup an mmkv storage for the APIs
 * that use SWR.
 * @param {SWRCacheType} params Interface of the cache storage with SWR library
 * (getter and setter for the storage)
 * @returns Cache storage instance and method to be called to persist the cache
 */
export const setupSWRCache = ({ set, get }: SWRCacheType) => {
  const appCache = get("app-cache");
  const swrCacheMap = new Map<string, any>(
    appCache ? JSON.parse(appCache) : []
  );

  const persistCache = () => {
    const prevCache = get("app-cache");
    const prevMap = new Map(prevCache ? JSON.parse(prevCache) : []);

    persistCacheKeys.forEach((key) => {
      for (const [k, val] of swrCacheMap.entries()) {
        if (k.includes(key)) {
          prevMap.set(k, val);
        }
      }
    });
    const newAppCache = JSON.stringify(Array.from(prevMap.entries()));
    set("app-cache", newAppCache);
  };

  return {
    persistCache,
    swrCacheMap,
  };
};
