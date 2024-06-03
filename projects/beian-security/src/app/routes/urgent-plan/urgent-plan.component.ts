import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { FaGraphComponent } from '../fa-graph/fa-graph.component';
import {
  combineLatest,
  map,
  Observable,
  ReplaySubject,
  shareReplay,
  switchMap,
  tap,
  zip,
} from 'rxjs';
import { EdgeConfig, GraphData } from '@antv/g6';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import {
  RoutePlaningApiService,
  WarehouseItem,
  EmergencyRequest,
} from 'beian-shared-lib';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { Graph2Component } from '../graph2/graph2.component';

interface Place {
  id: number;
  name: string;
}

@Component({
  selector: 'app-urgent-plan',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzPageHeaderModule,
    FaGraphComponent,
    Graph2Component,
    NzSelectModule,
    FormsModule,
    NzButtonModule,
    NzInputNumberModule,
    NzGridModule,
    NzFormModule,
    NzTableModule,
    NzSliderModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './urgent-plan.component.html',
  styleUrl: './urgent-plan.component.less',
})
export class UrgentPlanComponent implements OnInit {
  tobject = Object;

  endPlaces: number[] = []; // 终点
  itemName: string | null = null; // 物资类型
  transQuantities: { [key: number]: number | undefined } = {}; // 每个地点对应的物资数量
  places: Place[] = []; // 存储地点和它们的 ID
  goodsHeaders: string[] = []; // 存储物资类型
  transportPlan: EmergencyRequest[] = [];

  baseNode = [
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
  ];

  SupplyPlanResponse$ = this.routePlaningApiService
    .getSupply1()
    .pipe(shareReplay(1));

  nodes$: Observable<{ id: number; name: string }[]> =
    this.SupplyPlanResponse$.pipe(
      map((response) => {
        return response.graph.map((node) => {
          return {
            id: node.id,
            name: node.name,
          };
        });
      }),
    );

  edges$ = this.SupplyPlanResponse$.pipe(
    map((response) => {
      return response.graph.flatMap((node) => {
        return node.edgeCostList.map((edge) => {
          return {
            source: node.id,
            target: edge.toId,
            capacity: edge.capacity,
            cost: edge.fee,
            time: edge.time,
          };
        });
      });
    }),
  );

  buildNodeData(nodes: { id: number; name: string }[]) {
    return nodes.map((node) => {
      return {
        id: 'node' + node.id.toString(),
        x: this.baseNode.find(
          (baseNode) => baseNode.id === 'node' + node.id.toString(),
        )!.x,
        y: this.baseNode.find(
          (baseNode) => baseNode.id === 'node' + node.id.toString(),
        )!.y,
        label: node.name,
      };
    });
  }

  capacityData$: Observable<GraphData> = zip([this.nodes$, this.edges$]).pipe(
    map(([nodes, edges]) => {
      return {
        nodes: this.buildNodeData(nodes),
        edges: edges.map((edge) => {
          return {
            source: 'node' + edge.source.toString(),
            target: 'node' + edge.target.toString(),
            label: edge.capacity.toString(),
            cost: edge.cost.toString(),
          };
        }),
      };
    }),
  );

  timeData$: Observable<GraphData> = zip([this.nodes$, this.edges$]).pipe(
    map(([nodes, edges]) => {
      return {
        nodes: this.buildNodeData(nodes),
        edges: edges.map((edge) => {
          return {
            source: 'node' + edge.source.toString(),
            target: 'node' + edge.target.toString(),
            label: edge.time.toString(),
            cost: edge.cost.toString(),
          };
        }),
      };
    }),
  );

  transClick$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  SupplyPlanResponse2$ = this.transClick$.pipe(
    switchMap(() => {
      return this.routePlaningApiService.emergencySupply$(
        this.transportPlan[0],
      );
    }),
    shareReplay(1),
  );

  selectGoodChoices$: Observable<[string]> = this.SupplyPlanResponse2$.pipe(
    map(() => {
      return [this.itemName!]; // 将 itemName 放入数组中作为选择项
    }),
  );

