import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import {
  CustomFormComponent,
  CustomFormData,
  CustomFormItemInfos,
} from 'beian-shared-lib';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import {
  ReplaySubject,
  filter,
  of,
  map,
  switchMap,
  BehaviorSubject,
} from 'rxjs';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    NzPageHeaderModule,
    CustomFormComponent,
    NzLayoutModule,
    NzSkeletonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less',
})
export class RegisterComponent implements OnInit {
  destroyRef = inject(DestroyRef);

  constructor(
    private message: NzMessageService,
    private router: Router,
    private userService: UserService,
  ) {}

  formItemInfos$ = of(1).pipe(
    map((): CustomFormItemInfos => {
      return [
        {
          key: 'username',
          formType: 'string',
          title: '用户名',
          constraint: {
            required: true,
            placeholder: '',
          },
        },
        {
          key: 'password',
          formType: 'string',
          title: '密码',
          constraint: {
            required: true,
            placeholder: '',
            password: true,
            minlength: 6,
          },
        },
        {
          key: 'password2',
          formType: 'string',
          title: '确认密码',
          constraint: {
            required: true,
            placeholder: '',
            password: true,
            minlength: 6,
          },
        },
      ];
    }),
  );

  formData$ = new ReplaySubject<CustomFormData>(1);
  public username$ = new BehaviorSubject<string>('');
  public password$ = new BehaviorSubject<string>('');

  ngOnInit(): void {
    this.formData$
      .pipe(
        filter((data) => {
          const password = data.find((item) => {
            return item.key == 'password';
          });

          const password2 = data.find((item) => {
            return item.key == 'password2';
          });

          if (password?.value != password2?.value) {
            this.message.error('两次密码不相同！');
            return false;
          }
          return true;
        }),
        map((data) => {
          // 提取username和password
          const username = data.find((item) => item.key === 'username')?.value;
          const password = data.find((item) => item.key === 'password')?.value;

          // 确保username和password不为undefined，否则抛出错误
          if (typeof username === 'undefined' || username === null) {
            throw new Error('用户名未提供');
          }
          if (typeof password === 'undefined' || password === null) {
            throw new Error('密码未提供');
          }

          // 确保username和password都是字符串类型
          return { name: username as string, password: password as string };
        }),
        switchMap((params) => {
          // 调用userService的注册方法
          return this.userService.registration$(params.name, params.password);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['login']).then();
        }
      });
  }
}
