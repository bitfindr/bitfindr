import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from './../../../test';
import { SignupPage } from './signup';
import { DebugElement } from '@angular/core';

let debugEl: DebugElement = null;
let fixture: ComponentFixture<SignupPage> = null;
let instance: SignupPage = null;
let nativeEl: HTMLElement = null;

describe('Pages: SignupPage', () => {
  beforeEach(async(() => {
    TestUtils.beforeEachCompiler([SignupPage])
      .then(compiled => {
        debugEl = compiled.debugEl;
        fixture = compiled.fixture;
        instance = compiled.instance;
        nativeEl = compiled.nativeEl;
      });
  }));

  it('should create page component', async(() => {
    expect(instance).toBeTruthy();
  }));
});
