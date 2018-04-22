import { ActivatedRoute, Router } from '@angular/router';
import { selectKeycloakModel } from './../keycloak/keycloak.reducer';
import { IsLoggedInCheck } from './../keycloak/keycloak.actions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { TransferHttp } from '../../modules/transfer-http/transfer-http';

import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { User } from '../user/user.model';

import * as UserActions from '../user/user.actions';
import { Login } from '../keycloak/keycloak.actions';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`#my-logout-button { background: #F44336 }`]
})

export class DashboardComponent implements OnDestroy, OnInit {

  private alive = true;

  constructor(
    private http: TransferHttp,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.store.dispatch(new IsLoggedInCheck());
    this.store.select(selectKeycloakModel)
      .pipe(takeWhile(_ => this.alive))
      .filter(model => model.isLoggedIn)
      .subscribe(_ => this.router.navigate(['lazy']));
  }

  ngOnDestroy() {
    this.alive = false;
  }

  login() {
    this.store.dispatch(new Login());
  }
}
