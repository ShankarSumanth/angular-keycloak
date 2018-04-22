export interface KeycloakModel {
    readonly isLoggedIn: boolean;
    readonly showLoading: boolean;
    readonly id: string;
    readonly needsLogin: boolean;
}

export interface KeycloakLoginCheckResponse {
    loggedIn: boolean;
    idmId: string;
}
