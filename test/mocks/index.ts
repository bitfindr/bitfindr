import { Provider } from '@angular/core';

import { IONIC_MOCKS } from './ionic-angular';
import { AuthFacade } from './../../src/state';
import { AuthFacadeMock } from './auth.facade.mock';

export const PROVIDER_MOCKS: Provider[] = [
  ...IONIC_MOCKS,

  { provide: AuthFacade, useValue: AuthFacadeMock.instance() },
];
