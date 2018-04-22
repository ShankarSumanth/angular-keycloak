import { KeycloakActionTypes, IsLoggedInCheckSuccess, LoginSuccess } from './keycloak.actions';
import { KeycloakApiService } from './keycloak-api.service';
/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import {
    IsLoggedInCheck
} from './keycloak.actions';
import { AppState } from '../reducers';

@Injectable()

export class KeycloakEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private keycloakApi: KeycloakApiService
    ) { }

    @Effect() isLoggedInCheck$ = this.actions$
        .ofType(KeycloakActionTypes.IsLoggedInCheck)
        .switchMap(() => this.keycloakApi.isLoggedIn())
        .mergeMap(response => [
            new IsLoggedInCheckSuccess(response)
        ]);

    @Effect() login$ = this.actions$
        .ofType(KeycloakActionTypes.Login)
        .switchMap(() => this.keycloakApi.login())
        .mergeMap(login => [
            new LoginSuccess(login)
        ]);
}
