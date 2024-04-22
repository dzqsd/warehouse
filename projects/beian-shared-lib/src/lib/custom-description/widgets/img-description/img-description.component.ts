import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CustomDescriptionItemInfo,
  ImgDescription,
} from '../../interfaces/custom-description';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzImageModule, NzImageService } from 'ng-zorro-antd/image';
import { NzCardModule } from 'ng-zorro-antd/card';
import { HttpClient } from '@angular/common/http';
import { AsyncSubject } from 'rxjs';
import { HttpImgComponent } from './http-img/http-img.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'lib-img-description',
  standalone: true,
  templateUrl: './img-description.component.html',
  styleUrl: './img-description.component.less',
  imports: [
    CommonModule,
    NzDescriptionsModule,
    NzImageModule,
    NzCardModule,
    HttpImgComponent,
    NzButtonModule,
    NzIconModule,
  ],
})
export class ImgDescriptionComponent implements OnInit {
  @Input({ required: true }) descriptionInfo!: CustomDescriptionItemInfo;

  constructor(
    private nzImageService: NzImageService,
    private http: HttpClient,
  ) {}

  public description!: ImgDescription;
  public url$ = new AsyncSubject<string>();

  ngOnInit(): void {
    this.description = this.descriptionInfo.description as ImgDescription;
  }

  downloadFile(url: string, name: string) {
    this.http.get(url, { responseType: 'blob' }).subscribe((response: Blob) => {
      const downloadLink = document.createElement('a');
      const blob = new Blob([response], { type: response.type });

      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = name;

      downloadLink.click();
    });
  }
}
