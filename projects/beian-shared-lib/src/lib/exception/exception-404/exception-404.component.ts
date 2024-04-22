import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'lib-exception-404',
  standalone: true,
  imports: [CommonModule, NzResultModule],
  templateUrl: './exception-404.component.html',
  styleUrl: './exception-404.component.less',
})
export class Exception404Component {}
