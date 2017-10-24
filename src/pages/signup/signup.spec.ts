import { AuthFacade } from './../../state/auth/auth.facade';
import { ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SignupPage } from './signup';
import { TestUtils } from './../../../test';
import { inject } from '@angular/core/testing';

let formControlUpdater: TestUtils.FormControlUpdater;
let fixture: ComponentFixture<SignupPage> = null;
let debugEl: DebugElement = null;
let instance: SignupPage = null;
let nativeEl: HTMLElement = null;

const INVALID_FORM = { email: 'invalidEmail', password: 'invalidPwd', passwordConfirm: 'nonMatching' };
const VALID_FORM = { email: 'valid@email.com', password: '123test', passwordConfirm: '123test' };

function updateEmail(value: string) {
  formControlUpdater('email', value);
}

function updatePassword(value: string) {
  formControlUpdater('value', value);
}

function updatePasswordConfirm(value: string) {
  formControlUpdater('confirmed', value);
}

function fillForm(data: any) {
  const { email, password, passwordConfirm } = data;
  updateEmail(email);
  updatePassword(password);
  updatePasswordConfirm(passwordConfirm);
}

describe('Pages: SignupPage', () => {
  beforeEach(async(() => {
    TestUtils.beforeEachCompiler([SignupPage])
      .then(compiled => {
        fixture = compiled.fixture;
        debugEl = compiled.debugEl;
        instance = compiled.instance;
        nativeEl = compiled.nativeEl;
        formControlUpdater = TestUtils.getFormControlUpdater(debugEl);
        fixture.detectChanges();
      });
  }));

  it('should create page component', async(() => {
    expect(instance instanceof SignupPage).toBeTruthy();
  }));

  describe('Method: signup()', () => {
    it('should call `AuthFacade#signup` with `signupForm` value', inject([AuthFacade], (authFacade: AuthFacade) => {
      const { email, password } = VALID_FORM;
      const expected = { email, password };

      instance.signupForm.setValue({
        email,
        password: {
          value: password,
          confirmed: password,
        }
      });
      instance.signup();

      expect(authFacade.signup).toHaveBeenCalledWith(expected);
    }));
  });

  describe('Template: Signup form', () => {
    let submitButtonEl: HTMLButtonElement;

    beforeEach(() => {
      submitButtonEl = debugEl.query(By.css('button[type="submit"]')).nativeElement;
    });

    it('should have three input fields', () => {
      const inputs = debugEl.queryAll(By.css('input'));

      expect(inputs.length).toBe(3);
    });

    it('should disable submit button while invalid', () => {
      fillForm(INVALID_FORM);
      fixture.detectChanges();

      expect(submitButtonEl.disabled).toBe(true);
    });

    it('should enable submit button when valid', () => {
      fillForm(VALID_FORM);
      fixture.detectChanges();

      expect(submitButtonEl.disabled).toBe(false);
    });

    it('should call `signup` on submit', () => {
      spyOn(instance, 'signup');

      fillForm(VALID_FORM);
      fixture.detectChanges();
      submitButtonEl.click();

      expect(instance.signup).toHaveBeenCalled();
    });
  });
});
