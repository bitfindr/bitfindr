import { AuthActions, AuthActionTypes } from './../../../state';
import { FirebaseUserProfile } from './../../../shared/models';

export interface LoginState {
  loggingIn: boolean;
  error: any;
}

export const LOGIN_INITIAL_STATE: LoginState = {
  loggingIn: false,
  error: null,
};

export function loginReducer(
  state = LOGIN_INITIAL_STATE,
  action: AuthActions
): LoginState {
  switch (action.type) {
    case AuthActionTypes.LOGIN: {
      return {
        error: null,
        loggingIn: true,
      };
    }

    case AuthActionTypes.LOGIN_FAIL: {
      return {
        loggingIn: false,
        error: action.payload,
      };
    }

    case AuthActionTypes.AUTHENTICATE: {
      return { ...LOGIN_INITIAL_STATE };
    }

    default:
      return state;
  }
}
