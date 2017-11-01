import { Provider } from '@angular/core';

import {
  NavController,
  Config,
  Platform,
  DomController,
  App,
  Keyboard,
  Form,
} from 'ionic-angular';
import { NavControllerMock } from './nav-controller.mock';
import { ConfigMock } from './config.mock';
import { PlatformMock } from './platform.mock';
import { FormMock } from './form.mock';
import { AppMock } from './app.mock';
import { KeyboardMock } from './keyboard.mock';

export const IONIC_MOCKS: Provider[] = [
  { provide: NavController, useClass: NavControllerMock },
  { provide: Config, useClass: ConfigMock },
  { provide: Platform, useClass: PlatformMock },
  DomController,
  { provide: App, useClass: AppMock },
  { provide: Keyboard, useClass: KeyboardMock },
  { provide: Form, useClass: FormMock },
];
