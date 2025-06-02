export interface AccountModel {
  email: string;
  rule_id: number;
  account_id: number;
}

export interface LoginModel {
  email: string;
  rule_id: number;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormModel {
  email: string;
  password: string;
}


export interface RegisterReqModel {
  email: string;
  password: string;
  rule_id: number;
}
