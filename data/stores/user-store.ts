import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { zustandStorage } from "./helpers/storage";
import { UserState, UserActions } from "data/models/user";

const initialUserState: UserState = {
  user_id: "",
  name: {
    first: "",
    middle: "",
    last: "",
  },
  joining_time: "",
  dob: "",
  pan: "",
  phone: "",
  email: "",
  marital_status: null,
  gender: null,
};

export const useUserStore = create<UserState & UserActions>()(
  immer(
    persist(
      (set) => ({
        ...initialUserState,
        setState: (newState) =>
          set((state) => {
            for (const key in newState) {
              if (state.hasOwnProperty(key)) {
                state[key] = newState[key];
              }
            }
          }),
        resetUser: () =>
          set(() => ({
            ...initialUserState,
          })),
      }),
      {
        name: "user-storage",
        storage: createJSONStorage(() => zustandStorage),
      }
    )
  )
);
