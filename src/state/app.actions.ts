import { Action } from '@ngrx/store';

export enum AppActionTypes {
  NOOP = '[App] NOOP',
}

// No Operation action.
// Sometimes we'll need to use that when if an @Effect()
// only **conditionally** maps to another action
// So when condition is not met, we dispatch NoopAction
export class NoopAction implements Action {
  readonly type = AppActionTypes.NOOP;
}

export type AppActions = NoopAction;
