import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import {
  CustomFormItem,
  SelectInputConstraint,
  SelectInputRes,
} from '../../interfaces/custom-form';
import { BehaviorSubject } from 'rxjs';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'lib-select-input',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzSelectModule],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.less',
})
export class SelectInputComponent implements OnInit {
  @Input({ required: true }) customFormItem!: CustomFormItem;

  constraint!: SelectInputConstraint;
  data$!: BehaviorSubject<SelectInputRes>;

  ngOnInit() {
    this.constraint = this.customFormItem.metaInfo
      .constraint as SelectInputConstraint;

    this.data$ = this.customFormItem.data$ as BehaviorSubject<SelectInputRes>;

    this.data$.next(null);

    if (this.constraint.startwith) {
      this.data$.next(this.constraint.startwith);
    }
  }
}
