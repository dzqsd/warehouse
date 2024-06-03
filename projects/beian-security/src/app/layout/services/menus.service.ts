import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Menus } from '../interfaces/menu';
import { AuthorityType } from 'beian-shared-lib';

export type MenuKind = 'default' | 'user-center';

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  constructor(private userService: UserService) {
    this.userService.authority$.subscribe((authority) => {
      console.log('authority', authority);
      switch (authority) {
        case AuthorityType.USER:
          this._menus$.next([
            {
              level: 1,
              title: '仓储物资管理',
              icon: 'form',
              selected: false,
              disabled: false,
              routerLink: ['warehouse-manage'],
            },
          ]);
          break;
        case AuthorityType.ADMIN:
          this._menus$.next([
            {
              level: 1,
              title: '仓储物资管理',
              icon: 'form',
              selected: false,
              disabled: false,
              routerLink: ['warehouse-manage'],
            },
            {
              level: 1,
              title: '运输转移路线规划',
              icon: 'form',
              selected: false,
              disabled: false,
              routerLink: ['route-planing'],
            },
            {
              level: 1,
              title: '资源补给管理',
              icon: 'form',
              selected: false,
              disabled: false,
              routerLink: ['resource-supply'],
            },
          ]);
          break;
        default:
          this._menus$.next([
            {
              level: 1,
              title: '仓储物资管理',
              icon: 'form',
              selected: false,
              disabled: false,
              routerLink: ['warehouse-manage'],
            },
            {
              level: 1,
              title: '运输转移路线规划',
              icon: 'form',
              selected: false,
              disabled: false,
              routerLink: ['route-planing'],
            },
            {
              level: 1,
              title: '资源补给管理',
              icon: 'form',
              selected: false,
              disabled: false,
              routerLink: ['resource-supply'],
            },
            {
              level: 1,
              title: '应急处理预案',
              icon: 'form',
              selected: false,
              disabled: false,
              routerLink: ['urgent-plan'],
            },
          ]);
          break;
      }
    });
  }

  private _menus$ = new BehaviorSubject<Menus>([]);

  private userMenus$ = new BehaviorSubject([]);

  get menus$(): Observable<Menus> {
    return this._menus$.asObservable();
  }

  userCenterMenus$(): Observable<Menus> {
    return this.userMenus$;
  }

  public getMenu$(menuKind: MenuKind): Observable<Menus> {
    switch (menuKind) {
      case 'user-center':
        return this.userMenus$;

      default:
        return this._menus$;
    }
  }

  public setMenus(menus: Menus) {
    return;
    this._menus$.next(menus);
  }
}
