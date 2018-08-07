import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from "firebase";
import { AppUser } from 'shared/models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private angularFireDatabase: AngularFireDatabase) { }

  saveUser(user: firebase.User) {
    this.angularFireDatabase.object('/users' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  getUser(uid: string): AngularFireObject<AppUser> {
    return this.angularFireDatabase.object('/users' + uid);
  }

  returnUserObservable(uid) {
    return this.getUser(uid).valueChanges();
  }
}
