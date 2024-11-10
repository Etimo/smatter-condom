import { create } from "zustand";

type User = {
  username: string;
  email: string;
};

type UserState = {
  isAuthenticated: boolean;
  authenticate: (user: User) => void;
  logout: () => void;
  info: User | null;
};
export const useUserStore = create<UserState>()((set) => ({
  isAuthenticated: false,
  authenticate: (user: User) => set({ isAuthenticated: true, info: user }),
  logout: () => set({ isAuthenticated: false }),
  info: null,
}));
