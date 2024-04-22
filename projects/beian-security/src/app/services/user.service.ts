import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BaseApiService,
  JwtService,
  UserApiService,
  UserInfo,
  RegistrationInfo,
} from 'beian-shared-lib';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject, Observable, first, map, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private router: Router,
    private message: NzMessageService,
    private baseApiService: BaseApiService,
    private userApiService: UserApiService,
    private jwtService: JwtService,
  ) {}

  private _curUserId$ = new BehaviorSubject<number | null>(null);

  get curUserId$(): Observable<number | null> {
    return this._curUserId$.asObservable();
  }

  get curUserId(): number | null {
    return this._curUserId$.value;
  }

  set curUserId(id: number | null) {
    this._curUserId$.next(id);
  }

  public curUserInfo$: Observable<UserInfo | null> = this.curUserId$.pipe(
    switchMap((id) => {
      if (id === null) {
        return of(null);
      }
      return this.userApiService.getUserInfoById$(id);
    }),
  );

  public login$(
    username: string,
    password: string,
    rememberMe: boolean = false,
  ): Observable<boolean> {
    return this.userApiService
      .login$({
        name: username,
        password: password,
      })
      .pipe(
        map((res) => {
          if (!res.state) {
            this.message.error('用户名或密码错误');
            return false;
          }

          // 先设置token，如果先更新id，则触发请求用户信息，而此时token未设置。
          this.jwtService.setToken(res.token, rememberMe);

          this.message.create('success', '登录成功');
          this.curUserId = res.id;
          return true;
        }),
      );
  }

  public registration$(
    username: string,
    password: string,
  ): Observable<boolean> {
    return this.userApiService
      .registration$({
        name: username,
        password: password,
      })
      .pipe(
        map((res) => {
          if (!res.state) {
            this.message.error('注册失败');
            return false;
          }
          this.message.create('success', '注册成功');
          return true;
        }),
      );
  }

  public logout() {
    this.curUserId = null;
    this.jwtService.logout();
    this.router.navigate(['']).then();
  }
}
