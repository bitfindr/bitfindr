import { ActionReducerMap, ActionReducer, Action } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from './../environments/environment';
import {
  authReducer,
  AuthState,
  AUTH_INITIAL_STATE,
} from './auth/auth.reducer';
import {
  profileReducer,
  ProfileState,
  PROFILE_INITIAL_STATE,
} from './profile/profile.reducer';
import { AuthActionTypes } from './index';

export interface ApplicationState {
  auth: AuthState;
  profile: ProfileState;
}

export const APP_INITIAL_STATE: ApplicationState = {
  auth: AUTH_INITIAL_STATE,
  profile: PROFILE_INITIAL_STATE,
};

export const ROOT_REDUCER: ActionReducerMap<ApplicationState> = {
  auth: authReducer,
  profile: profileReducer,
};

export function metaReducer(reducer: ActionReducer<ApplicationState>) {
  return (state: ApplicationState, action: Action) => {
    if (action.type === AuthActionTypes.SIGNOUT) {
      return reducer(APP_INITIAL_STATE, action);
    }

    return reducer(state, action);
  };
}

export const META_REDUCERS = environment.production
  ? [metaReducer]
  : [storeFreeze, metaReducer];
