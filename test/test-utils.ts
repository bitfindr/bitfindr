import { Type, DebugElement } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from 'ionic-angular';

import { TEST_PROVIDERS } from './test-module.providers';
import { APP_MOCKS } from './mocks/index';

export interface TestModuleComponents<T> {
  [index: number]: any;
  0: Type<T>;
}

export function beforeEachCompiler<Cmp>(components: TestModuleComponents<Cmp>) {
  return configureIonicTestingModule(components)
    .compileComponents()
    .then(() => {
      const fixture = TestBed.createComponent(components[0]);
      const debugEl = fixture.debugElement;
      const instance: Cmp = fixture.debugElement.componentInstance;
      const nativeEl: HTMLElement = fixture.nativeElement;

      return { fixture, debugEl, instance, nativeEl };
    });
}

export function configureIonicTestingModule<Cmp>(components: TestModuleComponents<Cmp>) {
  return TestBed.configureTestingModule({
    declarations: [ ...<any>components ],
    providers: [ ...TEST_PROVIDERS, ...APP_MOCKS ],
    imports: [
      FormsModule,
      IonicModule,
      ReactiveFormsModule,
    ],
  });
}

function createEvent(evtName: string, bubbles = false, cancelable = false, detail = null) {
  const evt = document.createEvent('CustomEvent');
  evt.initCustomEvent(evtName, bubbles, cancelable, detail);

  return evt;
}
