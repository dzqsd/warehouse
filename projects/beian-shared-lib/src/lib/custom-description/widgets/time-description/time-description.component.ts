import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {
  CustomDescriptionItemInfo,
  TimeDescription,
} from '../../interfaces/custom-description';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

@Component({
  selector: 'lib-time-description',
  standalone: true,
  imports: [CommonModule, NzDescriptionsModule, DatePipe],
  templateUrl: './time-description.component.html',
  styleUrl: './time-description.component.less',
  providers: [DatePipe],
})
export class TimeDescriptionComponent implements OnInit {
  @Input({ required: true }) descriptionInfo!: CustomDescriptionItemInfo;

  constructor(private datePipe: DatePipe) {}

  public description!: TimeDescription;

  public timeStr = '未知时间';

  ngOnInit(): void {
    this.description = this.descriptionInfo.description as TimeDescription;
    try {
      this.timeStr =
        this.datePipe.transform(this.description.value, 'yyyy-MM-dd') ??
        '未知时间';
    } catch (error) {
      console.error(error);
    }
  }
}
