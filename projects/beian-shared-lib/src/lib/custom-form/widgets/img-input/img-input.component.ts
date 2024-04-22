import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import {
  CustomFormItem,
  ImgInputConstraint,
  ImgInputRes,
} from '../../interfaces/custom-form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { BehaviorSubject, map } from 'rxjs';

@Component({
  selector: 'lib-img-input',
  standalone: true,
  imports: [
    CommonModule,
    NzUploadModule,
    NzModalModule,
    NzImageModule,
    NzFormModule,
    NzGridModule,
    NzInputNumberModule,
    NzIconModule,
    NzButtonModule,
  ],
  templateUrl: './img-input.component.html',
  styleUrl: './img-input.component.less',
})
export class ImgInputComponent implements OnInit {
  @Input({ required: true }) customFormItem!: CustomFormItem;

  public constraint!: ImgInputConstraint;
  private data$!: BehaviorSubject<ImgInputRes>;

  ngOnInit() {
    this.constraint = this.customFormItem.metaInfo
      .constraint as ImgInputConstraint;
    this.data$ = this.customFormItem.data$ as BehaviorSubject<ImgInputRes>;

    this.uploadFiles$
      .pipe(
        map((nzFiles: NzUploadFile[]) => {
          return nzFiles.map((nzFile) => {
            return nzFile as unknown as File;
          });
        }),
      )
      .subscribe(this.data$);
  }

  public uploadFiles$ = new BehaviorSubject<NzUploadFile[]>([]);

  beforeUpload = (file: NzUploadFile): boolean => {
    this.uploadFiles$.next(this.uploadFiles$.value.concat(file));
    return false;
  };
}
