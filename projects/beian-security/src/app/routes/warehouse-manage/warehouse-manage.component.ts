import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import {
  ItemParams,
  WarehouseApiService,
  WarehouseItem,
} from 'beian-shared-lib';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzTableModule } from 'ng-zorro-antd/table';

interface MapData {
  id: number;
  name: string;
  goodsamount_list: number[];
}

interface Place {
  id: number;
  name: string;
}

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
export class WarehouseManageComponent implements OnInit {
  addPlace: number = 0; // 地点ID
  addValue: string | null = null; //物资类型
  deletePlace: number = 0; // 地点ID
  deleteValue: string | null = null;
  addQuantity: number = 0; //物资数量
  deleteQuantity: number = 0; //物资数量
  listOfMapData: MapData[] = [];
  goodsHeaders: string[] = [];
  goods: string[] = []; // 存储物资类型
  places: Place[] = []; // 存储地点和它们的 ID

  constructor(
    private message: NzMessageService,
    private http: HttpClient,
    private wareHouseApiService: WarehouseApiService,
  ) {}

  ngOnInit(): void {
    this.getItem();
  }

  addItem(id: number, itemName: string | null, quantity: number): void {
    if (!itemName || quantity <= 0) {
      this.message.error('物资名或数量无效!');
      return;
    }

    console.log('添加地点', id, '添加物资：', itemName, '，数量：', quantity);
    const params: ItemParams = { id, itemName, quantity };
    this.wareHouseApiService.addItem$(params).subscribe((res) => {
      console.log('物资添加成功', res);
    });
  }

  deleteItem(id: number, itemName: string | null, quantity: number): void {
    if (!itemName || quantity <= 0) {
      this.message.error('物资名或数量无效!');
      return;
    }

    console.log('删除地点：', id, '删除物资：', itemName, '，数量：', quantity);
    quantity = quantity * -1;
    const params: ItemParams = { id, itemName, quantity };
    this.wareHouseApiService.deleteItem$(params).subscribe((res) => {
      console.log('物资删除成功', res);
    });
  }

  //获取所有物资
  getItem(): void {
    this.wareHouseApiService.getItem$().subscribe((res: WarehouseItem) => {
      console.log(res);
      if (res.graph.length > 0) {
        // 提取物资类型，假设所有节点物资类型相同，以第一个节点为基准生成表头
        this.goodsHeaders = res.graph[0].goods_list;

        // 提取所有不同的地点
        this.places = res.graph.map((node) => ({
          id: node.id, // 地点的唯一ID
          name: node.name, // 地点名称
        }));

        // 为了避免地点重复，可以使用一个简单的过滤机制
        this.places = this.places.filter(
          (place, index, self) =>
            index ===
            self.findIndex((p) => p.id === place.id && p.name === place.name),
        );
      }

      // 提取物资数据列表
      this.listOfMapData = res.graph.map((node) => ({
        id: node.id,
        name: node.name,
        goodsamount_list: node.goodsamount_list,
      }));
    });
  }
}
