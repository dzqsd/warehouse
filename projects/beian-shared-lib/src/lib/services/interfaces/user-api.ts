export interface UserInfo {
  id: number;
  name: string;
  password: string;
  authority: string;
}

export interface LoginParams {
  name: string;
  password: string;
}

export interface LoginInfo {
  state: boolean;
  msg: string;
  token: string;
  id: number;
  name: string;
  authority: string;
}

export interface RegistrationParams {
  name: string;
  password: string;
}

export interface RegistrationInfo {
  state: boolean;
  msg: string;
}
