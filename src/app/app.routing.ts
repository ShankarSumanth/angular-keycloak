import { AuthGuard } from './auth.guard';
/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { DashboardComponent } from './features/dashboard.component';
import { NotFound404Component } from './not-found404.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'lazy', loadChildren: './features/lazy/index#LazyModule', canActivate: [AuthGuard] },
  { path: '**', component: NotFound404Component }
];
