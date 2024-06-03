import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { map, tap } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);
  const nzMessageService = inject(NzMessageService);
  return userService.curUserId$.pipe(
    map((id) => {
      return id != null;
    }),
    tap((can) => {
      console.log('can', can);
      if (!can) {
        nzMessageService.create('info', '请登录');
        router.navigate(['login']);
      }
    }),
  );
};
