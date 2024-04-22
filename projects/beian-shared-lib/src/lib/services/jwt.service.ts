import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

interface TokenStorage {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private readonly storagePrefix = 'JwtService';
  private readonly storageTokenKey = this.storagePrefix + 'Token';

  constructor(private localStorageService: LocalStorageService) {}

  private _curToken$ = new BehaviorSubject<string | null>(null);

  get curToken$(): Observable<string | null> {
    return this._curToken$.asObservable();
  }

  get curToken(): string | null {
    return this._curToken$.value;
  }

  private set curToken(id: string | null) {
    this._curToken$.next(id);
  }

  public setToken(token: string, rememberMe: boolean = false) {
    this.curToken = token;

    if (rememberMe) {
      this.localStorageService.set<TokenStorage>(this.storageTokenKey, {
        token: token,
      });
    } else {
      this.localStorageService.remove(this.storageTokenKey);
    }
  }

  public logout() {
    this.curToken = null;
    this.removeTokenFromStorage();
  }

  /**
   * 只是返回localstorage中的token，需要调用者验证过期并调用setToken。
   */
  public loadTokenFromStorage(): string | null {
    if (!this.localStorageService.has(this.storageTokenKey)) {
      return null;
    }
    return this.localStorageService.get<TokenStorage>(this.storageTokenKey)
      .token;
  }

  public removeTokenFromStorage() {
    this.localStorageService.remove(this.storageTokenKey);
  }
}
