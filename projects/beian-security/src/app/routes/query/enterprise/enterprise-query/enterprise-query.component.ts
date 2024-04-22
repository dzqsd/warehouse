import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BaseApiService,
  EnterpriseApiService,
  EnterpriseInfoQuaryParams,
  EnterpriseStatusLabels,
} from 'beian-shared-lib';
import { RouterModule } from '@angular/router';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTableModule } from 'ng-zorro-antd/table';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  switchMap,
  finalize,
  filter,
  map,
  tap,
  startWith,
} from 'rxjs';
import { EnterpriseQueryParamsComponent } from '../../../enterprise-query-params/enterprise-query-params.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { FilingQueryParamsComponent } from '../../../filing-query-params/filing-query-params.component';

interface TableItem {
  name: string;
  createTime: string;
  status: string;
  uuid: string;
}

@Component({
  selector: 'app-enterprise-query',
  standalone: true,
  templateUrl: './enterprise-query.component.html',
  styleUrl: './enterprise-query.component.less',
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
    EnterpriseQueryParamsComponent,
  ],
})
export class EnterpriseQueryComponent {
  constructor(
    private baseApiService: BaseApiService,
    private enterpriseApiService: EnterpriseApiService,
  ) {}

  enterpriseStatusLabels = EnterpriseStatusLabels;

  public pageSize$ = new BehaviorSubject<number>(10);
  public pageIndex$ = new BehaviorSubject<number>(1);
  public total$ = new BehaviorSubject<number>(1);
  public loading$ = new BehaviorSubject<boolean>(true);

  public enterpriseQueryParams$ =
    new BehaviorSubject<EnterpriseInfoQuaryParams>({});
  public visible$ = new BehaviorSubject<boolean>(false);

  public data$: Observable<TableItem[]> = combineLatest([
    this.pageIndex$,
    this.pageSize$,
    this.enterpriseQueryParams$.pipe(
      tap(() => {
        this.pageIndex$.next(1);
      }),
    ),
  ]).pipe(
    switchMap(([index, pageSize, params]) => {
      this.loading$.next(true);
      return this.enterpriseApiService
        .getEnterpriseInfos$({
          ...{
            pageNum: index,
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
    map((res): TableItem[] => {
      return res.data.results.map((item) => {
        return {
          name: item.name,
          createTime: item.createTime ? item.createTime : '',
          status: this.enterpriseStatusLabels[item.status],
          uuid: item.uuid,
        };
      });
    }),
    startWith([]),
  );
}
