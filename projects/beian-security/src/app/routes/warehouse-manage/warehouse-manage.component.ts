import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiService } from 'beian-shared-lib';

interface ItemParams {
  itemName: string;
  quantity: number;
}

@Component({
  selector: 'app-warehouse-manage',
  standalone: true,
  imports: [CommonModule, NzSelectModule, FormsModule],
  templateUrl: './warehouse-manage.component.html',
  styleUrl: './warehouse-manage.component.less',
})
export class WarehouseManageComponent {
  addValue: string | null = null;
  removeValue: string | null = null;
  addQuantity: number = 0;
  removeQuantity: number = 0;

  private get baseUrl() {
    return this.baseApiService.baseUrl;
  }

  constructor(
    private message: NzMessageService,
    private http: HttpClient,
    private baseApiService: BaseApiService,
  ) {}

  addItem(itemName: string | null, quantity: number): void {
    if (itemName !== null && quantity !== null) {
      // 添加物资的逻辑，使用物资名和数量
      console.log('添加物资：', itemName, '，数量：', quantity);
      const params: ItemParams = { itemName, quantity };
      this.http
        .post<ItemParams>(`${this.baseUrl}/your/remove/item/endpoint`, params)
        .subscribe(
          (response) => {
            console.log('物资添加成功', response);
          },
          (error) => {
            console.error('物资添加失败', error);
          },
        );
    } else {
      //物资名不能为空
      this.message.error('物资名或数量为空!');
    }
  }

  removeItem(itemName: string | null, quantity: number): void {
    if (itemName !== null && quantity !== null) {
      // 删除物资的逻辑，使用物资名和数量
      console.log('删除物资：', itemName, '，数量：', quantity);
      const params: ItemParams = { itemName, quantity };
      this.http
        .post<ItemParams>(`${this.baseUrl}/your/remove/item/endpoint`, params)
        .subscribe(
          (response) => {
            console.log('物资移除成功', response);
            // 如果需要，在这里处理移除成功后的逻辑
          },
          (error) => {
            console.error('物资移除失败', error);
            // 如果需要，在这里处理移除失败后的逻辑
          },
        );
    } else {
      //物资名不能为空
      this.message.error('物资名或数量为空!');
    }
  }
}
