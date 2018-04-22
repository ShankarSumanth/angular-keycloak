import { AppState } from '../reducers';
/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';

import { KeycloakActions, KeycloakActionTypes, LoginSuccess } from './keycloak.actions';
import { KeycloakModel } from './keycloak.model';

export interface KeycloakState {
    keycloakModel: KeycloakModel;
    checkingKeycloakStatus: boolean;
}

export const initialState: KeycloakState = {
    keycloakModel: {
        isLoggedIn: null,
        id: null,
        needsLogin: null,
        showLoading: true
    },
    checkingKeycloakStatus: false
};

export function keycloakReducer(state = initialState, action: KeycloakActions): KeycloakState {
    switch (action.type) {

        case KeycloakActionTypes.IsLoggedInCheck: {
            return {
                ...state,
                checkingKeycloakStatus: true
            };
        }
        case KeycloakActionTypes.IsLoggedInCheckSuccess: {
            return {
                ...state,
                keycloakModel: {
                    ...state.keycloakModel,
                    isLoggedIn: action.payload.loggedIn,
                    id: action.payload.idmId,
                    needsLogin: !action.payload.loggedIn
                },
                checkingKeycloakStatus: false
            };
        }
        case KeycloakActionTypes.Login: {
            return {
                ...state,
                checkingKeycloakStatus: true
            };
        }
        case KeycloakActionTypes.LoginSuccess: {
            return {
                ...state,
                checkingKeycloakStatus: false
            };
        }
        default: {
            return state;
        }
    }
}

export const selectKeycloakModel = ((state: AppState) => state.keycloak.keycloakModel);
