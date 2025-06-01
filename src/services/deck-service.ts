import { API_ENDPOINT } from "../const/api-endpoint";
import {
  DeckCreateReq,
  DeckDeleteReq,
  DeckGetByIdReq,
  DeckGetReq,
  DeckModel,
  DeckModifyReq,
} from "../model/deck-model";
import createAPI, { BaseResponse } from "../util/api/base-api";

class DeckService {
  static getDeck = (params: DeckGetReq): Promise<BaseResponse<DeckModel[]>> => {
    return createAPI({
      method: "GET",
      url: API_ENDPOINT.DECK_GET,
      params,
    });
  };

  static getDeckById = (
    params: DeckGetByIdReq
  ): Promise<BaseResponse<DeckModel>> => {
    return createAPI({
      method: "GET",
      url: API_ENDPOINT.DECK_GET_BY_ID,
      params,
    });
  };

  static createDeck = (
    body: DeckCreateReq
  ): Promise<BaseResponse<DeckModel>> => {
    return createAPI({
      method: "POST",
      url: API_ENDPOINT.DECK_CREATE,
      body,
    });
  };

  static modifyDeck = (
    body: DeckModifyReq
  ): Promise<BaseResponse<DeckModel>> => {
    return createAPI({
      method: "PUT",
      url: API_ENDPOINT.DECK_MODIFY,
      body,
    });
  };

  static deleteDeck = (
    params: DeckDeleteReq
  ): Promise<BaseResponse<DeckModel>> => {
    return createAPI({
      method: "DELETE",
      url: API_ENDPOINT.DECK_DELETE,
      params,
    });
  };
}

export default DeckService;
