import { Provider } from '@angular/core';
import { AuthFacade } from './../../src/state';
import { AuthFacadeMock } from './auth.facade.mock';

export const APP_MOCKS: Provider[] = [
  { provide: AuthFacade, useFactory: () => AuthFacadeMock.instance() },
];
