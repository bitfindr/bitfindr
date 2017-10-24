import { Provider } from '@angular/core';

import {
  App,
  Config,
  DomController,
  Form,
  Keyboard,
  MenuController,
  NavController,
  Platform,
} from 'ionic-angular';

import {
  AppMock,
  ConfigMock,
  FormMock,
  KeyboardMock,
  MenuControllerMock,
  NavControllerMock,
  PlatformMock,
} from 'ionic-mocks';

export const TEST_PROVIDERS: Provider[] = [
  { provide: App, useFactory: () => AppMock.instance() },
  { provide: Config, useFactory: () => ConfigMock.instance() },
  DomController,
  { provide: Form, useFactory: () => FormMock.instance() },
  { provide: Keyboard, useFactory: () => KeyboardMock.instance() },
  { provide: MenuController, useFactory: () => MenuControllerMock.instance() },
  { provide: NavController, useFactory: () => NavControllerMock.instance() },
  { provide: Platform, useFactory: () => PlatformMock.instance() },
];
