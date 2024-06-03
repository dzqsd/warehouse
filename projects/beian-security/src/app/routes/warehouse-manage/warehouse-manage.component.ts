import { AfterViewInit, Component, OnInit } from '@angular/core';
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
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Bar, Column } from '@antv/g2plot'; // 导入 G2Plot 的 Bar 和 Column 图表

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
    NzDividerModule,
    NzIconModule,
    NzInputModule,
  ],
  templateUrl: './warehouse-manage.component.html',
  styleUrls: ['./warehouse-manage.component.less'],
})
export class WarehouseManageComponent implements OnInit, AfterViewInit {
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

  linePlace: number = 0; // 地点ID
  lineValue: string | null = null; //物资类型
  lineQuantity: number = 0; //物资数量

  // 图表相关变量
  chart: Bar | null = null;
  columnChart: Column | null = null;

  constructor(
    private message: NzMessageService,
    private http: HttpClient,
    private wareHouseApiService: WarehouseApiService,
  ) {}

  ngOnInit(): void {
    this.getItem();
  }

  ngAfterViewInit(): void {
    this.initChart();
    this.initColumnChart();
  }

  initChart(): void {
    this.chart = new Bar(document.getElementById('barChart') as HTMLElement, {
      data: [],
      isStack: true, // 使用堆叠条形图
      xField: 'quantity',
      yField: 'place',
      seriesField: 'goods',
      legend: {
        position: 'top-left',
      },
      tooltip: {
        shared: true,
      },
    });

    this.chart.render();
  }

  initColumnChart(): void {
    this.columnChart = new Column(
      document.getElementById('columnChart') as HTMLElement,
      {
        data: [],
        isGroup: true,
        xField: 'goods',
        yField: 'quantity',
        seriesField: 'place',
        legend: {
          position: 'top-right',
        },
        tooltip: {
          shared: true,
        },
        label: {
          position: 'middle',
          content: '',
          style: {
            fill: '#000000',
          },
        },
      },
    );

    this.columnChart.render();
  }

  updateColumnChartContent(): void {
    if (this.columnChart) {
      const columnData = this.listOfMapData.flatMap((data) =>
        data.goodsamount_list.map((amount, index) => ({
          goods: this.goodsHeaders[index],
          place: data.name,
          quantity: amount,
        })),
      );

      this.columnChart.changeData(columnData);
    }
  }

  updateChart(): void {
    if (this.chart) {
      const chartData = this.listOfMapData.flatMap((data) =>
        data.goodsamount_list.map((amount, index) => ({
          place: data.name,
          goods: this.goodsHeaders[index],
          quantity: amount,
        })),
      );

      this.chart.changeData(chartData);
    }

    this.updateColumnChartContent();
  }

  addItem(
    id: number,
    itemName: string | null,
    quantity: number,
    inputElement?: HTMLInputElement,
  ): void {
    if (inputElement) {
      const newGood = inputElement.value.trim();
      if (newGood && !this.goodsHeaders.includes(newGood)) {
        itemName = newGood;
        this.goodsHeaders = [...this.goodsHeaders, newGood];
        inputElement.value = '';
      }
    }

    if (!itemName || quantity <= 0) {
      this.message.error('物资名或数量无效!');
      return;
    }

    const params: ItemParams = { id, itemName, quantity };
    this.wareHouseApiService.addItem$(params).subscribe(() => {
      this.getItem();
    });
  }
  lineAdd(
    id: number,
    itemName: string | null,
    threshold: number,
    inputElement?: HTMLInputElement,
  ): void {
    if (inputElement) {
      const newGood = inputElement.value.trim();
      if (newGood && !this.goodsHeaders.includes(newGood)) {
        itemName = newGood;
        this.goodsHeaders = [...this.goodsHeaders, newGood];
        inputElement.value = '';
      }
    }

    if (!itemName || threshold <= 0) {
      this.message.error('物资名或数量无效!');
      return;
    }

    const params: ItemParams = { id, itemName, threshold };
    this.wareHouseApiService.addItem$(params).subscribe(() => {
      this.getItem();
    });
  }

  deleteItem(
    id: number,
    itemName: string | null,
    quantity: number,
    inputElement?: HTMLInputElement,
  ): void {
    if (inputElement) {
      const newGood = inputElement.value.trim();
      if (newGood && !this.goodsHeaders.includes(newGood)) {
        itemName = newGood;
        this.goodsHeaders = [...this.goodsHeaders, newGood];
        inputElement.value = '';
      }
    }

    if (!itemName || quantity <= 0) {
      this.message.error('物资名或数量无效!');
      return;
    }

    quantity = quantity * -1;
    const params: ItemParams = { id, itemName, quantity };
    this.wareHouseApiService.deleteItem$(params).subscribe(() => {
      this.getItem();
    });
  }

  getItem(): void {
    this.wareHouseApiService.getItem$().subscribe((res: WarehouseItem) => {
      if (res.graph.length > 0) {
        const allGoodsSet = new Set<string>();

        // 遍历节点，收集所有物资种类
        res.graph.forEach((node) => {
          node.goodsList.forEach((good) => {
            allGoodsSet.add(good.name);
          });
        });
        this.goodsHeaders = Array.from(allGoodsSet);

        // 处理地点信息
        this.places = res.graph.map((node) => ({
          id: node.id,
          name: node.name,
        }));

        // 去重
        this.places = this.places.filter(
          (place, index, self) =>
            index ===
            self.findIndex((p) => p.id === place.id && p.name === place.name),
        );

        // 处理每个地点的物资数量信息
        this.listOfMapData = res.graph.map((node) => {
          const goodsamount_list = this.goodsHeaders.map((good) => {
            const goodItem = node.goodsList.find((item) => item.name === good);
            return goodItem ? goodItem.amount : 0;
          });
          return {
            id: node.id,
            name: node.name,
            goodsamount_list,
          };
        });

        this.updateChart();
      }
    });
  }
}
