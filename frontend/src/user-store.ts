import { create } from "zustand";

type UserState = {
  isAuthenticated: boolean;
  authenticate: () => void;
  logout: () => void;
};
export const useUserStore = create<UserState>()((set) => ({
  isAuthenticated: false,
  authenticate: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
}));
