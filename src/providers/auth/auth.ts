import { FirebaseUserProfile, FirebaseBasicProfile } from './../../shared/models/auth';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  checkAuthState() {
    return this.afAuth.authState
      .take(1)
      .map(response => this.extractUserProfile(response));
  }

  signup(userCredentials: { email: string, password: string }) {
    const { email, password } = userCredentials;

    const signupPromise = this.afAuth.auth.createUserWithEmailAndPassword(email, password);

    return fromPromise(signupPromise)
      .map(response => this.extractUserProfile(response));
  }

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
