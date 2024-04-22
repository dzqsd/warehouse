import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, NzLayoutModule, NzButtonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.less',
})
export class WelcomeComponent {
  constructor(public router: Router) {}
}
