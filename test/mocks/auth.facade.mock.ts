import { of as obsOf } from 'rxjs/observable/of';

export class AuthFacadeMock {
  public static instance() {
    return {
      authUser$: jest.fn(),
      signup$: jest.fn(),
      login$: jest.fn(),
      signout$: jest.fn(),
      facebookAuth$: jest.fn(),
      authenticate$: jest.fn(),
      signup: jest.fn(),
      login: jest.fn(),
      facebookAuth: jest.fn(),
      signout: jest.fn(),
    };
  }
}
