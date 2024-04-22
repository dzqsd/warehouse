import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CustomFormItem,
  DateInputConstraint,
  DateInputRes,
} from '../../interfaces/custom-form';
import { BehaviorSubject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'lib-date-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzIconModule,
    NzDatePickerModule,
  ],
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.less',
})
export class DateInputComponent implements OnInit {
  @Input({ required: true }) customFormItem!: CustomFormItem;

  constraint!: DateInputConstraint;
  data$!: BehaviorSubject<DateInputRes>;

  ngOnInit() {
    this.constraint = this.customFormItem.metaInfo
      .constraint as DateInputConstraint;

    this.data$ = this.customFormItem.data$ as BehaviorSubject<DateInputRes>;

    this.data$.next(null);
  }
}
