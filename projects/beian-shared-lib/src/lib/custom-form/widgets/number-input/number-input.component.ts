import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  CustomFormItem,
  NumberInputConstraint,
  NumberInputRes,
} from '../../interfaces/custom-form';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'lib-number-input',
  standalone: true,
  imports: [
    CommonModule,
    NzInputNumberModule,
    FormsModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
  ],
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.less',
})
export class NumberInputComponent implements OnInit {
  @Input({ required: true }) customFormItem!: CustomFormItem;

  constraint!: NumberInputConstraint;
  data$!: BehaviorSubject<NumberInputRes>;

  ngOnInit() {
    this.constraint = this.customFormItem.metaInfo
      .constraint as NumberInputConstraint;

    this.data$ = this.customFormItem.data$ as BehaviorSubject<NumberInputRes>;

    if (this.constraint.startwith) {
      this.data$.next(this.constraint.startwith);
    }
  }
}
