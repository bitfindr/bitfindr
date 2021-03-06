import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth as firebaseAuth } from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/operator/map';

import {
  FirebaseUserProfile,
  FirebaseBasicProfile,
  UserCredentials,
} from './../../shared/models';
import { environment } from './../../environments/environment';

@Injectable()
export class AuthProvider {
  constructor(
    private afAuth: AngularFireAuth,
    private facebook: Facebook,
    private platform: Platform
  ) {}

  /**
   * checks firebase authstate
   *
   * @returns {Observable<FirebaseUserProfile>}
   * @memberof AuthProvider
   */
  checkAuthState(): Observable<FirebaseUserProfile> {
    return this.afAuth.authState
      .take(1)
      .map(response => this.extractUserProfile(response));
  }

  /**
   * registers a new user on firebase using EmailAuthProvider
   *
   * @param {UserCredentials} userCredentials
   * @returns {Observable<FirebaseUserProfile>}
   * @memberof AuthProvider
   */
  signup(userCredentials: UserCredentials): Observable<FirebaseUserProfile> {
    const { email, password } = userCredentials;

    const signupPromise = this.afAuth.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    return fromPromise(signupPromise).map(response =>
      this.extractUserProfile(response)
    );
  }

  /**
   * signs a user in through firebase using EmailAuthProvider
   *
   * @param {UserCredentials} userCredentials
   * @returns {Observable<FirebaseUserProfile>}
   * @memberof AuthProvider
   */
  signin(userCredentials: UserCredentials): Observable<FirebaseUserProfile> {
    const { email, password } = userCredentials;

    const signinPromise = this.afAuth.auth.signInWithEmailAndPassword(
      email,
      password
    );

    return fromPromise(signinPromise).map(response =>
      this.extractUserProfile(response)
    );
  }

  /**
   * authenticates the user via cordova native plugin
   * or fallsback to web popup authentication with firebase
   *
   * @returns {Observable<FirebaseUserProfile>}
   * @memberof AuthProvider
   */
  facebookAuth(): Observable<FirebaseUserProfile> {
    const facebookPromise = this.platform.is('cordova')
      ? this.nativeFacebookAuth()
      : this.afAuth.auth
          .signInWithPopup(new firebaseAuth.FacebookAuthProvider())
          .then(response => response.user);

    facebookPromise.catch(error => {
      let { code, message } = error;
      message = message || 'Unable to authenticate with Facebook!';
      return Promise.reject({ code, message });
    });

    return Observable.fromPromise(facebookPromise).map(response =>
      this.extractUserProfile(response)
    );
  }

  /**
   * obtains facebook accessToken via cordova native plugin
   * then uses accessToken to authenticate with firebase
   *
   * @returns {Promise<FacebookLoginResponse>}
   * @memberof AuthProvider
   */
  nativeFacebookAuth(): Promise<FacebookLoginResponse> {
    const facebookPromise = this.facebook
      .login(environment.facebook.scopes)
      .then(response => {
        const accessToken = response.authResponse.accessToken;
        const facebookCredential = firebaseAuth.FacebookAuthProvider.credential(
          accessToken
        );

        return this.afAuth.auth.signInWithCredential(facebookCredential);
      });

    return facebookPromise;
  }

  /**
   * signs a user out
   *
   * @returns {Observable<any>}
   * @memberof AuthProvider
   */
  signout(): Observable<any> {
    return fromPromise(this.afAuth.auth.signOut());
  }

  /**
   * extracts the user profile from the firebase user object
   * without including all the cryptic properties
   *
   * @private
   * @param {*} data
   * @returns {FirebaseUserProfile}
   * @memberof AuthProvider
   */
  private extractUserProfile(data: any): FirebaseUserProfile {
    if (data && !data.uid) {
      throw Error('Invalid User Data');
    } else if (!data) {
      return data;
    }

    const providerData: FirebaseBasicProfile[] = [];
    if (data.providerData.length) {
      data.providerData.forEach(provider => {
        const providerProfile = { ...provider };
        providerData.push(providerProfile);
      });
    }

    const profile: FirebaseUserProfile = {
      displayName: data.displayName || null,
      email: data.email || null,
      emailVerified: data.emailVerified || false,
      isAnonymous: data.isAnonymous || false,
      photoURL: data.photoURL || null,
      providerData,
      providerId: data.providerId,
      refreshToken: data.refreshToken,
      uid: data.uid,
    };

    return profile;
  }
}
