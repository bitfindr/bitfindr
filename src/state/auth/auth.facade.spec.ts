import { TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import {
  EffectsModule,
  EffectsMetadata,
  getEffectsMetadata,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { marbles } from 'rxjs-marbles';
import { Observable } from 'rxjs/Observable';

import { AuthProvider } from './../../providers/auth/auth.provider';
import { AuthProviderMock } from './../../../test/mocks/auth-provider.mock';
import {
  ApplicationState,
  ROOT_REDUCER,
  AuthenticateAction,
  SignupAction,
  SignupFailAction,
  LoginAction,
  LoginFailAction,
  SignoutAction,
  SignoutFailAction,
  FacebookAuthAction,
  FacebookAuthFailAction,
  SetupProfileAction,
  LoadProfileAction,
  AuthFacade,
} from './../../state';

const TEST_FIREBASE_USER = {
  displayName: 'Test Name',
  email: 'test@email.com',
  photoURL: 'placehold.it/80x80',
  providerId: 'email',
  uid: 'abcdefghijklmnopqrstuvwxyz',
  emailVerified: false,
  isAnonymous: false,
  providerData: [],
  refreshToken: '1234567890',
};

const TEST_CREDENTIALS = { email: 'new@email.com', password: '123test' };

const TEST_SIGNUP_DATA = {
  credentials: TEST_CREDENTIALS,
  userProfile: { firstName: 'test', lastName: 'user' },
};

const TEST_ERROR = 'Fake Error';

describe('Facades: AuthFacade', () => {
  let actions: Observable<any>;
  let store: Store<ApplicationState>;
  let authFacade: AuthFacade;
  let authProvider: AuthProviderMock;
  let metadata: EffectsMetadata<AuthFacade>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(ROOT_REDUCER),
        EffectsModule.forRoot([AuthFacade]),
      ],
      providers: [
        AuthFacade,
        { provide: AuthProvider, useClass: AuthProviderMock },
        provideMockActions(() => actions),
      ],
    });

    store = TestBed.get(Store);
    authFacade = TestBed.get(AuthFacade);
    authProvider = TestBed.get(AuthProvider);
    metadata = getEffectsMetadata(authFacade);
  });

  describe('Store Queries:', () => {
    describe('authUser$', () => {
      it('should not register as an Effect', () => {
        expect(metadata.authUser$).toBeUndefined();
      });

      it('should observe value of `authUser`', () => {
        let testCase = 1;
        authFacade.authUser$.take(2).subscribe(user => {
          if (testCase === 1) {
            expect(user).toEqual(TEST_FIREBASE_USER);
          }

          if (testCase === 2) {
            expect(user).toBeNull();
          }
          testCase++;
        });

        store.dispatch(new AuthenticateAction(TEST_FIREBASE_USER));
        store.dispatch(new AuthenticateAction(null));
      });
    });
  });

  describe('Effects:', () => {
    describe('init$', () => {
      it('should register an Effect that dispatches an action', () => {
        expect(metadata.init$).toEqual({ dispatch: true });
      });

      it(
        'should dispatch `AuthenticateAction` on `EffectsModule` initialization',
        marbles(m => {
          authProvider.checkAuthState.mockReturnValueOnce(
            Observable.of(TEST_FIREBASE_USER)
          );
          const a = { type: ROOT_EFFECTS_INIT };
          const b = new AuthenticateAction(TEST_FIREBASE_USER);

          // prettier-ignore
          actions = m.hot(        '-a', { a });
          const expected = m.cold('-b', { b });

          m.expect(authFacade.init$).toBeObservable(expected);
        })
      );
    });

    describe('signup$', () => {
      it('should register an Effect that dispatches an action', () => {
        expect(metadata.signup$).toEqual({ dispatch: true });
      });

      it(
        'should dispatch `AuthenticateAction`, and `SetupProfileAction` when `SignupAction` async operation succeeds',
        marbles(m => {
          authProvider.signup.mockReturnValueOnce(
            Observable.of(TEST_FIREBASE_USER)
          );
          const a = new SignupAction(TEST_SIGNUP_DATA);
          const b = new AuthenticateAction(TEST_FIREBASE_USER);
          const c = new SetupProfileAction({
            userProfile: TEST_SIGNUP_DATA.userProfile,
            uid: TEST_FIREBASE_USER.uid,
          });

          // prettier-ignore
          actions = m.hot(        '--a-', { a });
          const expected = m.cold('--(bc)-', { b, c });

          m.expect(authFacade.signup$).toBeObservable(expected);
        })
      );

      it(
        'should dispatch `SignupFailAction` when `SignupAction` async operation fails',
        marbles(m => {
          authProvider.signup.mockReturnValueOnce(Observable.throw(TEST_ERROR));
          const a = new SignupAction(TEST_SIGNUP_DATA);
          const b = new SignupFailAction(TEST_ERROR);

          // prettier-ignore
          actions = m.hot(        '--a-', { a });
          const expected = m.cold('--b-', { b });

          m.expect(authFacade.signup$).toBeObservable(expected);
        })
      );
    });

    describe('login$', () => {
      it('should register an Effect that dispatches an action', () => {
        expect(metadata.login$).toEqual({ dispatch: true });
      });

      it(
        'should dispatch `AuthenticateAction` when `LoginAction` async operation succeeds',
        marbles(m => {
          authProvider.signin.mockReturnValueOnce(
            Observable.of(TEST_FIREBASE_USER)
          );
          const a = new LoginAction(TEST_CREDENTIALS);
          const b = new AuthenticateAction(TEST_FIREBASE_USER);

          // prettier-ignore
          actions = m.hot(        '--a-', { a });
          const expected = m.cold('--b-', { b });

          m.expect(authFacade.login$).toBeObservable(expected);
        })
      );

      it(
        'should dispatch `LoginFailAction` when `LoginAction` async operation fails',
        marbles(m => {
          authProvider.signin.mockReturnValueOnce(Observable.throw(TEST_ERROR));
          const a = new LoginAction(TEST_CREDENTIALS);
          const b = new LoginFailAction(TEST_ERROR);

          // prettier-ignore
          actions = m.hot(        '--a-', { a });
          const expected = m.cold('--b-', { b });

          m.expect(authFacade.login$).toBeObservable(expected);
        })
      );
    });

    describe('signout$', () => {
      it('should register an Effect that dispatches an action', () => {
        expect(metadata.signout$).toEqual({ dispatch: true });
      });

      it(
        'should dispatch `AuthenticateAction` when `SignoutAction` async operation succeeds',
        marbles(m => {
          authProvider.signout.mockReturnValueOnce(Observable.of(true));
          authProvider.checkAuthState.mockReturnValueOnce(Observable.of(null));
          const a = new SignoutAction();
          const b = new AuthenticateAction(null);

          // prettier-ignore
          actions = m.hot(        '-a', { a });
          const expected = m.cold('-b', { b });

          m.expect(authFacade.signout$).toBeObservable(expected);
        })
      );

      it(
        'should dispatch `SignoutFailAction` when `SignoutAction` async operation fails',
        marbles(m => {
          authProvider.signout.mockReturnValueOnce(
            Observable.throw(TEST_ERROR)
          );
          const a = new SignoutAction();
          const b = new SignoutFailAction(TEST_ERROR);

          // prettier-ignore
          actions = m.hot(        '-a', { a });
          const expected = m.cold('-b', { b });

          m.expect(authFacade.signout$).toBeObservable(expected);
        })
      );
    });

    describe('facebookAuth$', () => {
      it('should register an Effect that dispatches an action', () => {
        expect(metadata.facebookAuth$).toEqual({ dispatch: true });
      });

      it(
        'should dispatch `AuthenticateAction` when `FacebookAuthAction` async operation succeeds',
        marbles(m => {
          authProvider.facebookAuth.mockReturnValueOnce(
            Observable.of(TEST_FIREBASE_USER)
          );
          const a = new FacebookAuthAction();
          const b = new AuthenticateAction(TEST_FIREBASE_USER);

          // prettier-ignore
          actions = m.hot(        '-a', { a });
          const expected = m.cold('-b', { b });

          m.expect(authFacade.facebookAuth$).toBeObservable(expected);
        })
      );

      it(
        'should dispatch `FacebookAuthFailAction` when `FacebookAuthAction` async operation fails',
        marbles(m => {
          authProvider.facebookAuth.mockReturnValueOnce(
            Observable.throw(TEST_ERROR)
          );
          const a = new FacebookAuthAction();
          const b = new FacebookAuthFailAction(TEST_ERROR);

          // prettier-ignore
          actions = m.hot(        '-a', { a });
          const expected = m.cold('-b', { b });

          m.expect(authFacade.facebookAuth$).toBeObservable(expected);
        })
      );
    });

    describe('authenticate$', () => {
      it('should register an Effect that dispatches an action', () => {
        expect(metadata.authenticate$).toEqual({ dispatch: true });
      });

      it(
        'should dispatch `LoadProfileAction` when `AuthenticateAction` is dispatched',
        marbles(m => {
          const a = new AuthenticateAction(TEST_FIREBASE_USER);
          const b = new LoadProfileAction(TEST_FIREBASE_USER.uid);

          // prettier-ignore
          actions = m.hot(        '-a', { a });
          const expected = m.cold('-b', { b });

          m.expect(authFacade.authenticate$).toBeObservable(expected);
        })
      );
    });
  });

  describe('Action Creators:', () => {
    let storeSpy;

    beforeEach(() => {
      storeSpy = jest.spyOn(store, 'dispatch');
    });

    describe('signup()', () => {
      it('should dispatch `SignupAction` when called', () => {
        const expected = new SignupAction(TEST_SIGNUP_DATA);

        authFacade.signup(TEST_SIGNUP_DATA);

        expect(storeSpy).toHaveBeenCalledWith(expected);
      });
    });

    describe('login()', () => {
      it('should dispatch `LoginAction` when called', () => {
        const expected = new LoginAction(TEST_CREDENTIALS);

        authFacade.login(TEST_CREDENTIALS);

        expect(storeSpy).toHaveBeenCalledWith(expected);
      });
    });

    describe('facebookAuth()', () => {
      it('should dispatch `FacebookAuthAction` when called', () => {
        const expected = new FacebookAuthAction();

        authFacade.facebookAuth();

        expect(storeSpy).toHaveBeenCalled();
      });
    });

    describe('signout()', () => {
      it('should dispatch `SignoutAction` when called', () => {
        const expected = new SignoutAction();

        authFacade.signout();

        expect(storeSpy).toHaveBeenCalled();
      });
    });
  });
});
