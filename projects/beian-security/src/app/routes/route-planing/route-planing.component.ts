import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { FaGraphComponent } from '../fa-graph/fa-graph.component';
import { BehaviorSubject } from 'rxjs';
import { GraphData } from '@antv/g6';
import G6 from '@antv/g6';

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

@Component({
  selector: 'app-route-planing',
  standalone: true,
  templateUrl: './route-planing.component.html',
  styleUrl: './route-planing.component.less',
  imports: [CommonModule, NzCardModule, NzPageHeaderModule, FaGraphComponent],
})
export class RoutePlaningComponent {
  public data$ = new BehaviorSubject<GraphData>({
    nodes: [
      {
        id: 'node1',
        x: 722,
        y: 607,
        label: 'node1',
      },
      {
        id: 'node2',
        x: 560,
        y: 534,
        label: 'node2',
      },
      {
        id: 'node3',
        x: 455,
        y: 430,
        label: 'node3',
      },
      {
        id: 'node4',
        x: 258,
        y: 493,
        label: 'node4',
      },
      {
        id: 'node5',
        x: 523,
        y: 301,
        label: 'node5',
      },
      {
        id: 'node6',
        x: 223,
        y: 264,
        label: 'node6',
      },
      {
        id: 'node7',
        x: 730,
        y: 177,
        label: 'node7',
      },
      {
        id: 'node8',
        x: 584,
        y: 439,
        label: 'node8',
      },
      {
        id: 'node9',
        x: 592,
        y: 623,
        label: 'node9',
      },
      {
        id: 'node10',
        x: 618,
        y: 318,
        label: 'node10',
      },
    ],
    edges: [
      {
        source: 'node2',
        target: 'node3',
        label: 'edge 2',
      },
      {
        source: 'node3',
        target: 'node8',
        label: 'edge 3',
      },
      {
        source: 'node1',
        target: 'node9',
        label: 'edge 4',
      },
      {
        source: 'node4',
        target: 'node3',
        label: 'edge 5',
      },
      {
        source: 'node2',
        target: 'node8',
        label: 'edge 6',
      },
      {
        source: 'node3',
        target: 'node5',
        label: 'edge 8',
      },
      {
        source: 'node4',
        target: 'node6',
        label: 'edge 9',
      },
      {
        source: 'node5',
        target: 'node10',
        label: 'edge 10',
      },
      {
        source: 'node5',
        target: 'node6',
        label: 'edge 11',
      },
      {
        source: 'node8',
        target: 'node10',
        label: 'edge 12',
      },
      {
        source: 'node8',
        target: 'node9',
        label: 'edge 13',
      },
      {
        source: 'node7',
        target: 'node10',
        label: 'edge 14',
      },
      {
        source: 'node2',
        target: 'node9',
        label: 'edge 15',
      },
    ],
  });
}
