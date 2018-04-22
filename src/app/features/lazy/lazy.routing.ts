import { Routes } from '@angular/router';
import { LazyComponent } from './lazy.component';

export const routes: Routes = [
  { path: 'home', loadChildren: './home/index#HomeModule' },
  {
    path: '',
    component: LazyComponent
  }
];
