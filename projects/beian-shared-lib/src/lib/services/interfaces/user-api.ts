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

export enum AuthorityType {
  ROOT = 'root',
  ADMIN = 'admin',
  USER = 'user',
}

export interface LoginInfo {
  state: boolean;
  msg: string;
  token: string;
  id: number;
  name: string;
  authority: AuthorityType;
}

export interface RegistrationParams {
  name: string;
  password: string;
}

export interface RegistrationInfo {
  state: boolean;
  msg: string;
}
