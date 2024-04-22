import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'lib-exception-403',
  standalone: true,
  imports: [CommonModule, NzResultModule],
  templateUrl: './exception-403.component.html',
  styleUrl: './exception-403.component.less',
})
export class Exception403Component {}
