import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'shared/services/auth/auth.service';
import { UserService } from 'shared/services/user/user.service';

import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private userService: UserService, 
    private router: Router) { }

  canActivate(){
    return this.authService.user$.pipe(
      switchMap(() => this.authService.appUser$),
      map(appUser => {
        if(appUser.isAdmin) 
          return true;
        
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}
