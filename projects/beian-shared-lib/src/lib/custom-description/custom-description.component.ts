import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CustomDescriptionItemInfos } from './interfaces/custom-description';
import { StringDescriptionComponent } from './widgets/string-description/string-description.component';
import { ImgDescriptionComponent } from './widgets/img-description/img-description.component';
import { FileDescriptionComponent } from './widgets/file-description/file-description.component';
import { TimeDescriptionComponent } from './widgets/time-description/time-description.component';

@Component({
  selector: 'lib-custom-description',
  standalone: true,
  templateUrl: './custom-description.component.html',
  styleUrl: './custom-description.component.less',
  imports: [
    CommonModule,
    NzDescriptionsModule,
    NzCardModule,
    StringDescriptionComponent,
    ImgDescriptionComponent,
    FileDescriptionComponent,
    TimeDescriptionComponent,
  ],
})
export class CustomDescriptionComponent {
  @Input({ required: true })
  descriptionItemInfos!: CustomDescriptionItemInfos;
}
