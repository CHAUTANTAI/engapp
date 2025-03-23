import { API_ENDPOINT } from "../const/api-endpoint";
import {
  GetPracticeReqModel,
  GetPracticeResModel,
  CreatePracticeBodyModel,
} from "../model/practice-model";
import createAPI, { BaseResponse } from "../util/api/base-api";

export class PracticeService {
  static getPractice = (
    req: GetPracticeReqModel
  ): Promise<BaseResponse<GetPracticeResModel>> => {
    return createAPI({
      method: "GET",
      url: API_ENDPOINT.GET_PRACTICE,
      params: req,
    });
  };
  static createPractice = (
    body: CreatePracticeBodyModel
  ): Promise<BaseResponse> => {
    return createAPI({
      method: "POST",
      url: API_ENDPOINT.CREATE_PRACTICE,
      body: body,
    });
  };
}
