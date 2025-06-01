import { API_ENDPOINT } from "../const/api-endpoint";
import {
  FlashcardCreateReq,
  FlashcardCreateRes,
  FlashcardDeleteReq,
  FlashcardDeleteRes,
  FlashcardGetByIdReq,
  FlashcardGetByIdRes,
  FlashcardGetReq,
  FlashcardGetRes,
  FlashcardModifyReq,
  FlashcardModifyRes,
} from "../model/flashcard-model";
import createAPI, { BaseResponse } from "../util/api/base-api";

class FlashcardService {
  static getFlashcard = (
    params: FlashcardGetReq
  ): Promise<BaseResponse<FlashcardGetRes>> => {
    return createAPI({
      method: "GET",
      url: API_ENDPOINT.FLASHCARD_GET,
      params,
    });
  };

  static getFlashcardById = (
    params: FlashcardGetByIdReq
  ): Promise<BaseResponse<FlashcardGetByIdRes>> => {
    return createAPI({
      method: "GET",
      url: API_ENDPOINT.FLASHCARD_GET_BY_ID,
      params,
    });
  };

  static createFlashcard = (
    body: FlashcardCreateReq
  ): Promise<BaseResponse<FlashcardCreateRes>> => {
    return createAPI({
      method: "POST",
      url: API_ENDPOINT.FLASHCARD_CREATE,
      body,
    });
  };

  static modifyFlashcard = (
    body: FlashcardModifyReq
  ): Promise<BaseResponse<FlashcardModifyRes>> => {
    return createAPI({
      method: "PUT",
      url: API_ENDPOINT.FLASHCARD_MODIFY,
      body,
    });
  };

  static deleteFlashcard = (
    body: FlashcardDeleteReq
  ): Promise<BaseResponse<FlashcardDeleteRes>> => {
    return createAPI({
      method: "DELETE",
      url: API_ENDPOINT.FLASHCARD_DELETE,
      body,
    });
  };
}

export default FlashcardService;
