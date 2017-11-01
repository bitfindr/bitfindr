import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { BaseUserProfile, UserProfile } from './../../shared/models';

@Injectable()
export class BitfindrDataProvider {
  constructor(private firestore: AngularFirestore) {}

  setupProfile(uid: string, userProfile: BaseUserProfile) {
    return this.firestore
      .doc<BaseUserProfile>(`users/${uid}`)
      .set(userProfile)
      .then(_ => userProfile);
  }

  loadProfile(uid: string) {
    return this.firestore
      .doc<UserProfile>(`users/${uid}`)
      .valueChanges()
      .first();
  }

  editProfile(uid: string, userProfile: Partial<UserProfile>) {
    return this.firestore.doc<UserProfile>(`users/${uid}`).update(userProfile);
  }

  getUsers() {
    return this.firestore.collection<UserProfile>('users').valueChanges();
  }
}
