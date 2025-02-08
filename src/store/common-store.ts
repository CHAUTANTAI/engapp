import { create } from "zustand";

interface CommonStore {
  isLoading: boolean;
  showSpinner: () => void;
  hideSpinner: () => void;
}

const showSpinner = () => {
  useCommonStore.setState({ isLoading: true });
};

const hideSpinner = () => {
  useCommonStore.setState({ isLoading: false });
};
export const useCommonStore = create<CommonStore>(() => ({
  isLoading: false,
  showSpinner,
  hideSpinner,
}));
