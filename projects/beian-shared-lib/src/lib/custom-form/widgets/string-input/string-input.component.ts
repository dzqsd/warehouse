import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import {
  CustomFormItem,
  StringInputConstraint,
  StringInputRes,
} from '../../interfaces/custom-form';
import { BehaviorSubject } from 'rxjs';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'lib-string-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzIconModule,
  ],
  templateUrl: './string-input.component.html',
  styleUrl: './string-input.component.less',
})
export class StringInputComponent implements OnInit {
  @Input({ required: true }) customFormItem!: CustomFormItem;

  constraint!: StringInputConstraint;
  data$!: BehaviorSubject<StringInputRes>;

  visible$!: BehaviorSubject<boolean>;

  ngOnInit() {
    this.constraint = this.customFormItem.metaInfo
      .constraint as StringInputConstraint;

    this.visible$ = new BehaviorSubject<boolean>(
      this.constraint.password ? false : true,
    );

    this.data$ = this.customFormItem.data$ as BehaviorSubject<StringInputRes>;
    if (this.constraint.startwith) {
      this.data$.next(this.constraint.startwith);
    }
  }
}
