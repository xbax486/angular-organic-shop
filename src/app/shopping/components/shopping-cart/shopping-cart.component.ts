import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { AuthService } from 'shared/services/auth/auth.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart: ShoppingCart;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService) {}

  async ngOnInit() {
    (await this.shoppingCartService.getCart()).subscribe(
      shoppingCart => this.shoppingCart = shoppingCart);
  }

  clearShoppingCart() {
    this.shoppingCartService.clearShoppingCart();
  }
}
