import { API_ENDPOINT } from "../const/api-endpoint";
import { AuthSchemaType } from "../schema/login-schema";
import createAPI, { BaseResponse } from "../util/api/base-api";

class AuthService {
  static createAccount = (body: AuthSchemaType): Promise<BaseResponse> => {
    return createAPI({
      method: "POST",
      url: API_ENDPOINT.CREATE_ACCOUNT,
      body: body,
    });
  };

  static login = (body: AuthSchemaType):Promise<BaseResponse> => {
    return createAPI({
      method: 'POST',
      url: API_ENDPOINT.LOGIN,
      body: body,
    })
  }
}

export default AuthService;
