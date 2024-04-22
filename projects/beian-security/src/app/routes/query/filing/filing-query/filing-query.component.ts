import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BaseApiService,
  FilingApiService,
  FilingInfoQuaryParams,
  FilingStatusLabels,
  filingTypeLabels,
} from 'beian-shared-lib';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  switchMap,
  finalize,
  filter,
  map,
  startWith,
  tap,
} from 'rxjs';
import { RouterModule } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FilingQueryParamsComponent } from '../../../filing-query-params/filing-query-params.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';

interface TableItem {
  type: string;
  enterpriseName: string;
  createTime: string;
  status: string;
  name: string;
  category: string;
  model: string;
  uuid: string;
}

@Component({
  selector: 'app-filing-query',
  standalone: true,
  templateUrl: './filing-query.component.html',
  styleUrl: './filing-query.component.less',
  imports: [
    CommonModule,
    RouterModule,
    NzDividerModule,
    NzListModule,
    NzTableModule,
    NzPageHeaderModule,
    NzCardModule,
    NzButtonModule,
    NzSpaceModule,
    FilingQueryParamsComponent,
  ],
})
export class FilingQueryComponent {
  constructor(
    private baseApiService: BaseApiService,
    private filingsService: FilingApiService,
  ) {}

  public pageSize$ = new BehaviorSubject<number>(10);
  public pageIndex$ = new BehaviorSubject<number>(1);
  public total$ = new BehaviorSubject<number>(1);
  public loading$ = new BehaviorSubject<boolean>(true);

  public filingQueryParams$ = new BehaviorSubject<FilingInfoQuaryParams>({});
  public visible$ = new BehaviorSubject<boolean>(false);

  public data$: Observable<TableItem[]> = combineLatest([
    this.pageIndex$,
    this.pageSize$,
    this.filingQueryParams$,
  ]).pipe(
    switchMap(([pageIndex, pageSize, params]) => {
      this.loading$.next(true);
      return this.filingsService
        .getFilingInfos$({
          ...{
            pageNum: pageIndex,
            pageSize: pageSize,
          },
          ...params,
        })
        .pipe(
          finalize(() => {
            this.loading$.next(false);
          }),
        );
    }),
    filter((res) => {
      return this.baseApiService.baseResSucess(res);
    }),
    tap((res) => {
      this.total$.next(res.data.totalSize);
    }),
    map((res) => {
      return res.data.results.map((item) => {
        return {
          type: filingTypeLabels[item.type],
          enterpriseName: item.enterpriseName,
          name: item.name,
          category: item.category,
          model: item.model,
          createTime: item.createTime !== null ? item.createTime : '未知时间',
          status:
            item.status !== null ? FilingStatusLabels[item.status] : '未知状态',
          uuid: item.uuid,
        };
      });
    }),
    startWith([]),
  );
}
