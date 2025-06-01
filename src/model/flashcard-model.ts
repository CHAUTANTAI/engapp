// Flashcard Model
import { PagingReqModel } from "@/util/api/base-api";

export interface FlashcardModel {
  id: number;
  term: string;
  definition: string;
  deck_id: number;
}

// GET flashcard list
export interface FlashcardGetReq extends PagingReqModel {
  deck_id: number;
  search_key?: string;
}

// GET flashcard by id
export interface FlashcardGetByIdReq {
  id: number;
}

// CREATE
export interface FlashcardCreateReq {
  term: string;
  definition?: string;
  deck_id: number;
}

// MODIFY
export interface FlashcardModifyReq {
  id: number;
  term: string;
  definition: string;
}

// DELETE
export interface FlashcardDeleteReq {
  id: number;
}

export type FlashcardGetRes = FlashcardModel[];

export type FlashcardGetByIdRes = FlashcardModel;

export type FlashcardCreateRes = FlashcardModel;

export type FlashcardModifyRes = FlashcardModel;

export type FlashcardDeleteRes = FlashcardModel;
