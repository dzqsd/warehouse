import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import { ItemParams } from './interfaces/warehouse-api';

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
    return this.http.post<ItemParams>(
      `${this.baseUrl}/your/remove/item/endpoint`,
      params,
    );
  }
}
