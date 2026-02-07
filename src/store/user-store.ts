import { create } from "zustand";

interface UserStore {
  email: string | null;
  name: string | null;
  username: string | null;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setUsername: (username: string) => void;
  clear: () => void;
}

export const useUserStore = create<UserStore>()(
  (set) => ({
    email: null,
    name: null,
    username: null,
    setEmail: (email: string) => set({ email }),
    setName: (name: string) => set({ name }),
    setUsername: (username: string) => set({ username }),
    clear: () => set({ email: null, name: null, username: null }),
  })
);
