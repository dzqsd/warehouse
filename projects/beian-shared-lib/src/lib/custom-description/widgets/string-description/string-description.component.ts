import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CustomDescriptionItemInfo,
  StringDescription,
} from '../../interfaces/custom-description';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

@Component({
  selector: 'lib-string-description',
  standalone: true,
  imports: [CommonModule, NzDescriptionsModule],
  templateUrl: './string-description.component.html',
  styleUrl: './string-description.component.less',
})
export class StringDescriptionComponent implements OnInit {
  @Input({ required: true }) descriptionInfo!: CustomDescriptionItemInfo;

  public description!: StringDescription;

  ngOnInit(): void {
    this.description = this.descriptionInfo.description as StringDescription;
  }
}
