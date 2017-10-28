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
import { IonKeyboardMock } from './ion-keyboard.mock';

export const IONIC_MOCKS: Provider[] = [
  { provide: NavController, useValue: NavControllerMock.instance() },
  { provide: Config, useValue: ConfigMock.instance() },
  { provide: Platform, useValue: PlatformMock.instance() },
  DomController,
  { provide: App, useValue: AppMock.instance() },
  { provide: Keyboard, useValue: IonKeyboardMock.instance() },
  { provide: Form, useValue: FormMock.instance() },
];
