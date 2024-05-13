import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder,
} from 'ng-zorro-antd/table';

export interface ItemParams {
  place: string;
  itemName: string;
  quantity: number;
}

export interface GraphNode {
  id: number;
  name: string;
  to_list: number[];
  timecost_list: number[];
  expressfee_list: number[];
  goods_list: string[];
  goodsamount_list: number[];
}

export interface WarehouseItem {
  msg: string;
  state: boolean;
  graph: GraphNode[];
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
