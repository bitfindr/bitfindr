import { of as obsOf } from 'rxjs/observable/of';

export class AuthProviderMock {
  checkAuthState = jest.fn();
  signup = jest.fn();
  signin = jest.fn();
  facebookAuth = jest.fn();
  nativeFacebookAuth = jest.fn();
  signout = jest.fn();
}
