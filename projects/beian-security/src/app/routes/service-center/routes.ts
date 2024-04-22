import { Route } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';

export default [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
] as Route[];
