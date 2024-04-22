import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CustomDescriptionItemInfo,
  FileDescription,
} from '../../interfaces/custom-description';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCardModule } from 'ng-zorro-antd/card';
import { HttpClient } from '@angular/common/http';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'lib-file-description',
  standalone: true,
  imports: [
    CommonModule,
    NzDescriptionsModule,
    NzIconModule,
    NzSpaceModule,
    NzCardModule,
    NzButtonModule,
  ],
  templateUrl: './file-description.component.html',
  styleUrl: './file-description.component.less',
})
export class FileDescriptionComponent implements OnInit {
  @Input({ required: true }) descriptionInfo!: CustomDescriptionItemInfo;

  constructor(
    private nzImageService: NzImageService,
    private http: HttpClient,
  ) {}

  public description!: FileDescription;

  ngOnInit(): void {
    this.description = this.descriptionInfo.description as FileDescription;
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
