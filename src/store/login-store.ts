import { create } from "zustand";

interface LoginStore {
  mode: number;
}

export const useLoginStore = create<LoginStore>(() => ({
  mode: 1,
}));
