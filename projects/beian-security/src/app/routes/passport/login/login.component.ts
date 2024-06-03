import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject, ReplaySubject, switchMap } from 'rxjs';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzCheckboxModule,
    NzCardModule,
    FormsModule,
    RouterLink,
    NzCheckboxModule,
    NzLayoutModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less',
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private nzMessageService: NzMessageService,
    private userService: UserService,
  ) {}

  public username$ = new BehaviorSubject<string>('');
  public password$ = new BehaviorSubject<string>('');
  public submit$ = new ReplaySubject<boolean>(1);

  public rememberMe$ = new BehaviorSubject<boolean>(false);
  ngOnInit() {
    this.submit$
      .pipe(
        switchMap(() => {
          return this.userService.login$(
            this.username$.value,
            this.password$.value,
            this.rememberMe$.value,
          );
        }),
      )
      .subscribe((success: boolean) => {
        if (success) {
          this.router.navigate(['/']).then();
        }
      });
  }
}
