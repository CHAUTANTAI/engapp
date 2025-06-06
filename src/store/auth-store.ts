import { SessionModel } from "@/model/account-model";
import { create } from "zustand";

interface AuthStore {
  session?: SessionModel;
  setSession: (session: SessionModel) => void;
  accessToken: string;
  setAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  session: undefined,
  accessToken: "",
  setSession: (session) => set({ session }),
  setAccessToken: (token) => set({ accessToken: token }),
}));
