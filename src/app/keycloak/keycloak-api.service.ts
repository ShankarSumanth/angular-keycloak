import { KeycloakLoginCheckResponse } from './../keycloak/keycloak.model';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import './keycloak';
import { Observer } from 'rxjs/Observer';

declare const Keycloak: any;

@Injectable()
export class KeycloakApiService {

    private keycloak: any;

    constructor() {
        this.keycloak = new Keycloak('keycloak.json');
    }

    isLoggedIn(): Observable<KeycloakLoginCheckResponse> {
        const checkLogin = this.keycloak.init({ onLoad: 'check-sso' });
        const keycloakObserver = Observable
            .create((observer: Observer<KeycloakLoginCheckResponse>) => {
                checkLogin
                    .success(loggedIn => observer.next({ loggedIn, idmId: this.keycloak.subject }));
                checkLogin.error(data => observer.error(data));
            });

        return keycloakObserver;
    }

    login(): Observable<void> {
        const login = this.keycloak.login();
        const keycloakObserver = Observable.create((observer: Observer<boolean>) => {
            login.success(data => console.log(data));
            login.error(data => observer.error(data));
        });

        return keycloakObserver;
    }

    updateToken(): Observable<string> {
        const updateToken = this.keycloak.updateToken(5);
        return Observable.create((observer: Observer<string>) => {
            updateToken.success(_ => observer.next(this.keycloak.token));
            updateToken.error(data => observer.error(data));
        });
    }
}
