import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/operator/map';

import { FirebaseUserProfile, FirebaseBasicProfile, UserCredentials } from './../../shared/models/auth';

@Injectable()
export class AuthProvider {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

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

    const signupPromise = this.afAuth.auth.createUserWithEmailAndPassword(email, password);

    return fromPromise(signupPromise)
      .map(response => this.extractUserProfile(response));
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
      uid: data.uid
    };

    return profile;
  }
}
