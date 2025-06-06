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

export interface SessionModel {
  session_id: number;
  account_id: number;
  refresh_token: string;
  user_agent: string | null;
  ip_address: string | null;
  created_at: string;
  expired_at: string;
}

export interface LoginModelRes {
  session: SessionModel;
  access_token: string;
}
