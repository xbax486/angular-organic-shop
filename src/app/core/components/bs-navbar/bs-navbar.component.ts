import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from "shared/services/auth/auth.service";
import { AppUser } from 'shared/models/app-user';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from 'shared/services/shopping-cart/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  appUser: AppUser;
  appUserSubscription: Subscription;
  shoppingCart: ShoppingCart;
  showMenu: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService) {

    this.appUserSubscription = this.authService.appUser$
      .subscribe(appUser => this.appUser = appUser);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  async ngOnInit() {
    (await this.shoppingCartService.getCart())
      .subscribe(shoppingCart => this.shoppingCart = shoppingCart);
  }

  ngOnDestroy() {
    this.appUserSubscription.unsubscribe();
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
