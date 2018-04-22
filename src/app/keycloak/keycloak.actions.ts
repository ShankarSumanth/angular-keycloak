import { KeycloakLoginCheckResponse } from './keycloak.model';
import { Response } from '@angular/http';
import { Action } from '@ngrx/store';

export enum KeycloakActionTypes {
    IsLoggedInCheck = '[Keycloak] Is Loggedin Check',
    IsLoggedInCheckSuccess = '[Keycloak] Is Logged In Check Success',
    IsLoggedInCheckFail = '[Keycloak] Is Logged In Check Fail',
    Login = '[Keycloak] Login',
    LoginSuccess = '[Keycloak] Login Success',
    LoginFail = '[Keycloak] Login Fail',
    Logout = '[Keycloak] Logout',
    LogoutSuccess = '[Keycloak] Logout Success',
    LogoutFail = '[Keycloak] Logout Fail'
}

export class IsLoggedInCheck implements Action {
    readonly type = KeycloakActionTypes.IsLoggedInCheck;
}

export class IsLoggedInCheckSuccess implements Action {
    readonly type = KeycloakActionTypes.IsLoggedInCheckSuccess;

    constructor(public payload: KeycloakLoginCheckResponse) { }
}

export class IsLoggedInCheckFail implements Action {
    readonly type = KeycloakActionTypes.IsLoggedInCheckFail;
}

export class Login implements Action {
    readonly type = KeycloakActionTypes.Login;
}

export class LoginSuccess implements Action {
    readonly type = KeycloakActionTypes.LoginSuccess;

    constructor(public payload: any) { }
}

export class LoginFail implements Action {
    readonly type = KeycloakActionTypes.LoginFail;
}

export class Logout implements Action {
    readonly type = KeycloakActionTypes.Logout;
}

export class LogoutSuccess implements Action {
    readonly type = KeycloakActionTypes.LogoutSuccess;
}

export class LogoutFail implements Action {
    readonly type = KeycloakActionTypes.LogoutFail;
}

export type KeycloakActions =
    | Logout
    | LogoutFail
    | LogoutSuccess
    | IsLoggedInCheck
    | IsLoggedInCheckSuccess
    | IsLoggedInCheckFail
    | Login
    | LoginSuccess
    | LoginFail;
