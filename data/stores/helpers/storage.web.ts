import type { StateStorage } from "zustand/middleware";
import { get, set, del } from "idb-keyval";

const isBrowser =
  typeof window !== "undefined" && typeof window.indexedDB !== "undefined";

export const zustandStorage: StateStorage = {
  getItem: async (key: string) => {
    if (!isBrowser) return null;

    const value = await get(key);
    return value ?? null;
  },

  setItem: async (key: string, value: string) => {
    if (!isBrowser) return;
    await set(key, value);
  },

  removeItem: async (key: string) => {
    if (!isBrowser) return;
    await del(key);
  },
};
