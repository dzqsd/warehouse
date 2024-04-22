import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { Router } from '@angular/router';
import {
  NzNotificationModule,
  NzNotificationService,
} from 'ng-zorro-antd/notification';
import { UserApiService, BaseApiService } from 'beian-shared-lib';
import { filter } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzNotificationModule, NzButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.less',
})
export class DashboardComponent {
  @ViewChild(TemplateRef, { static: false }) template?: TemplateRef<
    NonNullable<unknown>
  >;

  gridStyle = {
    width: '50%',
    textAlign: 'center',
  };

  constructor(
    public router: Router,
    private notificationService: NzNotificationService,
    private userApiService: UserApiService,
    private baseApiService: BaseApiService,
  ) {
    // userApiService
    //   .check$()
    //   .pipe(
    //     filter((res) => {
    //       return this.baseApiService.baseResSucess(res);
    //     }),
    //   )
    //   .subscribe((res) => {
    //     for (const uuid of res.data) {
    //       this.notificationService.template(this.template!, {
    //         nzDuration: 0,
    //         nzData: uuid,
    //       });
    //     }
    //   });
  }
}
