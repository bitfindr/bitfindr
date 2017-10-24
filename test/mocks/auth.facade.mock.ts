import { of as obsOf } from 'rxjs/observable/of';

export class AuthFacadeMock {
  public static instance(): any {

    const instance = jasmine.createSpyObj('AuthFacade', [
      'signup',
      'login',
      'signout',
    ]);

    instance.authUser$ = obsOf();
    instance.signup$ = obsOf();
    instance.login$ = obsOf();
    instance.signout$ = obsOf();

    return instance;
  }
}
