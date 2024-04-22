import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { Menus } from '../interfaces/menu';
import { MenuKind, MenusService } from '../services/menus.service';
import { MenusComponent } from './widgets/menus/menus.component';
import { UserHeaderComponent } from './widgets/user-header/user-header.component';

@Component({
  selector: 'app-basic-layout',
  standalone: true,
  imports: [
    CommonModule,
    NzLayoutModule,
    NzIconModule,
    RouterOutlet,
    MenusComponent,
    RouterLink,
    UserHeaderComponent,
  ],
  templateUrl: './basic-layout.component.html',
  styleUrl: './basic-layout.component.less',
})
export class BasicLayoutComponent {
  constructor(
    public themeService: ThemeService,
    public menuService: MenusService,
    private route: ActivatedRoute,
  ) {}

  public isCollapsed$ = new BehaviorSubject<boolean>(false);

  //ExpressionChangedAfterItHasBeenCheckedError
  //如果子组件构造时立刻通知修改menus，则会出现在变更检测中子组件更改父组件的情形
  //通过delay(0)延迟到下一个周期变更检测周期
  public menus$: Observable<Menus> = this.route.data.pipe(
    map((data) => data['nav'] as string),
    switchMap((nav) => this.menuService.getMenu$(nav as MenuKind)),
  );
}
