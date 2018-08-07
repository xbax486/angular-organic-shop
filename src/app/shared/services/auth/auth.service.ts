import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable, of } from "rxjs";
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from 'shared/models/app-user';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private angularFireAuth: AngularFireAuth, 
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {
    
    this.user$ = this.angularFireAuth.authState;
  }

  login() {
    let returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.angularFireAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if(user) {
          return this.userService.returnUserObservable(user.uid);
        }

        return of(null);
      })
    );
  }
}
