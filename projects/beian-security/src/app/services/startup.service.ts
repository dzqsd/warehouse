import { Injectable } from '@angular/core';
import { BaseApiService, JwtService, UserApiService } from 'beian-shared-lib';
import { catchError, map, of } from 'rxjs';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StartupService {
  constructor(
    private jwtService: JwtService,
    private baseApiService: BaseApiService,
    private userApiService: UserApiService,
    private userService: UserService,
  ) {}

  public startup() {
    this.baseApiService.baseUrl = environment.api.baseUrl;

    const token = this.jwtService.loadTokenFromStorage();
    if (token == null) {
      return of();
    }

    this.jwtService.setToken(token, true);

    return this.userApiService.refreshToken$().pipe(
      catchError(() => {
        return of(null);
      }),
      map((res) => {
        if (res === null) {
          return;
        }
        if (!res.state) {
          return;
        }
        this.userService.authority$.next(res.authority);
        this.userService.curUserId = res.id;
        this.jwtService.setToken(res.token, true);
        return;
      }),
    );
  }
}
