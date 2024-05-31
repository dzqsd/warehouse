import { GraphNode } from './warehouse-api';

export interface TransParams {
  endPlaces: number[];
  startPlaces: number[];
  itemName: string;
  quantity: number[];
}

//添加到计划的返回结果
export interface SupplyDemandResponse {
  msg: string;
  state: boolean;
  'supply demands': {
    'Express Fee First List': SupplyDemandItem[];
    'Time First List': SupplyDemandItem[];
  };
}

export interface SupplyDemandItem {
  goodsName: string;
  id_list: number[];
  amount_list: number[];
  priority_list: number[];
}

//运输结果
export interface Edge {
  id: number;
  u: number;
  v: number;
  flow: number;
  cost: number;
}

export interface TransRoute {
  cost: number;
  edges: Edge[];
  name: string;
}

export interface TransportResponse {
  msg: string;
  state: boolean;
  result: TransRoute[];
}

export interface SupplyTransportEdge {
  startTime: number;
  endTime: number;
  startId: number;
  endId: number;
  goodsName: string;
  goodsAmount: number;
}

export interface SupplyPlanResponse {
  msg: string;
  state: boolean;
  transportPlan: SupplyTransportEdge[];
  graph: GraphNode[];
}

// 应急运输
export interface EmergencyRequest {
  id: number;
  quantity: number;
  itemName: string;
}
