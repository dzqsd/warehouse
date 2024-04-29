import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import {
  ItemParams,
  WarehouseApiService,
  WarehouseItem,
  ColumnItem,
} from 'beian-shared-lib';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-warehouse-manage',
  standalone: true,
  imports: [
    CommonModule,
    NzSelectModule,
    FormsModule,
    NzButtonModule,
    NzInputNumberModule,
    NzGridModule,
    NzCardModule,
    NzPageHeaderModule,
    NzTableModule,
  ],
  templateUrl: './warehouse-manage.component.html',
  styleUrl: './warehouse-manage.component.less',
})
export class WarehouseManageComponent {
  addPlace: string | null = null; //地点
  addValue: string | null = null; //物资类型
  deletePlace: string | null = null;
  deleteValue: string | null = null;
  addQuantity: number = 0; //物资数量
  deleteQuantity: number = 0; //物资数量

  constructor(
    private message: NzMessageService,
    private http: HttpClient,
    private wareHouseApiService: WarehouseApiService,
  ) {}

  addItem(
    place: string | null,
    itemName: string | null,
    quantity: number,
  ): void {
    if (place === null || itemName === null || quantity === null) {
      this.message.error('物资名或数量为空!');
      return;
    }

    // 添加物资的逻辑，使用物资名和数量
    console.log(
      '添加地点',
      place,
      '添加物资：',
      itemName,
      '，数量：',
      quantity,
    );
    const params: ItemParams = { place, itemName, quantity };
    this.wareHouseApiService.addItem$(params).subscribe((res) => {
      console.log('物资添加成功', res);
    });
  }

  deleteItem(
    place: string | null,
    itemName: string | null,
    quantity: number,
  ): void {
    if (place === null || itemName === null || quantity === null) {
      this.message.error('物资名或数量为空!');
      return;
    }
    console.log(
      '删除地点：',
      place,
      '删除物资：',
      itemName,
      '，数量：',
      quantity,
    );
    const params: ItemParams = { place, itemName, quantity };
    this.wareHouseApiService.deleteItem$(params).subscribe((res) => {
      console.log('物资删除成功', res);
    });
  }

  show(): void {
    console.log('查看物资');
    this.wareHouseApiService.getItem$().subscribe((res) => {
      console.log('物资列表', res);
    });
    //根据res刷新物资列表
    return;
  }

  listOfColumns: ColumnItem[] = [
    {
      name: 'place',
      sortOrder: null,
      sortFn: (a: WarehouseItem, b: WarehouseItem) =>
        a.place.localeCompare(b.place),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: 'Place1', value: 'Place1', byDefault: false },
        { text: 'Place2', value: 'Place2', byDefault: false },
        { text: 'Place3', value: 'Place3', byDefault: false },
        { text: 'Place4', value: 'Place4', byDefault: false },
        { text: 'Place5', value: 'Place5', byDefault: false },
      ],
      filterFn: (list: string[], item: WarehouseItem) =>
        list.some((name) => item.place.indexOf(name) !== -1),
    },
    {
      name: 'item1',
      sortOrder: null,
      sortFn: (a: WarehouseItem, b: WarehouseItem) => a.item1 - b.item1,
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true,
    },
    {
      name: 'item2',
      sortOrder: null,
      sortFn: (a: WarehouseItem, b: WarehouseItem) => a.item2 - b.item2,
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true,
    },
    {
      name: 'item3',
      sortOrder: null,
      sortFn: (a: WarehouseItem, b: WarehouseItem) => a.item3 - b.item3,
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true,
    },
    {
      name: 'item4',
      sortOrder: null,
      sortFn: (a: WarehouseItem, b: WarehouseItem) => a.item4 - b.item4,
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true,
    },
    {
      name: 'item5',
      sortOrder: null,
      sortFn: (a: WarehouseItem, b: WarehouseItem) => a.item5 - b.item5,
      sortDirections: ['ascend', 'descend', null],
      listOfFilter: [],
      filterFn: null,
      filterMultiple: true,
    },
  ];

  //应根据res刷新物资列表
  listOfData: WarehouseItem[] = [
    {
      place: 'Place1',
      item1: 320,
      item2: 111,
      item3: 222,
      item4: 333,
      item5: 444,
    },
    {
      place: 'Place2',
      item1: 12,
      item2: 222,
      item3: 2413,
      item4: 424,
      item5: 55,
    },
    {
      place: 'Place3',
      item1: 1211,
      item2: 2222,
      item3: 52413,
      item4: 6424,
      item5: 355,
    },
    {
      place: 'Place4',
      item1: 12111,
      item2: 11222,
      item3: 222413,
      item4: 88424,
      item5: 855,
    },
    {
      place: 'Place5',
      item1: 912,
      item2: 9222,
      item3: 92413,
      item4: 99424,
      item5: 55,
    },
  ];
}
