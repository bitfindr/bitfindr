import { NavController } from 'ionic-angular';
import { ComponentFixture, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestUtils } from './../../../test';
import { LoginPage } from './login';
import { AuthFacade } from './../../state/auth/auth.facade';

let formControlUpdater: TestUtils.FormControlUpdater;
let fixture: ComponentFixture<LoginPage> = null;
let debugEl: DebugElement = null;
let instance: LoginPage = null;
let nativeEl: HTMLElement = null;

const INVALID_FORM = {
  email: 'invalidEmail',
  password: '123test',
};

const VALID_FORM = {
  email: 'valid@email.com',
  password: '123test',
};

function updateEmail(value: string) {
  formControlUpdater('email', value);
}

function updatePassword(value: string) {
  formControlUpdater('password', value);
}

function fillForm(data: any) {
  const { email, password } = data;
  updateEmail(email);
  updatePassword(password);
}

describe('Pages: LoginPage', () => {
  beforeEach(
    async(() => {
      TestUtils.beforeEachCompiler([LoginPage]).then(compiled => {
        fixture = compiled.fixture;
        debugEl = compiled.debugEl;
        instance = compiled.instance;
        nativeEl = compiled.nativeEl;
        formControlUpdater = TestUtils.getFormControlUpdater(debugEl);
        fixture.detectChanges();
      });
    })
  );

  it(
    'should create page component',
    async(() => {
      expect(instance instanceof LoginPage).toBeTruthy();
    })
  );

  describe('Method: login()', () => {
    it(
      'should call `AuthFacade#login` with Login Data value',
      inject([AuthFacade], (authFacade: AuthFacade) => {
        const { email, password } = VALID_FORM;
        const expected = { email, password };

        instance.loginForm.setValue({
          email,
          password,
        });
        instance.login();

        expect(authFacade.login).toHaveBeenCalledWith(expected);
      })
    );
  });

  describe('Method: facebookLogin()', () => {
    it(
      'should call `AuthFacade#facebookAuth`',
      inject([AuthFacade], (authFacade: AuthFacade) => {
        instance.facebookLogin();

        expect(authFacade.facebookAuth).toHaveBeenCalled();
      })
    );
  });

  describe('Method: goToSignup()', () => {
    it(
      "should call `navCtrl#push` with 'SignupPage'",
      inject([NavController], (navCtrl: NavController) => {
        instance.goToSignup();

        expect(navCtrl.push).toHaveBeenCalledWith('SignupPage');
      })
    );
  });

  describe('Template: Login form', () => {
    let submitButtonEl: HTMLButtonElement;

    beforeEach(() => {
      submitButtonEl = debugEl.query(By.css('button[type="submit"]'))
        .nativeElement;
    });

    it('should have two input fields', () => {
      const inputs = debugEl.queryAll(By.css('input'));

      expect(inputs.length).toBe(2);
    });

    it('should call `login` on submit', () => {
      spyOn(instance, 'login');

      fillForm(VALID_FORM);
      fixture.detectChanges();
      submitButtonEl.click();

      expect(instance.login).toHaveBeenCalled();
    });
  });

  describe('Template: Facebook login', () => {
    it('should call `facebookLogin` on click', () => {
      const fbButtonEl: HTMLButtonElement = debugEl.query(
        By.css('#facebook-login')
      ).nativeElement;
      spyOn(instance, 'facebookLogin');

      fbButtonEl.click();

      expect(instance.facebookLogin).toHaveBeenCalled();
    });
  });

  describe('Template: Signup CTA', () => {
    it('should call `goToSignup` on click', () => {
      const ctaEl: HTMLDivElement = debugEl.query(By.css('#signup-cta'))
        .nativeElement;
      spyOn(instance, 'goToSignup');

      ctaEl.click();

      expect(instance.goToSignup).toHaveBeenCalled();
    });
  });
});
