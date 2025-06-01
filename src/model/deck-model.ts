// Deck Model
import { PagingReqModel } from "@/util/api/base-api";

export interface DeckGetReq extends PagingReqModel {
  account_id: number;
  search_key?: string;
}

export interface DeckGetByIdReq {
  id: number;
}

export interface DeckCreateReq {
  title: string;
  description?: string;
  account_id: number;
}

export interface DeckModifyReq {
  id: number;
  title: string;
  description?: string;
}

export interface DeckDeleteReq {
  id: number;
}

// Response Data Interfaces
export interface DeckModel {
  id: number;
  title: string;
  description?: string;
  account_id: number;
}
