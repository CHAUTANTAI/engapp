import { GetListModel, PagingModel } from "./master-model";

export interface VocabModel {
  vocab_id: number;
  word: string;
  meaning: string;
  ipa?: string;
  stress?: number;
  example?: string;
  create_at: string;
  update_at: string;
  class_name: string;
  class_abbreviation: string;
  account_id: number;
}

export interface GetVocabReqModel extends PagingModel {
  account_id: number;
}

export interface GetVocabResModel extends GetListModel {
  vocabs: VocabModel[];
}

export interface CreateVocabReqModel {
  word: string;
  meaning: string;
  class_ids: number[];
  ipa?: string;
  stress?: number;
  example?: string;
  account_id: number;
}
