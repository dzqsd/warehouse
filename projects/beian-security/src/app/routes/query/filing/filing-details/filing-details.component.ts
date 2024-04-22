import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject, filter, finalize, map, switchMap } from 'rxjs';
import {
  EnterpriseStatusPipe,
  FilingInfo,
  CustomDescriptionComponent,
} from 'beian-shared-lib';
import { FilingApiService } from 'beian-shared-lib';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCardModule } from 'ng-zorro-antd/card';
import { FilingDescriptionComponent } from '../../../filing-description/filing-description.component';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-filing-details',
  standalone: true,
  templateUrl: './filing-details.component.html',
  styleUrl: './filing-details.component.less',
  imports: [
    CommonModule,
    NzDividerModule,
    NzButtonModule,
    NzInputModule,
    NzMessageModule,
    NzPageHeaderModule,
    NzCardModule,
    FormsModule,
    RouterModule,
    EnterpriseStatusPipe,
    CustomDescriptionComponent,
    FilingDescriptionComponent,
  ],
})
export class FilingDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private filingApiService: FilingApiService,
    private userService: UserService,
    private nzMessageService: NzMessageService,
  ) {}

  public filingUuid$ = new BehaviorSubject<string | null>(null);

  public filingInfo$ = this.filingUuid$.pipe(
    switchMap((id) => this.filingApiService.getFilingInfoByUuid$(id!)),
    filter((res): res is FilingInfo => {
      if (res == null) {
        this.router.navigate(['404']);
      }
      return res != null;
    }),
  );

  @Input()
  public rejectionComments = '';

  public ngOnInit() {
    this.route.paramMap
      .pipe(
        map((param) => param.get('uuid')),
        map((id) => {
          if (id == null) {
            throw Error('filing uuid not provided');
          }
          return id;
        }),
        finalize(() => this.filingUuid$.unsubscribe()),
      )
      .subscribe(this.filingUuid$);
  }

  public approve() {
    const userId = this.userService.curUserId;
    const filingUuid = this.filingUuid$.value;
    if (userId == null || filingUuid == null) {
      return;
    }
    this.filingApiService.approve$({ userId, filingUuid }).subscribe((res) => {
      if (res.code === 200) {
        this.router.navigate(['review', 'company']);
        this.nzMessageService.success('审批通过');
      } else {
        this.nzMessageService.error(res.msg);
      }
    });
  }

  public reject() {
    const userId = this.userService.curUserId;
    const filingUuid = this.filingUuid$.value;
    const comment = this.rejectionComments;
    if (userId == null || filingUuid == null) {
      return;
    }
    this.filingApiService
      .reject({ userId, filingUuid, comment })
      .subscribe((res) => {
        if (res.code === 200) {
          this.router.navigate(['review', 'company']);
          this.nzMessageService.success('驳回成功');
        } else {
          this.nzMessageService.error(res.msg);
        }
      });
  }
}
