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
export interface WarehouseItem {
  place: string;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
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
