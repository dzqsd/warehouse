import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { BehaviorSubject, switchMap, map } from 'rxjs';
import {
  CustomDescriptionComponent,
  EnterpriseStatusPipe,
  EnterpriseApiService,
} from 'beian-shared-lib';
import { EnterpriseDescriptionComponent } from '../../../enterprise-description/enterprise-description.component';

@Component({
  selector: 'app-enterprise-details',
  standalone: true,
  templateUrl: './enterprise-details.component.html',
  styleUrl: './enterprise-details.component.less',
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
    CustomDescriptionComponent,
    EnterpriseStatusPipe,
    EnterpriseDescriptionComponent,
  ],
})
export class EnterpriseDetailsComponent implements OnInit {
  destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private enterpriseApiService: EnterpriseApiService,
    private userService: UserService,
    private nzMessageService: NzMessageService,
  ) {}

  public enterpriseId$ = new BehaviorSubject<string | null>(null);
  public enterpriseInfo$ = this.enterpriseId$.pipe(
    switchMap((id) => this.enterpriseApiService.getEnterpriseInfoByUuid$(id!)),
    map((res) => res.data.results[0]),
  );

  @Input()
  public rejectionComments = '';

  public ngOnInit() {
    this.route.paramMap
      .pipe(
        map((param) => param.get('uuid')),
        map((id) => {
          if (id == null) {
            throw Error('enterprise uuid not provided');
          }
          return id;
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(this.enterpriseId$);
  }

  public approve() {
    const userId = this.userService.curUserId;
    const enterpriseUuid = this.enterpriseId$.value;
    if (userId == null || enterpriseUuid == null) {
      return;
    }
    this.enterpriseApiService
      .approve$({ userId, enterpriseUuid })
      .subscribe((res) => {
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
    const enterpriseUuid = this.enterpriseId$.value;
    const comment = this.rejectionComments;
    if (userId == null || enterpriseUuid == null) {
      return;
    }
    this.enterpriseApiService
      .reject$({ userId, enterpriseUuid, comment })
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
