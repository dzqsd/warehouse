export interface TransParams {
  id: number;
  startPlaces: number[];
  itemName: string;
  quantity: number;
  priority: number;
  isTimeFirst: boolean;
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
  isTimeFirst: boolean;
}

export interface TransportResponse {
  msg: string;
  state: boolean;
  result: TransRoute[];
}
