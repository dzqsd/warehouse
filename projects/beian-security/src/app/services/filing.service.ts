import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FilingTypeInfos } from '../interfaces/filing';
import {
  CustomFormItemInfos,
  CustomDescriptionItemInfos,
} from 'beian-shared-lib';

@Injectable({
  providedIn: 'root',
})
export class FilingService {
  constructor() {}

  public getFilingTypeInfos$(): Observable<FilingTypeInfos> {
    return of([
      { id: 0, name: '国内生产管制刀具备案' },
      { id: 1, name: '出口管制刀具备案' },
      { id: 2, name: '进口管制刀具备案' },
    ]);
  }

  public getFilingInfoById$(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id: number,
  ): Observable<CustomDescriptionItemInfos> {
    return of([
      {
        key: '刀具名称',
        descriptionType: 'string',
        description: { title: '刀具名称', value: '大马士9寸厨房刀' },
      },
      {
        key: '刀具品种',
        descriptionType: 'string',
        description: { title: '刀具品种', value: '厨师刀' },
      },
      {
        key: '生产数量',
        descriptionType: 'string',
        description: { title: '生产数量', value: '100' },
      },
    ]);
  }

  public getFilingFormItemInfosById$(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id: number,
  ): Observable<CustomFormItemInfos> {
    return of([]);
  }
}
