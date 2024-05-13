import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { ItemParams, WarehouseItem } from './interfaces/warehouse-api';

@Injectable({
  providedIn: 'root',
})
export class WarehouseApiService {
  constructor(
    private http: HttpClient,
    private baseApiService: BaseApiService,
  ) {}

  private get baseUrl() {
    return this.baseApiService.baseUrl;
  }

  public addItem$(params: ItemParams) {
    console.log(params);
    return this.http.post<ItemParams>(`${this.baseUrl}/test`, params);
  }

  public deleteItem$(params: ItemParams) {
    console.log(params);
    return this.http.post<ItemParams>(`${this.baseUrl}/remove`, params);
  }

  public getItem$() {
    return this.http.get<WarehouseItem>(`${this.baseUrl}/getItem`);
  }

  public test$() {
    return this.http.get<unknown>(`${this.baseUrl}/test`);
  }
}
