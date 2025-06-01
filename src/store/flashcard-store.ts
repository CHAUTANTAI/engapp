import { create } from "zustand";
import {
  FlashcardModel,
  FlashcardGetReq,
  FlashcardGetByIdReq,
  FlashcardCreateReq,
  FlashcardModifyReq,
  FlashcardDeleteReq,
} from "@/model/flashcard-model";
import FlashcardService from "@/services/flashcard-service";
import { BaseResponse } from "@/util/api/base-api";

interface FlashcardStore {
  total_count: number;
  flashcards: FlashcardModel[];
  flashcardSelected: FlashcardModel | undefined;

  fetchFlashcards: (
    params: FlashcardGetReq
  ) => Promise<BaseResponse<FlashcardModel[]> | undefined>;

  fetchFlashcardById: (
    params: FlashcardGetByIdReq
  ) => Promise<FlashcardModel | undefined>;

  createFlashcard: (
    body: FlashcardCreateReq
  ) => Promise<FlashcardModel | undefined>;

  modifyFlashcard: (
    body: FlashcardModifyReq
  ) => Promise<FlashcardModel | undefined>;

  deleteFlashcard: (
    body: FlashcardDeleteReq
  ) => Promise<FlashcardModel | undefined>;

  resetFlashcardList: () => void;
  resetFlashcardSelected: () => void;
}

const useFlashcardStore = create<FlashcardStore>((set) => ({
  total_count: 0,
  flashcards: [],
  flashcardSelected: undefined,

  fetchFlashcards: async (params) => {
    try {
      const res = await FlashcardService.getFlashcard(params);
      if (res.data) {
        set({ flashcards: res.data, total_count: res.total_count });
      } else {
        set({ flashcards: [], total_count: 0 });
      }
      return res;
    } catch (err) {
      console.log(err);
      set({ flashcards: [], total_count: 0 });
      return undefined;
    }
  },

  fetchFlashcardById: async (params) => {
    try {
      const res = await FlashcardService.getFlashcardById(params);
      if (res.data) {
        set({ flashcardSelected: res.data });
        return res.data;
      } else {
        set({ flashcardSelected: undefined });
        return undefined;
      }
    } catch (err) {
      console.log(err);
      set({ flashcardSelected: undefined });
      return undefined;
    }
  },

  createFlashcard: async (body) => {
    try {
      const res = await FlashcardService.createFlashcard(body);
      return res.data || undefined;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },

  modifyFlashcard: async (body) => {
    try {
      const res = await FlashcardService.modifyFlashcard(body);
      return res.data || undefined;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },

  deleteFlashcard: async (body) => {
    try {
      const res = await FlashcardService.deleteFlashcard(body);
      return res.data || undefined;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },

  resetFlashcardList: () => set({ flashcards: [], total_count: 0 }),
  resetFlashcardSelected: () => set({ flashcardSelected: undefined }),
}));

export default useFlashcardStore;
