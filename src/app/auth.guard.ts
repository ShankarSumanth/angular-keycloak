import { Observable } from 'rxjs/Observable';
import { KeycloakApiService } from './keycloak/keycloak-api.service';
import { IsLoggedInCheck } from './keycloak/keycloak.actions';
import { selectKeycloakModel } from './keycloak/keycloak.reducer';
import { AppState } from './reducers';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private store: Store<AppState>
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        let url: string = state.url;

        return this.checkLogin(url);
    }

    checkLogin(url: string): Observable<boolean> {
        return this.store.select(selectKeycloakModel)
            .do(keycloak => {
                if (!keycloak.isLoggedIn) {
                    window.localStorage.setItem('postLoginRedirect', url);
                    this.router.navigate(['/']);
                } else {
                    const redirectUrl = window.localStorage.getItem('postLoginRedirect');
                    window.localStorage.removeItem('postLoginRedirect');

                    if (redirectUrl) {
                        console.log('Redirecting to ' + redirectUrl);
                        this.router.navigate([redirectUrl]);
                    }
                }
            })
            .map(keycloak => keycloak.isLoggedIn);
    }
}
