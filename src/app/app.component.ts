import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'shared/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  subscription: Subscription;

  constructor(
    private authService: AuthService,
    private userService: UserService, 
    private router: Router) {

    this.subscription = this.authService.user$.subscribe(user => {
      if(!user) return;

      this.userService.saveUser(user);
      this.redirectUser();
    });
  }
  
  private redirectUser() {
    let returnUrl = localStorage.getItem('returnUrl');
    if(!returnUrl) return;
    localStorage.removeItem('returnUrl');
    this.router.navigateByUrl(returnUrl);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
