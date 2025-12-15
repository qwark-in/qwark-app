import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';
import { StateStorage } from 'zustand/middleware';

export const SecureStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    // return (await getItemAsync(name)) || null;
    return getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await deleteItemAsync(name);
  },
};
