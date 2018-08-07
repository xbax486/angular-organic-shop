import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'shared/services/auth/auth.service';
import { UserService } from 'shared/services/user/user.service';

import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private userService: UserService) { }

  canActivate(){
    return this.authService.user$.pipe(
      switchMap(() => this.authService.appUser$),
      map(appUser => appUser.isAdmin)
    );
  }
}
