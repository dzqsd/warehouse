import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  LoginInfo,
  LoginParams,
  RegistrationInfo,
  UserInfo,
  RegistrationParams,
} from './interfaces/user-api';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(
    private http: HttpClient,
    private baseApiService: BaseApiService,
  ) {}

  private get baseUrl() {
    return this.baseApiService.baseUrl;
  }

  public login$(params: LoginParams) {
    return this.http.post<LoginInfo>(`${this.baseUrl}/user/login`, params);
  }

  public refreshToken$() {
    return this.http.get<LoginInfo>(`${this.baseUrl}/user/refresh`);
  }

  public getUserInfoById$(id: number): Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.baseUrl}/user/get/${id}`);
  }

  public registration$(
    params: RegistrationParams,
  ): Observable<RegistrationInfo> {
    return this.http.post<RegistrationInfo>(
      `${this.baseUrl}/user/registration`,
      params,
    );
  }
}
