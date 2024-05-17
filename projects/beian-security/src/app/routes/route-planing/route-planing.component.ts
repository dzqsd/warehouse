import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { FaGraphComponent } from '../fa-graph/fa-graph.component';
import { BehaviorSubject } from 'rxjs';
import { GraphData } from '@antv/g6';
import G6 from '@antv/g6';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import {
  TransParams,
  RoutePlaningApiService,
  WarehouseItem,
} from 'beian-shared-lib';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

G6.registerEdge(
  'circle-running', // 自定义边类型名称
  {
    afterDraw(cfg, group) {
      if (group == null) return;
      const shape = group.get('children')[0];
      const startPoint = shape.getPoint(0);
      const circle = group.addShape('circle', {
        attrs: {
          x: startPoint.x,
          y: startPoint.y,
          fill: '#FF6A00', // 圆形颜色
          r: 5, // 圆形半径
        },
        name: 'circle-shape', // 圆形形状名称
      });

      circle.animate(
        (ratio: number) => {
          const tmpPoint = shape.getPoint(ratio);
          // 返回圆形的位置
          return {
            x: tmpPoint.x,
            y: tmpPoint.y,
          };
        },
        {
          repeat: true, // 是否重复执行动画
          duration: 3000, // 动画持续时间
        },
      );
    },
  },
  'cubic', // 继承默认的曲线边类型
);

interface Place {
  id: number;
  name: string;
}

@Component({
  selector: 'app-route-planing',
  standalone: true,
  templateUrl: './route-planing.component.html',
  styleUrls: ['./route-planing.component.less'],
  imports: [
    CommonModule,
    NzCardModule,
    NzPageHeaderModule,
    FaGraphComponent,
    NzSelectModule,
    FormsModule,
    NzButtonModule,
    NzInputNumberModule,
    NzGridModule,
    NzFormModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RoutePlaningComponent implements OnInit {
  transPlaces: number[] = []; // 多选地点
  transType: string | null = null; // 物资类型
  transQuantities: { [key: number]: number } = {}; // 每个地点对应的物资数量
  transportRoute: string | null = '无';
  places: Place[] = []; // 存储地点和它们的 ID
  goodsHeaders: string[] = []; // 存储物资类型
  data$: BehaviorSubject<GraphData> = new BehaviorSubject<GraphData>({
    nodes: [
      { id: 'node1', x: 722, y: 607, label: '台湾' },
      { id: 'node2', x: 560, y: 534, label: '湖南' },
      { id: 'node3', x: 455, y: 430, label: '甘肃' },
      { id: 'node4', x: 258, y: 493, label: '西藏' },
      { id: 'node5', x: 523, y: 301, label: '内蒙古' },
      { id: 'node6', x: 223, y: 264, label: '新疆' },
      { id: 'node7', x: 730, y: 177, label: '黑龙江' },
      { id: 'node8', x: 584, y: 439, label: '河南' },
      { id: 'node9', x: 592, y: 623, label: '广东' },
      { id: 'node10', x: 618, y: 318, label: '北京' },
    ],
    edges: [
      { source: 'node2', target: 'node3', label: 'edge 2' },
      { source: 'node3', target: 'node8', label: 'edge 3' },
      { source: 'node1', target: 'node9', label: 'edge 4' },
      { source: 'node4', target: 'node3', label: 'edge 5' },
      { source: 'node2', target: 'node8', label: 'edge 6' },
      { source: 'node3', target: 'node5', label: 'edge 8' },
      { source: 'node4', target: 'node6', label: 'edge 9' },
      { source: 'node5', target: 'node10', label: 'edge 10' },
      { source: 'node5', target: 'node6', label: 'edge 11' },
      { source: 'node8', target: 'node10', label: 'edge 12' },
      { source: 'node8', target: 'node9', label: 'edge 13' },
      { source: 'node7', target: 'node10', label: 'edge 14' },
      { source: 'node2', target: 'node9', label: 'edge 15' },
    ],
  });

  constructor(
    private message: NzMessageService,
    private http: HttpClient,
    private routePlaningApiService: RoutePlaningApiService,
  ) {}

  ngOnInit(): void {
    this.getPlacesAndGoods();
  }

  getPlacesAndGoods(): void {
    this.routePlaningApiService.getItem$().subscribe((res: WarehouseItem) => {
      if (res.graph.length > 0) {
        // 提取物资类型
        this.goodsHeaders = res.graph[0].goods_list;

        // 提取所有不同的地点
        this.places = res.graph.map((node) => ({
          id: node.id,
          name: node.name,
        }));

        // 为了避免地点重复，可以使用一个简单的过滤机制
        this.places = this.places.filter(
          (place, index, self) =>
            index ===
            self.findIndex((p) => p.id === place.id && p.name === place.name),
        );
      }
    });
  }

  getPlaceNameById(id: number): string {
    const place = this.places.find((p) => p.id === id);
    return place ? place.name : 'Unknown';
  }

  trans(): void {
    if (!this.transPlaces.length || !this.transType) {
      this.message.error('请选择地点和物资类型!');
      return;
    }

    const params: TransParams[] = this.transPlaces.map((placeId) => ({
      id: placeId,
      itemName: this.transType!,
      quantity: this.transQuantities[placeId] || 0,
    }));

    console.log('运输参数', params);

    this.routePlaningApiService.transItemBatch$(params).subscribe(
      (res) => {
        console.log('物资运输成功', res);
        // 显示运输路线res
        // this.transportRoute = `路线:${res.route}`; //res中的route属性
      },
      (error) => {
        this.message.error('运输请求失败');
        console.error('运输错误:', error);
      },
    );
  }
}
