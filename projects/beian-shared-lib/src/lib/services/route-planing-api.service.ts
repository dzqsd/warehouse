import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import {
  SupplyPlanResponse,
  TransParams,
  TransportResponse,
  //SupplyDemandItem,
} from './interfaces/route-planing-api';
import { WarehouseItem } from './interfaces/warehouse-api';

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

  public trans$(params: TransParams[]) {
    return this.http.post<TransportResponse>(
      `${this.baseUrl}/algorithm/generatePathPlan`,
      params,
    );
  }

  public getItem$() {
    return this.http.get<WarehouseItem>(`${this.baseUrl}/graph/all`);
  }

  public getSupply() {
    return this.http.get<SupplyPlanResponse>(
      `${this.baseUrl}/algorithm/generatePlan`,
    );
  }
}
