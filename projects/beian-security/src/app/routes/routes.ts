import { Route } from '@angular/router';

import { BasicLayoutComponent } from '../layout/basic-layout/basic-layout.component';
import { LoginComponent } from './passport/login/login.component';

// import { authGuardGuard } from '../guards/auth-guard.guard';
import { RegisterComponent } from './passport/register/register.component';
import { WarehouseManageComponent } from './warehouse-manage/warehouse-manage.component';
import { RoutePlaningComponent } from './route-planing/route-planing.component';
import { ResourceSupplyComponent } from './resource-supply/resource-supply.component';
import { UrgentPlanComponent } from './urgent-plan/urgent-plan.component';

export default [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'warehouse-manage',
  },
  // {
  //   path: 'welcome',
  //   component: WelcomeComponent,
  // },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: BasicLayoutComponent,
    data: {
      nav: 'default',
    },
    // canActivate: [authGuardGuard],
    children: [
      {
        path: 'warehouse-manage',
        component: WarehouseManageComponent,
      },
      {
        path: 'route-planing',
        component: RoutePlaningComponent,
      },
      {
        path: 'resource-supply',
        component: ResourceSupplyComponent,
      },
      {
        path: 'urgent-plan',
        component: UrgentPlanComponent,
      },
      // {
      //   path: 'service-center',
      //   pathMatch: 'prefix',
      //   component: ServiceCenterComponent,
      //   loadChildren: () => import('./service-center/routes'),
      // },
      // {
      //   path: '',
      //   pathMatch: 'full',
      //   redirectTo: 'service-center',
      //   // redirectTo: 'welcome',
      // },
      // {
      //   path: 'review/company',
      //   pathMatch: 'prefix',
      //   loadChildren: () => import('./review-company/routes'),
      // },
      // {
      //   path: 'review/filing',
      //   pathMatch: 'prefix',
      //   loadChildren: () => import('./review-filing/routes'),
      // },
      // {
      //   path: 'query',
      //   pathMatch: 'prefix',
      //   loadChildren: () => import('./query/routes'),
      // },
    ],
  },
  // {
  //   path: '',
  //   component: BasicLayoutComponent,
  //   data: {
  //     nav: 'user-center',
  //   },
  //   canActivate: [authGuardGuard],
  //   children: [
  //     {
  //       path: 'user-center',
  //       pathMatch: 'prefix',
  //       component: UserCenterComponent,
  //       loadChildren: () => import('./user-center/routes'),
  //     },
  //   ],
  // },
] as Route[];
