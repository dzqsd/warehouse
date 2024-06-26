import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient } from '@angular/common/http';
import {
  SupplyPlanResponse,
  TransParams,
  TransportResponse,
  //SupplyDemandItem,
  EmergencyRequest,
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

  public getSupply1() {
    return this.http.get<SupplyPlanResponse>(
      `${this.baseUrl}/algorithm/generatePlan`,
    );
  }

  public getSupply2() {
    return this.http.get<SupplyPlanResponse>(
      `${this.baseUrl}/algorithm/generateBlackHolePlan`,
    );
  }

  // 应急运输
  public emergencySupply$(params: EmergencyRequest) {
    return this.http.post<SupplyPlanResponse>(
      `${this.baseUrl}/algorithm/generateEmergencyPlan`,
      params,
    );
  }
}
