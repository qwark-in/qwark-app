import { StateStorage } from 'zustand/middleware';
import { openDB } from 'idb';

const db = await openDB('qwark', 1, {
  upgrade: (db) => {
    db.createObjectStore('keyval');
  },
});

export const zustandWebStorage: StateStorage = {
  getItem: async (name: string): Promise<any | null> => {
    console.log(name, 'has been retrieved');
    return (await db.get('keyval', name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    console.log(name, 'with value', value, 'has been saved');
    await db.put('keyval', value, name);
  },
  removeItem: async (name: string): Promise<void> => {
    console.log(name, 'has been deleted');
    await db.delete('keyval', name);
  },
};
