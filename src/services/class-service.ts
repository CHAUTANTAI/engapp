import { API_ENDPOINT } from "../const/api-endpoint";
import { GetClassResModel } from "../model/class-model";
import createAPI, { BaseResponse } from "../util/api/base-api";

export class ClassService {
  static getClasses = (): Promise<BaseResponse<GetClassResModel>> => {
    return createAPI({
      method: "GET",
      url: API_ENDPOINT.GET_CLASS,
    });
  };
}
