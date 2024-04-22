import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  constructor(private message: NzMessageService) {}

  private _baseUrl$ = new BehaviorSubject<string>('unset base url');

  public set baseUrl(baseUrl: string) {
    this._baseUrl$.next(baseUrl);
  }

  public get baseUrl() {
    return this._baseUrl$.value;
  }
}
