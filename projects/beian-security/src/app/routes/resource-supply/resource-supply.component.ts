import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FaGraphComponent } from '../fa-graph/fa-graph.component';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { RoutePlaningApiService } from 'beian-shared-lib';
import {
  map,
  ReplaySubject,
  combineLatest,
  zip,
  Observable,
  tap,
  BehaviorSubject,
  switchMap,
  shareReplay,
} from 'rxjs';
import { EdgeConfig, GraphData } from '@antv/g6';
import { NzRadioModule } from 'ng-zorro-antd/radio';

@Component({
  selector: 'app-resource-supply',
  standalone: true,
  templateUrl: './resource-supply.component.html',
  styleUrl: './resource-supply.component.less',
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
    NzSliderModule,
    NzRadioModule,
  ],
})
export class ResourceSupplyComponent {
  constructor(private routePlanService: RoutePlaningApiService) {}

  algo$ = new BehaviorSubject(1);

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

  supplyPlanResponse$ = this.algo$.pipe(
    switchMap((algo) => {
      switch (algo) {
        case 1:
          return this.routePlanService.getSupply1();
        case 2:
          return this.routePlanService.getSupply2();
      }
      throw `不存在该算法：${algo}`;
    }),
    shareReplay(1),
  );

  // supplyPlanResponse$ = this.routePlanService.getSupply().pipe(shareReplay(1));

  nodes$: Observable<{ id: number; name: string }[]> =
    this.supplyPlanResponse$.pipe(
      map((response) => {
        return response.graph.map((node) => {
          return {
            id: node.id,
            name: node.name,
          };
        });
      }),
    );

  edges$ = this.supplyPlanResponse$.pipe(
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

  totalCost$ = this.supplyPlanResponse$.pipe(
    map((response) => {
      let res = 0;
      for (const plan of response.transportPlan) {
        res += plan.cost;
      }
      return res;
    }),
  );

  selectGoodChoices$ = this.supplyPlanResponse$.pipe(
    map((response) => {
      return response.transportPlan.map((plan) => {
        return plan.goodsName;
      });
    }),
    map((goodsNames) => {
      return Array.from(new Set(goodsNames));
    }),
  );

  selectGood$: ReplaySubject<string> = new ReplaySubject(1);

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
  > = this.supplyPlanResponse$.pipe(
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

  maxTime$ = combineLatest([this.supplyPlanResponse$, this.selectGood$]).pipe(
    map(([response, good]) => {
      return Math.max(
        ...response.transportPlan
          .filter((edge) => {
            return edge.goodsName === good;
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

  selectTime$: ReplaySubject<number> = new ReplaySubject(1);

  resData$: Observable<GraphData> = combineLatest([
    this.supplyPlanResponse$,
    this.selectGood$,
    this.selectTime$,
    this.nodes$,
    this.edges$,
  ]).pipe(
    map(([response, good, time, nodes, edges]) => {
      const flowEdges = response.transportPlan.filter((edge) => {
        return (
          edge.goodsName === good &&
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
}
