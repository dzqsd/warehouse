import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import {
  CustomFormData,
  CustomFormItem,
  CustomFormItemInfos,
  CustomFormItems,
} from './interfaces/custom-form';
import { ReplaySubject } from 'rxjs';
import { StringInputComponent } from './widgets/string-input/string-input.component';
import { NumberInputComponent } from './widgets/number-input/number-input.component';
import { ImgInputComponent } from './widgets/img-input/img-input.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FileInputComponent } from './widgets/file-input/file-input.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SelectInputComponent } from './widgets/select-input/select-input.component';
import { DateInputComponent } from './widgets/date-input/date-input.component';

@Component({
  selector: 'lib-custom-form',
  standalone: true,
  templateUrl: './custom-form.component.html',
  styleUrl: './custom-form.component.less',
  imports: [
    CommonModule,
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzCardModule,
    StringInputComponent,
    NumberInputComponent,
    ImgInputComponent,
    NzButtonModule,
    FileInputComponent,
    SelectInputComponent,
    DateInputComponent,
  ],
})
export class CustomFormComponent implements OnInit {
  destroyRef = inject(DestroyRef);

  @Input({ required: true }) formItemInfos!: CustomFormItemInfos;
  @Input({ required: true }) formData$!: ReplaySubject<CustomFormData>;

  @Input() title = '';

  constructor(private message: NzMessageService) {}

  customFormItems!: CustomFormItems;

  submit$ = new ReplaySubject<boolean>(1);

  ngOnInit() {
    this.customFormItems = this.formItemInfos.map((customFormItemInfo) => {
      return new CustomFormItem(customFormItemInfo);
    });

    this.submit$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      for (const customFormItem of this.customFormItems) {
        if (
          customFormItem.metaInfo.constraint.required === true &&
          customFormItem.data$.value === null
        ) {
          this.message.error(`${customFormItem.metaInfo.title}不能为空！`);
          return;
        }
      }

      this.formData$.next(
        this.customFormItems.map((customFormItem) => {
          return {
            key: customFormItem.metaInfo.key,
            value: customFormItem.data$.value,
          };
        }),
      );
    });
  }
}
