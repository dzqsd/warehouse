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
  SupplyDemandResponse,
  TransportResponse,
} from 'beian-shared-lib';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

interface SupplyDemandItem {
  goodsName: string;
  id_list: number[];
  amount_list: number[];
  priority_list: number[];
}

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
  places: Place[] = []; // 存储地点和它们的 ID
  goodsHeaders: string[] = []; // 存储物资类型
  transPriority: number | null = null; //运输优先级
  transportPlan: TransParams[] = [];
  transportPlanDisplay: {
    place: string;
    goodsName: string;
    quantity: number;
    priority: number;
    type: string;
  }[] = []; // 用于显示的运输计划
  transportReady: boolean = false;
  isTimeFirst: boolean | null = null; // 是否时间优先,若为否，则是费用优先

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
      { id: 'node11', x: 380, y: 600, label: '云南' },
      { id: 'node12', x: 400, y: 510, label: '四川' },
      { id: 'node13', x: 320, y: 400, label: '青海' },
      { id: 'node14', x: 690, y: 450, label: '江苏' },
      { id: 'node15', x: 650, y: 380, label: '山东' },
      // 新增节点
      { id: 'node16', x: 510, y: 628, label: '广西' },
      { id: 'node17', x: 540, y: 710, label: '海南' },
      { id: 'node18', x: 710, y: 290, label: '辽宁' },
      { id: 'node19', x: 495, y: 575, label: '贵州' },
      { id: 'node20', x: 670, y: 572, label: '福建' },
    ],
    edges: [
      { source: 'node2', target: 'node3', label: '2' }, // 湖南、甘肃
      { source: 'node3', target: 'node8', label: '3' }, // 甘肃、河南
      { source: 'node1', target: 'node9', label: '4' }, // 台湾、广东
      { source: 'node4', target: 'node3', label: '5' }, // 西藏、甘肃
      { source: 'node2', target: 'node8', label: '6' }, // 湖南、河南
      { source: 'node3', target: 'node5', label: '8' }, // 甘肃、内蒙古
      { source: 'node4', target: 'node6', label: '9' }, // 西藏、新疆
      { source: 'node5', target: 'node10', label: '10' }, // 内蒙古、北京
      { source: 'node5', target: 'node6', label: '11' }, // 内蒙古、新疆
      { source: 'node8', target: 'node10', label: '12' }, // 河南、北京
      { source: 'node8', target: 'node9', label: '13' }, // 河南、广东
      { source: 'node7', target: 'node10', label: '14' }, // 黑龙江、北京
      { source: 'node2', target: 'node9', label: '15' }, // 湖南、广东
      { source: 'node11', target: 'node12', label: '16' }, // 云南、四川
      { source: 'node12', target: 'node3', label: '17' }, // 四川、甘肃
      { source: 'node3', target: 'node13', label: '18' }, // 甘肃、青海
      { source: 'node14', target: 'node8', label: '19' }, // 江苏、河南
      { source: 'node15', target: 'node8', label: '20' }, // 山东、河南
      { source: 'node14', target: 'node15', label: '21' }, // 江苏、山东
      // 新增边
      { source: 'node10', target: 'node18', label: '22' }, // 北京、辽宁
      { source: 'node9', target: 'node20', label: '23' }, // 广东、福建
      { source: 'node14', target: 'node20', label: '24' }, // 江苏、福建
      { source: 'node19', target: 'node2', label: '25' }, // 贵州、湖南
      { source: 'node19', target: 'node11', label: '26' }, // 贵州、云南
      { source: 'node19', target: 'node3', label: '27' }, // 贵州、甘肃
      { source: 'node19', target: 'node16', label: '28' }, // 贵州、广西
      { source: 'node16', target: 'node9', label: '29' }, // 广西、广东
      { source: 'node16', target: 'node17', label: '30' }, // 广西、海南
      { source: 'node10', target: 'node15', label: '31' }, // 北京、山东
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

  // 添加到运输计划
  addToPlan(): void {
    if (
      !this.transPlaces.length ||
      !this.transType ||
      !this.transPriority ||
      this.isTimeFirst === null
    ) {
      this.message.error('请选择地点、物资类型、物资优先级和时间优先!');
      return;
    }

    // 构建新的运输计划项
    const transportPlan: TransParams[] = this.transPlaces.map((placeId) => ({
      id: placeId,
      itemName: this.transType!,
      quantity: this.transQuantities[placeId] || 0,
      priority: this.transPriority!,
      isTimeFirst: this.isTimeFirst!,
    }));

    // 向后端发送运输计划
    this.routePlaningApiService.transItemBatch$(transportPlan).subscribe(
      (res: SupplyDemandResponse) => {
        console.log('成功添加到运输计划', res);
        this.message.success('成功添加到运输计划!');

        // 处理后端返回的数据，更新当前运输计划显示
        const expressList = res['supply demands:']['Express Fee First List'];
        const timeList = res['supply demands:']['Time First List'];

        this.transportPlanDisplay = [];

        expressList.forEach((item: SupplyDemandItem) => {
          item.id_list.forEach((id: number, index: number) => {
            this.transportPlanDisplay.push({
              place: this.getPlaceNameById(id),
              goodsName: item.goodsName,
              quantity: item.amount_list[index],
              priority: item.priority_list[index],
              type: '费用优先',
            });
          });
        });

        timeList.forEach((item: SupplyDemandItem) => {
          item.id_list.forEach((id: number, index: number) => {
            this.transportPlanDisplay.push({
              place: this.getPlaceNameById(id),
              goodsName: item.goodsName,
              quantity: item.amount_list[index],
              priority: item.priority_list[index],
              type: '时间优先',
            });
          });
        });
      },
      (error) => {
        this.message.error('添加运输计划失败');
        console.error('添加运输计划错误:', error);
      },
    );
  }

  trans(): void {
    // 执行运输操作，告知后端开始运输
    this.routePlaningApiService.trans$().subscribe(
      (res: TransportResponse) => {
        console.log('物资开始运输', res);
        // 清空运输计划 ？
        //this.transportPlan = [];
        // 处理返回的运输路线
      },
      (error) => {
        this.message.error('运输请求失败');
        console.error('运输错误:', error);
      },
    );
  }
}
