import { API_ENDPOINT } from "../const/api-endpoint";
import { PagingModel } from "../model/master-model";
import { CreateVocabReqModel, GetVocabResModel } from "../model/vocab-model";
import createAPI, { BaseResponse } from "../util/api/base-api";

export class VocabService {
  static getVocabs = (
    req: PagingModel
  ): Promise<BaseResponse<GetVocabResModel>> => {
    return createAPI({
      method: "GET",
      url: API_ENDPOINT.GET_VOCAB,
      params: req,
    });
  };
  static createVocab = (
    body: CreateVocabReqModel
  ): Promise<BaseResponse> => {
    return createAPI({
      method: "POST",
      url: API_ENDPOINT.CREATE_VOCAB,
      body: body,
    });
  };
}
