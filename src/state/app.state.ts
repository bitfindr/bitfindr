import { ActionReducerMap } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from './../environments/environment';
import { authReducer, AuthState } from './auth/auth.reducer';

export interface ApplicationState {
  auth: AuthState;
}

export const ROOT_REDUCER: ActionReducerMap<ApplicationState> = {
  auth: authReducer,
};

export const META_REDUCERS = environment.production
  ? []
  : [ storeFreeze ];
