import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { FaGraphComponent } from '../fa-graph/fa-graph.component';
import {
  BehaviorSubject,
  combineLatest,
  filter,
  map,
  Observable,
  ReplaySubject,
  shareReplay,
  switchMap,
  zip,
} from 'rxjs';
import { EdgeConfig, GraphData } from '@antv/g6';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import {
  RoutePlaningApiService,
  TransParams,
  TransRoute,
  WarehouseItem,
} from 'beian-shared-lib';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Graph2Component } from '../graph2/graph2.component';
// interface SupplyDemandItem {
//   goodsName: string;
//   id_list: number[];
//   amount_list: number[];
//   priority_list: number[];
// }

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
    NzTableModule,
    Graph2Component,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RoutePlaningComponent implements OnInit {
  tobject = Object;

  endPlaces: number[] = []; // 多选终点
  startPlaces: number[] = []; // 多选起点
  itemName: string | null = null; // 物资类型
  transQuantities: { [key: number]: number | undefined } = {}; // 每个地点对应的物资数量
  places: Place[] = []; // 存储地点和它们的 ID
  goodsHeaders: string[] = []; // 存储物资类型
  transPriority: number | null = null; //运输优先级
  transportPlan: TransParams[] = [];
  transportPlanDisplay: {
    startPlaces: string;
    endPlace: string;
    itemName: string;
    quantity: string;
  }[] = []; // 用于显示的运输计划

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

  baseGraph: GraphData = {
    nodes: this.baseNode,
    edges: [
      { source: 'node2', target: 'node3', label: '' }, // 湖南、甘肃
      { source: 'node3', target: 'node8', label: '' }, // 甘肃、河南
      { source: 'node1', target: 'node9', label: '' }, // 台湾、广东
      { source: 'node4', target: 'node3', label: '' }, // 西藏、甘肃
      { source: 'node2', target: 'node8', label: '' }, // 湖南、河南
      { source: 'node3', target: 'node5', label: '' }, // 甘肃、内蒙古
      { source: 'node4', target: 'node6', label: '' }, // 西藏、新疆
      { source: 'node5', target: 'node10', label: '' }, // 内蒙古、北京
      { source: 'node5', target: 'node6', label: '' }, // 内蒙古、新疆
      { source: 'node8', target: 'node10', label: '' }, // 河南、北京
      { source: 'node8', target: 'node9', label: '' }, // 河南、广东
      { source: 'node7', target: 'node10', label: '' }, // 黑龙江、北京
      { source: 'node2', target: 'node9', label: '' }, // 湖南、广东
      { source: 'node11', target: 'node12', label: '' }, // 云南、四川
      { source: 'node12', target: 'node3', label: '' }, // 四川、甘肃
      { source: 'node3', target: 'node13', label: '' }, // 甘肃、青海
      { source: 'node14', target: 'node8', label: '' }, // 江苏、河南
      { source: 'node15', target: 'node8', label: '' }, // 山东、河南
      { source: 'node14', target: 'node15', label: '' }, // 江苏、山东
      // 新增边
      { source: 'node10', target: 'node18', label: '' }, // 北京、辽宁
      { source: 'node9', target: 'node20', label: '' }, // 广东、福建
      { source: 'node14', target: 'node20', label: '' }, // 江苏、福建
      { source: 'node19', target: 'node2', label: '' }, // 贵州、湖南
      { source: 'node19', target: 'node11', label: '' }, // 贵州、云南
      { source: 'node19', target: 'node3', label: '' }, // 贵州、甘肃
      { source: 'node19', target: 'node16', label: '' }, // 贵州、广西
      { source: 'node16', target: 'node9', label: '' }, // 广西、广东
      { source: 'node16', target: 'node17', label: '' }, // 广西、海南
      { source: 'node10', target: 'node15', label: '' }, // 北京、山东
    ],
  };

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

  costData$: Observable<GraphData> = zip([this.nodes$, this.edges$]).pipe(
    map(([nodes, edges]) => {
      return {
        nodes: this.buildNodeData(nodes),
        edges: edges.map((edge) => {
          return {
            source: 'node' + edge.source.toString(),
            target: 'node' + edge.target.toString(),
            label: edge.cost.toString(),
            // cost: edge.cost.toString(),
          };
        }),
      };
    }),
  );

  data$: BehaviorSubject<GraphData> = new BehaviorSubject<GraphData>(
    this.baseGraph,
  );

  transClick$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  trans$ = this.transClick$.pipe(
    switchMap(() => {
      return this.routePlaningApiService.trans$(this.transportPlan);
    }),
    shareReplay(1),
  );

  transportResultDisplay$: Observable<
    {
      startPlaces: string;
      endPlace: string;
      itemName: string;
      quantity: string;
    }[]
  > = this.trans$.pipe(
    map((trans) => {
      return trans.result.flatMap((transRoute: TransRoute) => {
        return transRoute.edges
          .map((edge) => {
            return {
              startPlaces: this.getPlaceNameById(edge.u),
              endPlace: this.getPlaceNameById(edge.v),
              itemName: transRoute.name,
              quantity: edge.flow.toString(),
            };
          })
          .filter((row) => {
            return row.quantity !== '0';
          });
      });
    }),
  );

  hashEdge(u: string, v: string) {
    return JSON.stringify({ u: u, v: v });
  }

  costMap$ = this.trans$.pipe(
    map((response) => {
      const map: Map<string, number> = new Map();
      for (const resultElement of response.result) {
        for (const edge of resultElement.edges) {
          map.set(
            this.hashEdge(edge.u.toString(), edge.v.toString()),
            edge.cost,
          );
        }
      }
      return map;
    }),
  );

  totalCost$ = this.trans$.pipe(
    map((response) => {
      let res = 0;
      for (const resultElement of response.result) {
        for (const edge of resultElement.edges) {
          res += edge.flow * edge.cost;
        }
      }
      return res;
    }),
  );

  // 选择物资查看路线
  selectGoodChoices$ = this.trans$.pipe(
    map((trans) => {
      return trans.result.map((transRoute: TransRoute) => {
        return transRoute.name;
      });
    }),
  );

  selectGood$: ReplaySubject<string> = new ReplaySubject(1);

  resData$: Observable<GraphData> = combineLatest([
    this.trans$,
    this.selectGood$,
  ]).pipe(
    map(([trans, selectGood]) => {
      for (const transRoute of trans.result) {
        if (transRoute.name == selectGood) {
          return transRoute;
        }
      }
      return null;
    }),
    filter((res): res is TransRoute => {
      return res != null;
    }),
    map((transRoute) => {
      const resEdges: EdgeConfig[] = [];
      const coordinates: Set<string> = new Set();

      function hash(u: number, v: number) {
        return JSON.stringify({ u: u, v: v });
      }

      for (const edge of transRoute.edges) {
        if (edge.flow != 0) {
          coordinates.add(hash(edge.u, edge.v));
          if (coordinates.has(hash(edge.v, edge.u))) {
            coordinates.delete(hash(edge.v, edge.u));
          }
        } else {
          if (!coordinates.has(hash(edge.v, edge.u))) {
            coordinates.add(hash(edge.u, edge.v));
          }
        }
      }

      for (const edge of transRoute.edges) {
        if (coordinates.has(hash(edge.u, edge.v))) {
          resEdges.push({
            source: 'node' + edge.u.toString(),
            target: 'node' + edge.v.toString(),
            label: edge.flow != 0 ? edge.flow.toString() : undefined,
            type: edge.flow != 0 ? 'arrow-running' : undefined,
            style:
              edge.flow != 0
                ? {
                    stroke: '#d4380d',
                  }
                : undefined,
          });
        }
      }

      return {
        nodes: this.baseNode,
        edges: resEdges,
      };
    }),
  );

  curFlowSum$ = this.resData$.pipe(
    map((data) => {
      let res: number = 0;
      for (const edge of data.edges!) {
        if (edge.label === undefined) {
          continue;
        }
        res += Number(edge.label);
        console.log(res);
      }
      return res;
    }),
  );

  curCostSum$ = combineLatest([this.resData$, this.costMap$]).pipe(
    map(([data, costMap]) => {
      let res: number = 0;
      for (const edge of data.edges!) {
        if (edge.label === undefined) {
          continue;
        }
        res +=
          costMap.get(
            this.hashEdge(edge.source!.substring(4), edge.target!.substring(4)), // "node1234"
          )! * Number(edge.label);
      }
      return res;
    }),
  );

  // , type: 'arrow-running'
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

  getPlaceNameById(id: number): string {
    const place = this.places.find((p) => p.id === id);
    return place ? place.name : 'Unknown';
  }

  // 添加到运输计划
  addToPlan(): void {
    // 构建新的运输计划项
    this.transportPlan.push({
      startPlaces: this.startPlaces,
      endPlaces: this.endPlaces,
      itemName: this.itemName!,
      quantity: this.endPlaces.map((id) => this.transQuantities[id]!),
    });

    this.transportPlanDisplay = [];

    for (const plan of this.transportPlan) {
      for (let i = 0; i < plan.endPlaces.length; i++) {
        this.transportPlanDisplay.push({
          startPlaces: plan.startPlaces
            .map((id) => this.getPlaceNameById(id))
            .join(', '),
          endPlace: this.getPlaceNameById(plan.endPlaces[i]),
          itemName: plan.itemName,
          quantity: plan.quantity[i].toString(),
        });
      }
    }

    this.transQuantities = {};
  }

  //清空运输计划
  clearPlan(): void {
    this.transportPlan = [];
    this.transportPlanDisplay = [];
    this.transQuantities = {};
  }
}
