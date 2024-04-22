import { HttpInterceptorFn } from '@angular/common/http';
import { JwtService } from '../services/jwt.service';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtService = inject(JwtService);

  if (jwtService.curToken) {
    // 非标准jwt，缺少'Bearer'
    const reqWithHeader = req.clone({
      headers: req.headers.set('token', jwtService.curToken),
    });
    return next(reqWithHeader);
  }

  return next(req);
};
