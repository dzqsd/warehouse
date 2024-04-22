export interface BaseRes<T> {
  code: number;
  msg: string;
  data: T;
}

export interface BasePage<T> {
  totalSize: number;
  pageNum: number;
  pageSize: number;
  results: T[];
}
