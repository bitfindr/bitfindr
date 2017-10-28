import { AuthActions, AuthActionTypes } from './../../../state';
import { FirebaseUserProfile } from './../../../shared/models';

export interface SignupState {
  signingUp: boolean;
  error: any;
}

export const SIGNUP_INITIAL_STATE: SignupState = {
  signingUp: false,
  error: null,
};

export function signupReducer(
  state = SIGNUP_INITIAL_STATE,
  action: AuthActions
): SignupState {
  switch (action.type) {
    case AuthActionTypes.SIGNUP: {
      return {
        error: null,
        signingUp: true,
      };
    }

    case AuthActionTypes.SIGNUP_FAIL: {
      return {
        signingUp: false,
        error: action.payload,
      };
    }

    case AuthActionTypes.AUTHENTICATE: {
      return { ...SIGNUP_INITIAL_STATE };
    }

    default:
      return state;
  }
}
