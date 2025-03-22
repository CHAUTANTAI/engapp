import { create } from "zustand";
import { AccountModel } from "../model/account-model";

interface AuthStore {
  accountData: AccountModel | null;
}

export const useAuthStore = create<AuthStore>(() => ({
  accountData: null,
}));
