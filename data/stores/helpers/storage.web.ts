import { StateStorage } from "zustand/middleware";
import { openDB, IDBPDatabase } from "idb";

let dbPromise: Promise<IDBPDatabase> | null = null;

const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB("qwark", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("keyval")) {
          db.createObjectStore("keyval");
        }
      },
    });
  }
  return dbPromise;
};

export const zustandStorage: StateStorage = {
  async getItem(name: string): Promise<string | null> {
    const db = await getDB();
    return (await db.get("keyval", name)) ?? null;
  },

  async setItem(name: string, value: string): Promise<void> {
    const db = await getDB();
    await db.put("keyval", value, name);
  },

  async removeItem(name: string): Promise<void> {
    const db = await getDB();
    await db.delete("keyval", name);
  },
};
