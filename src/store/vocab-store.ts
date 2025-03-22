import { create } from "zustand";
import { GetVocabReqModel, GetVocabResModel } from "../model/vocab-model";
import { VocabService } from "../services/vocab-service";

interface VocabStore {
  vocabs_data: GetVocabResModel;
  getVocabs: (req: GetVocabReqModel) => void;
  isLoading: boolean;
}

const getVocabs = async (req: GetVocabReqModel) => {
  useVocabStore.setState({ isLoading: true });
  try {
    const { data, status } = await VocabService.getVocabs(req);
    if (status === 200 && data) {
      console.log(data.total_records);
      useVocabStore.setState({ vocabs_data: data });
    } else {
      useVocabStore.setState({ vocabs_data: { total_records: 0, vocabs: [] } });
    }
  } catch {
    useVocabStore.setState({ vocabs_data: { total_records: 0, vocabs: [] } });
  } finally {
    useVocabStore.setState({ isLoading: false });
  }
};

export const useVocabStore = create<VocabStore>(() => ({
  isLoading: false,
  vocabs_data: { total_records: 0, vocabs: [] },
  getVocabs,
}));
