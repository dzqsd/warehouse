import { Route } from '@angular/router';

import { FilingQueryComponent } from './filing/filing-query/filing-query.component';
import { FilingDetailsComponent } from './filing/filing-details/filing-details.component';
import { EnterpriseQueryComponent } from './enterprise/enterprise-query/enterprise-query.component';
import { EnterpriseDetailsComponent } from './enterprise/enterprise-details/enterprise-details.component';

export default [
  { path: 'filing', component: FilingQueryComponent },
  { path: 'filing/:uuid', component: FilingDetailsComponent },
  { path: 'enterprise', component: EnterpriseQueryComponent },
  { path: 'enterprise/:uuid', component: EnterpriseDetailsComponent },
] satisfies Route[];
