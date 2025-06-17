import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      userCrew: null,
      setUser: (user) => set({ user }),
      setUserCrew: (userCrew) => set({ userCrew }),
      clearUser: () => set({ user: null }),
      clearUserCrew: () => set({ userCrew: null }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user, userCrew: state.userCrew }),
    }
  )
);
