import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MenusService } from '../../layout/services/menus.service';
import { FilingService } from '../../services/filing.service';
import { Menus } from '../../layout/interfaces/menu';
import { map } from 'rxjs';

@Component({
  selector: 'app-service-center',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: '<router-outlet></router-outlet>',
})
export class ServiceCenterComponent implements OnInit {
  constructor(
    private menusService: MenusService,
    private filingService: FilingService,
  ) {}

  private filingInfos = this.filingService.getFilingTypeInfos$();

  ngOnInit() {
    this.filingInfos
      .pipe(
        map((infos): Menus => {
          return infos.map((info) => {
            return {
              level: 2,
              title: info.name,
              icon: 'form',
              selected: false,
              disabled: false,
              routerLink: ['service-center', 'filing', info.id.toString()],
            };
          });
        }),
      )
      .subscribe(() => {
        // const menus: Menus = [
        //   {
        //     level: 1,
        //     title: '首页',
        //     icon: 'dashboard',
        //     selected: true,
        //     disabled: false,
        //     routerLink: ['service-center', 'dashboard'],
        //   },
        //   {
        //     level: 1,
        //     title: '备案审批',
        //     icon: 'form',
        //     selected: false,
        //     disabled: false,
        //     routerLink: ['review', 'filing'],
        //   },
        //   {
        //     level: 1,
        //     title: '企业认证审批',
        //     icon: 'form',
        //     selected: false,
        //     disabled: false,
        //     routerLink: ['review', 'company'],
        //   },
        //   {
        //     level: 1,
        //     title: '备案查询',
        //     icon: 'search',
        //     selected: false,
        //     disabled: false,
        //     open: true,
        //     children: [
        //       {
        //         level: 2,
        //         title: '进行中的备案',
        //         icon: 'search',
        //         selected: true,
        //         disabled: false,
        //         routerLink: [
        //           'service-center',
        //           'filing-query',
        //           'ongoing-filing',
        //         ],
        //       },
        //       {
        //         level: 2,
        //         title: '已完成的备案',
        //         icon: 'search',
        //         selected: true,
        //         disabled: false,
        //         routerLink: [
        //           'service-center',
        //           'filing-query',
        //           'completed-filing',
        //         ],
        //       },
        //     ],
        //   },
        // ];
        // this.menusService.setMenus(menus);
      });
  }
}