  selectTime$: ReplaySubject<number> = new ReplaySubject(1);

  maxTime$ = combineLatest([
    this.SupplyPlanResponse2$,
    this.selectGoodChoices$,
  ]).pipe(
    map(([response, good]) => {
      return Math.max(
        ...response.transportPlan
          .filter((edge) => {
            return edge.goodsName === good[0];
          })
          .map((edge) => {
            return edge.endTime - 1;
          }),
      );
    }),
    tap(() => {
      this.selectTime$.next(0);
    }),
  );

  resData$: Observable<GraphData> = combineLatest([
    this.SupplyPlanResponse2$,
    this.selectGoodChoices$,
    this.selectTime$,
    this.nodes$,
    this.edges$,
  ]).pipe(
    map(([response, good, time, nodes, edges]) => {
      const flowEdges = response.transportPlan.filter((edge) => {
        return (
          edge.goodsName === good[0] &&
          edge.startTime <= time &&
          edge.endTime > time
        );
      });

      const resEdges: EdgeConfig[] = [];
      const coordinates: Set<string> = new Set();

      function hash(u: number, v: number) {
        return JSON.stringify({ u: u, v: v });
      }

      for (const edge of flowEdges) {
        coordinates.add(hash(edge.startId, edge.endId));
        resEdges.push({
          source: 'node' + edge.startId.toString(),
          target: 'node' + edge.endId.toString(),
          label: edge.goodsAmount.toString(),
          type: 'arrow-running',
          style: {
            stroke: '#d4380d',
          },
        });
      }

      for (const edge of edges) {
        if (
          coordinates.has(hash(edge.source, edge.target)) ||
          coordinates.has(hash(edge.target, edge.source))
        ) {
          continue;
        }

        resEdges.push({
          source: 'node' + edge.source.toString(),
          target: 'node' + edge.target.toString(),
          label: '',
        });
      }

      return {
        nodes: this.buildNodeData(nodes),
        edges: resEdges,
      };
    }),
  );

  // , type: 'arrow-running'
  constructor(private routePlaningApiService: RoutePlaningApiService) {}

  ngOnInit(): void {
    this.getPlacesAndGoods();
  }

  getPlacesAndGoods(): void {
    this.routePlaningApiService.getItem$().subscribe((res: WarehouseItem) => {
      if (res.graph.length > 0) {
        // 提取物资类型
        this.goodsHeaders = res.graph.flatMap((node) =>
          node.goodsList.map((good) => good.name),
        );

        // 去重物资类型
        this.goodsHeaders = Array.from(new Set(this.goodsHeaders));

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

  // 添加到运输计划
  addToPlan(): void {
    // 构建新的运输计划项
    this.transportPlan.push({
      id: this.endPlaces[0],
      quantity: this.endPlaces.map((id) => this.transQuantities[id]!)[0],
      itemName: this.itemName!,
    });
  }

  getPlaceNameById(id: number): string {
    return this.baseNode.find(
      (baseNode) => baseNode.id === 'node' + id.toString(),
    )!.label;
  }

  transportResultDisplay$: Observable<
    {
      startPlaces: string;
      endPlace: string;
      itemName: string;
      quantity: string;
      startTime: string;
      endTime: string;
    }[]
  > = this.SupplyPlanResponse2$.pipe(
    map((response) => {
      return response.transportPlan.map((edge) => {
        return {
          startPlaces: this.getPlaceNameById(edge.startId),
          endPlace: this.getPlaceNameById(edge.endId),
          itemName: edge.goodsName,
          quantity: edge.goodsAmount.toString(),
          startTime: edge.startTime.toString(),
          endTime: edge.endTime.toString(),
        };
      });
    }),
  );

  confirmEmergencyTrans() {
    this.addToPlan();
    this.transClick$.next(true);
    this.clearPlan();
  }

  //清空运输计划
  clearPlan(): void {
    this.transportPlan = [];
    this.transQuantities = {};
  }
}
