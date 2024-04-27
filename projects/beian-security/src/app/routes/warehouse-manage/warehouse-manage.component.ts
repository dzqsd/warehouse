import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import { ItemParams, WarehouseApiService } from 'beian-shared-lib';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

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

  show(): void {
    console.log('查看物资');
    return;
  }

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
}
