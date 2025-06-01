import { create } from "zustand";
import {
  DeckModel,
  DeckGetReq,
  DeckGetByIdReq,
  DeckCreateReq,
  DeckModifyReq,
  DeckDeleteReq,
} from "@/model/deck-model";
import DeckService from "@/services/deck-service";
import { BaseResponse } from "@/util/api/base-api";

interface DeckStore {
  total_count: number;
  decks: DeckModel[];
  deckSelected: DeckModel | undefined;

  fetchDecks: (
    params: DeckGetReq
  ) => Promise<BaseResponse<DeckModel[]> | undefined>;
  fetchDeckById: (params: DeckGetByIdReq) => Promise<DeckModel | undefined>;
  createDeck: (body: DeckCreateReq) => Promise<DeckModel | undefined>;
  modifyDeck: (body: DeckModifyReq) => Promise<DeckModel | undefined>;
  deleteDeck: (params: DeckDeleteReq) => Promise<DeckModel | undefined>;

  resetDeckList: () => void;
  resetDeckSelected: () => void;
}

const useDeckStore = create<DeckStore>((set) => ({
  total_count: 0,
  decks: [],
  deckSelected: undefined,

  fetchDecks: async (params) => {
    try {
      const res = await DeckService.getDeck(params);
      if (res.data) {
        set({ decks: res.data, total_count: res.total_count });
      } else {
        set({ decks: [], total_count: 0 });
      }
      return res;
    } catch (err) {
      console.log(err);
      set({ decks: [], total_count: 0 });
      return undefined;
    }
  },

  fetchDeckById: async (params) => {
    try {
      const res = await DeckService.getDeckById(params);
      if (res.data) {
        set({ deckSelected: res.data });
        return res.data;
      } else {
        set({ deckSelected: undefined });
        return undefined;
      }
    } catch (err) {
      console.log(err);
      set({ deckSelected: undefined });
      return undefined;
    }
  },

  createDeck: async (body) => {
    try {
      const res = await DeckService.createDeck(body);
      return res.data || undefined;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },

  modifyDeck: async (body) => {
    try {
      const res = await DeckService.modifyDeck(body);
      return res.data || undefined;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },

  deleteDeck: async (params) => {
    try {
      const res = await DeckService.deleteDeck(params);
      return res.data || undefined;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },

  resetDeckList: () => set({ decks: [], total_count: 0 }),
  resetDeckSelected: () => set({ deckSelected: undefined }),
}));

export default useDeckStore;
