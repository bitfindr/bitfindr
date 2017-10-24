import { AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BitfindrDataProvider {

  constructor(private db: AngularFireDatabase) {
  }

  getUsers(): Observable<any[]> {
    return this.db.list('users');
  }

}
