import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  CustomDescriptionItemInfos,
  CustomFormItemInfos,
} from 'beian-shared-lib';

@Injectable({
  providedIn: 'root',
})
export class EnterpriseService {
  constructor() {}

  getEnterpriseInfo$(): Observable<CustomDescriptionItemInfos> {
    return of([
      {
        key: '企业名称',
        descriptionType: 'string',
        description: { title: '企业名称', value: '阳江市阳东区XX刀具厂' },
      },
      {
        key: '生产地址',
        descriptionType: 'string',
        description: { title: '生产地址', value: '阳江市阳东区东城镇X路X号' },
      },
      {
        key: '法人代表',
        descriptionType: 'string',
        description: { title: '法人代表', value: 'XXX' },
      },
      {
        key: '联系电话',
        descriptionType: 'string',
        description: { title: '联系电话', value: '138xxxxxx' },
      },
      {
        key: '安全负责人',
        descriptionType: 'string',
        description: { title: '安全负责人', value: 'XXX' },
      },
      {
        key: '联系电话',
        descriptionType: 'string',
        description: { title: '联系电话', value: '138xxxxxx' },
      },
      {
        key: '经济性质',
        descriptionType: 'string',
        description: { title: '经济性质', value: '按照工商执照填写' },
      },
      {
        key: '邮政编码',
        descriptionType: 'string',
        description: { title: '邮政编码', value: '529900' },
      },
      {
        key: '注册资金',
        descriptionType: 'string',
        description: { title: '注册资金', value: '人民币五百万元整' },
      },
      {
        key: '注册商标',
        descriptionType: 'string',
        description: { title: '注册商标', value: 'XXXX牌' },
      },
      {
        key: '经营网点',
        descriptionType: 'string',
        description: { title: '经营网点', value: '无或如实填写' },
      },
    ]);
  }

  getEnterpriseAuthFormInfos$(): Observable<CustomFormItemInfos> {
    return of([]);
  }
}
