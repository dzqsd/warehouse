import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import G6, { Graph, GraphData } from '@antv/g6';
import { NzCardModule } from 'ng-zorro-antd/card';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-fa-graph',
  standalone: true,
  imports: [NzCardModule],
  templateUrl: './fa-graph.component.html',
  styleUrl: './fa-graph.component.css',
})
export class FaGraphComponent implements OnInit, AfterViewInit {
  destroyRef = inject(DestroyRef);

  @Input({ required: true }) data$!: Observable<GraphData>;

  graph$ = new ReplaySubject<Graph>(1);

  ngOnInit() {
    combineLatest([this.graph$, this.data$])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([graph, data]) => {
        G6.Util.processParallelEdges(data.edges);
        graph.data(data);
        graph.render();
      });
  }

  ngAfterViewInit() {
    const container = document.getElementById('container');
    const width = container!.scrollWidth;
    const height = container!.scrollHeight || 800;
    const toolbar = new G6.ToolBar({
      position: { x: 10, y: 10 },
    });

    const graph = new G6.Graph({
      container: 'container',
      width,
      height,
      // fitView: true,
      // translate the graph to align the canvas's center, support by v3.5.1
      //fitCenter: true,
      minZoom: 0.0000001,
      plugins: [toolbar],
      defaultNode: {
        size: 10,
        style: {
          fill: '#DEE9FF',
          stroke: '#5B8FF9',
        },
      },
      modes: {
        // behaviors
        //default: ['drag-canvas', 'drag-node'],
      },
      layout: {
        // type: 'dagre',
        // rankdir: 'LR',
      },

      defaultEdge: {
        type: 'circle-running',
        /* configure the bending radius and min distance to the end nodes */
        style: {
          // lineWidth: 2,
          radius: 10,
          offset: 30,
          endArrow: false,
          stroke: '#c02615',
          /* and other styles */
          // stroke: '#F6BD16',
        },
        labelCfg: {
          autoRotate: true,
          style: {
            fontSize: 15,
          },
        },
      },
    });

    graph.get('container').style.background = '#FFF';
    graph.get('container').style.backgroundImage = 'url("/assets/map.png")';
    // graph.get('container').style.backgroundSize = '500px 500px';
    graph.get('container').style.backgroundRepeat = 'no-repeat';

    this.graph$.next(graph);

    graph.on('node:click', function (evt) {
      console.log(evt.item?._cfg?.id + ' ' + evt.canvasX + ' ' + evt.canvasY);
    });
  }
}
