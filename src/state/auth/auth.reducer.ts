import { createSelector } from '@ngrx/store';

import { AuthActions, AuthActionTypes } from './auth.actions';
import { FirebaseUserProfile } from './../../shared/models/auth';
import { ApplicationState } from './../app.state';

export interface AuthState {
  checkedAuthState: boolean;
  authUser: FirebaseUserProfile;
}

export const INITIAL_STATE: AuthState = {
  checkedAuthState: false,
  authUser: null,
};

export function authReducer(state = INITIAL_STATE, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
    case AuthActionTypes.LOGIN_FAIL:
    case AuthActionTypes.SIGNUP:
    case AuthActionTypes.SIGNUP_FAIL: {
      return {
        ...state,
        authUser: null,
      };
    }

    case AuthActionTypes.AUTHENTICATE: {
      return {
        checkedAuthState: true,
        authUser: action.payload,
      };
    }

    default:
      return state;
  }
}

export namespace AuthQuery {
  export const getAuthState = (state: ApplicationState) => state.auth;

  export const getCheckedAuthState = createSelector(getAuthState, state => state.checkedAuthState);

  export const getAuthUser = createSelector(getAuthState, state => state.authUser);
}
