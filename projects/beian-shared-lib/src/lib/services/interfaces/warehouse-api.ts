import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';

export interface ItemParams {
  id: number;
  itemName: string;
  quantity: number;
}

// export interface GraphNode {
//   id: number;
//   name: string;
//   to_list: number[];
//   timecost_list: number[];
//   expressfee_list: number[];
//   capacity_list: number[];
//   goods_list: string[];
//   goodsamount_list: number[];
// }

// export interface WarehouseItem {
//   msg: string;
//   state: boolean;
//   graph: GraphNode[];
// }
export interface WarehouseItem {
  msg: string;
  state: boolean;
  graph: GraphNode[];
}

export interface GraphNode {
  id: number;
  name: string;
  edgeCostList: EdgeCost[];
  goodsList: Goods[];
  isDelete: boolean;
}

export interface EdgeCost {
  toId: number;
  fee: number;
  time: number;
  capacity: number;
}

export interface Goods {
  name: string;
  amount: number;
  threshold: number;
}

export interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<WarehouseItem> | null;
  listOfFilter: NzTableFilterList;
  filterFn: NzTableFilterFn<WarehouseItem> | null;
  filterMultiple: boolean;
  sortDirections: NzTableSortOrder[];
}
