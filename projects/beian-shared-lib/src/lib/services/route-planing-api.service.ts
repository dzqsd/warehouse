import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { TransParams } from './interfaces/route-planing-api';

@Injectable({
  providedIn: 'root',
})
export class RoutePlaningApiService {
  constructor(
    private http: HttpClient,
    private baseApiService: BaseApiService,
  ) {}

  private get baseUrl() {
    return this.baseApiService.baseUrl;
  }

  public transItem$(params: TransParams) {
    console.log(params);
    return this.http.post<TransParams>(`${this.baseUrl}/trans`, params);
  }
}