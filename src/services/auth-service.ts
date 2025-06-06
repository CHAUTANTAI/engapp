import { API_ENDPOINT } from "../const/api-endpoint";
import {
  LoginModel,
  LoginModelRes,
  RegisterReqModel,
} from "../model/account-model";
import createAPI, { BaseResponse } from "../util/api/base-api";

class AuthService {
  static createAccount = (body: RegisterReqModel): Promise<BaseResponse> => {
    return createAPI({
      method: "POST",
      url: API_ENDPOINT.CREATE_ACCOUNT,
      body: body,
    });
  };

  static login = (body: LoginModel): Promise<BaseResponse<LoginModelRes>> => {
    return createAPI({
      method: "POST",
      url: API_ENDPOINT.LOGIN,
      body: body,
    });
  };
}

export default AuthService;
