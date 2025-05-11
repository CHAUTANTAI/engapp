import { create } from "zustand";

interface MasterDataStore {
  session: boolean;
  getSession: () => void;
}

export const getSession = () => {
  try {
    useMasterDataStore.setState({ session: true });
  } catch {
    useMasterDataStore.setState({ session: false });
  }
};

export const useMasterDataStore = create<MasterDataStore>(() => ({
  session: false,
  getSession,
}));
